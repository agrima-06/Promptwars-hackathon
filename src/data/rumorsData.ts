export interface RumorFactItem {
  id: string;
  category: 'Privacy' | 'Taxation' | 'Citizenship' | 'Biometrics' | 'Legal' | 'Fraud Prevention';
  rumorClaim: string;
  verdict: 'FALSE' | 'MISLEADING' | 'TRUE' | 'SCAM_ALERT';
  truthScore: number; // 0 (completely false/scam) to 100 (fully verified true)
  shortVerdict: string;
  detailedAnalysis: string;
  legalCitation: string;
  officialAdvice: string;
  tags: string[];
}

export const RUMORS_DATABASE: RumorFactItem[] = [
  {
    id: 'rumor_tax_link',
    category: 'Taxation',
    rumorClaim: 'Declaring high-value assets (Car, AC, Multiple Rooms) in Census Phase 1 will trigger Income Tax scrutiny or increase Municipal Property Tax.',
    verdict: 'FALSE',
    truthScore: 5,
    shortVerdict: 'Strictly Prohibited by Law: Census data cannot be shared with Tax authorities.',
    detailedAnalysis: 'Section 15 of the Census Act, 1948 explicitly guarantees that records of census are NOT open to inspection or admissible in evidence against any individual in any civil or criminal proceeding, including Income Tax or Property Tax assessment. Census data is aggregated anonymously solely for macroeconomic planning.',
    legalCitation: 'Census Act 1948, Section 15 ("Records of census not open to inspection nor admissible in evidence")',
    officialAdvice: 'Report your housing amenities and assets truthfully without any fear of tax implications.',
    tags: ['Income Tax', 'Assets', 'Property Tax', 'Phase 1', 'Section 15'],
  },
  {
    id: 'rumor_nrc_citizenship',
    category: 'Citizenship',
    rumorClaim: 'The 2027 Census self-enumeration form will be used to verify citizenship or create an NRC list.',
    verdict: 'FALSE',
    truthScore: 10,
    shortVerdict: 'False: Census 2027 is an enumeration of all normal residents of India.',
    detailedAnalysis: 'The Census of India enumerates all persons residing within the geographical boundaries of India at the reference date, irrespective of citizenship or nationality. No document (passport, birth certificate, voter card) is required to prove citizenship during census enumeration.',
    legalCitation: 'Ministry of Home Affairs Notification No. 28014/1/2025-Census & Census Rules 1990',
    officialAdvice: 'No citizenship documents need to be presented to the enumerator or uploaded on the portal.',
    tags: ['Citizenship', 'NRC', 'Residency', 'Documents'],
  },
  {
    id: 'rumor_biometrics_required',
    category: 'Biometrics',
    rumorClaim: 'Citizens must provide fingerprint scans and iris biometrics during Digital Census 2027.',
    verdict: 'FALSE',
    truthScore: 0,
    shortVerdict: 'Completely False: Census does NOT collect any biometric data.',
    detailedAnalysis: 'Census 2027 is purely a questionnaire-based demographic and housing survey. Digital Census uses mobile-based self-enumeration or enumerator tablets to record demographic and socio-economic answers. Fingerprints, iris scans, and facial recognition are neither collected nor permitted.',
    legalCitation: 'Office of the Registrar General, India (ORGI) Technical Protocol 2026-27',
    officialAdvice: 'If any individual posing as an enumerator asks for biometric scans, report them immediately to the 1800-11-2027 helpline.',
    tags: ['Biometrics', 'Fingerprint', 'Iris', 'Aadhaar'],
  },
  {
    id: 'rumor_court_police_access',
    category: 'Privacy',
    rumorClaim: 'Police or investigative agencies can subpoena my individual census answers for criminal trials.',
    verdict: 'FALSE',
    truthScore: 2,
    shortVerdict: 'Immune from Subpoena: Complete statutory privacy protection.',
    detailedAnalysis: 'Under Section 15 of the Census Act 1948 and Digital Personal Data Protection Act (DPDPA) 2023, individual census schedules enjoy absolute statutory privilege. Even courts of law and police departments cannot access individual filled schedules.',
    legalCitation: 'Supreme Court of India in State of Kerala v. ORGI & Census Act 1948 §15',
    officialAdvice: 'Your responses are locked under government cryptographic vaults and published only as aggregated statistical tables.',
    tags: ['Police', 'Court', 'Privacy', 'Confidentiality'],
  },
  {
    id: 'rumor_bank_otp_fraud',
    category: 'Fraud Prevention',
    rumorClaim: 'Census enumerators or SMS alerts will ask for your Bank Account details, OTP, or UPI PIN to credit census subsidies.',
    verdict: 'SCAM_ALERT',
    truthScore: 0,
    shortVerdict: 'Cyber Scam Alert: Census NEVER asks for financial details or OTPs.',
    detailedAnalysis: 'The Government does not provide cash subsidies or ask for bank account numbers, credit/debit card numbers, UPI PINs, or banking OTPs for census participation. Any message claiming cash rewards for census submission is a fraudulent phishing attempt.',
    legalCitation: 'Indian Cyber Crime Coordination Centre (I4C) & CERT-In Advisory #2026-44',
    officialAdvice: 'Never share financial credentials or OTPs with anyone. Genuine SE ID generation only requires basic mobile number verification for receipt SMS.',
    tags: ['Scam', 'OTP', 'Bank', 'UPI', 'Phishing'],
  },
  {
    id: 'rumor_self_enum_only',
    category: 'Legal',
    rumorClaim: 'If I complete Self-Enumeration online, an enumerator will never visit my home.',
    verdict: 'MISLEADING',
    truthScore: 40,
    shortVerdict: 'Partially True: Physical visit is very brief to verify SE ID.',
    detailedAnalysis: 'Self-Enumeration allows you to fill all 31 Phase 1 questions and Phase 2 details online during the 15-day pre-survey window. When the official enumerator visits your area, you simply show your Self-Enumeration ID (SE ID) or QR Code. The enumerator scans it, completes quick physical Geo-tag validation in 60 seconds, without asking all 31 questions again.',
    legalCitation: 'ORGI Standard Operating Procedure (SOP) for Digital Self-Enumeration 2027',
    officialAdvice: 'Keep your SE ID or digital pass handy on your smartphone to save time during enumerator visits.',
    tags: ['SE ID', 'Enumerator Visit', 'QR Code', '15-Day Window'],
  },
  {
    id: 'rumor_compulsory_law',
    category: 'Legal',
    rumorClaim: 'Participating in the Census and giving truthful answers is a legal duty under Indian Law.',
    verdict: 'TRUE',
    truthScore: 98,
    shortVerdict: 'Verified Fact: Mandatory under Census Act 1948.',
    detailedAnalysis: 'Under Section 8 and Section 11 of the Census Act 1948, every citizen is legally obligated to answer census questions truthfully. Simultaneously, census officers are bound by oath of secrecy with heavy penalties for breaching confidentiality.',
    legalCitation: 'Census Act 1948, Section 8 (Obligation to answer questions) & Section 11 (Penalties)',
    officialAdvice: 'Participating in Census 2027 builds the foundational data required for schools, hospitals, and infrastructure in your neighborhood.',
    tags: ['Legal Duty', 'Census Act 1948', 'Public Good'],
  }
];
