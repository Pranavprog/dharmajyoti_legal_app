
export const fr = {
  nav: {
    home: 'Accueil',
    about: 'À propos',
    tips: 'Conseils',
    getStarted: 'Commencer',
  },
  home: {
    tagline: 'Déchiffrer les Accords Cachés et Réécrire avec une Précision Multilingue pour la Justice, Votre Propre Vision de Confiance',
    features: {
      upload: {
        title: 'Télécharger et Analyser',
        description: 'Téléchargez vos documents juridiques pour une analyse complète par IA.',
      },
      lawyer: {
        title: 'Support Mini Juriste',
        description: 'Obtenez des réponses instantanées à vos questions juridiques de notre assistant IA.',
      },
      future: {
        title: 'Voir le Futur',
        description: 'Comprenez les avantages, les inconvénients et les conséquences potentiels de vos actions en justice.',
      },
      trap: {
        title: 'Détecter les Pièges',
        description: 'Identifiez les clauses à risque et les conditions inéquitables dans vos documents.',
      },
    },
    review: {
        title: 'Évaluez Notre Application',
        description: 'Nous aimerions connaître votre avis. Faites-nous savoir comment nous nous en sortons en laissant une évaluation par étoiles.',
        commentPlaceholder: 'Ajoutez un commentaire ou une suggestion...',
        submit: 'Envoyer l\'Avis',
        thankYouTitle: 'Merci !',
        thankYouDescription: 'Votre avis a été soumis avec succès.'
    }
  },
  about: {
    title: 'À propos de DharmaJyoti',
    subtitle: 'Vous donner les moyens de comprendre la loi.',
    missionTitle: 'Notre Mission',
    missionP1: 'DharmaJyoti est né d\'une idée simple : les documents juridiques devraient être accessibles à tous, pas seulement aux avocats. Nous pensons que comprendre vos droits, vos responsabilités et les accords que vous concluez est un besoin fondamental dans le monde d\'aujourd\'hui.',
    missionP2: 'Notre mission est de démystifier le langage juridique en utilisant la puissance de l\'IA de pointe. Nous fournissons des outils qui traduisent le jargon complexe en français simple, mettent en évidence les risques potentiels et vous donnent les moyens de prendre des décisions éclairées en toute confiance.',
    missionP3: 'Que vous soyez un propriétaire de petite entreprise examinant un contrat, un freelance signant un accord, ou simplement curieux d\'un document juridique, DharmaJyoti est votre partenaire de confiance pour naviguer dans les complexités de la loi.',
  },
  tips: {
    title: 'Conseils Juridiques et Bonnes Pratiques',
    subtitle: 'Des conseils simples pour vous aider à rester protégé.',
    tip1: { title: 'Lisez Toujours les Petits Caractères', content: 'Ne signez jamais un document sans l\'avoir lu attentivement, y compris tout le petit texte. C\'est là que se trouvent souvent des détails importants sur la résiliation, les pénalités et la responsabilité.' },
    tip2: { title: 'Comprenez les Termes Clés', content: 'Avant de signer, assurez-vous de comprendre les termes clés de l\'accord. Si vous voyez des mots comme \'indemniser\', \'renonciation\' ou \'arbitrage\', assurez-vous de savoir ce qu\'ils signifient pour vous.' },
    tip3: { title: 'Gardez des Copies de Tout', content: 'Gardez toujours une copie de tout document juridique que vous signez. Conservez-la dans un endroit sûr, à la fois numériquement et physiquement si possible. C\'est crucial pour référence future.' },
    tip4: { title: 'Les Accords Verbaux sont Risqués', content: 'Bien que certains accords verbaux puissent être juridiquement contraignants, ils sont très difficiles à prouver. Essayez toujours d\'obtenir les accords importants par écrit pour éviter les litiges futurs.' },
    tip5: { title: 'N\'ayez Pas Peur de Négocier', content: 'De nombreux contrats sont négociables. Si vous n\'êtes pas à l\'aise avec une clause, demandez à ce qu\'elle soit modifiée. Il vaut mieux négocier à l\'avance que de devoir faire face à une mauvaise clause plus tard.' },
    tip6: { title: 'En Cas de Doute, Consultez un Avocat', content: 'Les outils d\'IA comme DharmaJyoti sont parfaits pour une analyse initiale, mais ils ne remplacent pas les conseils juridiques professionnels. Pour les situations à enjeux élevés, consultez toujours un avocat qualifié.' },
  },
  upload: {
    initialMessage: 'Bonjour ! Je suis DharmaJyoti, votre assistant juridique personnel. Veuillez télécharger un document ou utiliser votre appareil photo pour commencer l\'analyse.',
    title: 'Télécharger et Analyser',
    description: 'Comment souhaitez-vous fournir votre document ?',
    useCamera: 'Utiliser l\'Appareil Photo',
    uploadFile: 'Télécharger un Fichier',
    cameraTitle: 'Capture par Appareil Photo',
    cameraDescription: 'Positionnez votre document dans le cadre et cliquez sur capturer.',
    capture: 'Capturer',
    uploadTitle: 'Télécharger le Document',
    uploadDescription: 'Sélectionnez un fichier PDF ou TXT à analyser.',
    uploadNew: 'Télécharger un Nouveau',
    processing: 'Traitement...',
    analysisComplete: (fileName: string) => `J'ai analysé votre document, "${fileName}". Vous pouvez voir un résumé et une analyse sous l'onglet "Analyse". Que souhaitez-vous savoir à ce sujet ?`,
    chatPlaceholder: 'Posez des questions sur votre document...',
  },
  lawyer: {
    initialMessage: "Bonjour ! Je suis votre assistant Mini Juriste. Collez une clause ou décrivez une situation, et indiquez-moi votre emplacement (ville/état/pays). Je vous fournirai une analyse rapide et simple basée sur les lois locales.",
    title: 'Support Mini Juriste',
    description: 'Votre assistant juridique alimenté par l\'IA.',
    placeholder: 'Collez le texte ici et incluez votre emplacement...',
  },
  future: {
    processing: 'Traitement...',
    extracting: 'Extraction du texte...',
    generating: 'Génération de scénarios...',
    title: 'Voir le Futur',
    description: 'Téléchargez un document pour voir les meilleurs et les pires scénarios possibles.',
    loadingTitle: 'Plongée dans le Futur...',
    loadingDescription: 'Veuillez patienter pendant que notre IA analyse les résultats potentiels basés sur votre document.',
    bestCase: 'Meilleur Scénario',
    worstCase: 'Pire Scénario',
    advice: 'Conseil',
  },
  spotTrap: {
    processing: 'Traitement...',
    extracting: 'Extraction du texte du document...',
    title: 'Détecter les Pièges',
    description: 'Téléchargez votre document pour identifier les éventuelles failles, problèmes et clauses de mise en garde.',
    loadingTitle: 'Analyse du Document',
    loadingDescription: 'Veuillez patienter pendant que nous analysons votre document à la recherche de pièges potentiels. Cela peut prendre un moment.',
    loopholes: 'Failles',
    problems: 'Problèmes Potentiels',
    cautions: 'Mises en Garde',
  },
  analysis: {
    noAnalysis: 'Aucune analyse disponible. Téléchargez un document pour commencer.',
    docType: 'Type de Document',
    purpose: 'Objectif',
    summary: 'Résumé',
    keywords: 'Mots-clés',
  },
  toast: {
    analysisFailed: 'Échec de l\'Analyse',
    analysisError: 'Une erreur s\'est produite lors de l\'analyse de votre document. Veuillez réessayer.',
    cameraDenied: 'Accès à la Caméra Refusé',
    cameraError: 'Veuillez activer les autorisations de la caméra dans les paramètres de votre navigateur pour utiliser cette application.',
    cameraAnalysisError: 'Une erreur s\'est produite lors de l\'analyse de l\'image capturée. Veuillez réessayer.',
    audioFailed: 'Échec de la Génération Audio',
    audioError: 'Impossible de générer l\'audio pour cette section.',
    unsupportedFile: 'Type de Fichier non Pris en Charge',
    unsupportedFileDesc: 'Veuillez télécharger un fichier texte brut (.txt) ou PDF.',
  },
  common: {
    document: 'Document',
    analysisInProgress: 'Analyse en cours...',
    listen: 'Écouter cette section',
    back: 'Retour',
    analyzing: 'Analyse en cours...',
    analyzingDocument: 'Analyse du Document',
    pleaseWait: 'Veuillez patienter pendant que nous analysons votre document...',
    documentViewer: 'Visionneuse de Documents',
    analysis: 'Analyse',
    chat: 'Chat',
    error: 'Désolé, j\'ai rencontré une erreur. Veuillez réessayer.',
  },
  languageSwitcher: {
    placeholder: 'Langue',
  },
  fileUploader: {
    title: 'Télécharger le Document',
    description: 'Téléchargez un document (.txt, .pdf) pour commencer.',
    clickToUpload: 'Cliquez pour télécharger',
    dragAndDrop: 'ou glissez-déposez',
    fileTypes: 'Fichiers TXT ou PDF',
  },
  pdfAlert: {
    title: 'Informations sur le Traitement des PDF',
    description: 'Les fichiers PDF sont traités sur le serveur pour en extraire le texte, ce qui peut inclure l\'utilisation de l\'OCR pour les documents numérisés. Cela peut prendre un peu plus de temps. En continuant, vous consentez à ce processus. Le fichier sera envoyé à l\'IA pour analyse.',
    confirm: 'Compris',
  },
  guidebot: {
    title: 'Guide DharmaJyoti',
    description: 'Besoin d\'aide ? Voici un guide rapide de nos principales fonctionnalités.',
    upload: 'Allez dans "Commencer" depuis la barre de navigation. Vous pouvez soit télécharger un fichier texte ou PDF, soit utiliser votre appareil photo pour prendre une photo de votre document. Notre IA l\'analysera et fournira un résumé, identifiera son objectif et vous permettra de discuter du contenu.',
    lawyer: 'Visitez la page "Mini Juriste" depuis le menu principal. Collez n\'importe quelle clause juridique ou décrivez une situation, en veillant à inclure votre emplacement (ville/état/pays). L\'IA vous donnera une analyse rapide et simple basée sur les lois locales pertinentes.',
    future: 'Naviguez vers la page "Voir le Futur". Téléchargez votre document juridique, et notre IA générera deux courtes histoires : une décrivant le meilleur résultat possible et une pour le pire des cas, ainsi que des conseils pratiques.',
    trap: 'Allez à la page "Détecter les Pièges". Téléchargez votre document, et l\'IA l\'analysera attentivement pour identifier les failles potentielles, les clauses problématiques et autres risques cachés dont vous devriez être conscient.',
    faq: {
      title: 'Foire Aux Questions',
      questions: [
        {
          question: 'Qu\'est-ce qu\'un contrat ?',
          answer: 'Un contrat est un accord écrit ou oral qui est juridiquement contraignant entre deux ou plusieurs personnes/parties.',
        },
        {
          question: 'Qu\'est-ce qui rend un contrat valide ?',
          answer: 'Un contrat valide nécessite généralement :\n\nUne offre\n\nUne acceptation\n\nUne contrepartie (quelque chose de valeur échangé)\n\nLa capacité juridique (les parties doivent être capables)\n\nUn but légal',
        },
        {
          question: 'Quels sont mes droits si je suis arrêté(e) ?',
          answer: 'Vous avez généralement le droit de garder le silence, le droit à un avocat et le droit d\'être informé(e) des charges retenues contre vous.',
        },
        {
          question: 'Quelle est la différence entre le droit civil et le droit pénal ?',
          answer: 'Le droit civil traite des litiges entre personnes (comme la propriété, les contrats, les questions familiales).\n\nLe droit pénal traite des actions considérées comme des infractions contre la société ou l\'État (comme le vol, l\'agression).',
        },
        {
          question: 'Qu\'est-ce qu\'une caution ?',
          answer: 'La caution est une somme d\'argent ou un bien remis au tribunal pour s\'assurer qu\'une personne retourne à son procès après avoir été libérée de prison.',
        },
        {
          question: 'Quel est l\'âge de la majorité ?',
          answer: 'L\'âge de la majorité est l\'âge auquel une personne est légalement considérée comme un adulte (dans de nombreux endroits, c\'est 18 ans).',
        },
        {
          question: 'Qu\'est-ce qu\'un testament ?',
          answer: 'Un testament est un document juridique qui explique comment les biens et les actifs d\'une personne doivent être répartis après sa mort.',
        },
        {
          question: 'Quelle est la différence entre un juriste et un avocat ?',
          answer: 'Les deux sont des professionnels du droit. Dans de nombreux pays, "juriste" est un terme général, tandis qu\'"avocat" désigne une personne qualifiée pour représenter des clients devant les tribunaux.',
        },
        {
          question: 'Qu\'est-ce que la propriété intellectuelle (PI) ?',
          answer: 'La propriété intellectuelle désigne les créations de l\'esprit comme les inventions, la musique, les livres, les noms de marque et les logos. Elle est protégée par des lois telles que le droit d\'auteur, le droit des marques et les brevets.',
        },
        {
          question: 'Que dois-je faire si j\'ai besoin d\'une aide juridique ?',
          answer: 'Il est préférable de contacter un avocat qualifié spécialisé dans le domaine du droit lié à votre problème.',
        },
      ],
    }
  }
};
