# Blacrò

Blacrò es un estudio creativo integral cuyo sitio web fue construido con **Next.js 15** y **TypeScript**. Este repositorio contiene el código fuente completo de la página, incluyendo su portfolio de proyectos, secciones informativas y un formulario de contacto que envía correos vía API.

## Características principales

- **Next.js 15 (App Router)** con soporte para rutas dinámicas y generación de páginas estáticas.
- **Tailwind CSS** para estilos utilitarios junto con hojas de estilo globales en `src/app/globals.css`.
- Animaciones fluidas gracias a **framer-motion**.
- Portfolio gestionado mediante archivos de datos en `data/`, donde se describen los proyectos con imágenes, servicios y contenido adicional.
- Formulario de contacto validado con **react-hook-form** y **zod** que utiliza un endpoint API (`src/app/api/contact/route.ts`) para enviar correos mediante **nodemailer**.
- Componentes reutilizables (hero, grid, carruseles, etc.) ubicados en `src/app/components`.

## Instalación

1. Clona el repositorio.
2. Instala las dependencias con `npm install` (o `yarn`, `pnpm`).
3. Crea un archivo `.env.local` con tus credenciales SMTP para que el formulario de contacto funcione:

```env
SMTP_HOST=...
SMTP_PORT=...
SMTP_SECURE=false
SMTP_USER=...
SMTP_PASSWORD=...
```

4. Inicia el entorno de desarrollo con:

```bash
npm run dev
```

El sitio estará disponible en [http://localhost:3000](http://localhost:3000).

## Estructura del proyecto

- `src/app` – Páginas y componentes principales de la aplicación.
  - `about`, `contact`, `portfolio` y `project/[slug]` implementan las distintas secciones.
  - `components` contiene elementos como la barra de navegación, footer, carruseles y utilidades.
- `data` – Archivos TypeScript que describen proyectos, tipos y textos de la sección “about”.
- `public` – Recursos estáticos como imágenes y logos.

## Comandos útiles

- `npm run dev` – Arranca el servidor de desarrollo.
- `npm run build` – Genera la aplicación para producción.
- `npm run start` – Sirve la build generada.
- `npm run lint` – Ejecuta ESLint sobre los archivos del proyecto.

> **Nota:** las dependencias necesarias deben estar instaladas para poder ejecutar los comandos de lint o build.

## Despliegue

Puedes desplegar la aplicación en cualquier servicio compatible con Next.js (por ejemplo, Vercel). Solo asegúrate de configurar las mismas variables de entorno usadas en desarrollo.

## Licencia

Este proyecto está publicado para fines educativos. Consulta con los autores antes de reutilizarlo en producción.
