export interface Meal {
  name: string;
  calories: string;
  items?: string[];
}

export interface MealPlan {
  calorie_target_per_day: string;
  breakfast: Meal[];
  lunch: Meal[];
  dinner: Meal[];
  snacks: Meal[];
}

export const mealPlan: MealPlan = {
  "calorie_target_per_day": "1800-1900",
  "breakfast": [
    {
      "name": "Baked Beans & Toast",
      "calories": "350-400",
      "items": [
        "Baked beans (170 cal / 200g)",
        "Wholemeal toast (180 cal / 2 slices)",
        "Tea (0-20 cal)"
      ]
    },
    {
      "name": "Baked Beans, Eggs & Toast",
      "calories": "450-500",
      "items": [
        "Baked beans (170 cal / 200g)",
        "2 eggs (140 cal)",
        "Wholemeal toast (180 cal / 2 slices)"
      ]
    },
    {
      "name": "Oats & Tea",
      "calories": "250-350",
      "items": [
        "Oats (150 cal / 40g dry)",
        "Milk (50-80 cal)",
        "Tea (0-20 cal)"
      ]
    },
    {
      "name": "Greek Yogurt Bowl",
      "calories": "370",
      "items": [
        "Greek yogurt (120 cal / 200g)",
        "Oats (150 cal / 40g)",
        "Banana (100 cal)"
      ]
    },
    {
      "name": "Overnight Oats",
      "calories": "300-400",
      "items": [
        "Oats (150 cal / 40g)",
        "Apple (95 cal)",
        "Milk (50-80 cal)"
      ]
    },
    {
      "name": "Weetabix & Banana",
      "calories": "320-400",
      "items": [
        "Weetabix (140 cal / 2 biscuits)",
        "Milk (80 cal)",
        "Banana (100 cal)"
      ]
    },
    {
      "name": "Breakfast Wrap",
      "calories": "360-450",
      "items": [
        "Wholemeal tortilla (180 cal)",
        "2 scrambled eggs (140 cal)",
        "Tomatoes & onions (30 cal)",
        "Hot sauce (10 cal)"
      ]
    },
    {
      "name": "Potato & Eggs",
      "calories": "320-450",
      "items": [
        "Sweet potato (180 cal / 250g)",
        "2 eggs (140 cal)",
        "Tea (0-20 cal)"
      ]
    },
    {
      "name": "Moin Moin & Egg",
      "calories": "320-400",
      "items": [
        "Moin moin (250-300 cal)",
        "Boiled egg (70 cal)",
        "Tea (0-20 cal)"
      ]
    },
    {
      "name": "Akara & Tea",
      "calories": "400-450",
      "items": [
        "Akara (350-450 cal)",
        "Tea (0-20 cal)"
      ]
    }
  ],
  "lunch": [
    {
      "name": "Jollof Rice & Chicken",
      "calories": "450-550",
      "items": [
        "Jollof rice (300 cal / 250g)",
        "Chicken breast (165 cal / 150g)"
      ]
    },
    {
      "name": "Rice, Stew & Chicken",
      "calories": "500",
      "items": [
        "Rice (200 cal / 150g cooked)",
        "Chicken stew (250 cal / serving)",
        "Vegetables (50 cal)"
      ]
    },
    {
      "name": "Rice & Beans with Chicken",
      "calories": "500-550",
      "items": [
        "Rice (200 cal / 150g cooked)",
        "Beans (180 cal / 150g)",
        "Chicken breast (165 cal / 150g)"
      ]
    },
    {
      "name": "Brown Rice Bowl",
      "calories": "450-550",
      "items": [
        "Brown rice (220 cal / 150g cooked)",
        "Chicken breast (165 cal / 150g)",
        "Mixed vegetables (50 cal)"
      ]
    },
    {
      "name": "Pasta & Lean Meat Sauce",
      "calories": "500",
      "items": [
        "Pasta (300 cal)",
        "Lean beef/turkey sauce (200 cal)"
      ]
    },
    {
      "name": "Pasta & Tuna",
      "calories": "450-550",
      "items": [
        "Pasta (300 cal)",
        "Tuna (120 cal)",
        "Vegetables (50 cal)"
      ]
    },
    {
      "name": "Pasta Salad",
      "calories": "450-550",
      "items": [
        "Pasta (250 cal)",
        "Chicken breast (165 cal)",
        "Vegetables (50 cal)"
      ]
    },
    {
      "name": "Chicken Wrap",
      "calories": "450-550",
      "items": [
        "Wholemeal wrap (180 cal)",
        "Chicken breast (165 cal)",
        "Salad (30 cal)"
      ]
    },
    {
      "name": "Tuna Sandwich & Side Salad",
      "calories": "450-500",
      "items": [
        "Wholemeal bread (180 cal)",
        "Tuna (120 cal)",
        "Light mayo (50 cal)",
        "Side salad (30 cal)"
      ]
    },
    {
      "name": "Turkey Sandwich",
      "calories": "350-450",
      "items": [
        "Wholemeal bread (180 cal)",
        "Turkey (120 cal)",
        "Carrot sticks (50 cal)"
      ]
    },
    {
      "name": "Moin Moin & Eggs",
      "calories": "400-500",
      "items": [
        "Moin moin (250-300 cal)",
        "2 eggs (140 cal)"
      ]
    },
    {
      "name": "Moin Moin & Rice",
      "calories": "450-550",
      "items": [
        "Moin moin (250-300 cal)",
        "Rice (200 cal)"
      ]
    },
    {
      "name": "Beans & Plantain",
      "calories": "500-550",
      "items": [
        "Beans (250-300 cal)",
        "Plantain (180-220 cal)"
      ]
    },
    {
      "name": "Beans Porridge & Egg",
      "calories": "450-550",
      "items": [
        "Beans porridge (350-450 cal)",
        "Boiled egg (70 cal)"
      ]
    },
    {
      "name": "Plantain, Fish & Vegetables",
      "calories": "450-550",
      "items": [
        "Plantain (180 cal / 150g)",
        "Grilled fish (200 cal / 150g)",
        "Vegetables (50 cal)"
      ]
    },
    {
      "name": "Baked Potato & Tuna",
      "calories": "400-500",
      "items": [
        "Baked potato (200 cal / 300g)",
        "Tuna (120 cal)",
        "Salad (30 cal)",
        "Light mayo/yogurt (50 cal)"
      ]
    },
    {
      "name": "Roast Potatoes & Chicken",
      "calories": "450-550",
      "items": [
        "Roast potatoes (250 cal / 250g)",
        "Chicken breast (165 cal)",
        "Green beans (35 cal)"
      ]
    },
    {
      "name": "Chicken Salad Bowl",
      "calories": "300-450",
      "items": [
        "Chicken breast (165 cal)",
        "Boiled egg (70 cal)",
        "Salad leaves (20 cal)",
        "Light dressing (50 cal)"
      ]
    },
    {
      "name": "Tuna Salad Bowl",
      "calories": "350-450",
      "items": [
        "Tuna (120 cal / 1 can)",
        "Chickpeas (130 cal / 100g)",
        "Mixed vegetables (50 cal / 150g)",
        "Light dressing (50 cal)"
      ]
    },
    {
      "name": "Mediterranean Bowl",
      "calories": "450-550",
      "items": [
        "Chicken breast (165 cal)",
        "Cucumber (15 cal)",
        "Tomatoes (25 cal)",
        "Rice (200 cal)",
        "Light dressing (50 cal)"
      ]
    }
  ],
  "dinner": [
    {
      "name": "Chicken, Rice & Vegetables",
      "calories": "450-550",
      "items": [
        "Chicken breast (165 cal / 150g)",
        "Rice (200 cal / 150g cooked)",
        "Vegetables (50 cal / 150g)"
      ]
    },
    {
      "name": "Fish, Potatoes & Vegetables",
      "calories": "500",
      "items": [
        "Grilled fish (200 cal / 150g)",
        "Potatoes (250 cal / 250g)",
        "Vegetables (50 cal)"
      ]
    },
    {
      "name": "Pasta with Meat Sauce",
      "calories": "500",
      "items": [
        "Pasta (300 cal / serving)",
        "Lean meat sauce (200 cal)"
      ]
    },
    {
      "name": "Stir Fry & Rice",
      "calories": "500",
      "items": [
        "Chicken or beef (200 cal)",
        "Rice (200 cal)",
        "Vegetables (100 cal)"
      ]
    },
    {
      "name": "Nigerian Stew & Rice",
      "calories": "450-600",
      "items": [
        "Rice (200 cal)",
        "Stew (250-350 cal)"
      ]
    },
    {
      "name": "Family Dinner (Balanced Plate)",
      "calories": "400-600",
      "items": [
        "Protein (150-250 cal)",
        "Carb (150-250 cal)",
        "Vegetables (50-100 cal)"
      ]
    },
    {
      "name": "Wildcard Dinner",
      "calories": "400-600",
      "items": [
        "Assume balanced meal with protein, carbs and vegetables"
      ]
    }
  ],
  "snacks": [
    {
      "name": "Greek Yogurt",
      "calories": "120-150",
      "items": [
        "Greek yogurt (120-150 cal / 200g)"
      ]
    },
    {
      "name": "Protein Shake",
      "calories": "120-150",
      "items": [
        "Protein powder (120-150 cal / 1 scoop)"
      ]
    },
    {
      "name": "2 Boiled Eggs",
      "calories": "140",
      "items": [
        "Eggs (140 cal / 2 eggs)"
      ]
    },
    {
      "name": "Tuna Pouch",
      "calories": "80-120",
      "items": [
        "Tuna (80-120 cal / pouch)"
      ]
    },
    {
      "name": "Apple",
      "calories": "95",
      "items": [
        "Apple (95 cal / medium)"
      ]
    },
    {
      "name": "Banana",
      "calories": "100",
      "items": [
        "Banana (100 cal)"
      ]
    },
    {
      "name": "Orange",
      "calories": "60",
      "items": [
        "Orange (60 cal)"
      ]
    },
    {
      "name": "Watermelon",
      "calories": "80-100",
      "items": [
        "Watermelon (80-100 cal / large serving)"
      ]
    },
    {
      "name": "Air-Popped Popcorn",
      "calories": "100",
      "items": [
        "Large bowl popcorn (100 cal)"
      ]
    },
    {
      "name": "Carrot Sticks",
      "calories": "50",
      "items": [
        "Carrots (50 cal / large portion)"
      ]
    },
    {
      "name": "Cucumber Sticks",
      "calories": "20",
      "items": [
        "Cucumber (20 cal / large portion)"
      ]
    },
    {
      "name": "Roasted Chickpeas",
      "calories": "120-180",
      "items": [
        "Roasted chickpeas (120-180 cal / serving)"
      ]
    },
    {
      "name": "Roasted Plantain",
      "calories": "120-180",
      "items": [
        "Small portion roasted plantain (120-180 cal)"
      ]
    },
    {
      "name": "Roasted Corn",
      "calories": "150-200",
      "items": [
        "Roasted corn (150-200 cal)"
      ]
    },
    {
      "name": "Groundnuts (Portion Controlled)",
      "calories": "90-120",
      "items": [
        "Groundnuts (90-120 cal / 15-20g)"
      ]
    }
  ]
};
