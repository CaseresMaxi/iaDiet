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
      weight: {
        history: "Historial de peso",
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
      completeSignUp: {
        motivation: "La consistencia es la clave del progreso. ¡No te rindas!",
        motivationSubtext:
          "Invierte en tu bienestar físico y mental. Cada paso, por pequeño que sea, te acerca más a tus objetivos. ¡Tú puedes!",
        gender: {
          title: "¿Cuál es tu género?",
          male: "Hombre",
          female: "Mujer",
        },
        age: "¿Qué edad tienes?",
        weight: {
          title: "¿Cuál es tu peso?",
          kg: "KG",
          lb: "LB",
        },
        height: "¿Cuál es tu altura?",
        goal: {
          title: "¿Cuál es tu objetivo?",
          loseWeight: "Perder peso",
          gainWeight: "Ganar peso",
          muscleMassGain: "Ganar masa muscular",
          shapeBody: "Definir cuerpo",
          others: "Otros",
        },
        activity: {
          title: "Nivel de actividad física",
          sedentary: "Sedentario",
          sedentaryDesc: "Poco o ningún ejercicio",
          light: "Ligero",
          lightDesc: "Ejercicio/deportes ligeros 1-3 días/semana",
          moderate: "Moderado",
          moderateDesc: "Ejercicio/deportes moderados 3-5 días/semana",
          active: "Activo",
          activeDesc: "Ejercicio/deportes intensos 6-7 días/semana",
          veryActive: "Muy activo",
          veryActiveDesc: "Ejercicio/deportes intensos 2 veces al día",
        },
        profile: {
          title: "Completa tu perfil",
          username: "Nombre de usuario",
          email: "Correo electrónico",
          phoneNumber: "Número de teléfono",
        },
        buttons: {
          continue: "Continuar",
          finish: "Finalizar",
          back: "Atrás",
        },
        validation: {
          usernameRequired: "El nombre de usuario es requerido",
          emailRequired: "El correo electrónico es requerido",
          emailInvalid: "Ingresa un correo electrónico válido",
          phoneRequired: "El número de teléfono es requerido",
          phoneInvalid: "Ingresa un número de teléfono válido",
        },
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
      weight: {
        history: "Weight History",
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
      completeSignUp: {
        motivation: "Consistency Is the Key To progress. Don't Give Up!",
        motivationSubtext:
          "Invest in your physical and mental well-being. Every step, no matter how small, brings you closer to your goals. You've got this!",
        gender: {
          title: "What's Your Gender",
          male: "Male",
          female: "Female",
        },
        age: "How Old Are You?",
        weight: {
          title: "What's Your Weight?",
          kg: "KG",
          lb: "LB",
        },
        height: "What's Your Height?",
        goal: {
          title: "What Is Your Goal?",
          loseWeight: "Lose Weight",
          gainWeight: "Gain weight",
          muscleMassGain: "Muscle Mass Gain",
          shapeBody: "Shape body",
          others: "Others",
        },
        activity: {
          title: "Physical Activity Level",
          sedentary: "Sedentary",
          sedentaryDesc: "Little or no exercise",
          light: "Light",
          lightDesc: "Light exercise/sports 1-3 days/week",
          moderate: "Moderate",
          moderateDesc: "Moderate exercise/sports 3-5 days/week",
          active: "Active",
          activeDesc: "Hard exercise/sports 6-7 days/week",
          veryActive: "Very Active",
          veryActiveDesc: "Hard exercise/sports 2x a day",
        },
        profile: {
          title: "Fill Your Profile",
          username: "Username",
          email: "Email",
          phoneNumber: "Phone Number",
        },
        buttons: {
          continue: "Continue",
          finish: "Finish",
          back: "Back",
        },
        validation: {
          usernameRequired: "Username is required",
          emailRequired: "Email is required",
          emailInvalid: "Enter a valid email address",
          phoneRequired: "Phone Number is required",
          phoneInvalid: "Enter a valid phone number",
        },
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
