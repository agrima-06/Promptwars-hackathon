import { LanguageCode } from '../data/translations';
import { STATES_DATA } from '../data/statesData';
import { formatCensusDate, formatCensusDateRange } from './dateUtils';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  phaseContext?: 'Phase 1' | 'Phase 2' | 'Legal' | 'General';
  suggestedQuestions?: string[];
  speechText?: string;
}

export const INITIAL_CONCIERGE_MESSAGES: Record<LanguageCode, ChatMessage> = {
  en: {
    id: 'msg_welcome_en',
    sender: 'ai',
    text: `🙏 **Namaste! I am Samvaad 2027**, your official GenAI Census Concierge for India's 1st Fully Digital Census.\n\nI am grounded in official **Office of the Registrar General & Census Commissioner, India (ORGI)** protocols and the **Census Act, 1948**.\n\nHow may I help you today?\n- 🏠 **Phase I**: 31 Houselisting & Amenities questions (Pucca/Kutcha, Water, Solar, LPG)\n- 👥 **Phase II**: Population Demographics, Mother Tongue & Caste/Tribe Classification\n- 📱 **Self-Enumeration Portal & SE ID Generation**\n- 🛡️ **Privacy Protections** under Section 15 of Census Act 1948 (Zero Tax/Police sharing)\n- 📅 **State-wise schedules & 15-day pre-survey windows**`,
    timestamp: 'Just now',
    suggestedQuestions: [
      'What are the 31 questions in Phase 1?',
      'How is Pucca vs Kutcha house categorized?',
      'How will Caste and Demographics be enumerated in Phase 2?',
      'Is my Census data shared with Income Tax or Police?',
      'How do I generate my Self-Enumeration ID (SE ID)?',
    ],
  },
  hi: {
    id: 'msg_welcome_hi',
    sender: 'ai',
    text: `🙏 **नमस्ते! मैं संवाद 2027 हूँ**, भारत की प्रथम पूर्ण डिजिटल जनगणना का आधिकारिक एआई सलाहकार।\n\nमैं भारत के **महारजिस्ट्रार कार्यालय (ORGI)** के दिशा-निर्देशों एवं **जनगणना अधिनियम 1948** पर आधारित हूँ।\n\nमैं आपकी किस प्रकार सहायता कर सकता हूँ?\n- 🏠 **चरण I**: मकान सूचीकरण एवं 31 आवासीय प्रश्न (पक्का/कच्चा, जल, सौर ऊर्जा, एलपीजी)\n- 👥 **चरण II**: जनसंख्या जनसांख्यिकी, मातृभाषा एवं जाति वर्गीकरण\n- 📱 **स्व-गणना पोर्टल एवं SE ID निर्माण प्रक्रिया**\n- 🛡️ **कानूनी गोपनीयता**: जनगणना अधिनियम 1948 की धारा 15 (आयकर/पुलिस से पूर्ण सुरक्षा)\n- 📅 **राज्यवार 15-दिवसीय स्व-गणना समय-सारिणी**`,
    timestamp: 'अभी',
    suggestedQuestions: [
      'चरण 1 के 31 मुख्य प्रश्न क्या हैं?',
      'पक्का और कच्चा मकान कैसे तय होता है?',
      'चरण 2 में जाति एवं जनसांख्यिकी गणना कैसे होगी?',
      'क्या जनगणना डेटा आयकर विभाग या पुलिस को दिया जाता है?',
      'मैं अपनी स्व-गणना आईडी (SE ID) कैसे बनाऊं?',
    ],
  },
  ta: {
    id: 'msg_welcome_ta',
    sender: 'ai',
    text: `🙏 **வணக்கம்! நான் சம்வாத் 2027 (Samvaad 2027)**, இந்தியாவின் முதல் முழு டிஜிட்டல் மக்கள் தொகை கணக்கெடுப்புக்கான உங்கள் அதிகாரப்பூர்வ AI ஆலோசகர்.\n\nகட்டம் 1 வீட்டு வசதிகள் (31 கேள்விகள்), கட்டம் 2 மக்கள் தொகை மற்றும் சாதி கணக்கெடுப்பு, சுய கணக்கெடுப்பு ஐடி (SE ID), மற்றும் 1948 கணக்கெடுப்புச் சட்டத்தின் பிரிவு 15 பாதுகாப்பு பற்றிய கேள்விகளுக்கு நான் பதிலளிக்கிறேன்.`,
    timestamp: 'இப்போது',
    suggestedQuestions: [
      'கட்டம் 1-ல் கேட்கப்படும் 31 கேள்விகள் யாவை?',
      'பக்கா vs கச்சா வீடு எப்படி வகைப்படுத்தப்படுகிறது?',
      'SE ID ஐடி எப்படி பெறுவது?',
      'கணக்கெடுப்பு தரவு வருமான வரித்துறைக்கு அனுப்பப்படுமா?',
    ],
  },
  te: {
    id: 'msg_welcome_te',
    sender: 'ai',
    text: `🙏 **నమస్కారం! నేను సంవాద్ 2027**, భారతదేశపు మొట్టమొదటి డిజిటల్ జనగణన అధికారిక AI సహాయకుడిని.\n\nదశ 1 గృహ వసతులు (31 ప్రశ్నలు), దశ 2 జనాభా & కుల గణన, SE ID వివరాలు, మరియు 1948 జనగణన చట్టం సెక్షన్ 15 గోప్యత రక్షణపై సమాచారం అందించడానికి సిద్ధంగా ఉన్నాను.`,
    timestamp: 'ఇప్పుడు',
    suggestedQuestions: [
      'దశ 1 లోని 31 ప్రశ్నలు ఏమిటి?',
      'పక్కా vs కచ్చా ఇల్లు ఎలా వర్గీకరిస్తారు?',
      'నా SE ID ని ఎలా సృష్టించుకోవాలి?',
      'జనగణన సమాచారం గోప్యంగా ఉంటుందా?',
    ],
  },
  bn: {
    id: 'msg_welcome_bn',
    sender: 'ai',
    text: `🙏 **নমস্কার! আমি সংবাদ ২০২৭**, ভারতের প্রথম ডিজিটাল আদমশুমারির জন্য সরকারি এআই সহায়ক।\n\nপর্যায় ১ গৃহতালিকা (৩১টি প্রশ্ন), পর্যায় ২ জনসংখ্যা ও জাতিগত গণনা, এবং ১৯৪৮ সালের আদমশুমারি আইনের ১৫ ধারা অনুযায়ী ১০০% গোপনীয়তা সংক্রান্ত যেকোনো তথ্যে আমি আপনাকে সাহায্য করব।`,
    timestamp: 'এখন',
    suggestedQuestions: [
      'পর্যায় ১-এর ৩১টি প্রশ্ন কী কী?',
      'পাকা বনাম কাঁচা বাড়ি কীভাবে নির্ধারিত হয়?',
      'আমি কীভাবে SE ID তৈরি করব?',
      'আদমশুমারির তথ্য কি আয়কর বিভাগের সাথে শেয়ার করা হয়?',
    ],
  },
  mr: {
    id: 'msg_welcome_mr',
    sender: 'ai',
    text: `🙏 **नमस्कार! मी संवाद २०२७ आहे**, भारताच्या पहिल्या पूर्ण डिजिटल जनगणनेचा अधिकृत एआय सहाय्यक.\n\nटप्पा १ घरयादी (३१ प्रश्न), टप्पा २ लोकसंख्या व जातनिहाय आकडेवारी, SE ID निर्मिती आणि जनगणना कायदा १९४८ कलम १५ अंतर्गत गोपनीयता संरक्षणाबाबत विचारा.`,
    timestamp: 'आत्ता',
    suggestedQuestions: [
      'टप्पा १ मधील ३१ प्रश्न कोणते आहेत?',
      'पक्के विरूद्ध कच्चे घर कसे ठरवले जाते?',
      'मी माझा SE ID कसा मिळवू?',
      'माहिती आयकर विभागाला दिली जाते का?',
    ],
  },
  gu: {
    id: 'msg_welcome_gu',
    sender: 'ai',
    text: `🙏 **નમસ્તે! હું સંવાદ ૨૦૨૭ છું**, ભારતના પ્રથમ ડિજિટલ સેન્સસનો સત્તાવાર AI સહાયક.\n\nતબક્કો ૧ આવાસ સુવિધાઓ (૩૧ પ્રશ્નો), તબક્કો ૨ વસ્તી અને જ્ઞાતિ ગણતરી, SE ID બનાવવા તથા સેન્સસ એક્ટ ૧૯૪૮ કલમ ૧૫ હેઠળ ગોપનીયતા નિયમો વિશે પૂછો.`,
    timestamp: 'હમણાં',
    suggestedQuestions: [
      'તબક્કો ૧ ના ૩૧ પ્રશ્નો કયા છે?',
      'પાકા અને કાચા મકાનનું વર્ગીકરણ કેવી રીતે થાય છે?',
      'મારો SE ID કેવી રીતે જનરેટ કરવો?',
      'શું આ ડેટા ઇન્કમટેક્સને આપવામાં આવે છે?',
    ],
  },
  kn: {
    id: 'msg_welcome_kn',
    sender: 'ai',
    text: `🙏 **ನಮಸ್ಕಾರ! ನಾನು ಸಂವಾದ 2027**, ಭಾರತದ ಪ್ರಥಮ ಡಿಜಿಟಲ್ ಜನಗಣತಿಯ ಅಧಿಕೃತ AI ಸಹಾಯಕ.\n\nಹಂತ 1 ವಸತಿ ಸೌಲಭ್ಯಗಳು (31 ಪ್ರಶ್ನೆಗಳು), ಹಂತ 2 ಜನಸಂಖ್ಯೆ & ಜಾತಿ ವಿವರಗಳು, SE ID ರಚನೆ ಹಾಗೂ ಜನಗಣತಿ ಕಾಯ್ದೆ 1948 ಸೆಕ್ಷನ್ 15 ರ ಗೌಪ್ಯತೆ ನಿಯಮಗಳ ಕುರಿತು ಮಾಹಿತಿ ಪಡೆಯಿರಿ.`,
    timestamp: 'ಈಗ',
    suggestedQuestions: [
      'ಹಂತ 1 ರ 31 ಪ್ರಶ್ನೆಗಳು ಯಾವುವು?',
      'ಪಕ್ಕಾ ಮತ್ತು ಕಚ್ಚಾ ಮನೆಯನ್ನು ಹೇಗೆ ನಿರ್ಧರಿಸಲಾಗುತ್ತದೆ?',
      'ನನ್ನ SE ID ಅನ್ನು ಹೇಗೆ ಪಡೆಯುವುದು?',
      'ಜನಗಣತಿ ಮಾಹಿತಿ ಕಾನೂನುಬದ್ಧವಾಗಿ ಸುರಕ್ಷಿತವಾಗಿದೆಯೇ?',
    ],
  },
};

