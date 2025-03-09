# iaDiet

iaDiet es una aplicación móvil desarrollada con React Native/Expo que te permite rastrear tu dieta diaria con la ayuda de inteligencia artificial.

## Descripción

iaDiet te permite llevar un registro detallado de tus comidas y su información nutricional. La aplicación utiliza inteligencia artificial para analizar imágenes de alimentos y extraer automáticamente datos nutricionales como calorías, proteínas, carbohidratos y grasas. Además, cuenta con un sistema de chat integrado para resolver dudas sobre nutrición y alimentación.

### Características principales

- **Análisis de imágenes con IA**: Toma fotos de tus alimentos y obtén información nutricional automáticamente
- **Registro de ingesta diaria**: Guarda un historial completo de tus comidas
- **Sistema de chat**: Consulta dudas sobre nutrición con un asistente virtual
- **Tutorial integrado**: Guía paso a paso para aprender a usar la aplicación
- **Soporte multiidioma**: Disponible en varios idiomas

## Requisitos previos

- Node.js (v14 o superior)
- npm o yarn
- Expo CLI (`npm install -g expo-cli`)
- Una cuenta en Expo para pruebas en dispositivos físicos (opcional)

## Instalación

1. Clona este repositorio:
```bash
git clone https://github.com/tu-usuario/iaDiet.git
cd iaDiet
```

2. Instala las dependencias:
```bash
npm install
# o con yarn
yarn install
```

3. Configura las variables de entorno (si aplica):
Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
```
API_URL=tu_url_api
# Otras variables necesarias
```

## Ejecución

### Desarrollo local

Para iniciar el servidor de desarrollo:

```bash
npm start
# o
expo start
```

Esto abrirá la interfaz de desarrollo de Expo en tu navegador. Desde ahí podrás:
- Ejecutar la aplicación en un emulador de iOS o Android
- Escanear el código QR con la app Expo Go en tu dispositivo físico
- Ejecutar en navegador web (algunas funciones como la cámara pueden tener limitaciones)

### Build para web

Para generar un build de la aplicación para plataforma web, ejecuta:

```bash
npx expo export --platform web
```

Este comando generará una versión optimizada de la aplicación web que podrás desplegar en cualquier servicio de hosting.

### Comandos adicionales

```bash
# Ejecutar en Android
npm run android

# Ejecutar en iOS
npm run ios

# Ejecutar pruebas
npm test
```

## Estructura del proyecto

```
iaDiet/
├── app/            # Código principal de la aplicación
├── Components/     # Componentes reutilizables
├── services/       # Servicios para API y funcionalidades
├── styles/         # Estilos y temas
├── utils/          # Utilidades y funciones auxiliares
└── assets/         # Imágenes, fuentes y otros recursos
```

## Tecnologías utilizadas

- React Native / Expo
- Expo Router
- React Hook Form con Yup para validaciones
- Zustand para manejo de estado
- i18next para internacionalización
- Expo Image Picker para manejo de cámara y galería
- React Native Copilot para tutoriales interactivos

## Licencia

Este proyecto está licenciado bajo [incluir licencia] 