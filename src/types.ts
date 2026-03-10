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

export const MOCK_MEALS: Meal[] = [
  {
    id: '1',
    name: 'Avocado Toast',
    calories: 350,
    protein: 12,
    carbs: 45,
    fat: 18,
    tags: ['HEALTHY FATS', 'PROTEIN'],
    timestamp: 'Today, 8:30 AM',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=200&h=200',
    category: 'Breakfast'
  },
  {
    id: '2',
    name: 'Salmon Pasta',
    calories: 620,
    protein: 35,
    carbs: 65,
    fat: 22,
    tags: ['HIGH PROTEIN'],
    timestamp: 'Yesterday, 7:15 PM',
    image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&q=80&w=200&h=200',
    category: 'Dinner'
  },
  {
    id: '3',
    name: 'Greek Salad',
    calories: 210,
    protein: 8,
    carbs: 12,
    fat: 15,
    tags: ['LOW CARB', 'FIBER'],
    timestamp: 'Oct 24, 1:20 PM',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=200&h=200',
    category: 'Lunch'
  },
  {
    id: '4',
    name: 'Pepperoni Pizza',
    calories: 480,
    protein: 18,
    carbs: 55,
    fat: 24,
    tags: ['HIGH SODIUM'],
    timestamp: 'Oct 23, 8:45 PM',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=200&h=200',
    category: 'Dinner'
  }
];
