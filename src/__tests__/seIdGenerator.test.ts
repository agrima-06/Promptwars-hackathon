import { describe, it, expect, beforeEach } from 'vitest';
import {
  generateOfficialSeId,
  getStoredSeId,
  clearStoredSeId,
  SelfEnumerationPayload,
} from '../utils/seIdGenerator';

describe('Official Mock SE ID Generator', () => {
  const mockPayload: SelfEnumerationPayload = {
    stateCode: 'UP',
    stateName: 'Uttar Pradesh',
    district: 'Lucknow',
    pincode: '226001',
    headName: 'Ramesh Sharma',
    mobileNumber: '9876543210',
    houseStructure: 'Pucca',
    waterSource: 'Treated Tap Water',
    cookingFuel: 'LPG/PNG',
    solarLighting: 'Yes',
    latrineType: 'Flush Latrine',
    totalMembers: 4,
    motherTongue: 'Hindi',
    casteCategory: 'General',
    digitalAssets: ['Smart Phone', 'Internet'],
    lat: 26.8467,
    lng: 80.9462,
  };

  beforeEach(() => {
    clearStoredSeId();
  });

  it('generates a valid SE ID conforming to the standard IND-2027-[STATE]-[DIST]-XXXXXX format', () => {
    const result = generateOfficialSeId(mockPayload);

    expect(result.seId).toMatch(/^IND-2027-UP-LUC-\d{6}$/);
    expect(result.securityHash).toMatch(/^SHA256:[A-Z0-9+/=]{16}$/);
    expect(result.enumeratorAccessCode).toMatch(/^\d{4}$/);
    expect(result.payload.headName).toBe('Ramesh Sharma');
  });

  it('generates distinct SE IDs for different state and district codes', () => {
    const maharashtraPayload: SelfEnumerationPayload = {
      ...mockPayload,
      stateCode: 'MH',
      stateName: 'Maharashtra',
      district: 'Mumbai City',
    };

    const record1 = generateOfficialSeId(mockPayload);
    const record2 = generateOfficialSeId(maharashtraPayload);

    expect(record1.seId).toContain('IND-2027-UP-LUC');
    expect(record2.seId).toContain('IND-2027-MH-MUM');
    expect(record1.seId).not.toBe(record2.seId);
  });

  it('embeds verifiable cryptographic hash and complete QR payload', () => {
    const result = generateOfficialSeId(mockPayload);
    const qrData = JSON.parse(result.qrPayload);

    expect(qrData.censusYear).toBe(2027);
    expect(qrData.seId).toBe(result.seId);
    expect(qrData.authCode).toBe(result.enumeratorAccessCode);
    expect(qrData.state).toBe('Uttar Pradesh');
    expect(qrData.verified).toBe(true);
    expect(qrData.govSecHash).toBe(result.securityHash);
  });

  it('persists and retrieves generated SE ID from localStorage', () => {
    expect(getStoredSeId()).toBeNull();
    const result = generateOfficialSeId(mockPayload);
    
    const stored = getStoredSeId();
    expect(stored).not.toBeNull();
    expect(stored?.seId).toBe(result.seId);

    clearStoredSeId();
    expect(getStoredSeId()).toBeNull();
  });
});
