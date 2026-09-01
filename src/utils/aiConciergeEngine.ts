import { LanguageCode } from '../data/translations';
import { STATES_DATA } from '../data/statesData';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  phaseContext?: 'Phase 1' | 'Phase 2' | 'General';
  suggestedQuestions?: string[];
  speechText?: string;
}

export const INITIAL_CONCIERGE_MESSAGES: Record<LanguageCode, ChatMessage> = {
  en: {
    id: 'msg_welcome_en',
    sender: 'ai',
    text: `🙏 **Namaste! I am Samvaad 2027**, your official GenAI Census Concierge for India's 1st Fully Digital Census.\n\nI can help you with:\n- 🏠 **Phase I**: Houselisting & Housing Amenities (31 key questions)\n- 👥 **Phase II**: Population Demographics, Language & Caste Enumeration\n- 📱 **Self-Enumeration Portal & SE ID Generation**\n- 🛡️ **Privacy Protections** under Section 15 of Census Act 1948\n- 📅 **State-wise schedules & 15-day pre-survey windows**\n\nHow may I assist you today?`,
    timestamp: 'Just now',
    suggestedQuestions: [
      'What are the 31 questions in Phase 1?',
      'How do I generate my Self-Enumeration ID (SE ID)?',
      'Is my Census data shared with Income Tax or Police?',
      'How will Caste and Tribe be enumerated in Phase 2?',
      'When does Self-Enumeration start in my state?',
    ],
  },
  hi: {
    id: 'msg_welcome_hi',
    sender: 'ai',
    text: `🙏 **नमस्ते! मैं संवाद 2027 हूँ**, भारत की प्रथम पूर्ण डिजिटल जनगणना का आपका आधिकारिक एआई सलाहकार।\n\nमैं आपकी निम्नलिखित विषयों में सहायता कर सकता हूँ:\n- 🏠 **चरण I**: मकान सूचीकरण एवं आवासीय सुविधाएं (31 मुख्य प्रश्न)\n- 👥 **चरण II**: जनसंख्या जनसांख्यिकी, भाषा एवं जाति गणना\n- 📱 **स्व-गणना पोर्टल एवं SE ID निर्माण**\n- 🛡️ **गोपनीयता सुरक्षा**: जनगणना अधिनियम 1948 की धारा 15 के तहत\n- 📅 **राज्यवार समय सारिणी एवं 15-दिवसीय स्व-गणना विंडो**\n\nआज मैं आपकी क्या सहायता करूँ?`,
    timestamp: 'अभी',
    suggestedQuestions: [
      'चरण 1 में कौन से 31 प्रश्न पूछे जाएंगे?',
      'मैं अपनी स्व-गणना आईडी (SE ID) कैसे बनाऊं?',
      'क्या जनगणना डेटा आयकर विभाग या पुलिस को मिलता है?',
      'चरण 2 में जाति गणना कैसे की जाएगी?',
      'मेरे राज्य में स्व-गणना कब से शुरू होगी?',
    ],
  },
  ta: {
    id: 'msg_welcome_ta',
    sender: 'ai',
    text: `🙏 **வணக்கம்! நான் சம்வாத் 2027 (Samvaad 2027)**, இந்தியாவின் முதல் முழு டிஜிட்டல் மக்கள் தொகை கணக்கெடுப்புக்கான உங்கள் AI ஆலோசகர்.\n\nகட்டம் 1 வீட்டு வசதிகள், கட்டம் 2 மக்கள் தொகை மற்றும் சாதி கணக்கெடுப்பு, சுய கணக்கெடுப்பு ஐடி (SE ID), மற்றும் தனியுரிமை சட்டங்கள் பற்றிய கேள்விகளுக்கு நான் பதிலளிக்கிறேன்.`,
    timestamp: 'இப்போது',
    suggestedQuestions: [
      'கட்டம் 1-ல் கேட்கப்படும் 31 கேள்விகள் யாவை?',
      'SE ID ஐடி எப்படி பெறுவது?',
      'கணக்கெடுப்பு தரவு வருமான வரிக்கு அனுப்பப்படுமா?',
    ],
  },
  te: {
    id: 'msg_welcome_te',
    sender: 'ai',
    text: `🙏 **నమస్కారం! నేను సంవాద్ 2027 (Samvaad 2027)**, భారతదేశపు మొట్టమొదటి డిజిటల్ జనగణన AI సహాయకుడిని.\n\nదశ 1 గృహ వసతులు, దశ 2 జనాభా & కుల గణన, మరియు SE ID వివరాలపై సహాయం చేయడానికి నేను సిద్ధంగా ఉన్నాను.`,
    timestamp: 'ఇప్పుడు',
    suggestedQuestions: [
      'దశ 1 లోని 31 ప్రశ్నలు ఏమిటి?',
      'నా SE ID ని ఎలా సృష్టించుకోవాలి?',
      'జనగణన సమాచారం గోప్యంగా ఉంటుందా?',
    ],
  },
  bn: {
    id: 'msg_welcome_bn',
    sender: 'ai',
    text: `🙏 **নমস্কার! আমি সংবাদ ২০২৭ (Samvaad 2027)**, ভারতের প্রথম ডিজিটাল আদমশুমারির জন্য আপনার এআই সহায়ক।\n\nপর্যায় ১ গৃহতালিকা, পর্যায় ২ জনসংখ্যা ও জাতিগত গণনা, এবং SE ID সংক্রান্ত যেকোনো তথ্যে আমি আপনাকে সাহায্য করতে পারি।`,
    timestamp: 'এখন',
    suggestedQuestions: [
      'পর্যায় ১-এর ৩১টি প্রশ্ন কী কী?',
      'আমি কীভাবে SE ID তৈরি করব?',
      'আদমশুমারির তথ্য কি আয়কর বিভাগের সাথে শেয়ার করা হয়?',
    ],
  },
  mr: {
    id: 'msg_welcome_mr',
    sender: 'ai',
    text: `🙏 **नमस्कार! मी संवाद २०२७ आहे**, भारताच्या पहिल्या पूर्ण डिजिटल जनगणनेचा तुमचा अधिकृत एआय सहाय्यक.\n\nटप्पा १ घरयादी व सुविधा, टप्पा २ लोकसंख्या व जातनिहाय आकडेवारी, आणि SE ID निर्मिती संदर्भात मी मदत करू शकतो.`,
    timestamp: 'आत्ता',
    suggestedQuestions: [
      'टप्पा १ मधील ३१ प्रश्न कोणते आहेत?',
      'मी माझा SE ID कसा मिळवू?',
      'माहिती आयकर विभागाला दिली जाते का?',
    ],
  },
  gu: {
    id: 'msg_welcome_gu',
    sender: 'ai',
    text: `🙏 **નમસ્તે! હું સંવાદ ૨૦૨૭ છું**, ભારતના પ્રથમ ડિજિટલ સેન્સસનો તમારો AI સહાયક.\n\nતબક્કો ૧ આવાસ સુવિધાઓ, તબક્કો ૨ વસ્તી અને જ્ઞાતિ ગણતરી તથા SE ID બનાવવા માટે હું મદદ કરી શકું છું.`,
    timestamp: 'હમણાં',
    suggestedQuestions: [
      'તબક્કો ૧ ના ૩૧ પ્રશ્નો કયા છે?',
      'મારો SE ID કેવી રીતે જનરેટ કરવો?',
      'શું આ ડેટા ઇન્કમટેક્સને આપવામાં આવે છે?',
    ],
  },
  kn: {
    id: 'msg_welcome_kn',
    sender: 'ai',
    text: `🙏 **ನಮಸ್ಕಾರ! ನಾನು ಸಂವಾದ 2027**, ಭಾರತದ ಪ್ರಥಮ ಡಿಜಿಟಲ್ ಜನಗಣತಿಯ ನಿಮ್ಮ AI ಸಹಾಯಕ.\n\nಹಂತ 1 ವಸತಿ ಸೌಲಭ್ಯಗಳು, ಹಂತ 2 ಜನಸಂಖ್ಯೆ & ಜಾತಿ ವಿವರಗಳು ಹಾಗೂ SE ID ರಚನೆಗೆ ಸಂಬಂಧಿಸಿದ ಮಾಹಿತಿಯನ್ನು ನಾನು ನೀಡಬಲ್ಲೆ.`,
    timestamp: 'ಈಗ',
    suggestedQuestions: [
      'ಹಂತ 1 ರ 31 ಪ್ರಶ್ನೆಗಳು ಯಾವುವು?',
      'ನನ್ನ SE ID ಅನ್ನು ಹೇಗೆ ಪಡೆಯುವುದು?',
      'ಜನಗಣತಿ ಮಾಹಿತಿ ಸುರಕ್ಷಿತವಾಗಿದೆಯೇ?',
    ],
  },
};

