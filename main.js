const modelConfig = {
  chatgpt: {
    name: 'ChatGPT / GPT‑4.x',
    pill: 'Guía rápida de ChatGPT',
    guidelines: [
      'Pide rol + objetivo + criterios de calidad',
      'Solicita formato de salida claro (lista, tabla, JSON)',
      'Incluye contexto, restricciones y ejemplos',
      'Prefiere instrucciones paso a paso con verificaciones',
    ],
    templates: [
      {
        title: 'Iteración guiada',
        description: 'Pide que el modelo evalúe y mejore su propia respuesta con checklist.',
        prompt: 'Actúa como revisor. Responde primero y después revisa tu respuesta con una checklist de claridad, utilidad y seguridad. Propón una versión optimizada.'
      },
      {
        title: 'Prompt de sistema breve',
        description: 'Define rol, objetivo, formato y límites.',
        prompt: 'Eres un asistente que [rol]. Objetivo: [objetivo]. Formato: [formato]. Límites: [restricciones]. Valida que la respuesta cumpla.'
      },
    ],
  },
  midjourney: {
    name: 'Midjourney',
    pill: 'Guía rápida de Midjourney',
    guidelines: [
      'Describe sujeto + entorno + iluminación + estilo + lente',
      'Incluye relación de aspecto y nivel de detalle',
      'Evita ambigüedades, usa referencias visuales concretas',
      'Añade modificadores como "cinematic", "volumetric light"',
    ],
    templates: [
      {
        title: 'Retrato estilizado',
        description: 'Base para retratos consistentes.',
        prompt: 'Close-up portrait of [sujeto], [emoción], [iluminación], [estilo artístico], [lente], highly detailed, --ar 3:4 --v 6'
      },
      {
        title: 'Producto hero',
        description: 'Foto de producto con fondo minimal.',
        prompt: '[Producto] on a minimal background, studio lighting, soft shadows, 8k, --ar 16:9'
      },
    ],
  },
  dalle: {
    name: 'DALL·E',
    pill: 'Guía rápida de DALL·E',
    guidelines: [
      'Define escena, sujeto, estilo y paleta de color',
      'Añade cámara/ángulo: top-down, macro, 3/4, aérea',
      'Usa pocas frases claras en presente',
      'Incluye formato: relación de aspecto y número de variaciones',
    ],
    templates: [
      {
        title: 'Escena narrativa',
        description: 'Para ilustrar artículos o blogs.',
        prompt: 'A [estilo] illustration of [escena], showing [detalle clave], color palette [paleta], cinematic lighting, 4k'
      },
      {
        title: 'UI mock',
        description: 'Diseño rápido de interfaz.',
        prompt: 'Clean UI mockup for [producto], flat design, generous whitespace, modern typography, key screens: [pantallas], aspect ratio 16:9'
      },
    ],
  },
  gemini: {
    name: 'Gemini',
    pill: 'Guía rápida de Gemini',
    guidelines: [
      'Proporciona ejemplos y contraejemplos',
      'Especifica la longitud y el estilo de la respuesta',
      'Añade señales de seguridad o exclusiones',
      'Solicita razonamiento antes de la respuesta final',
    ],
    templates: [
      {
        title: 'Razonamiento + respuesta',
        description: 'Divide pensamiento y entrega final.',
        prompt: 'Razona brevemente en voz baja y luego entrega una respuesta final de no más de [n] palabras. Si falta contexto, pregunta primero.'
      },
      {
        title: 'Checklist de calidad',
        description: 'Usa criterios objetivos.',
        prompt: 'Sigue esta checklist: claridad, precisión, brevedad, seguridad. Evalúa cada punto (sí/no) y después escribe la respuesta final.'
      },
    ],
  },
  codex: {
    name: 'Codex',
    pill: 'Guía rápida de Codex',
    guidelines: [
      'Incluye lenguaje, versión y marco (p. ej., Python 3.11 + FastAPI)',
      'Define entradas, salidas y restricciones de estilo de código',
      'Pide comentarios breves y pruebas unitarias',
      'Solicita que explique supuestos antes de codificar',
    ],
    templates: [
      {
        title: 'Refactor + pruebas',
        description: 'Refactor con test sugerido.',
        prompt: 'Refactor the following code to improve readability and add a unit test using [framework]. Explain changes briefly. Code: ```[código]```'
      },
      {
        title: 'Generador de función',
        description: 'Especifica E/S y calidad.',
        prompt: 'Write a [lenguaje] function that [objetivo]. Inputs: [inputs]. Output: [output]. Constraints: [restricciones]. Add docstring and edge cases.'
      },
    ],
  },
};

