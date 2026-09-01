export interface SelfEnumerationPayload {
  stateCode: string;
  stateName: string;
  district: string;
  pincode: string;
  headName: string;
  mobileNumber: string;
  houseStructure: string;
  waterSource: string;
  cookingFuel: string;
  solarLighting: string;
  latrineType: string;
  totalMembers: number;
  motherTongue: string;
  casteCategory: string;
  digitalAssets: string[];
  lat: number;
  lng: number;
}

export interface GeneratedSeIdRecord {
  seId: string;
  submissionTimestamp: string;
  securityHash: string;
  qrPayload: string;
  enumeratorAccessCode: string;
  payload: SelfEnumerationPayload;
}

export const generateOfficialSeId = (payload: SelfEnumerationPayload): GeneratedSeIdRecord => {
  const timestamp = new Date().toISOString();
  const randomSuffix = Math.floor(100000 + Math.random() * 900000);
  const statePart = (payload.stateCode || 'DL').toUpperCase();
  const distPart = (payload.district || 'DIST01').slice(0, 3).toUpperCase();
  
  // Official Mock SE ID Format: IND-2027-UP-LKO-849201
  const seId = `IND-2027-${statePart}-${distPart}-${randomSuffix}`;
  
  const securityHash = `SHA256:${btoa(seId + timestamp).slice(0, 16).toUpperCase()}`;
  const enumeratorAccessCode = `${Math.floor(1000 + Math.random() * 9000)}`;

  const qrPayload = JSON.stringify({
    censusYear: 2027,
    seId,
    authCode: enumeratorAccessCode,
    state: payload.stateName,
    district: payload.district,
    head: payload.headName,
    members: payload.totalMembers,
    geo: `${payload.lat.toFixed(5)},${payload.lng.toFixed(5)}`,
    verified: true,
    govSecHash: securityHash,
  });

  const record: GeneratedSeIdRecord = {
    seId,
    submissionTimestamp: new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short',
    }),
    securityHash,
    qrPayload,
    enumeratorAccessCode,
    payload,
  };

  // Save to local storage for persistent pass retrieval
  try {
    localStorage.setItem('census_2027_active_se_id', JSON.stringify(record));
  } catch (e) {
    console.error('Storage error', e);
  }

  return record;
};

export const getStoredSeId = (): GeneratedSeIdRecord | null => {
  try {
    const saved = localStorage.getItem('census_2027_active_se_id');
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};
