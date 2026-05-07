# Prompts Workshop

Aplicacion web estatica para disenar y mejorar prompts destinados a ChatGPT, GPT-4, Midjourney, DALL-E, Gemini y Codex.

Este repositorio es la version simple y offline del taller de prompts: no requiere servidor, build, cuenta ni API key. Todo corre en el navegador.

## Para que sirve

- Convertir una idea inicial en un prompt mas claro y estructurado.
- Ajustar objetivo, audiencia, tono, formato y restricciones.
- Usar plantillas rapidas para distintos modelos.
- Copiar el resultado y llevarlo a la herramienta de IA que prefieras.

## Como usar

1. Abre `index.html` en tu navegador.
2. Selecciona el modelo objetivo.
3. Escribe un prompt base.
4. Completa objetivo, audiencia, tono, formato y restricciones.
5. Pulsa **Mejorar prompt** y copia el resultado.

## Compartir con otras personas

- Version publicada: comparte el enlace de GitHub Pages si esta activo, por ejemplo `https://hefestion1989.github.io/Prompts/`.
- Uso local: descarga el repositorio y abre `index.html`.
- Copia propia: haz un fork y activa GitHub Pages desde `Settings -> Pages`, rama `main`, carpeta raiz.

## Relacion con PromptMaster AI

Este repo prioriza simplicidad y estabilidad: HTML, CSS y JavaScript sin dependencias externas.

Si buscas una version mas ambiciosa, con React y asistencia mediante Gemini, mira [`promptmaster-ai`](https://github.com/Hefestion1989/promptmaster-ai).

## Arquitectura

- HTML/CSS/JS sin dependencias externas.
- Configuracion centralizada por modelo en `main.js`.
- Interfaz responsive orientada a acciones cortas: ver ejemplo, reiniciar y copiar.

## Estado

Estable como utilidad local/offline. Ideal para compartir rapido o usar sin configuracion.
