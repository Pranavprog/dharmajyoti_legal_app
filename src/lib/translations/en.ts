
export const en = {
  nav: {
    home: 'Home',
    about: 'About',
    tips: 'Tips',
    getStarted: 'Get Started',
  },
  home: {
    tagline: 'Decoding Hidden Agreements & Rewriting with Multilingual Accuracy for Justice, Your Own Trustworthy Insight',
    features: {
      upload: {
        title: 'Upload and Scan',
        description: 'Upload your legal documents for a comprehensive AI-powered analysis.',
      },
      lawyer: {
        title: 'Mini Lawyer Support',
        description: 'Get instant answers to your legal questions from our AI assistant.',
      },
      future: {
        title: 'See Future',
        description: 'Understand the potential pros, cons, and consequences of your legal actions.',
      },
      trap: {
        title: 'Spot Trap',
        description: 'Identify risky clauses and unfair terms in your documents.',
      },
    }
  },
  about: {
    title: 'About DharmaJyoti',
    subtitle: 'Empowering you to understand the law.',
    missionTitle: 'Our Mission',
    missionP1: 'DharmaJyoti was born from a simple idea: legal documents should be accessible to everyone, not just lawyers. We believe that understanding your rights, responsibilities, and the agreements you enter into is a fundamental need in today\'s world.',
    missionP2: 'Our mission is to demystify legal language using the power of cutting-edge AI. We provide tools that translate complex jargon into plain English, highlight potential risks, and empower you to make informed decisions with confidence.',
    missionP3: 'Whether you\'re a small business owner reviewing a contract, a freelancer signing an agreement, or just curious about a legal document, DharmaJyoti is your trusted partner in navigating the complexities of the law.',
  },
  tips: {
    title: 'Legal Tips & Best Practices',
    subtitle: 'Simple advice to help you stay protected.',
    tip1: { title: 'Always Read the Fine Print', content: 'Never sign a document without reading it thoroughly, including all the small text. This is where important details about termination, penalties, and liability are often found.' },
    tip2: { title: 'Understand Key Terms', content: 'Before you sign, make sure you understand the key terms of the agreement. If you see words like \'indemnify,\' \'waiver,\' or \'arbitration,\' be sure you know what they mean for you.' },
    tip3: { title: 'Keep Copies of Everything', content: 'Always keep a copy of any legal document you sign. Store it in a safe place, both digitally and physically if possible. This is crucial for future reference.' },
    tip4: { title: 'Verbal Agreements are Risky', content: 'While some verbal agreements can be legally binding, they are very difficult to prove. Always try to get important agreements in writing to avoid future disputes.' },
    tip5: { title: 'Don\'t Be Afraid to Negotiate', content: 'Many contracts are negotiable. If you\'re not comfortable with a term, ask for it to be changed. It\'s better to negotiate upfront than to deal with a bad term later.' },
    tip6: { title: 'When in Doubt, Consult a Lawyer', content: 'AI tools like DharmaJyoti are great for initial analysis, but they are not a substitute for professional legal advice. For high-stakes situations, always consult a qualified lawyer.' },
  },
  upload: {
    initialMessage: 'Hello! I\'m DharmaJyoti, your personal legal assistant. Please upload a document or use your camera to begin the analysis.',
    title: 'Upload & Scan',
    description: 'How would you like to provide your document?',
    useCamera: 'Use Camera',
    uploadFile: 'Upload File',
    cameraTitle: 'Camera Capture',
    cameraDescription: 'Position your document in the frame and click capture.',
    capture: 'Capture',
    uploadTitle: 'Upload Document',
    uploadDescription: 'Select a PDF or TXT file to analyze.',
    uploadNew: 'Upload New',
    processing: 'Processing...',
    analysisComplete: (fileName: string) => `I've analyzed your document, "${fileName}". You can see a summary and analysis under the "Analysis" tab. What would you like to know about it?`,
    chatPlaceholder: 'Ask about your document...',
  },
  lawyer: {
    initialMessage: "Hello! I'm your Mini Lawyer assistant. Paste in a clause or describe a situation, and tell me your location (city/state/country). I'll give you a quick, simple analysis based on local laws.",
    title: 'Mini Lawyer Support',
    description: 'Your AI-powered legal assistant.',
    placeholder: 'Paste text here and include your location...',
  },
  future: {
    processing: 'Processing...',
    extracting: 'Extracting text...',
    generating: 'Generating scenarios...',
    title: 'See the Future',
    description: 'Upload a document to see potential best-case and worst-case scenarios.',
    loadingTitle: 'Peering into the Future...',
    loadingDescription: 'Please wait while our AI analyzes potential outcomes based on your document.',
    bestCase: 'Best Case Scenario',
    worstCase: 'Worst Case Scenario',
    advice: 'Advice',
  },
  spotTrap: {
    processing: 'Processing...',
    extracting: 'Extracting text from document...',
    title: 'Spot Trap',
    description: 'Upload your document to identify potential loopholes, problems, and cautionary clauses.',
    loadingTitle: 'Analyzing Document',
    loadingDescription: 'Please wait while we scan your document for potential traps. This may take a moment.',
    loopholes: 'Loopholes',
    problems: 'Potential Problems',
    cautions: 'Cautions',
  },
  analysis: {
    noAnalysis: 'No analysis available. Upload a document to get started.',
    docType: 'Document Type',
    purpose: 'Purpose',
    summary: 'Summary',
    keywords: 'Keywords',
  },
  toast: {
    analysisFailed: 'Analysis Failed',
    analysisError: 'There was an error analyzing your document. Please try again.',
    cameraDenied: 'Camera Access Denied',
    cameraError: 'Please enable camera permissions in your browser settings to use this app.',
    cameraAnalysisError: 'There was an error analyzing the captured image. Please try again.',
    audioFailed: 'Audio Generation Failed',
    audioError: 'Could not generate audio for this section.',
    unsupportedFile: 'Unsupported File Type',
    unsupportedFileDesc: 'Please upload a plain text (.txt) or PDF file.',
  },
  common: {
    document: 'Document',
    analysisInProgress: 'Analysis in progress...',
    listen: 'Listen to this section',
    back: 'Back',
    analyzing: 'Analyzing...',
    analyzingDocument: 'Analyzing Document',
    pleaseWait: 'Please wait while we analyze your document...',
    documentViewer: 'Document Viewer',
    analysis: 'Analysis',
    chat: 'Chat',
    error: 'Sorry, I encountered an error. Please try again.',
  },
  languageSwitcher: {
    placeholder: 'Language',
  },
  fileUploader: {
    title: 'Upload Document',
    description: 'Upload a document (.txt, .pdf) to get started.',
    clickToUpload: 'Click to upload',
    dragAndDrop: 'or drag and drop',
    fileTypes: 'TXT or PDF files',
  },
  pdfAlert: {
    title: 'PDF Processing Information',
    description: 'PDF files are processed on the server to extract text, which may include using OCR for scanned documents. This can take a bit longer. By proceeding, you consent to this process. The file will be sent to the AI for analysis.',
    confirm: 'Got it',
  },
  guidebot: {
    title: 'DharmaJyoti Guide',
    description: 'Need help? Here’s a quick guide to our main features.',
    upload: 'Go to "Get Started" from the navigation bar. You can either upload a text or PDF file, or use your camera to take a picture of your document. Our AI will analyze it and provide a summary, identify its purpose, and let you chat about the contents.',
    lawyer: 'Visit the "Mini Lawyer" page from the main menu. Paste any legal clause or describe a situation, making sure to include your location (city/state/country). The AI will give you a quick, simple analysis based on relevant local laws.',
    future: 'Navigate to the "See Future" page. Upload your legal document, and our AI will generate two short stories: one describing the best-case outcome and one for the worst-case scenario, along with actionable advice.',
    trap: 'Go to the "Spot Trap" page. Upload your document, and the AI will carefully scan it to identify potential loopholes, problematic clauses, and other hidden risks you should be aware of.',
    faq: {
      title: 'Frequently Asked Questions',
      questions: [
        {
          question: 'What is a contract?',
          answer: 'A contract is a written or spoken agreement that is legally binding between two or more people/parties.',
        },
        {
          question: 'What makes a contract valid?',
          answer: 'A valid contract usually needs:\n\nAn offer\n\nAcceptance\n\nConsideration (something of value exchanged)\n\nLegal capacity (parties must be capable)\n\nLegal purpose',
        },
        {
          question: 'What are my rights if I’m arrested?',
          answer: 'You usually have the right to remain silent, the right to a lawyer, and the right to be informed of the charges.',
        },
        {
          question: 'What is the difference between civil law and criminal law?',
          answer: 'Civil law deals with disputes between people (like property, contracts, family issues).\n\nCriminal law deals with actions considered offenses against society or the state (like theft, assault).',
        },
        {
          question: 'What is bail?',
          answer: 'Bail is money or property given to the court to make sure a person returns for their trial after being released from jail.',
        },
        {
          question: 'What is the age of majority?',
          answer: 'The age of majority is when a person is legally considered an adult (in many places, it’s 18 years old).',
        },
        {
          question: 'What is a will?',
          answer: 'A will is a legal document that explains how a person’s property and assets should be divided after their death.',
        },
        {
          question: 'What is the difference between a lawyer and an advocate?',
          answer: 'Both are legal professionals. In many countries, "lawyer" is a general term, while "advocate" refers to someone qualified to represent clients in court.',
        },
        {
          question: 'What is intellectual property (IP)?',
          answer: 'Intellectual property refers to creations of the mind like inventions, music, books, brand names, and logos. It’s protected by laws such as copyright, trademark, and patents.',
        },
        {
          question: 'What should I do if I need legal help?',
          answer: 'It’s best to contact a qualified lawyer who specializes in the area of law related to your problem.',
        },
      ],
    }
  }
};
