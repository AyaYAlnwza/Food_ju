export interface UserProfile {
  name: string;
  age: number;
  gender: 'male' | 'female';
  weightKg: number;
  heightCm: number;
  activityLevel: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'super_active';
  goal: 'lose' | 'maintain' | 'gain';
}

export interface Meal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  tags: string[];
  timestamp: string;
  image: string;
  category: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
}

