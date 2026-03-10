import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'th';

interface LanguageContextType {
    language: Language | null;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations: Record<Language, Record<string, string>> = {
    en: {
        welcome: 'Welcome to NutriScan',
        choose_language: 'Choose Language',
        get_started: 'Get Started',
        login_google: 'Sign in with Google',
        login_desc: 'Sign in to start logging your meals and tracking your nutrition journey.',
        left: 'LEFT',
        calories: 'Calories',
        daily_goal: 'Daily Goal:',
        goal_reached: 'Goal Reached',
        daily_macros: 'Daily Macros',
        details: 'Details',
        protein: 'Protein',
        carbs: 'Carbs',
        fat: 'Fat',
        recent_meals: 'Recent Meals',
        see_all: 'See All',
        no_meals_yet: 'No meals yet. Scan now!',
        cal_short: 'CAL',
        scan_failed: 'Failed to analyze image. Please try again.',
        analyzing_food: 'Analyzing food...',
        meal_history: 'Meal History',
        search_history: 'Search meal history',
        recent_scanned_food: 'RECENTLY SCANNED FOOD',
        no_meals_found: 'No meals found',
        profile: 'Profile',
        member_since_today: 'Member since Today',
        personal_info: 'PERSONAL INFO',
        edit_personal_goals: 'Edit Personal Goals',
        goals_sub: 'Weight, Activity, Calorie Goal',
        connected_devices: 'Connected Devices',
        future_feature_title: 'Coming Soon',
        future_feature_desc: 'This feature will be available in a future update.',
        usage: 'USAGE',
        active_package: 'Active Package',
        settings: 'SETTINGS',
        app_settings: 'App Settings',
        app_settings_sub: 'Notifications, Units, Language',
        app_settings_language: 'Language',
        app_settings_name: 'Display Name',
        help_support: 'Help & Support',
        help_support_sub: 'FAQ, Contact Us',
        goal_label: 'Goal:',
        cal_per_day: 'kcal/day',
        save: 'Save',
        edit: 'Edit',
        current_weight: 'Current Weight (kg)',
        target_goal: 'Target Goal',
        lose_weight: 'Lose Weight',
        maintain_weight: 'Maintain Weight',
        gain_muscle: 'Build Muscle',
        activity_level: 'Activity Level',
        sedentary: 'Sedentary',
        lightly_active: 'Lightly Active',
        moderately_active: 'Moderately Active',
        very_active: 'Very Active',
        super_active: 'Super Active',
        logout: 'Log Out',
        unknown_food: 'Unknown Food',
        loading: 'Loading...',
        confirm_discovery: 'CONFIRM DISCOVERY',
        carbs_short: 'Carbs',
        add_to_diary: 'Add to Today\'s Diary',
        onboarding_1_title: 'Let\'s get to know you.',
        onboarding_1_sub: 'This helps us personalize your calorie and macro goals.',
        your_name: 'Your Name',
        biological_sex: 'BIOLOGICAL SEX',
        contact_us_title: 'Contact Us',
        contact_email: 'Email',
        contact_line: 'Line ID',
        onboarding_2_title: 'Your measurements?',
        onboarding_2_sub: 'Used for TDEE (Total Daily Energy Expenditure) calculation.',
        age: 'AGE',
        height: 'HEIGHT',
        weight: 'WEIGHT',
        onboarding_3_title: 'What is your goal?',
        onboarding_3_sub: 'We\'ll adjust your daily intake target accordingly.',
        goal: 'GOAL',
        sedentary_desc: 'Sedentary (Little/no exercise)',
        lightly_active_desc: 'Lightly Active (1-3 days/week)',
        moderately_active_desc: 'Moderately Active (3-5 days/week)',
        very_active_desc: 'Very Active (6-7 days/week)',
        super_active_desc: 'Super Active (Physical job/training)',
        skip: 'Skip',
        next: 'Next',
        finish: 'Finish',
        yrs: 'yrs',
        cm: 'cm',
        kg: 'kg',
        nav_home: 'Home',
        nav_scan: 'Scan',
        nav_history: 'History',
        nav_stats: 'Stats',
        nav_profile: 'Profile',
        male: 'male',
        female: 'female',
    },
    th: {
        welcome: 'ยินดีต้อนรับสู่ NutriScan',
        choose_language: 'เลือกภาษา',
        get_started: 'เริ่มต้นใช้งาน',
        login_google: 'เข้าสู่ระบบด้วย Google',
        login_desc: 'เข้าสู่ระบบเพื่อเริ่มบันทึกมื้ออาหารและติดตามเป้าหมายโภชนาการของคุณ',
        left: 'เหลืออีก',
        calories: 'แคลอรี',
        daily_goal: 'เป้าหมายรายวัน:',
        goal_reached: 'เป้าหมายที่ถึง',
        daily_macros: 'สารอาหารประจำวัน',
        details: 'รายละเอียด',
        protein: 'โปรตีน',
        carbs: 'คาร์โบไฮเดรต',
        fat: 'ไขมัน',
        recent_meals: 'มื้อล่าสุด',
        see_all: 'ดูทั้งหมด',
        no_meals_yet: 'ยังไม่มีมื้ออาหาร สแกนเลย!',
        cal_short: 'แคล',
        scan_failed: 'ไม่สามารถวิเคราะห์รูปภาพได้ กรุณาลองใหม่อีกครั้ง',
        analyzing_food: 'กำลังวิเคราะห์อาหาร...',
        meal_history: 'ประวัติการกิน',
        search_history: 'ค้นหาประวัติมื้ออาหาร',
        recent_scanned_food: 'อาหารที่สแกนล่าสุด',
        no_meals_found: 'ไม่พบมื้ออาหาร',
        profile: 'โปรไฟล์',
        member_since_today: 'สมาชิกตั้งแต่ วันนี้',
        personal_info: 'ข้อมูลส่วนตัว',
        edit_personal_goals: 'แก้ไขเป้าหมายส่วนตัว',
        goals_sub: 'น้ำหนัก, กิจกรรม, เป้าหมายแคลอรี',
        connected_devices: 'อุปกรณ์ที่เชื่อมต่อ',
        future_feature_title: 'เร็วๆ นี้',
        future_feature_desc: 'ฟีเจอร์นี้จะพร้อมใช้งานในการอัปเดตครั้งต่อไป',
        usage: 'การใช้งาน',
        active_package: 'แพ็คเกจที่ใช้งาน',
        settings: 'การตั้งค่า',
        app_settings: 'ตั้งค่าแอปพลิเคชัน',
        app_settings_sub: 'การแจ้งเตือน, หน่วยวัด, ภาษา',
        app_settings_language: 'ภาษา',
        app_settings_name: 'ชื่อที่แสดง',
        help_support: 'ช่วยเหลือและสนับสนุน',
        help_support_sub: 'คำถามที่พบบ่อย, ติดต่อเรา',
        goal_label: 'เป้าหมาย:',
        cal_per_day: 'แคลอรี/วัน',
        save: 'บันทึก',
        edit: 'แก้ไข',
        current_weight: 'น้ำหนักปัจจุบัน (กก.)',
        target_goal: 'เป้าหมายเป้าหมาย',
        lose_weight: 'ลดน้ำหนัก',
        maintain_weight: 'รักษาน้ำหนัก',
        gain_muscle: 'เพิ่มกล้ามเนื้อ',
        activity_level: 'ระดับการทำกิจกรรม',
        sedentary: 'ไม่ออกกำลังกาย',
        lightly_active: 'ออกกำลังกายน้อย',
        moderately_active: 'ออกกำลังกายปานกลาง',
        very_active: 'ออกกำลังกายหนัก',
        super_active: 'ออกกำลังกายหนักมาก',
        logout: 'ออกจากระบบ',
        unknown_food: 'อาหารที่ไม่ระบุ',
        loading: 'กำลังโหลด...',
        confirm_discovery: 'ยืนยันการค้นพบ',
        carbs_short: 'คาร์บ',
        add_to_diary: 'เพิ่มลงบันทึกวันนี้',
        onboarding_1_title: 'มาทำความรู้จักคุณกัน',
        onboarding_1_sub: 'ข้อมูลนี้จะช่วยให้เราสร้างเป้าหมายแคลอรีและสารอาหารของคุณได้อย่างเหมาะสม',
        your_name: 'ชื่อของคุณ',
        biological_sex: 'เพศสภาพ',
        contact_us_title: 'ติดต่อเรา',
        contact_email: 'อีเมล',
        contact_line: 'ไอดีไลน์',
        onboarding_2_title: 'สัดส่วนของคุณ?',
        onboarding_2_sub: 'ใช้สำหรับคำนวณ TDEE (การเผาผลาญพลังงานทั้งหมดในแต่ละวัน)',
        age: 'อายุ',
        height: 'ส่วนสูง',
        weight: 'น้ำหนัก',
        onboarding_3_title: 'เป้าหมายของคุณคืออะไร?',
        onboarding_3_sub: 'เราจะปรับเป้าหมายการบริโภครายวันให้เหมาะสม',
        goal: 'เป้าหมาย',
        sedentary_desc: 'ไม่ออกกำลังกาย (ทำงานนั่งโต๊ะ)',
        lightly_active_desc: 'ออกกำลังกายน้อย (1-3 วัน/สัปดาห์)',
        moderately_active_desc: 'ออกกำลังกายปานกลาง (3-5 วัน/สัปดาห์)',
        very_active_desc: 'ออกกำลังกายหนัก (6-7 วัน/สัปดาห์)',
        super_active_desc: 'ออกกำลังกายหนักมาก (ทำงานใช้แรงงาน/ซ้อมกีฬาหนัก)',
        skip: 'ข้าม',
        next: 'ถัดไป',
        finish: 'เสร็จสิ้น',
        yrs: 'ปี',
        cm: 'ซม.',
        kg: 'กก.',
        nav_home: 'หน้าหลัก',
        nav_scan: 'สแกน',
        nav_history: 'ประวัติ',
        nav_stats: 'สถิติ',
        nav_profile: 'โปรไฟล์',
        male: 'ชาย',
        female: 'หญิง',
    }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<Language | null>(() => {
        const saved = localStorage.getItem('nutriscan_language');
        return saved ? (saved as Language) : null;
    });

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('nutriscan_language', lang);
    };

    const t = (key: string) => {
        if (!language) return key;
        return translations[language]?.[key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
