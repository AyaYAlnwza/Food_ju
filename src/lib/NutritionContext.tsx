import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, setDoc, getDoc, collection, onSnapshot, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';
import { useAuth } from './AuthContext';
import { Meal, UserProfile } from '../types';

interface NutritionContextType {
    userProfile: UserProfile | null;
    meals: Meal[];
    dailyGoal: number;
    updateUserProfile: (profile: UserProfile) => void;
    addMeal: (meal: Meal) => void;
    removeMeal: (id: string) => void;
    updateDailyGoal: (goal: number) => void;
    loadingData: boolean;
}

const NutritionContext = createContext<NutritionContextType | undefined>(undefined);

export const NutritionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [meals, setMeals] = useState<Meal[]>([]);
    const [dailyGoal, setDailyGoal] = useState<number>(2500);
    const [loadingData, setLoadingData] = useState(true);

    // Load data when user changes
    useEffect(() => {
        if (!user) {
            setUserProfile(null);
            setMeals([]);
            setLoadingData(false);
            return;
        }

        setLoadingData(true);

        const fetchUserData = async () => {
            try {
                // Fetch profile
                const profileRef = doc(db, 'users', user.uid);
                const profileSnap = await getDoc(profileRef);

                if (profileSnap.exists()) {
                    const data = profileSnap.data();
                    setUserProfile(data.profile || null);
                    if (data.dailyGoal) {
                        setDailyGoal(data.dailyGoal);
                    }
                }

                // Fetch meals via realtime listener
                const mealsRef = collection(db, 'users', user.uid, 'meals');
                const unsubscribe = onSnapshot(mealsRef, (snapshot) => {
                    const fetchedMeals = snapshot.docs.map(doc => doc.data() as Meal);
                    // Sort descending by id
                    setMeals(fetchedMeals.sort((a, b) => b.id.localeCompare(a.id)));
                    setLoadingData(false);
                });

                return unsubscribe;
            } catch (error) {
                console.error("Error fetching user data:", error);
                setLoadingData(false);
            }
        };

        const cleanup = fetchUserData();

        return () => {
            cleanup.then(unsub => {
                if (typeof unsub === 'function') unsub();
            });
        };
    }, [user]);

    // Recalculate daily goal when profile changes
    useEffect(() => {
        if (userProfile && user) {
            let bmr = (10 * userProfile.weightKg) + (6.25 * userProfile.heightCm) - (5 * userProfile.age);
            bmr += userProfile.gender === 'male' ? 5 : -161;

            const multipliers = {
                sedentary: 1.2,
                lightly_active: 1.375,
                moderately_active: 1.55,
                very_active: 1.725,
                super_active: 1.9,
            };

            let tdee = bmr * multipliers[userProfile.activityLevel];

            if (userProfile.goal === 'lose') {
                tdee -= 500;
            } else if (userProfile.goal === 'gain') {
                tdee += 500;
            }

            const newGoal = Math.round(tdee);

            // Avoid unnecessary writes if goal hasn't changed
            setDailyGoal(prev => {
                if (prev !== newGoal) {
                    setDoc(doc(db, 'users', user.uid), {
                        profile: userProfile,
                        dailyGoal: newGoal
                    }, { merge: true });
                }
                return newGoal;
            });
        }
    }, [userProfile, user]);

    const updateUserProfile = async (profile: UserProfile) => {
        setUserProfile(profile);
        if (user) {
            try {
                await setDoc(doc(db, 'users', user.uid), {
                    profile: profile
                }, { merge: true });
            } catch (error) {
                console.error("Error updating profile:", error);
            }
        }
    };

    const addMeal = async (meal: Meal) => {
        if (!user) return;

        // Optimistic update
        setMeals((prev) => [meal, ...prev]);

        try {
            await setDoc(doc(db, 'users', user.uid, 'meals', meal.id), meal);
        } catch (error) {
            console.error("Error adding meal:", error);
            // Revert on error
            setMeals((prev) => prev.filter(m => m.id !== meal.id));
        }
    };

    const removeMeal = async (id: string) => {
        if (!user) return;

        const mealToRemove = meals.find(m => m.id === id);
        if (!mealToRemove) return;

        // Optimistic update
        setMeals((prev) => prev.filter((m) => m.id !== id));

        try {
            await deleteDoc(doc(db, 'users', user.uid, 'meals', id));
        } catch (error) {
            console.error("Error removing meal:", error);
            // Revert on error
            setMeals((prev) => [mealToRemove, ...prev]);
        }
    };

    const updateDailyGoal = async (goal: number) => {
        setDailyGoal(goal);
        if (user) {
            try {
                await setDoc(doc(db, 'users', user.uid), {
                    dailyGoal: goal
                }, { merge: true });
            } catch (error) {
                console.error("Error updating goal:", error);
            }
        }
    };

    return (
        <NutritionContext.Provider value={{ userProfile, meals, dailyGoal, updateUserProfile, addMeal, removeMeal, updateDailyGoal, loadingData }}>
            {children}
        </NutritionContext.Provider>
    );
};

export const useNutrition = () => {
    const context = useContext(NutritionContext);
    if (context === undefined) {
        throw new Error('useNutrition must be used within a NutritionProvider');
    }
    return context;
};
