# Prompts Workshop

Aplicación web estática para diseñar y mejorar prompts destinados a ChatGPT/GPT‑4, Midjourney, DALL·E, Gemini y Codex. Todo corre en el navegador para mantener simplicidad y estabilidad.

## Cómo usar
1. Abre `index.html` en tu navegador (no requiere servidor ni dependencias).
2. Selecciona el modelo objetivo y escribe un **prompt base**.
3. Completa objetivo, audiencia, tono, formato y restricciones.
4. Pulsa **"Mejorar prompt"** para generar una versión estructurada con buenas prácticas específicas del modelo.
5. Usa las **plantillas rápidas** para partir de ejemplos curados y copia el resultado con un clic.

### Compartir con tus amigos
- **Usar la versión publicada:** comparte directamente el enlace público (por ejemplo, `https://hefestion1989.github.io/Prompts/`). No necesitan instalar nada.
- **Publicar tu propia copia:**
  1. Haz un fork del repositorio en GitHub.
  2. En tu fork, ve a **Settings → Pages**, selecciona la rama `main` y la carpeta raíz (`/`).
  3. Espera a que GitHub Pages genere tu URL y compártela; la app es estática y se abre en el navegador.
- **Ejecutar localmente:** descarga o clona el repo y abre `index.html` en cualquier navegador moderno.

## Arquitectura
- HTML/CSS/JS sin dependencias externas: carga rápida y estable.
- Configuración centralizada por modelo (`main.js`) con guías, plantillas y mejores prácticas.
- UI responsive con énfasis en legibilidad y acciones cortas (ver ejemplo, reiniciar, copiar).

## Capturas
_No se requiere compilación; la app está lista para abrirse localmente._
