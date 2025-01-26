import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Importamos las traducciones
const resources = {
  es: {
    translation: {
      greeting: "¡Hola, {{username}}!",
      today: "Hoy",
      macros: {
        proteins: "proteínas",
        fats: "grasas",
        carbs: "carbohidratos",
        calories: "calorías",
      },
      ingests: {
        title: "Tus últimas comidas",
        add: "+",
      },
      tutorial: {
        start: "Tutorial",
        header: "Aquí puedes ver tu nombre de usuario y acceder al perfil.",
        macros: "Aqui puedes ver los macros y las calorias que consumiste hoy",
        today: "Aqui podras ver las comidas que has consumido hoy.",
        add: "Aqui podras agregar rapidamente una comida a tu dieta hablando con nuestro chat.",
        addButton: "Aquí puedes agregar una nueva comida a tu registro",
        historyList:
          "Aquí puedes ver el historial de todas tus comidas organizadas por fecha",
      },
      validation: {
        required: {
          foodName: "El nombre de la comida es obligatorio",
          calories: "Las calorías son obligatorias",
          proteins: "Las proteínas son obligatorias",
          carbs: "Los carbohidratos son obligatorios",
          fats: "Las grasas son obligatorias",
        },
      },
      diet: {
        title: "Dieta",
        add_meal: "Agregar comida",
        meal_plan: "Plan de comidas",
        categories: {
          breakfast: "Desayuno",
          lunch: "Almuerzo",
          dinner: "Cena",
          snacks: "Snacks",
        },
      },
      tracker: {
        title: "Seguimiento",
        progress: "Progreso",
        goals: "Objetivos",
        statistics: "Estadísticas",
        weekly: "Semanal",
        monthly: "Mensual",
      },
      modal: {
        add: {
          title: "Agregar alimento",
          food_name: "Nombre del alimento",
          calories: "Calorías",
          proteins: "Proteínas (g)",
          carbs: "Carbohidratos (g)",
          fats: "Grasas (g)",
          save: "Guardar",
          cancel: "Cancelar",
          take_photo: "Tomar foto",
          select_photo: "Seleccionar foto",
          remove_photo: "Eliminar foto",
        },
      },
      common: {
        loading: "Cargando...",
        error: "Ha ocurrido un error",
        retry: "Reintentar",
        save: "Guardar",
        cancel: "Cancelar",
        delete: "Eliminar",
        edit: "Editar",
        back: "Volver",
      },
    },
  },
  en: {
    translation: {
      greeting: "Hello, {{username}}!",
      today: "Today",
      macros: {
        proteins: "proteins",
        fats: "fats",
        carbs: "carbs",
        calories: "calories",
      },
      ingests: {
        title: "Your last ingests",
        add: "+",
      },
      tutorial: {
        start: "Tutorial",
        header: "Here you can see your username and access your profile.",
        macros: "Here you can see the macros and calories you consumed today",
        today: "Here you can see the food you have eaten today.",
        add: "Here you can quickly add food to your diet by talking to our chat.",
        diet: {
          mealPlan: "Here you can see your meal plan organized by categories",
          meals:
            "Here you can see all your planned meals with details and instructions",
          addMeal:
            "Use this button to create a new personalized meal plan with our AI",
        },
      },
      validation: {
        required: {
          foodName: "Food name is required",
          calories: "Calories are required",
          proteins: "Proteins are required",
          carbs: "Carbs are required",
          fats: "Fats are required",
        },
      },
      diet: {
        title: "Diet",
        add_meal: "Add meal",
        meal_plan: "Meal plan",
        categories: {
          breakfast: "Breakfast",
          lunch: "Lunch",
          dinner: "Dinner",
          snacks: "Snacks",
        },
      },
      tracker: {
        title: "Tracker",
        progress: "Progress",
        goals: "Goals",
        statistics: "Statistics",
        weekly: "Weekly",
        monthly: "Monthly",
      },
      modal: {
        add: {
          title: "Add food",
          food_name: "Food name",
          calories: "Calories",
          proteins: "Proteins (g)",
          carbs: "Carbs (g)",
          fats: "Fats (g)",
          save: "Save",
          cancel: "Cancel",
          take_photo: "Take photo",
          select_photo: "Select photo",
          remove_photo: "Remove photo",
        },
      },
      common: {
        loading: "Loading...",
        error: "An error has occurred",
        retry: "Retry",
        save: "Save",
        cancel: "Cancel",
        delete: "Delete",
        edit: "Edit",
        back: "Back",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "es", // idioma por defecto
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // react ya se encarga de escapar
  },
});

export default i18n;