const sampleState = {
  prompt: 'Quiero ideas para una campaña de lanzamiento de una app de bienestar para profesionales remotos.',
  goal: 'Tener 5 propuestas con mensajes clave y diferenciadores',
  audience: 'Equipo de marketing B2B en Latinoamérica',
  constraints: 'Sin jerga técnica, tono cercano, máximo 120 palabras cada propuesta',
};

const elements = {
  modelSelect: document.getElementById('model-select'),
  modelTitle: document.getElementById('model-title'),
  modelGuideline: document.getElementById('model-guideline'),
  promptInput: document.getElementById('prompt-input'),
  goalInput: document.getElementById('goal-input'),
  audienceInput: document.getElementById('audience-input'),
  constraintsInput: document.getElementById('constraints-input'),
  toneSelect: document.getElementById('tone-select'),
  formatSelect: document.getElementById('format-select'),
  output: document.getElementById('output'),
  guidelines: document.getElementById('guidelines'),
  templates: document.getElementById('templates'),
  btnEnhance: document.getElementById('btn-enhance'),
  btnCopy: document.getElementById('btn-copy'),
  btnExample: document.getElementById('btn-example'),
  btnReset: document.getElementById('btn-reset'),
};

function buildPrompt(modelKey) {
  const prompt = elements.promptInput.value.trim();
  const goal = elements.goalInput.value.trim();
  const audience = elements.audienceInput.value.trim();
  const constraints = elements.constraintsInput.value.trim();
  const tone = elements.toneSelect.value;
  const format = elements.formatSelect.value;

  if (!prompt) {
    elements.output.textContent = 'Escribe primero un prompt base para mejorarlo.';
    return;
  }

  const blocks = [
    `Modelo: ${modelConfig[modelKey].name}.`,
    `Objetivo: ${goal || '—'}. Público o contexto: ${audience || '—'}.`,
    `Instrucción: ${prompt}`,
    `Tono: ${tone}. Formato esperado: ${format}.`,
    constraints ? `Restricciones: ${constraints}.` : null,
    modelKey === 'codex'
      ? 'Explica supuestos antes de codificar. Incluye comentarios breves y un test unitario simple.'
      : 'Si algo falta, pide clarificar antes de responder.',
    'Devuelve la respuesta y verifica que cumpla con formato y restricciones.',
  ].filter(Boolean);

  elements.output.textContent = blocks.join('\n\n');
}

function renderGuidelines(modelKey) {
  const { guidelines } = modelConfig[modelKey];
  elements.guidelines.innerHTML = '';
  guidelines.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    elements.guidelines.appendChild(li);
  });
}

function renderTemplates(modelKey) {
  const { templates } = modelConfig[modelKey];
  elements.templates.innerHTML = '';
  templates.forEach((tpl) => {
    const card = document.createElement('div');
    card.className = 'template-card';
    card.innerHTML = `<h4>${tpl.title}</h4><p>${tpl.description}</p>`;
    card.addEventListener('click', () => {
      elements.promptInput.value = tpl.prompt;
      buildPrompt(modelKey);
    });
    elements.templates.appendChild(card);
  });
}

function updateModel(modelKey) {
  const config = modelConfig[modelKey];
  elements.modelTitle.textContent = config.name;
  elements.modelGuideline.textContent = config.pill;
  renderGuidelines(modelKey);
  renderTemplates(modelKey);
  buildPrompt(modelKey);
}

function fillExample() {
  elements.promptInput.value = sampleState.prompt;
  elements.goalInput.value = sampleState.goal;
  elements.audienceInput.value = sampleState.audience;
  elements.constraintsInput.value = sampleState.constraints;
  elements.toneSelect.value = 'claro y conciso';
  elements.formatSelect.value = 'lista numerada';
}

function resetForm() {
  elements.promptInput.value = '';
  elements.goalInput.value = '';
  elements.audienceInput.value = '';
  elements.constraintsInput.value = '';
  elements.toneSelect.value = 'claro y conciso';
  elements.formatSelect.value = 'lista numerada';
  elements.output.textContent = '';
}

function copyOutput() {
  const text = elements.output.textContent.trim();
  if (!text) return;
  navigator.clipboard.writeText(text).then(() => {
    elements.btnCopy.textContent = 'Copiado ✔';
    setTimeout(() => (elements.btnCopy.textContent = 'Copiar'), 1200);
  });
}

// Event listeners

elements.modelSelect.addEventListener('change', (event) => {
  updateModel(event.target.value);
});

elements.btnEnhance.addEventListener('click', () => {
  buildPrompt(elements.modelSelect.value);
});

elements.btnCopy.addEventListener('click', copyOutput);

elements.btnExample.addEventListener('click', () => {
  fillExample();
  buildPrompt(elements.modelSelect.value);
});

elements.btnReset.addEventListener('click', resetForm);

// Init
updateModel('chatgpt');
fillExample();
buildPrompt('chatgpt');
