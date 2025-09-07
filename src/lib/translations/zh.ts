
export const zh = {
  nav: {
    home: '首页',
    about: '关于',
    tips: '提示',
    getStarted: '开始',
  },
  home: {
    tagline: '解读隐藏协议，以多语言准确性重写以实现正义，您自己的可信赖洞察力',
    features: {
      upload: {
        title: '上传和扫描',
        description: '上传您的法律文件以进行全面的人工智能分析。',
      },
      lawyer: {
        title: '迷你律师支持',
        description: '从我们的AI助手中即时获取您的法律问题的答案。',
      },
      future: {
        title: '预见未来',
        description: '了解您法律行为的潜在利弊和后果。',
      },
      trap: {
        title: '发现陷阱',
        description: '识别您文件中的风险条款和不公平条款。',
      },
    },
    review: {
        title: '评价我们的应用',
        description: '我们很乐意听到您的反馈。通过留下星级评价，让我们知道我们的表现如何。',
        commentPlaceholder: '添加评论或建议...',
        submit: '提交评论',
        thankYouTitle: '谢谢！',
        thankYouDescription: '您的反馈已成功提交。'
    }
  },
  about: {
    title: '关于 DharmaJyoti',
    subtitle: '赋予您理解法律的能力。',
    missionTitle: '我们的使命',
    missionP1: 'DharmaJyoti 的诞生源于一个简单的想法：法律文件应该对每个人都可用，而不仅仅是律师。我们相信，在当今世界，了解您的权利、责任和您签订的协议是一项基本需求。',
    missionP2: '我们的使命是利用尖端人工智能的力量揭开法律语言的神秘面紗。我们提供的工具可将复杂的行话翻译成简单的中文，突出潜在风险，并使您能够自信地做出明智的决定。',
    missionP3: '无论您是审查合同的小企业主、签订协议的自由职业者，还是仅仅对法律文件感到好奇，DharmaJyoti 都是您在驾驭法律复杂性方面的值得信赖的合作伙伴。',
  },
  tips: {
    title: '法律提示与最佳实践',
    subtitle: '帮助您保持受保护的简单建议。',
    tip1: { title: '务必阅读细则', content: '在签署任何文件之前，切勿不彻底阅读，包括所有小字。这里通常会找到有关终止、罚款和责任的重要细节。' },
    tip2: { title: '理解关键术语', content: '在签字之前，请确保您理解协议的关键术语。如果您看到“赔偿”、“弃权”或“仲裁”等词语，请确保您知道它们对您意味着什么。' },
    tip3: { title: '保留所有文件的副本', content: '务必保留您签署的任何法律文件的副本。如果可能，请将其存放在安全的地方，包括数字和物理形式。这对于将来的参考至关重要。' },
    tip4: { title: '口头协议有风险', content: '虽然某些口头协议可能具有法律约束力，但它们很难证明。务必尝试将重要协议以书面形式记录下来，以避免未来的争议。' },
    tip5: { title: '不要害怕谈判', content: '许多合同都是可以谈判的。如果您对某一条款感到不舒服，请要求更改。预先谈判总比以后处理糟糕的条款要好。' },
    tip6: { title: '如有疑问，请咨询律师', content: '像 DharmaJyoti 这样的人工智能工具非常适合进行初步分析，但它们不能替代专业的法律建议。对于高风险情况，请务必咨询合格的律师。' },
  },
  upload: {
    initialMessage: '您好！我是 DharmaJyoti，您的个人法律助理。请上传文件或使用相机开始分析。',
    title: '上传并扫描',
    description: '您想如何提供您的文件？',
    useCamera: '使用相机',
    uploadFile: '上传文件',
    cameraTitle: '相机捕捉',
    cameraDescription: '将您的文件放在框架内，然后点击捕捉。',
    capture: '捕捉',
    uploadTitle: '上传文件',
    uploadDescription: '选择要分析的 PDF 或 TXT 文件。',
    uploadNew: '上传新的',
    processing: '处理中...',
    analysisComplete: (fileName: string) => `我已经分析了您的文件，“${fileName}”。您可以在“分析”选项卡下查看摘要和分析。您想了解什么？`,
    chatPlaceholder: '询问有关您的文件的问题...',
  },
  lawyer: {
    initialMessage: "您好！我是您的迷你律师助理。粘贴条款或描述情况，并告诉我您的位置（城市/州/国家）。我将根据当地法律为您提供快速、简单的分析。",
    title: '迷你律师支持',
    description: '您的人工智能法律助理。',
    placeholder: '在此处粘贴文本并包括您的位置...',
  },
  future: {
    processing: '处理中...',
    extracting: '正在提取文本...',
    generating: '正在生成场景...',
    title: '预见未来',
    description: '上传文件以查看可能的最佳和最坏情况。',
    loadingTitle: '窥探未来...',
    loadingDescription: '请稍候，我们的人工智能正在根据您的文件分析可能的结果。',
    bestCase: '最佳情况',
    worstCase: '最坏情况',
    advice: '建议',
  },
  spotTrap: {
    processing: '处理中...',
    extracting: '正在从文件中提取文本...',
    title: '发现陷阱',
    description: '上传您的文件以识别潜在的漏洞、问题和警告条款。',
    loadingTitle: '正在分析文件',
    loadingDescription: '请稍候，我们正在扫描您的文件以查找潜在的陷阱。这可能需要一些时间。',
    loopholes: '漏洞',
    problems: '潜在问题',
    cautions: '注意事项',
  },
  analysis: {
    noAnalysis: '没有可用的分析。上传文件以开始。',
    docType: '文件类型',
    purpose: '目的',
    summary: '摘要',
    keywords: '关键词',
  },
  toast: {
    analysisFailed: '分析失败',
    analysisError: '分析您的文件时出错。请重试。',
    cameraDenied: '相机访问被拒绝',
    cameraError: '请在您的浏览器设置中启用相机权限以使用此应用程序。',
    cameraAnalysisError: '分析捕获的图像时出错。请重试。',
    audioFailed: '音频生成失败',
    audioError: '无法为此部分生成音频。',
    unsupportedFile: '不支持的文件类型',
    unsupportedFileDesc: '请上传纯文本（.txt）或 PDF 文件。',
  },
  common: {
    document: '文件',
    analysisInProgress: '分析正在进行中...',
    listen: '收听此部分',
    back: '返回',
    analyzing: '分析中...',
    analyzingDocument: '正在分析文件',
    pleaseWait: '请稍候，我们正在分析您的文件...',
    documentViewer: '文件查看器',
    analysis: '分析',
    chat: '聊天',
    error: '抱歉，我遇到了一个错误。请重试。',
  },
  languageSwitcher: {
    placeholder: '语言',
  },
  fileUploader: {
    title: '上传文件',
    description: '上传文件（.txt, .pdf）以开始。',
    clickToUpload: '点击上传',
    dragAndDrop: '或拖放',
    fileTypes: 'TXT 或 PDF 文件',
  },
  pdfAlert: {
    title: 'PDF 处理信息',
    description: 'PDF 文件在服务器上处理以提取文本，其中可能包括对扫描文件使用 OCR。这可能需要更长的时间。继续操作即表示您同意此过程。文件将发送给 AI 进行分析。',
    confirm: '好的',
  },
  guidebot: {
    title: 'DharmaJyoti 指南',
    description: '需要帮助吗？这是我们主要功能的快速指南。',
    upload: '从导航栏转到“开始”。您可以上传文本或 PDF 文件，或使用相机拍摄您的文件。我们的人工智能将对其进行分析并提供摘要，识别其目的，并让您就内容进行聊天。',
    lawyer: '从主菜单访问“迷你律师”页面。粘贴任何法律条款或描述情况，确保包括您的位置（城市/州/国家）。人工智能将根据相关当地法律为您提供快速、简单的分析。',
    future: '导航到“预见未来”页面。上传您的法律文件，我们的人工智能将生成两个短篇故事：一个描述最佳情况的结果，一个描述最坏情况，并附上可行的建议。',
    trap: '转到“发现陷阱”页面。上传您的文件，人工智能将仔细扫描以识别潜在的漏洞、有问题的条款以及您应该注意的其他隐藏风险。',
    faq: {
      title: '常见问题',
      questions: [
        {
          question: '什么是合同？',
          answer: '合同是两个或多个人/方之间具有法律约束力的书面或口头协议。',
        },
        {
          question: '什么使合同有效？',
          answer: '有效合同通常需要：\n\n要约\n\n承诺\n\n对价（交换有价值的东西）\n\n法律能力（各方必须有能力）\n\n合法目的',
        },
        {
          question: '如果我被捕，我有什么权利？',
          answer: '您通常有权保持沉默，有权聘请律师，并有权被告知指控。',
        },
        {
          question: '民法和刑法有什么区别？',
          answer: '民法处理人与人之间的纠纷（如财产、合同、家庭问题）。\n\n刑法处理被视为危害社会或国家的行为（如盗窃、攻击）。',
        },
        {
          question: '什么是保释？',
          answer: '保释是向法院提供的金钱或财产，以确保一个人在从监狱获释后会返回接受审判。',
        },
        {
          question: '成年年龄是多少？',
          answer: '成年年龄是一个人被合法视为成年人的年龄（在许多地方是18岁）。',
        },
        {
          question: '什么是遗嘱？',
          answer: '遗嘱是一份法律文件，解释了一个人去世后其财产和资产应如何分配。',
        },
        {
          question: '律师和辩护律师有什么区别？',
          answer: '两者都是法律专业人士。在许多国家，“律师”是一个通用术语，而“辩护律师”指的是有资格在法庭上代表客户的人。',
        },
        {
          question: '什么是知识产权（IP）？',
          answer: '知识产权是指思想的创造，如发明、音乐、书籍、品牌名称和徽标。它受到版权、商标和专利等法律的保护。',
        },
        {
          question: '如果我需要法律帮助，我该怎么办？',
          answer: '最好联系一位专门从事与您的问题相关的法律领域的合格律师。',
        },
      ],
    }
  }
};
