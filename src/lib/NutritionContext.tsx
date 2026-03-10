import React, { createContext, useContext, useState, useEffect } from 'react';
import { Meal, MOCK_MEALS, UserProfile } from '../types';

interface NutritionContextType {
    userProfile: UserProfile | null;
    meals: Meal[];
    dailyGoal: number;
    updateUserProfile: (profile: UserProfile) => void;
    addMeal: (meal: Meal) => void;
    removeMeal: (id: string) => void;
    updateDailyGoal: (goal: number) => void;
}

const NutritionContext = createContext<NutritionContextType | undefined>(undefined);

export const NutritionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
        const saved = localStorage.getItem('nutriscan_user_profile');
        return saved ? JSON.parse(saved) : null;
    });

    const [meals, setMeals] = useState<Meal[]>(() => {
        const saved = localStorage.getItem('nutriscan_meals');
        // Default to MOCK_MEALS on first load to give the user something to see
        return saved ? JSON.parse(saved) : MOCK_MEALS;
    });

    const [dailyGoal, setDailyGoal] = useState<number>(() => {
        const saved = localStorage.getItem('nutriscan_goal');
        return saved ? JSON.parse(saved) : 2500;
    });

    // Effect to recalculate goal when profile changes
    useEffect(() => {
        if (userProfile) {
            // Mifflin-St Jeor Equation
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

            // Goal Adjustment
            if (userProfile.goal === 'lose') {
                tdee -= 500; // Approx 1 lb/week loss
            } else if (userProfile.goal === 'gain') {
                tdee += 500; // Approx 1 lb/week gain
            }

            setDailyGoal(Math.round(tdee));
        }
    }, [userProfile]);

    useEffect(() => {
        localStorage.setItem('nutriscan_user_profile', JSON.stringify(userProfile));
    }, [userProfile]);

    // Save to localStorage whenever state changes
    useEffect(() => {
        localStorage.setItem('nutriscan_meals', JSON.stringify(meals));
    }, [meals]);

    useEffect(() => {
        localStorage.setItem('nutriscan_goal', JSON.stringify(dailyGoal));
    }, [dailyGoal]);

    const updateUserProfile = (profile: UserProfile) => {
        setUserProfile(profile);
    };

    const addMeal = (meal: Meal) => {
        setMeals((prev) => [meal, ...prev]);
    };

    const removeMeal = (id: string) => {
        setMeals((prev) => prev.filter((m) => m.id !== id));
    };

    const updateDailyGoal = (goal: number) => {
        setDailyGoal(goal);
    };

    return (
        <NutritionContext.Provider value={{ userProfile, meals, dailyGoal, updateUserProfile, addMeal, removeMeal, updateDailyGoal }}>
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
