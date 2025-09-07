
export const de = {
  nav: {
    home: 'Startseite',
    about: 'Über uns',
    tips: 'Tipps',
    getStarted: 'Loslegen',
  },
  home: {
    tagline: 'Versteckte Vereinbarungen entschlüsseln & mit mehrsprachiger Genauigkeit für Gerechtigkeit neu schreiben, Ihr eigener vertrauenswürdiger Einblick',
    features: {
      upload: {
        title: 'Hochladen und Scannen',
        description: 'Laden Sie Ihre juristischen Dokumente für eine umfassende KI-gestützte Analyse hoch.',
      },
      lawyer: {
        title: 'Mini-Anwalt-Support',
        description: 'Erhalten Sie sofortige Antworten auf Ihre rechtlichen Fragen von unserem KI-Assistenten.',
      },
      future: {
        title: 'Zukunft sehen',
        description: 'Verstehen Sie die potenziellen Vor-, Nachteile und Konsequenzen Ihrer rechtlichen Schritte.',
      },
      trap: {
        title: 'Fallen erkennen',
        description: 'Identifizieren Sie riskante Klauseln und unfaire Bedingungen in Ihren Dokumenten.',
      },
    },
    review: {
        title: 'Bewerten Sie unsere App',
        description: 'Wir würden uns über Ihr Feedback freuen. Lassen Sie uns wissen, wie wir uns machen, indem Sie eine Sternebewertung hinterlassen.',
        commentPlaceholder: 'Fügen Sie einen Kommentar oder einen Vorschlag hinzu...',
        submit: 'Bewertung abgeben',
        thankYouTitle: 'Vielen Dank!',
        thankYouDescription: 'Ihre Bewertung wurde erfolgreich übermittelt.'
    }
  },
  about: {
    title: 'Über DharmaJyoti',
    subtitle: 'Wir befähigen Sie, das Gesetz zu verstehen.',
    missionTitle: 'Unsere Mission',
    missionP1: 'DharmaJyoti entstand aus einer einfachen Idee: Juristische Dokumente sollten für jeden zugänglich sein, nicht nur für Anwälte. Wir glauben, dass das Verständnis Ihrer Rechte, Pflichten und der von Ihnen eingegangenen Vereinbarungen eine grundlegende Notwendigkeit in der heutigen Welt ist.',
    missionP2: 'Unsere Mission ist es, die Rechtssprache mit der Kraft modernster KI zu entmystifizieren. Wir bieten Werkzeuge, die komplexen Jargon in einfaches Deutsch übersetzen, potenzielle Risiken aufzeigen und Sie befähigen, fundierte Entscheidungen mit Zuversicht zu treffen.',
    missionP3: 'Ob Sie ein Kleinunternehmer sind, der einen Vertrag prüft, ein Freiberufler, der eine Vereinbarung unterzeichnet, oder einfach nur neugierig auf ein juristisches Dokument sind, DharmaJyoti ist Ihr vertrauenswürdiger Partner bei der Navigation durch die Komplexität des Gesetzes.',
  },
  tips: {
    title: 'Rechtstipps & Best Practices',
    subtitle: 'Einfache Ratschläge, um geschützt zu bleiben.',
    tip1: { title: 'Lesen Sie immer das Kleingedruckte', content: 'Unterzeichnen Sie niemals ein Dokument, ohne es gründlich gelesen zu haben, einschließlich des gesamten Kleingedruckten. Hier finden sich oft wichtige Details zu Kündigung, Strafen und Haftung.' },
    tip2: { title: 'Verstehen Sie die Schlüsselbegriffe', content: 'Stellen Sie vor der Unterzeichnung sicher, dass Sie die Schlüsselbegriffe der Vereinbarung verstehen. Wenn Sie Wörter wie "freistellen", "Verzicht" oder "Schiedsverfahren" sehen, stellen Sie sicher, dass Sie wissen, was sie für Sie bedeuten.' },
    tip3: { title: 'Bewahren Sie Kopien von allem auf', content: 'Bewahren Sie immer eine Kopie jedes von Ihnen unterzeichneten juristischen Dokuments auf. Lagern Sie es an einem sicheren Ort, sowohl digital als auch physisch, wenn möglich. Dies ist für zukünftige Referenzen von entscheidender Bedeutung.' },
    tip4: { title: 'Mündliche Vereinbarungen sind riskant', content: 'Obwohl einige mündliche Vereinbarungen rechtsverbindlich sein können, sind sie sehr schwer zu beweisen. Versuchen Sie immer, wichtige Vereinbarungen schriftlich festzuhalten, um zukünftige Streitigkeiten zu vermeiden.' },
    tip5: { title: 'Haben Sie keine Angst zu verhandeln', content: 'Viele Verträge sind verhandelbar. Wenn Sie mit einer Bedingung nicht einverstanden sind, bitten Sie um eine Änderung. Es ist besser, im Voraus zu verhandeln, als sich später mit einer schlechten Bedingung auseinanderzusetzen.' },
    tip6: { title: 'Im Zweifelsfall einen Anwalt konsultieren', content: 'KI-Tools wie DharmaJyoti eignen sich hervorragend für eine erste Analyse, ersetzen jedoch keine professionelle Rechtsberatung. Bei wichtigen Angelegenheiten konsultieren Sie immer einen qualifizierten Anwalt.' },
  },
  upload: {
    initialMessage: 'Hallo! Ich bin DharmaJyoti, Ihr persönlicher Rechtsassistent. Bitte laden Sie ein Dokument hoch oder verwenden Sie Ihre Kamera, um die Analyse zu starten.',
    title: 'Hochladen & Scannen',
    description: 'Wie möchten Sie Ihr Dokument bereitstellen?',
    useCamera: 'Kamera verwenden',
    uploadFile: 'Datei hochladen',
    cameraTitle: 'Kameraaufnahme',
    cameraDescription: 'Positionieren Sie Ihr Dokument im Rahmen und klicken Sie auf "Aufnehmen".',
    capture: 'Aufnehmen',
    uploadTitle: 'Dokument hochladen',
    uploadDescription: 'Wählen Sie eine PDF- oder TXT-Datei zur Analyse aus.',
    uploadNew: 'Neu hochladen',
    processing: 'Verarbeitung...',
    analysisComplete: (fileName: string) => `Ich habe Ihr Dokument "${fileName}" analysiert. Eine Zusammenfassung und Analyse finden Sie unter dem Tab "Analyse". Was möchten Sie darüber wissen?`,
    chatPlaceholder: 'Fragen Sie nach Ihrem Dokument...',
  },
  lawyer: {
    initialMessage: "Hallo! Ich bin Ihr Mini-Anwalt-Assistent. Fügen Sie eine Klausel ein oder beschreiben Sie eine Situation und teilen Sie mir Ihren Standort (Stadt/Bundesland/Land) mit. Ich gebe Ihnen eine schnelle, einfache Analyse auf der Grundlage der örtlichen Gesetze.",
    title: 'Mini-Anwalt-Support',
    description: 'Ihr KI-gestützter Rechtsassistent.',
    placeholder: 'Fügen Sie hier Text ein und geben Sie Ihren Standort an...',
  },
  future: {
    processing: 'Verarbeitung...',
    extracting: 'Text wird extrahiert...',
    generating: 'Szenarien werden generiert...',
    title: 'Die Zukunft sehen',
    description: 'Laden Sie ein Dokument hoch, um mögliche Best-Case- und Worst-Case-Szenarien zu sehen.',
    loadingTitle: 'Blick in die Zukunft...',
    loadingDescription: 'Bitte warten Sie, während unsere KI potenzielle Ergebnisse basierend auf Ihrem Dokument analysiert.',
    bestCase: 'Best-Case-Szenario',
    worstCase: 'Worst-Case-Szenario',
    advice: 'Rat',
  },
  spotTrap: {
    processing: 'Verarbeitung...',
    extracting: 'Text aus Dokument wird extrahiert...',
    title: 'Fallen erkennen',
    description: 'Laden Sie Ihr Dokument hoch, um potenzielle Schlupflöcher, Probleme und Warnklauseln zu identifizieren.',
    loadingTitle: 'Dokument wird analysiert',
    loadingDescription: 'Bitte warten Sie, während wir Ihr Dokument auf potenzielle Fallen scannen. Dies kann einen Moment dauern.',
    loopholes: 'Schlupflöcher',
    problems: 'Mögliche Probleme',
    cautions: 'Vorsichtsmaßnahmen',
  },
  analysis: {
    noAnalysis: 'Keine Analyse verfügbar. Laden Sie ein Dokument hoch, um zu beginnen.',
    docType: 'Dokumententyp',
    purpose: 'Zweck',
    summary: 'Zusammenfassung',
    keywords: 'Schlüsselwörter',
  },
  toast: {
    analysisFailed: 'Analyse fehlgeschlagen',
    analysisError: 'Bei der Analyse Ihres Dokuments ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.',
    cameraDenied: 'Kamerazugriff verweigert',
    cameraError: 'Bitte aktivieren Sie die Kameraberechtigungen in Ihren Browsereinstellungen, um diese App zu verwenden.',
    cameraAnalysisError: 'Bei der Analyse des aufgenommenen Bildes ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.',
    audioFailed: 'Audioerzeugung fehlgeschlagen',
    audioError: 'Für diesen Abschnitt konnte kein Audio erzeugt werden.',
    unsupportedFile: 'Nicht unterstützter Dateityp',
    unsupportedFileDesc: 'Bitte laden Sie eine einfache Textdatei (.txt) oder eine PDF-Datei hoch.',
  },
  common: {
    document: 'Dokument',
    analysisInProgress: 'Analyse läuft...',
    listen: 'Diesen Abschnitt anhören',
    back: 'Zurück',
    analyzing: 'Analysiere...',
    analyzingDocument: 'Dokument wird analysiert',
    pleaseWait: 'Bitte warten Sie, während wir Ihr Dokument analysieren...',
    documentViewer: 'Dokumentenbetrachter',
    analysis: 'Analyse',
    chat: 'Chat',
    error: 'Entschuldigung, ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
  },
  languageSwitcher: {
    placeholder: 'Sprache',
  },
  fileUploader: {
    title: 'Dokument hochladen',
    description: 'Laden Sie ein Dokument (.txt, .pdf) hoch, um zu beginnen.',
    clickToUpload: 'Klicken Sie zum Hochladen',
    dragAndDrop: 'oder ziehen Sie es hierher',
    fileTypes: 'TXT- oder PDF-Dateien',
  },
  pdfAlert: {
    title: 'Informationen zur PDF-Verarbeitung',
    description: 'PDF-Dateien werden auf dem Server verarbeitet, um Text zu extrahieren, was die Verwendung von OCR für gescannte Dokumente beinhalten kann. Dies kann etwas länger dauern. Indem Sie fortfahren, stimmen Sie diesem Prozess zu. Die Datei wird zur Analyse an die KI gesendet.',
    confirm: 'Verstanden',
  },
  guidebot: {
    title: 'DharmaJyoti Anleitung',
    description: 'Benötigen Sie Hilfe? Hier ist eine Kurzanleitung zu unseren Hauptfunktionen.',
    upload: 'Gehen Sie in der Navigationsleiste auf "Loslegen". Sie können entweder eine Text- oder PDF-Datei hochladen oder Ihre Kamera verwenden, um ein Bild Ihres Dokuments aufzunehmen. Unsere KI analysiert es, stellt eine Zusammenfassung bereit, identifiziert den Zweck und lässt Sie über den Inhalt chatten.',
    lawyer: 'Besuchen Sie die Seite "Mini-Anwalt" im Hauptmenü. Fügen Sie eine beliebige Rechtsklausel ein oder beschreiben Sie eine Situation und geben Sie unbedingt Ihren Standort (Stadt/Bundesland/Land) an. Die KI gibt Ihnen eine schnelle, einfache Analyse basierend auf den relevanten lokalen Gesetzen.',
    future: 'Navigieren Sie zur Seite "Zukunft sehen". Laden Sie Ihr juristisches Dokument hoch, und unsere KI generiert zwei Kurzgeschichten: eine, die das bestmögliche Ergebnis beschreibt, und eine für das schlimmste Szenario, zusammen mit umsetzbaren Ratschlägen.',
    trap: 'Gehen Sie zur Seite "Fallen erkennen". Laden Sie Ihr Dokument hoch, und die KI scannt es sorgfältig, um potenzielle Schlupflöcher, problematische Klauseln und andere versteckte Risiken zu identifizieren, auf die Sie achten sollten.',
    faq: {
      title: 'Häufig gestellte Fragen',
      questions: [
        {
          question: 'Was ist ein Vertrag?',
          answer: 'Ein Vertrag ist eine schriftliche oder mündliche Vereinbarung, die zwischen zwei oder mehr Personen/Parteien rechtsverbindlich ist.',
        },
        {
          question: 'Was macht einen Vertrag gültig?',
          answer: 'Ein gültiger Vertrag benötigt normalerweise:\n\nEin Angebot\n\nAnnahme\n\nGegenleistung (etwas von Wert wird ausgetauscht)\n\nRechtsfähigkeit (die Parteien müssen fähig sein)\n\nRechtszweck',
        },
        {
          question: 'Welche Rechte habe ich, wenn ich verhaftet werde?',
          answer: 'Sie haben in der Regel das Recht zu schweigen, das Recht auf einen Anwalt und das Recht, über die Anklage informiert zu werden.',
        },
        {
          question: 'Was ist der Unterschied zwischen Zivilrecht und Strafrecht?',
          answer: 'Das Zivilrecht befasst sich mit Streitigkeiten zwischen Personen (wie Eigentum, Verträge, Familienangelegenheiten).\n\nDas Strafrecht befasst sich mit Handlungen, die als Straftaten gegen die Gesellschaft oder den Staat gelten (wie Diebstahl, Körperverletzung).',
        },
        {
          question: 'Was ist eine Kaution?',
          answer: 'Eine Kaution ist Geld oder Eigentum, das dem Gericht gegeben wird, um sicherzustellen, dass eine Person nach ihrer Freilassung aus dem Gefängnis zu ihrem Prozess zurückkehrt.',
        },
        {
          question: 'Was ist das Mündigkeitsalter?',
          answer: 'Das Mündigkeitsalter ist das Alter, in dem eine Person rechtlich als Erwachsener gilt (in vielen Ländern ist es 18 Jahre).',
        },
        {
          question: 'Was ist ein Testament?',
          answer: 'Ein Testament ist ein juristisches Dokument, das erklärt, wie das Eigentum und die Vermögenswerte einer Person nach ihrem Tod aufgeteilt werden sollen.',
        },
        {
          question: 'Was ist der Unterschied zwischen einem Anwalt und einem Advokaten?',
          answer: 'Beide sind Juristen. In vielen Ländern ist "Anwalt" ein allgemeiner Begriff, während "Advokat" sich auf jemanden bezieht, der qualifiziert ist, Mandanten vor Gericht zu vertreten.',
        },
        {
          question: 'Was ist geistiges Eigentum (IP)?',
          answer: 'Geistiges Eigentum bezieht sich auf Schöpfungen des Geistes wie Erfindungen, Musik, Bücher, Markennamen und Logos. Es wird durch Gesetze wie Urheberrecht, Markenrecht und Patente geschützt.',
        },
        {
          question: 'Was soll ich tun, wenn ich rechtliche Hilfe benötige?',
          answer: 'Am besten wenden Sie sich an einen qualifizierten Anwalt, der auf das Rechtsgebiet spezialisiert ist, das Ihr Problem betrifft.',
        },
      ],
    }
  }
};