export const generateConciergeResponse = (
  userQuery: string,
  lang: LanguageCode = 'en'
): ChatMessage => {
  const queryLower = userQuery.toLowerCase().trim();
  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // 1. Phase 1 - 31 Questions & Categories
  if (
    queryLower.includes('31 question') ||
    queryLower.includes('phase 1 questions') ||
    queryLower.includes('phase i questions') ||
    queryLower.includes('31 प्रश्न') ||
    queryLower.includes('चरण 1 के प्रश्न') ||
    queryLower.includes('houselisting questions')
  ) {
    const text =
      lang === 'hi'
        ? `🏠 **जनगणना 2027: चरण I (मकान सूचीकरण के 31 आधिकारिक प्रश्न)**\n\nभारत के महारजिस्ट्रार कार्यालय (ORGI) के अनुसार चरण 1 में 5 श्रेणियों में 31 प्रश्न पूछे जाते हैं:\n\n1. **भवन व संरचना**: भवन संख्या, जनगणना मकान संख्या, छत/दीवार/फर्श की सामग्री (पक्का/कच्चा), मकान की स्थिति (अच्छी/रहने योग्य/जर्जर)।\n2. **उपयोग व स्वामित्व**: मकान का उपयोग (आवासीय/व्यावसायिक), परिवारों की संख्या, स्वामित्व (अपना/किराया), कमरे।\n3. **पेयजल व स्वच्छता (जल जीवन मिशन)**: पेयजल का मुख्य स्रोत (उपचारित नल/हैंडपंप/कुआं), स्रोत की दूरी (परिसर में/निकट/दूर), शौचालय का प्रकार (सेप्टिक टैंक/सीवर/ट्विन पिट), अपशिष्ट जल निकासी।\n4. **स्वच्छ ऊर्जा व बिजली (पीएम सूर्य घर)**: बिजली स्रोत, ग्रिड-कनेक्टेड रूफटॉप सोलर, मुख्य रसोई ईंधन (एलपीजी/पीएनजी/इंडक्शन/बायोगैस)।\n5. **डिजिटल व भौतिक संपत्तियां**: स्मार्टफोन (4G/5G), फाइबर ब्रॉडबैंड इंटरनेट, लैपटॉप/टैबलेट, स्मार्ट टीवी, रेफ्रिजरेटर, 2-व्हीलर/कार/EV, मुख्य खाद्यान्न।`
        : `🏠 **Census 2027: Phase I (31 Official Houselisting Parameters)**\n\nAccording to official ORGI guidelines, Phase I covers 31 parameters across 5 strategic pillars:\n\n1. **Building & Structure**: Building Number, Census House Number, Predominant Material of Floor, Wall & Roof (Pucca, Semi-Pucca, Kutcha), Condition of House.\n2. **House Use & Possession**: Census house usage (Residential, Residence-cum-work), Household Number, Ownership (Owned, Rented), Exclusive dwelling rooms, Residing married couples.\n3. **Drinking Water & Sanitation (Jal Jeevan Mission)**: Main drinking water source (Treated tap water, Handpump, Well), Location of water source (Within premises, Near, Away), Latrine type (Flush connected to piped sewer/septic tank, Twin pit, Community latrine), Drainage connectivity.\n4. **Clean Energy & Solar (PM Surya Ghar & Ujjwala)**: Electricity connection, Grid-tied Rooftop Solar (PM Surya Ghar), Main cooking fuel (LPG/PNG, Induction, Bio-gas).\n5. **Digital Assets & Mobility**: Smartphone with 4G/5G internet, Fiber broadband Wi-Fi, Laptop/Tablet, Smart TV, Refrigerator, 2-Wheeler (EV), 4-Wheeler (EV), Staple cereal consumed.`;

    return {
      id: `ai_${Date.now()}`,
      sender: 'ai',
      text,
      timestamp,
      phaseContext: 'Phase 1',
      suggestedQuestions: [
        'How is Pucca vs Kutcha house categorized?',
        'How does PM Surya Ghar solar tracking work?',
        'How do I generate my Self-Enumeration ID (SE ID)?',
      ],
    };
  }

  // 2. Pucca vs Semi-Pucca vs Kutcha Definition
  if (
    queryLower.includes('pucca') ||
    queryLower.includes('kutcha') ||
    queryLower.includes('semi-pucca') ||
    queryLower.includes('wall/roof') ||
    queryLower.includes('पक्का') ||
    queryLower.includes('कच्चा')
  ) {
    const text =
      lang === 'hi'
        ? `🧱 **मकान संरचना का वर्गीकरण (पक्का, अर्ध-पक्का एवं कच्चा)**\n\n- **पक्का मकान**: वे मकान जिनकी दीवारें और छतें स्थायी और टिकाऊ सामग्री से बनी हों।\n  - *दीवारें*: पक्की ईंटें, पत्थर के ब्लॉक, कंक्रीट (RCC) या जीआई शीट।\n  - *छत*: आरसीसी कंक्रीट, पक्की टाइलें या मशीन-निर्मित टाइलें।\n- **अर्ध-पक्का (Semi-Pucca)**: जिनकी दीवारें पक्की ईंट/पत्थर की हों परंतु छत एस्बेस्टस/टिन/लकड़ी की हो (या इसके विपरीत)।\n- **कच्चा मकान**: वे आवास जो पारंपरिक गैर-टिकाऊ सामग्री (मिट्टी, कच्ची ईंट, घास-फूस, बांस, सरकंडा, या प्लास्टिक शीट) से बने हों।`
        : `🧱 **Classification of Housing Structures (Pucca vs. Kutcha)**\n\n- **Pucca House**: Structures whose walls and roofs are made of permanent, durable materials.\n  - *Walls*: Burnt bricks, stone blocks, reinforced concrete, or cement blocks.\n  - *Roof*: Reinforced Cement Concrete (RCC), machine-made tiles, or concrete sheets.\n- **Semi-Pucca House**: Houses with durable walls of brick/stone but non-permanent roofs (timber, tin/asbestos sheets), or vice versa.\n- **Kutcha House**: Traditional dwellings built with non-durable materials (mud, unburnt bricks, thatch, bamboo, reeds, or plastic sheets).\n\n💡 *This metric directly drives national housing allocations under the Pradhan Mantri Awas Yojana (PMAY).*`;

    return {
      id: `ai_${Date.now()}`,
      sender: 'ai',
      text,
      timestamp,
      phaseContext: 'Phase 1',
      suggestedQuestions: [
        'What are the 31 questions in Phase 1?',
        'How is Jal Jeevan tap water recorded?',
        'Generate my SE ID now',
      ],
    };
  }

  // 3. Phase 2 (Demographics & Caste / Tribe)
  if (
    queryLower.includes('caste') ||
    queryLower.includes('tribe') ||
    queryLower.includes('phase 2') ||
    queryLower.includes('phase ii') ||
    queryLower.includes('demographic') ||
    queryLower.includes('जाति') ||
    queryLower.includes('चरण 2')
  ) {
    const text =
      lang === 'hi'
        ? `👥 **जनगणना 2027: चरण II (जनसंख्या जनसांख्यिकी एवं जाति वर्गीकरण)**\n\nचरण II की मुख्य जनसंख्या गणना **9 फरवरी से 28 फरवरी 2027** तक आयोजित होगी:\n\n- **सामाजिक श्रेणी व जाति**: संविधान के अनुच्छेद 341/342 एवं राष्ट्रपति/राज्य गजट अधिसूचनाओं के अनुरूप सामान्य (General), अन्य पिछड़ा वर्ग (OBC / SEBC), अनुसूचित जाति (SC), अनुसूचित जनजाति (ST), एवं ईडब्ल्यूएस (EWS)।\n- **प्रमाणपत्र की आवश्यकता नहीं**: नागरिक द्वारा दी गई स्व-घोषणा को निष्ठापूर्वक दर्ज किया जाता है।\n- **जनसांख्यिकी**: प्रत्येक सदस्य का नाम, आयु, लिंग, वैवाहिक स्थिति, जन्म स्थान, मातृभाषा, अन्य ज्ञात भाषाएं।\n- **साक्षरता व कार्य**: शैक्षिक योग्यता, मुख्य/सीमांत श्रमिक, उद्योग क्षेत्र एवं डिजिटल भुगतान (UPI/DigiLocker) उपयोग।`
        : `👥 **Census 2027: Phase II (Population Demographics & Caste Enumeration)**\n\nPhase II fieldwork is scheduled nationwide from **February 9 to February 28, 2027**:\n\n- **Social Category & Caste**: Classification as **General, OBC / SEBC (Other Backward Classes), SC (Scheduled Caste), ST (Scheduled Tribe), or EWS (Economically Weaker Sections)** in strict accordance with constitutional orders (Articles 341 & 342) and official State Gazette notifications.\n- **Zero Document Burden**: Citizens do not need to produce caste certificates; self-declarations by the head of the household are recorded faithfully.\n- **Demographics**: Name, age, sex, relationship to head, marital status, mother tongue, subsidiary languages known.\n- **Education & Economic Activity**: Highest educational attainment, occupation sector (Main worker $\\ge 6$ months vs. Marginal), and active UPI/DigiLocker adoption.\n\n🛡️ *All responses are 100% confidential under Section 15 of the Census Act, 1948.*`;

    return {
      id: `ai_${Date.now()}`,
      sender: 'ai',
      text,
      timestamp,
      phaseContext: 'Phase 2',
      suggestedQuestions: [
        'Is my Census data shared with Income Tax or Police?',
        'How do I generate my Self-Enumeration ID (SE ID)?',
        'When does Phase 2 start in my state?',
      ],
    };
  }

  // 4. Section 15 Legal Protection & Privacy
  if (
    queryLower.includes('section 15') ||
    queryLower.includes('privacy') ||
    queryLower.includes('tax') ||
    queryLower.includes('income tax') ||
    queryLower.includes('police') ||
    queryLower.includes('court') ||
    queryLower.includes('धारा 15') ||
    queryLower.includes('गोपनीयता') ||
    queryLower.includes('आयकर')
  ) {
    const text =
      lang === 'hi'
        ? `🛡️ **जनगणना अधिनियम 1948 की धारा 15: सर्वोच्च वैधानिक गोपनीयता संरक्षण**\n\n- **आयकर / जीएसटी से पूर्ण सुरक्षा**: आपका व्यक्तिगत जनगणना डेटा आयकर विभाग, जीएसटी या नगर निगम के साथ साझा **नहीं** किया जा सकता। उच्च संपत्ति (AC/कार) दर्शाने से कोई कर जांच नहीं होगी।\n- **अदालतों में अप्रवेश्य (Inadmissible in Court)**: किसी भी पुलिस एजेंसी या न्यायालय द्वारा दीवानी या आपराधिक मुकदमों में जनगणना प्रपत्रों का साक्ष्य के रूप में उपयोग नहीं किया जा सकता।\n- **केवल अनामीकृत सांख्यिकी**: डेटा को केवल राष्ट्रीय कल्याणकारी योजनाओं (जल, आवास, विद्यालय, अस्पताल) के नीति निर्धारण हेतु संकलित किया जाता है।`
        : `🛡️ **Statutory Privacy Guarantee: Section 15 of the Census Act, 1948**\n\n- **Zero Tax Authority Sharing**: Census records are legally shielded. They CANNOT be inspected by or shared with the Income Tax Department, GST, or Municipal Property Tax bodies. Declaring assets (cars, AC, rooms) will **never** trigger tax scrutiny.\n- **Inadmissible in Courts**: Section 15 explicitly provides that individual census schedules are strictly privileged and cannot be subpoenaed by police or courts as evidence in any civil or criminal proceeding.\n- **Anonymized Aggregation**: All data is encrypted and published only as aggregated macro-economic statistics for schools, hospitals, and welfare infrastructure planning.`;

    return {
      id: `ai_${Date.now()}`,
      sender: 'ai',
      text,
      timestamp,
      phaseContext: 'Legal',
      suggestedQuestions: [
        'Is biometric data collected in Census 2027?',
        'How does the 15-day pre-survey window work?',
        'Generate official SE ID card',
      ],
    };
  }

  // 5. SE ID Generation & Enumerator Visit Flow
  if (
    queryLower.includes('se id') ||
    queryLower.includes('self-enumeration') ||
    queryLower.includes('self enumeration') ||
    queryLower.includes('qr code') ||
    queryLower.includes('how to generate') ||
    queryLower.includes('एसई आईडी') ||
    queryLower.includes('स्व-गणना')
  ) {
    const text =
      lang === 'hi'
        ? `📱 **स्व-गणना पहचान (SE ID) एवं सत्यापन प्रक्रिया**\n\n1. **ऑनलाइन भरें**: अपने राज्य की 15-दिवसीय विंडो के दौरान हमारे 'स्व-गणना पोर्टल' पर 4 सरल चरणों में विवरण भरें।\n2. **SE ID प्राप्त करें**: सबमिशन पर आपको 16-अंकीय SE ID (उदा. \`IND-2027-UP-LKO-849201\`) और एक डिजिटल QR कोड पास मिलेगा।\n3. **प्रगणक का त्वरित सत्यापन**: जब आधिकारिक प्रगणक आपके घर आएं, तो बस यह QR कोड या SE ID दिखाएं। प्रगणक अपने टैबलेट से 60 सेकंड में स्कैन कर सत्यापन पूरा कर लेंगे, बिना दोबारा 31 प्रश्न पूछे!`
        : `📱 **Self-Enumeration ID (SE ID) & Fieldwork Flow**\n\n1. **Pre-fill Online**: Access the Self-Enumeration portal during your state's active 15-day pre-survey window.\n2. **Generate Official SE ID**: Upon completing Phase 1 housing questions, Phase 2 demographics, and GIS map pinning, you receive a unique SE ID (e.g. \`IND-2027-UP-LKO-849201\`) with an encrypted QR Code pass.\n3. **60-Second Enumerator Scan**: When the official Census Enumerator visits your home, present your digital pass on your smartphone. The enumerator scans it on their official tablet in under 60 seconds without re-asking all 31 questions!`;

    return {
      id: `ai_${Date.now()}`,
      sender: 'ai',
      text,
      timestamp,
      phaseContext: 'General',
      suggestedQuestions: [
        'Open Self-Enumeration Wizard',
        'Check my state 15-day window',
        'What are the 31 questions in Phase 1?',
      ],
    };
  }

  // 6. Biometrics / Scams / Document Verification
  if (
    queryLower.includes('biometric') ||
    queryLower.includes('fingerprint') ||
    queryLower.includes('iris') ||
    queryLower.includes('document') ||
    queryLower.includes('scam') ||
    queryLower.includes('बायोमेट्रिक')
  ) {
    const text =
      lang === 'hi'
        ? `🚫 **बायोमेट्रिक एवं धोखाधड़ी संबंधी महत्वपूर्ण तथ्य**\n\n- **कोई बायोमेट्रिक नहीं**: जनगणना 2027 में फिंगरप्रिंट, आईरिस या फेशियल रिकॉग्निशन एकत्र **नहीं** किया जाता। यह केवल प्रश्नावली आधारित सर्वेक्षण है।\n- **कोई दस्तावेज अनिवार्य नहीं**: जन्म प्रमाण पत्र, पासपोर्ट या जाति प्रमाण पत्र दिखाने की आवश्यकता नहीं है।\n- **बैंकिंग धोखाधड़ी से सावधान**: जनगणना विभाग कभी भी बैंक खाता संख्या, यूपीआई पिन या ओटीपी नहीं मांगता। यदि कोई प्रगणक वित्तीय जानकारी मांगे, तो तुरंत हेल्पलाइन **1800-11-2027** पर रिपोर्ट करें।`
        : `🚫 **Biometrics & Cyber Fraud Guidelines**\n\n- **No Biometrics Collected**: Census 2027 does NOT capture fingerprints, iris scans, or facial recognition. It is purely a socio-economic questionnaire.\n- **Zero Document Verification**: You do not need to show birth certificates, passports, or caste certificates during census enumeration.\n- **Cyber Scam Warning**: The Census Department NEVER requests Bank Account numbers, UPI PINs, or Financial OTPs. If anyone asks for financial details, report them immediately to **1800-11-2027**.`;

    return {
      id: `ai_${Date.now()}`,
      sender: 'ai',
      text,
      timestamp,
      phaseContext: 'Legal',
      suggestedQuestions: [
        'Check Section 15 privacy protections',
        'What are the 31 questions in Phase 1?',
        'Check my state schedule',
      ],
    };
  }

  // 7. State Lookup Match
  const matchedState = STATES_DATA.find(
    (s) =>
      queryLower.includes(s.name.toLowerCase()) ||
      queryLower.includes(s.code.toLowerCase()) ||
      queryLower.includes(s.capital.toLowerCase())
  );

  if (matchedState) {
    const statusText =
      matchedState.status === 'active'
        ? '🟢 **15-Day Self-Enumeration Window is CURRENTLY OPEN!**'
        : '🟡 **Upcoming Self-Enumeration Window**';

    const text = `📍 **Official Census 2027 Schedule for ${matchedState.name} (${matchedState.code})**\n\n${statusText}\n\n- **15-Day Self-Enumeration Window**: \`${formatCensusDate(matchedState.selfEnumWindowStart)}\` to \`${formatCensusDate(matchedState.selfEnumWindowEnd)}\`\n- **Phase I (Houselisting Fieldwork)**: ${formatCensusDate(matchedState.phase1Start)} to ${formatCensusDate(matchedState.phase1End)}\n- **Phase II (Population Enumeration)**: ${formatCensusDate(matchedState.phase2Start)} to ${formatCensusDate(matchedState.phase2End)}\n- **Administrative Coverage**: ${matchedState.districtsCount} Districts | Projected Population: ${matchedState.projectedPopulationMillions} M\n- **Jal Jeevan Tap Water**: ${matchedState.jalJeevanCoveragePct}% | **PM Surya Ghar Solar**: ${matchedState.pmSuryaGharSolarPct}%\n- **State Census Control Room Helpline**: 📞 \`${matchedState.activeHelpline}\`\n- **Nodal Officer**: ${matchedState.nodalOfficer}`;

    return {
      id: `ai_${Date.now()}`,
      sender: 'ai',
      text,
      timestamp,
      phaseContext: 'General',
      suggestedQuestions: [
        `Begin Self-Enumeration for ${matchedState.name}`,
        'View full State Tracker table',
        'What are the 31 questions in Phase 1?',
      ],
    };
  }

  // Default Fallback
  const defaultText =
    lang === 'hi'
      ? `धन्यवाद! मैं संवाद 2027 हूँ। जनगणना 2027 भारत का पहला पूर्ण डिजिटल सेंसस है।\n\nआप मुझसे चरण I के 31 आवास प्रश्नों, चरण II की जाति व जनसांख्यिकी गणना, धारा 15 कानूनी गोपनीयता, स्व-गणना SE ID निर्माण या अपने राज्य की समय-सारिणी के बारे में पूछ सकते हैं।`
      : `Thank you! I am Samvaad 2027. Census 2027 is India's historic first fully digital national enumeration.\n\nYou can ask me about the 31 Phase I housing parameters, Phase II demographics & caste enumeration, Section 15 privacy immunities, SE ID generation, or your state's active 15-day pre-survey window.`;

  return {
    id: `ai_${Date.now()}`,
    sender: 'ai',
    text: defaultText,
    timestamp,
    phaseContext: 'General',
    suggestedQuestions: [
      'What are the 31 questions in Phase 1?',
      'How is Pucca vs Kutcha house categorized?',
      'Is my Census data shared with Income Tax or Police?',
      'How do I generate my Self-Enumeration ID (SE ID)?',
    ],
  };
};

export const processUserConciergeQuery = generateConciergeResponse;

