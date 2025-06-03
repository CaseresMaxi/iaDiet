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
      chat: {
        error: {
          message: "Ha ocurrido un error al procesar tu mensaje",
          retry: "¿Deseas intentarlo de nuevo?",
          imageError: "Ha ocurrido un error al procesar la imagen",
          networkError:
            "Error de conexión. Por favor, verifica tu conexión a internet",
        },
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
          privacyPolicy: "Política de Privacidad",
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
      profile: {
        privacyPolicy: "Política de Privacidad",
        deleteAccount: {
          title: "Eliminar Cuenta",
          description:
            "¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.",
          warning:
            "Se eliminarán permanentemente todos tus datos, incluidos registros de comidas, progreso y configuraciones.",
          confirm: "Eliminar cuenta",
          button: "Eliminar Cuenta",
          success: "Tu cuenta ha sido eliminada exitosamente",
          error: "Ocurrió un error al eliminar la cuenta. Inténtalo de nuevo.",
        },
      },
      forgotPassword: {
        title: "Recuperar Contraseña",
        emailStep:
          "Te enviaremos un código de verificación a tu correo electrónico para que puedas restablecer tu contraseña",
        verificationStep:
          "Ingresa el código de verificación que enviamos a {{email}} y tu nueva contraseña",
        emailLabel: "Correo electrónico",
        emailPlaceholder: "Email",
        emailRequired: "Por favor ingresa un email válido",
        codeLabel: "Código",
        codePlaceholder: "Código de verificación",
        codeRequired: "El código es requerido",
        newPasswordLabel: "Nueva contraseña",
        newPasswordPlaceholder: "Nueva contraseña",
        newPasswordRequired: "La contraseña debe tener al menos 6 caracteres",
        confirmPasswordLabel: "Confirmar contraseña",
        confirmPasswordPlaceholder: "Confirmar contraseña",
        confirmPasswordRequired: "Por favor confirma tu contraseña",
        sendCodeButton: "Enviar código de verificación",
        resetPasswordButton: "Restablecer contraseña",
        backToLogin: "Volver al inicio de sesión",
        passwordMismatch: "Las contraseñas no coinciden",
        errorSendingCode:
          "Error al enviar el código. Por favor intenta nuevamente.",
        errorResettingPassword:
          "Error al restablecer la contraseña. Por favor intenta nuevamente.",
        successMessage: "Contraseña actualizada exitosamente",
      },
      privacy: {
        title: "Política de Privacidad",
        introduction:
          "En iaDiet, valoramos tu privacidad y nos comprometemos a proteger tu información personal. Esta política describe cómo recopilamos, utilizamos y protegemos tus datos cuando utilizas nuestra aplicación de nutrición y seguimiento dietético.",
        lastUpdated: "Última actualización:",
        sections: {
          dataCollection: {
            title: "Información que Recopilamos",
            content:
              "• Información personal (nombre, edad, peso, altura)\n• Datos de actividad física y objetivos de salud\n• Información nutricional y registros de comidas\n• Fotos de alimentos y análisis nutricional\n• Datos de uso de la aplicación\n• Información del dispositivo y técnica",
          },
          dataUsage: {
            title: "Cómo Utilizamos tu Información",
            content:
              "• Personalizar tu experiencia nutricional\n• Calcular y recomendar planes de dieta\n• Analizar fotos de alimentos para determinar información nutricional\n• Generar estadísticas y gráficos de progreso\n• Mejorar nuestros servicios y funcionalidades\n• Enviar notificaciones relevantes sobre tu progreso",
          },
          dataSharing: {
            title: "Compartir Información",
            content:
              "• No vendemos tu información personal a terceros\n• Podemos compartir datos agregados y anónimos para investigación\n• Utilizamos servicios de terceros confiables para procesamiento de datos\n• Solo compartimos información cuando sea legalmente requerido\n• Los datos pueden ser compartidos con tu consentimiento explícito",
          },
          dataSecurity: {
            title: "Seguridad de Datos",
            content:
              "• Utilizamos encriptación para proteger tus datos\n• Almacenamiento seguro en servidores protegidos\n• Acceso restringido solo a personal autorizado\n• Auditorías regulares de seguridad\n• Copias de seguridad automáticas para prevenir pérdida de datos",
          },
          userRights: {
            title: "Tus Derechos",
            content:
              "• Acceder a tu información personal\n• Corregir datos inexactos o incompletos\n• Eliminar tu cuenta y todos los datos asociados\n• Exportar tus datos en formato legible\n• Retirar consentimiento para procesamiento de datos\n• Presentar quejas ante autoridades de protección de datos",
          },
          dataRetention: {
            title: "Retención de Datos",
            content:
              "• Mantenemos tus datos mientras tu cuenta esté activa\n• Puedes solicitar eliminación de datos en cualquier momento\n• Algunos datos pueden conservarse por requisitos legales\n• Datos anonimizados pueden usarse para investigación a largo plazo\n• Backup automático se elimina según política de retención",
          },
          cookies: {
            title: "Cookies y Tecnologías de Seguimiento",
            content:
              "• Utilizamos cookies para mejorar la experiencia del usuario\n• Tecnologías de análisis para entender el uso de la aplicación\n• Puedes controlar las cookies en la configuración de tu navegador\n• Algunas funciones pueden requerir cookies para funcionar correctamente",
          },
          minors: {
            title: "Menores de Edad",
            content:
              "• Nuestra aplicación está dirigida a usuarios mayores de 13 años\n• Requerimos consentimiento parental para menores de 18 años\n• No recopilamos intencionalmente información de menores de 13 años\n• Si detectamos datos de menores, los eliminaremos inmediatamente",
          },
          policyChanges: {
            title: "Cambios en la Política",
            content:
              "• Podemos actualizar esta política de privacidad ocasionalmente\n• Te notificaremos sobre cambios significativos\n• La fecha de última actualización se indica al final del documento\n• El uso continuado implica aceptación de los cambios",
          },
          contact: {
            title: "Contacto",
            content:
              "• Para preguntas sobre privacidad, contacta: privacy@iadiet.com\n• Para ejercer tus derechos: support@iadiet.com\n• Para reportar problemas de seguridad: security@iadiet.com\n• Para consultas generales: hello@iadiet.com",
          },
        },
        footer: {
          title: "¿Tienes preguntas?",
          content:
            "Si tienes alguna pregunta sobre esta política de privacidad o sobre cómo manejamos tus datos, no dudes en contactarnos.",
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
      chat: {
        error: {
          message: "An error occurred while processing your message",
          retry: "Would you like to try again?",
          imageError: "An error occurred while processing the image",
          networkError:
            "Connection error. Please check your internet connection",
        },
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
          privacyPolicy: "Privacy Policy",
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
      profile: {
        privacyPolicy: "Privacy Policy",
        deleteAccount: {
          title: "Delete Account",
          description:
            "Are you sure you want to delete your account? This action cannot be undone.",
          warning:
            "All your data will be permanently deleted, including meal records, progress, and settings.",
          confirm: "Yes, delete account",
          button: "Delete Account",
          success: "Your account has been successfully deleted",
          error:
            "An error occurred while deleting the account. Please try again.",
        },
      },
      forgotPassword: {
        title: "Password Recovery",
        emailStep:
          "We will send a verification code to your email so you can reset your password",
        verificationStep:
          "Enter the verification code we sent to {{email}} and your new password",
        emailLabel: "Email",
        emailPlaceholder: "Email",
        emailRequired: "Please enter a valid email",
        codeLabel: "Code",
        codePlaceholder: "Verification code",
        codeRequired: "Code is required",
        newPasswordLabel: "New password",
        newPasswordPlaceholder: "New password",
        newPasswordRequired: "Password must be at least 6 characters",
        confirmPasswordLabel: "Confirm password",
        confirmPasswordPlaceholder: "Confirm password",
        confirmPasswordRequired: "Please confirm your password",
        sendCodeButton: "Send verification code",
        resetPasswordButton: "Reset password",
        backToLogin: "Back to login",
        passwordMismatch: "Passwords do not match",
        errorSendingCode: "Error sending code. Please try again.",
        errorResettingPassword: "Error resetting password. Please try again.",
        successMessage: "Password successfully updated",
      },
      privacy: {
        title: "Privacy Policy",
        introduction:
          "At iaDiet, we value your privacy and are committed to protecting your personal information. This policy describes how we collect, use, and protect your data when you use our nutrition and diet tracking application.",
        lastUpdated: "Last updated:",
        sections: {
          dataCollection: {
            title: "Information We Collect",
            content:
              "• Personal information (name, age, weight, height)\n• Physical activity data and health goals\n• Nutritional information and meal records\n• Food photos and nutritional analysis\n• App usage data\n• Device and technical information",
          },
          dataUsage: {
            title: "How We Use Your Information",
            content:
              "• Personalize your nutritional experience\n• Calculate and recommend diet plans\n• Analyze food photos to determine nutritional information\n• Generate progress statistics and charts\n• Improve our services and functionalities\n• Send relevant notifications about your progress",
          },
          dataSharing: {
            title: "Information Sharing",
            content:
              "• We do not sell your personal information to third parties\n• We may share aggregated and anonymous data for research\n• We use trusted third-party services for data processing\n• We only share information when legally required\n• Data may be shared with your explicit consent",
          },
          dataSecurity: {
            title: "Data Security",
            content:
              "• We use encryption to protect your data\n• Secure storage on protected servers\n• Restricted access only to authorized personnel\n• Regular security audits\n• Automatic backups to prevent data loss",
          },
          userRights: {
            title: "Your Rights",
            content:
              "• Access your personal information\n• Correct inaccurate or incomplete data\n• Delete your account and all associated data\n• Export your data in readable format\n• Withdraw consent for data processing\n• File complaints with data protection authorities",
          },
          dataRetention: {
            title: "Data Retention",
            content:
              "• We keep your data while your account is active\n• You can request data deletion at any time\n• Some data may be retained for legal requirements\n• Anonymized data may be used for long-term research\n• Automatic backup is deleted according to retention policy",
          },
          cookies: {
            title: "Cookies and Tracking Technologies",
            content:
              "• We use cookies to improve user experience\n• Analytics technologies to understand app usage\n• You can control cookies in your browser settings\n• Some features may require cookies to function properly",
          },
          minors: {
            title: "Minors",
            content:
              "• Our application is intended for users over 13 years old\n• We require parental consent for minors under 18\n• We do not intentionally collect information from children under 13\n• If we detect data from minors, we will delete it immediately",
          },
          policyChanges: {
            title: "Policy Changes",
            content:
              "• We may update this privacy policy occasionally\n• We will notify you about significant changes\n• The last update date is indicated at the end of the document\n• Continued use implies acceptance of changes",
          },
          contact: {
            title: "Contact",
            content:
              "• For privacy questions, contact: privacy@iadiet.com\n• To exercise your rights: support@iadiet.com\n• To report security issues: security@iadiet.com\n• For general inquiries: hello@iadiet.com",
          },
        },
        footer: {
          title: "Have Questions?",
          content:
            "If you have any questions about this privacy policy or how we handle your data, please don't hesitate to contact us.",
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
