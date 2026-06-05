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

const rawMealPlan = {
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
      "calories": "450-550"
    },
    {
      "name": "Rice, Stew & Chicken",
      "calories": "500"
    },
    {
      "name": "Rice & Beans with Chicken",
      "calories": "500-550"
    },
    {
      "name": "Brown Rice Bowl",
      "calories": "450-550"
    },
    {
      "name": "Pasta & Lean Meat Sauce",
      "calories": "500"
    },
    {
      "name": "Pasta & Tuna",
      "calories": "450-550"
    },
    {
      "name": "Pasta Salad",
      "calories": "450-550"
    },
    {
      "name": "Chicken Wrap",
      "calories": "450-550"
    },
    {
      "name": "Tuna Sandwich & Side Salad",
      "calories": "450-500"
    },
    {
      "name": "Turkey Sandwich",
      "calories": "350-450"
    },
    {
      "name": "Moin Moin & Eggs",
      "calories": "400-500"
    },
    {
      "name": "Moin Moin & Rice",
      "calories": "450-550"
    },
    {
      "name": "Beans & Plantain",
      "calories": "500-550"
    },
    {
      "name": "Beans Porridge & Egg",
      "calories": "450-550"
    },
    {
      "name": "Plantain, Fish & Vegetables",
      "calories": "450-550"
    },
    {
      "name": "Baked Potato & Tuna",
      "calories": "400-500"
    },
    {
      "name": "Roast Potatoes & Chicken",
      "calories": "450-550"
    },
    {
      "name": "Chicken Salad Bowl",
      "calories": "300-450"
    },
    {
      "name": "Tuna Salad Bowl",
      "calories": "350-450"
    },
    {
      "name": "Mediterranean Bowl",
      "calories": "450-550"
    }
  ],
  "dinner": [
    {
      "name": "Chicken, Rice & Vegetables",
      "calories": "450-550"
    },
    {
      "name": "Fish, Potatoes & Vegetables",
      "calories": "500"
    },
    {
      "name": "Pasta with Meat Sauce",
      "calories": "500"
    },
    {
      "name": "Stir Fry & Rice",
      "calories": "500"
    },
    {
      "name": "Nigerian Stew & Rice",
      "calories": "450-600"
    },
    {
      "name": "Family Dinner (Balanced Plate)",
      "calories": "400-600"
    },
    {
      "name": "Wildcard Dinner",
      "calories": "400-600"
    }
  ],
  "snacks": [
    {
      "name": "Greek Yogurt",
      "calories": "120-150"
    },
    {
      "name": "Protein Shake",
      "calories": "120-150"
    },
    {
      "name": "2 Boiled Eggs",
      "calories": "140"
    },
    {
      "name": "Tuna Pouch",
      "calories": "80-120"
    },
    {
      "name": "Apple",
      "calories": "95"
    },
    {
      "name": "Banana",
      "calories": "100"
    },
    {
      "name": "Orange",
      "calories": "60"
    },
    {
      "name": "Watermelon",
      "calories": "80-100"
    },
    {
      "name": "Air-Popped Popcorn",
      "calories": "100"
    },
    {
      "name": "Carrot Sticks",
      "calories": "50"
    },
    {
      "name": "Cucumber Sticks",
      "calories": "20"
    },
    {
      "name": "Roasted Chickpeas",
      "calories": "120-180"
    },
    {
      "name": "Roasted Plantain",
      "calories": "120-180"
    },
    {
      "name": "Roasted Corn",
      "calories": "150-200"
    },
    {
      "name": "Groundnuts (Portion Controlled)",
      "calories": "90-120"
    }
  ]
};

// Add placeholder items to meals that lack them
const addPlaceholders = (meals: Meal[]) => {
  return meals.map(meal => {
    if (!meal.items || meal.items.length === 0) {
      return {
        ...meal,
        items: [
          "Placeholder Item 1 (200 cal)",
          "Placeholder Item 2 (300 cal)"
        ]
      };
    }
    return meal;
  });
};

export const mealPlan: MealPlan = {
  ...rawMealPlan,
  lunch: addPlaceholders(rawMealPlan.lunch),
  dinner: addPlaceholders(rawMealPlan.dinner),
  snacks: addPlaceholders(rawMealPlan.snacks)
};
