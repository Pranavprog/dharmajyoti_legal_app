
export const es = {
  nav: {
    home: 'Inicio',
    about: 'Sobre',
    tips: 'Consejos',
    getStarted: 'Empezar',
  },
  home: {
    tagline: 'Descifrando Acuerdos Ocultos y Reescribiendo con Precisión Multilingüe para la Justicia, Tu Propia Visión Confiable',
    features: {
      upload: {
        title: 'Subir y Escanear',
        description: 'Sube tus documentos legales para un análisis completo con IA.',
      },
      lawyer: {
        title: 'Soporte Mini Abogado',
        description: 'Obtén respuestas instantáneas a tus preguntas legales de nuestro asistente de IA.',
      },
      future: {
        title: 'Ver el Futuro',
        description: 'Comprende los posibles pros, contras y consecuencias de tus acciones legales.',
      },
      trap: {
        title: 'Detectar Trampas',
        description: 'Identifica cláusulas de riesgo y términos injustos en tus documentos.',
      },
    },
    review: {
        title: 'Califica Nuestra Aplicación',
        description: 'Nos encantaría conocer tu opinión. Déjanos saber cómo lo estamos haciendo dejando una calificación de estrellas.',
        commentPlaceholder: 'Añade un comentario o sugerencia...',
        submit: 'Enviar Opinión',
        thankYouTitle: '¡Gracias!',
        thankYouDescription: 'Tu opinión ha sido enviada con éxito.'
    }
  },
  about: {
    title: 'Sobre DharmaJyoti',
    subtitle: 'Empoderándote para entender la ley.',
    missionTitle: 'Nuestra Misión',
    missionP1: 'DharmaJyoti nació de una idea simple: los documentos legales deben ser accesibles para todos, no solo para los abogados. Creemos que entender tus derechos, responsabilidades y los acuerdos que celebras es una necesidad fundamental en el mundo de hoy.',
    missionP2: 'Nuestra misión es desmitificar el lenguaje legal utilizando el poder de la IA de vanguardia. Proporcionamos herramientas que traducen la jerga compleja al español sencillo, resaltan los riesgos potenciales y te empoderan para tomar decisiones informadas con confianza.',
    missionP3: 'Ya seas un pequeño empresario revisando un contrato, un freelancer firmando un acuerdo o simplemente curioso sobre un documento legal, DharmaJyoti es tu socio de confianza para navegar las complejidades de la ley.',
  },
  tips: {
    title: 'Consejos Legales y Buenas Prácticas',
    subtitle: 'Consejos simples para ayudarte a mantenerte protegido.',
    tip1: { title: 'Lee Siempre la Letra Pequeña', content: 'Nunca firmes un documento sin leerlo detenidamente, incluyendo todo el texto pequeño. Aquí es donde a menudo se encuentran detalles importantes sobre terminación, penalizaciones y responsabilidad.' },
    tip2: { title: 'Entiende los Términos Clave', content: 'Antes de firmar, asegúrate de entender los términos clave del acuerdo. Si ves palabras como \'indemnizar\', \'renuncia\' o \'arbitraje\', asegúrate de saber lo que significan para ti.' },
    tip3: { title: 'Guarda Copias de Todo', content: 'Siempre guarda una copia de cualquier documento legal que firmes. Guárdala en un lugar seguro, tanto digital como físicamente si es posible. Esto es crucial para futuras referencias.' },
    tip4: { title: 'Los Acuerdos Verbales son Riesgosos', content: 'Aunque algunos acuerdos verbales pueden ser legalmente vinculantes, son muy difíciles de probar. Siempre intenta tener los acuerdos importantes por escrito para evitar futuras disputes.' },
    tip5: { title: 'No Tengas Miedo de Negociar', content: 'Muchos contratos son negociables. Si no te sientes cómodo con un término, pide que lo cambien. Es mejor negociar desde el principio que lidiar con un mal término más tarde.' },
    tip6: { title: 'En Caso de Duda, Consulta a un Abogado', content: 'Las herramientas de IA como DharmaJyoti son excelentes para un análisis inicial, pero no sustituyen el asesoramiento legal profesional. Para situaciones de alto riesgo, siempre consulta a un abogado calificado.' },
  },
  upload: {
    initialMessage: '¡Hola! Soy DharmaJyoti, tu asistente legal personal. Por favor, sube un documento o usa tu cámara para comenzar el análisis.',
    title: 'Subir y Escanear',
    description: '¿Cómo te gustaría proporcionar tu documento?',
    useCamera: 'Usar Cámara',
    uploadFile: 'Subir Archivo',
    cameraTitle: 'Captura de Cámara',
    cameraDescription: 'Coloca tu documento en el marco y haz clic en capturar.',
    capture: 'Capturar',
    uploadTitle: 'Subir Documento',
    uploadDescription: 'Selecciona un archivo PDF o TXT para analizar.',
    uploadNew: 'Subir Nuevo',
    processing: 'Procesando...',
    analysisComplete: (fileName: string) => `He analizado tu documento, "${fileName}". Puedes ver un resumen y análisis en la pestaña "Análisis". ¿Qué te gustaría saber al respecto?`,
    chatPlaceholder: 'Pregunta sobre tu documento...',
  },
  lawyer: {
    initialMessage: "¡Hola! Soy tu asistente Mini Abogado. Pega una cláusula o describe una situación, y dime tu ubicación (ciudad/estado/país). Te daré un análisis rápido y sencillo basado en las leyes locales.",
    title: 'Soporte Mini Abogado',
    description: 'Tu asistente legal impulsado por IA.',
    placeholder: 'Pega el texto aquí e incluye tu ubicación...',
  },
  future: {
    processing: 'Procesando...',
    extracting: 'Extrayendo texto...',
    generating: 'Generando scenarios...',
    title: 'Ver el Futuro',
    description: 'Sube un documento para ver los posibles mejores y peores escenarios.',
    loadingTitle: 'Mirando hacia el Futuro...',
    loadingDescription: 'Por favor, espera mientras nuestra IA analiza los posibles resultados basados en tu documento.',
    bestCase: 'Mejor Escenario Posible',
    worstCase: 'Peor Escenario Posible',
    advice: 'Consejo',
  },
  spotTrap: {
    processing: 'Procesando...',
    extracting: 'Extrayendo texto del documento...',
    title: 'Detectar Trampas',
    description: 'Sube tu documento para identificar posibles lagunas, problemas y cláusulas de advertencia.',
    loadingTitle: 'Analizando Documento',
    loadingDescription: 'Por favor, espera mientras escaneamos tu documento en busca de posibles trampas. Esto puede tomar un momento.',
    loopholes: 'Lagunas',
    problems: 'Problemas Potenciales',
    cautions: 'Advertencias',
  },
  analysis: {
    noAnalysis: 'No hay análisis disponible. Sube un documento para comenzar.',
    docType: 'Tipo de Documento',
    purpose: 'Propósito',
    summary: 'Resumen',
    keywords: 'Palabras Clave',
  },
  toast: {
    analysisFailed: 'Análisis Fallido',
    analysisError: 'Hubo un error al analizar tu documento. Por favor, inténtalo de nuevo.',
    cameraDenied: 'Acceso a la Cámara Denegado',
    cameraError: 'Por favor, habilita los permisos de la cámara en la configuración de tu navegador para usar esta aplicación.',
    cameraAnalysisError: 'Hubo un error al analizar la imagen capturada. Por favor, inténtalo de nuevo.',
    audioFailed: 'Falló la Generación de Audio',
    audioError: 'No se pudo generar audio para esta sección.',
    unsupportedFile: 'Tipo de Archivo no Soportado',
    unsupportedFileDesc: 'Por favor, sube un archivo de texto plano (.txt) o PDF.',
    serviceUnavailable: 'El servicio de IA está actualmente sobrecargado. Por favor, inténtelo de nuevo en unos momentos.',
  },
  common: {
    document: 'Documento',
    analysisInProgress: 'Análisis en progreso...',
    listen: 'Escuchar esta sección',
    back: 'Atrás',
    analyzing: 'Analizando...',
    analyzingDocument: 'Analizando Documento',
    pleaseWait: 'Por favor, espera mientras analizamos tu documento...',
    documentViewer: 'Visor de Documentos',
    analysis: 'Análisis',
    chat: 'Chat',
    error: 'Lo siento, encontré un error. Por favor, inténtalo de nuevo.',
  },
  languageSwitcher: {
    placeholder: 'Idioma',
  },
  fileUploader: {
    title: 'Subir Documento',
    description: 'Sube un documento (.txt, .pdf) para empezar.',
    clickToUpload: 'Haz clic para subir',
    dragAndDrop: 'o arrastra y suelta',
    fileTypes: 'Archivos TXT o PDF',
  },
  pdfAlert: {
    title: 'Información sobre el Procesamiento de PDF',
    description: 'Los archivos PDF se procesan en el servidor para extraer texto, lo que puede incluir el uso de OCR para documentos escaneados. Esto puede tardar un poco más. Al continuar, aceptas este proceso. El archivo se enviará a la IA para su análisis.',
    confirm: 'Entendido',
  },
  guidebot: {
    title: 'Guía de DharmaJyoti',
    description: '¿Necesitas ayuda? Aquí tienes una guía rápida de nuestras características principales.',
    upload: 'Ve a "Empezar" en la barra de navegación. Puedes subir un archivo de texto o PDF, o usar tu cámara para tomar una foto de tu documento. Nuestra IA lo analizará y proporcionará un resumen, identificará su propósito y te permitirá chatear sobre el contenido.',
    lawyer: 'Visita la página "Mini Abogado" desde el menú principal. Pega cualquier cláusula legal o describe una situación, asegurándote de incluir tu ubicación (ciudad/estado/país). La IA te dará un análisis rápido y sencillo basado en las leyes locales pertinentes.',
    future: 'Navega a la página "Ver el Futuro". Sube tu documento legal y nuestra IA generará dos historias cortas: una que describe el mejor resultado posible y otra para el peor de los casos, junto con consejos prácticos.',
    trap: 'Ve a la página "Detectar Trampas". Sube tu documento y la IA lo escaneará cuidadosamente para identificar posibles lagunas, cláusulas problemáticas y otros riesgos ocultos de los que deberías estar al tanto.',
    faq: {
      title: 'Preguntas Frecuentes',
      questions: [
        {
          question: '¿Qué es un contrato?',
          answer: 'Un contrato es un acuerdo escrito o hablado que es legalmente vinculante entre dos o más personas/partes.',
        },
        {
          question: '¿Qué hace que un contrato sea válido?',
          answer: 'Un contrato válido generalmente necesita:\n\nUna oferta\n\nAceptación\n\nConsideración (algo de valor intercambiado)\n\nCapacidad legal (las partes deben ser capaces)\n\nPropósito legal',
        },
        {
          question: '¿Cuáles son mis derechos si me arrestan?',
          answer: 'Generalmente tienes derecho a permanecer en silencio, derecho a un abogado y derecho a ser informado de los cargos.',
        },
        {
          question: '¿Cuál es la diferencia entre el derecho civil y el derecho penal?',
          answer: 'El derecho civil se ocupa de las disputas entre personas (como propiedad, contratos, asuntos familiares).\n\nEl derecho penal se ocupa de las acciones consideradas delitos contra la sociedad o el estado (como robo, asalto).',
        },
        {
          question: '¿Qué es la fianza?',
          answer: 'La fianza es dinero o propiedad que se entrega al tribunal para asegurar que una persona regrese a su juicio después de ser liberada de la cárcel.',
        },
        {
          question: '¿Cuál es la mayoría de edad?',
          answer: 'La mayoría de edad es cuando una persona es legalmente considerada un adulto (en muchos lugares, es a los 18 años).',
        },
        {
          question: '¿Qué es un testamento?',
          answer: 'Un testamento es un documento legal que explica cómo se deben dividir los bienes y activos de una persona después de su muerte.',
        },
        {
          question: '¿Cuál es la diferencia entre un abogado y un defensor?',
          answer: 'Ambos son profesionales del derecho. En muchos países, "abogado" es un término general, mientras que "defensor" se refiere a alguien calificado para representar a clientes en los tribunales.',
        },
        {
          question: '¿Qué es la propiedad intelectual (PI)?',
          answer: 'La propiedad intelectual se refiere a creaciones de la mente como invenciones, música, libros, nombres de marca y logotipos. Está protegida por leyes como los derechos de autor, las marcas registradas y las patentes.',
        },
        {
          question: '¿Qué debo hacer si necesito ayuda legal?',
          answer: 'Lo mejor es contactar a un abogado calificado que se especialice en el área del derecho relacionada con tu problema.',
        },
      ],
    }
  }
};