export const generateConciergeResponse = (
  userQuery: string,
  lang: LanguageCode = 'en'
): ChatMessage => {
  const queryLower = userQuery.toLowerCase().trim();
  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // 1. Phase 1 Questions (31 questions)
  if (
    queryLower.includes('phase 1') ||
    queryLower.includes('phase i') ||
    queryLower.includes('31 question') ||
    queryLower.includes('houselisting') ||
    queryLower.includes('चरण 1') ||
    queryLower.includes('मकान सूचीकरण')
  ) {
    const text =
      lang === 'hi'
        ? `🏠 **जनगणना 2027: चरण I (मकान सूचीकरण एवं आवास सुविधाएं)**\n\nचरण I में कुल **31 आधिकारिक प्रश्न** पूछे जाते हैं, जिन्हें 5 मुख्य श्रेणियों में बांटा गया है:\n\n1. **भवन संरचना व उपयोग**: छत/दीवार का प्रकार (पक्का/कच्चा), कमरों की संख्या, स्वामित्व (अपना/किराया)।\n2. **पेयजल व स्वच्छता (जल जीवन मिशन)**: नल से जल का स्रोत (परिसर के भीतर/बाहर), शौचालय का प्रकार (सेप्टिक टैंक/सीवर)।\n3. **स्वच्छ ऊर्जा व बिजली (पीएम सूर्य घर)**: ग्रिड बिजली, रूफटॉप सोलर, एलपीजी/पीएनजी कनेक्शन।\n4. **डिजिटल एवं भौतिक संपत्तियां**: स्मार्टफोन (4G/5G), फाइबर ब्रॉडबैंड, टीवी, वाहन (2-व्हीलर/कार/EV)।\n5. **अनाज व राशन उपलब्धता**: मुख्य खाद्यान्न उपभोग।\n\n💡 *आप इन सभी प्रश्नों को हमारे 'स्व-गणना पोर्टल' पर 15-दिवसीय विंडो के दौरान पहले ही भर सकते हैं!*`
        : `🏠 **Census 2027: Phase I (Houselisting & Housing Amenities)**\n\nPhase I captures **31 official parameters** across 5 vital socio-economic pillars:\n\n1. **Building & Structure**: Predominant material of roof, wall & floor (Pucca, Semi-Pucca, Kutcha), dwelling rooms, ownership status.\n2. **Drinking Water & Sanitation (Jal Jeevan Mission)**: Tap water treated source (within/near premises), latrine type (flush to sewer/septic tank).\n3. **Clean Energy & Solar (PM Surya Ghar & Ujjwala)**: Electricity source, grid-connected rooftop solar, LPG/PNG cooking connection.\n4. **Digital & Household Assets**: Smartphone with internet, high-speed fiber broadband, laptop, smart TV, 2-wheeler/4-wheeler (EV).\n5. **Primary Cereal Consumption**: Staple food pattern.\n\n💡 *Tip: You can pre-fill all 31 questions using the Self-Enumeration Portal during the active 15-day window!*`;

    return {
      id: `ai_${Date.now()}`,
      sender: 'ai',
      text,
      timestamp,
      phaseContext: 'Phase 1',
      suggestedQuestions: [
        'How do I generate my Self-Enumeration ID (SE ID)?',
        'Will reporting AC or Car increase my property tax?',
        'What is Phase 2 of Census 2027?',
      ],
    };
  }

  // 2. Phase 2 (Demographics & Caste)
  if (
    queryLower.includes('phase 2') ||
    queryLower.includes('phase ii') ||
    queryLower.includes('caste') ||
    queryLower.includes('demographic') ||
    queryLower.includes('चरण 2') ||
    queryLower.includes('जाति') ||
    queryLower.includes('जनसांख्यिकी')
  ) {
    const text =
      lang === 'hi'
        ? `👥 **जनगणना 2027: चरण II (जनसंख्या जनसांख्यिकी एवं जाति गणना)**\n\nचरण II मुख्य जनसंख्या गणना है (फरवरी 2027 में):\n\n- **व्यक्तिगत जनसांख्यिकी**: परिवार के प्रत्येक सदस्य का नाम, आयु, लिंग, वैवाहिक स्थिति, जन्म स्थान।\n- **भाषा एवं साक्षरता**: मातृभाषा, अन्य ज्ञात भाषाएं, उच्चतम शैक्षिक योग्यता।\n- **आर्थिक व कार्य स्थिति**: मुख्य श्रमिक बनाम सीमांत श्रमिक, कृषि/व्यवसाय/वेतनभोगी रोजगार श्रेणी।\n- **सामाजिक श्रेणी व जाति वर्गीकरण**: सामान्य (General), अन्य पिछड़ा वर्ग (OBC), अनुसूचित जाति (SC), अनुसूचित जनजाति (ST), और ईडब्ल्यूएस (EWS)।\n- **डिजिटल साक्षरता**: यूपीआई और डिजिटल भुगतान का उपयोग।`
        : `👥 **Census 2027: Phase II (Population Demographics & Caste Enumeration)**\n\nPhase II is the comprehensive population count (scheduled for February 2027):\n\n- **Demographics**: Full name of every resident member, age, sex, relationship to head, marital status.\n- **Language & Literacy**: Mother tongue, subsidiary languages, highest educational degree attained.\n- **Economic Activity**: Main worker vs marginal, occupation category, industry sector.\n- **Social Category & Caste**: Classification as General, OBC / SEBC, SC, ST, or EWS according to presidential and state gazette orders.\n- **Digital Literacy**: Regular usage of UPI, DigiLocker, and mobile banking.\n\n🛡️ *All personal information is strictly confidential under Section 15 of the Census Act 1948.*`;

    return {
      id: `ai_${Date.now()}`,
      sender: 'ai',
      text,
      timestamp,
      phaseContext: 'Phase 2',
      suggestedQuestions: [
        'Is my Census data shared with Income Tax or Police?',
        'Do I need to submit caste certificate during census?',
        'How does the 15-day pre-survey window work?',
      ],
    };
  }

  // 3. Tax / Police / Privacy Protections (Section 15)
  if (
    queryLower.includes('tax') ||
    queryLower.includes('income tax') ||
    queryLower.includes('police') ||
    queryLower.includes('privacy') ||
    queryLower.includes('court') ||
    queryLower.includes('confidential') ||
    queryLower.includes('आयकर') ||
    queryLower.includes('गोपनीय') ||
    queryLower.includes('पुलिस')
  ) {
    const text =
      lang === 'hi'
        ? `🛡️ **कानूनी गोपनीयता गारंटी: जनगणना अधिनियम 1948 (धारा 15)**\n\n- **कर विभागों के साथ साझा नहीं**: आपका व्यक्तिगत जनगणना डेटा आयकर विभाग, जीएसटी या नगर निगम के साथ साझा **नहीं** किया जा सकता।\n- **अदालतों में अप्रवेश्य**: पुलिस या अदालतें किसी भी नागरिक के खिलाफ साक्ष्य के रूप में जनगणना फॉर्म का उपयोग नहीं कर सकतीं।\n- **केवल सांख्यिकीय उपयोग**: जनगणना डेटा को केवल राष्ट्रीय योजनाओं (स्कूल, अस्पताल, जल, आवास) के नीति निर्धारण हेतु अनामीकृत रूप में संकलित किया जाता है।`
        : `🛡️ **Statutory Privacy Guarantee: Section 15 of Census Act 1948**\n\n- **Zero Tax Department Sharing**: Your individual census responses CANNOT be shared with the Income Tax Department, GST, or Municipal Property Tax bodies.\n- **Inadmissible in Court**: Individual census schedules are completely protected and cannot be subpoenaed by police or courts as evidence in any civil or criminal proceeding.\n- **Anonymized Aggregation Only**: Data is encrypted and released strictly as aggregated district/state statistics for infrastructure and policy planning.`;

    return {
      id: `ai_${Date.now()}`,
      sender: 'ai',
      text,
      timestamp,
      phaseContext: 'General',
      suggestedQuestions: [
        'How do I test a rumor in the Rumor Buster?',
        'What documents are required for Self-Enumeration?',
        'How do I generate my Self-Enumeration ID (SE ID)?',
      ],
    };
  }

  // 4. SE ID & Self-Enumeration Portal
  if (
    queryLower.includes('se id') ||
    queryLower.includes('self-enumeration') ||
    queryLower.includes('self enumeration') ||
    queryLower.includes('qr code') ||
    queryLower.includes('swayam') ||
    queryLower.includes('एसई आईडी') ||
    queryLower.includes('स्व-गणना')
  ) {
    const text =
      lang === 'hi'
        ? `📱 **स्व-गणना पहचान (Self-Enumeration ID - SE ID)**\n\n1. **ऑनलाइन भरें**: 15-दिवसीय विंडो के दौरान हमारे स्व-गणना पोर्टल पर 4 सरल चरणों में विवरण दर्ज करें।\n2. **SE ID प्राप्त करें**: सबमिट करने पर आपको एक विशिष्ट 16-अंकीय SE ID (उदा. \`IND-2027-UP-LKO-849201\`) और एक डिजिटल QR कोड पास मिलेगा।\n3. **प्रगणक सत्यापन**: जब आधिकारिक जनगणना प्रगणक आपके घर आएं, तो बस यह QR कोड या SE ID दिखाएं। वे 60 सेकंड में स्कैन कर सत्यापन पूरा कर देंगे!`
        : `📱 **Self-Enumeration ID (SE ID) & Verification Flow**\n\n1. **Pre-fill Online**: Access the Self-Enumeration portal during your state's active 15-day pre-survey window.\n2. **Generate Official SE ID**: Upon completing Phase 1 & Phase 2 answers and geo-pinning, you receive a unique SE ID (e.g. \`IND-2027-UP-LKO-849201\`) with an encrypted QR Code pass.\n3. **Quick Enumerator Scan**: When the census field officer visits your home, show your SE ID or digital pass. The officer scans it in under 60 seconds without re-asking all 31 questions!`;

    return {
      id: `ai_${Date.now()}`,
      sender: 'ai',
      text,
      timestamp,
      phaseContext: 'General',
      suggestedQuestions: [
        'Open Self-Enumeration Portal now',
        'Check my state schedule',
        'Is biometric required for Census?',
      ],
    };
  }

  // 5. State / Schedule lookup
  const matchedState = STATES_DATA.find(
    (s) =>
      queryLower.includes(s.name.toLowerCase()) ||
      queryLower.includes(s.code.toLowerCase()) ||
      queryLower.includes(s.capital.toLowerCase())
  );

  if (matchedState) {
    const statusText =
      matchedState.status === 'active'
        ? '🟢 **15-Day Self-Enumeration Window is CURRENTLY ACTIVE!**'
        : '🟡 **Upcoming Window**';

    const text = `📍 **Census 2027 Schedule for ${matchedState.name} (${matchedState.code})**\n\n${statusText}\n\n- **15-Day Self-Enumeration Window**: ${matchedState.selfEnumWindowStart} to ${matchedState.selfEnumWindowEnd}\n- **Phase I (Houselisting Fieldwork)**: ${matchedState.phase1Start} to ${matchedState.phase1End}\n- **Phase II (Population Enumeration)**: ${matchedState.phase2Start} to ${matchedState.phase2End}\n- **Districts**: ${matchedState.districtsCount} Districts | Projected Population: ${matchedState.projectedPopulationMillions} Million\n- **Nodal Officer**: ${matchedState.nodalOfficer}\n- **State Helpline**: 📞 \`${matchedState.activeHelpline}\``;

    return {
      id: `ai_${Date.now()}`,
      sender: 'ai',
      text,
      timestamp,
      phaseContext: 'General',
      suggestedQuestions: [
        `Begin Self-Enumeration for ${matchedState.name}`,
        'View full State Tracker table',
        'What questions are asked in Phase 1?',
      ],
    };
  }

  // Default intelligent response
  const fallbackText =
    lang === 'hi'
      ? `धन्यवाद आपके प्रश्न के लिए। जनगणना 2027 भारत का पहला पूर्ण डिजिटल और मोबाइल-आधारित सेंसस है।\n\nआप हमारे पोर्टल पर:\n1. 🏠 **स्व-गणना पोर्टल** में जाकर अपना आधिकारिक SE ID बना सकते हैं।\n2. 🗺️ **राज्य-वार ट्रैकर** में अपने जिले की समय सारिणी देख सकते हैं।\n3. 🔍 **अफवाह निवारक** में किसी भी भ्रामक संदेश की कानूनी सत्यता जांच सकते हैं।\n4. 📊 **नीति सिम्युलेटर** में सरकारी योजनाओं के बजट प्रभाव का मॉडल बना सकते हैं।\n\nकृपया नीचे दिए गए विकल्पों में से चुनें या कोई विशिष्ट प्रश्न पूछें!`
      : `Thank you for your question. Census 2027 is India's historic first fully digital and mobile-enabled census.\n\nYou can explore:\n1. 🏠 **Self-Enumeration Portal**: Complete Phase I & Phase II questions and generate your official SE ID.\n2. 🗺️ **State-Wise Dynamic Tracker**: Check the 15-day pre-survey self-enumeration window for your state.\n3. 🛡️ **AI Rumor Buster**: Fact-check online claims under Section 15 of the Census Act 1948.\n4. 📈 **Policy Simulator**: Dynamically model national welfare scheme allocations (PMAY, Jal Jeevan, Surya Ghar).\n\nWhat specific detail would you like to explore next?`;

  return {
    id: `ai_${Date.now()}`,
    sender: 'ai',
    text: fallbackText,
    timestamp,
    phaseContext: 'General',
    suggestedQuestions: [
      'What are the 31 questions in Phase 1?',
      'How to generate SE ID?',
      'Check State Schedule',
      'Is my data shared with Tax authorities?',
    ],
  };
};
