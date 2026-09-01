import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../../context/LanguageContext';
import { STATES_DATA } from '../../data/statesData';
import { PHASE_1_QUESTIONS, PHASE_2_QUESTIONS } from '../../data/censusQuestions';
import {
  generateOfficialSeId,
  getStoredSeId,
  GeneratedSeIdRecord,
  SelfEnumerationPayload,
} from '../../utils/seIdGenerator';
import { createSpeechRecognizer } from '../../utils/speechUtils';
import {
  CheckCircle2,
  Lock,
  MapPin,
  Smartphone,
  Home,
  Users,
  ShieldCheck,
  QrCode,
  Download,
  Share2,
  Sparkles,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Mic,
  Navigation,
  Printer,
} from 'lucide-react';

interface SelfEnumerationWizardProps {
  initialStateCode?: string;
  onDone?: () => void;
}

export const SelfEnumerationWizard: React.FC<SelfEnumerationWizardProps> = ({
  initialStateCode,
}) => {
  const { currentLanguage, t } = useLanguage();

  // Wizard Steps: 1: Auth/OTP -> 2: Phase 1 (Housing) -> 3: Phase 2 (Demographics) -> 4: Geo-Tagging -> 5: Certificate Result
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [mobileNumber, setMobileNumber] = useState('9876543210');
  const [otpCode, setOtpCode] = useState('2027');
  const [isOtpVerified, setIsOtpVerified] = useState(true);
  const [privacyAgreed, setPrivacyAgreed] = useState(true);

  const [selectedStateCode, setSelectedStateCode] = useState(initialStateCode || 'UP');
  const [districtName, setDistrictName] = useState('Lucknow');
  const [pincode, setPincode] = useState('226001');

  // Phase 1 values
  const [houseStructure, setHouseStructure] = useState('pucca_concrete');
  const [ownership, setOwnership] = useState('owned');
  const [roomsCount, setRoomsCount] = useState(3);
  const [waterSource, setWaterSource] = useState('piped_tap_premises');
  const [solarLighting, setSolarLighting] = useState('grid_plus_solar');
  const [latrineType, setLatrineType] = useState('flush_septic_tank');
  const [cookingFuel, setCookingFuel] = useState('lpg_png_piped');
  const [digitalAssets, setDigitalAssets] = useState<string[]>([
    'smartphone',
    'broadband_wifi',
    'smart_tv',
    'two_wheeler',
  ]);

  // Phase 2 values
  const [headName, setHeadName] = useState('Aarav Sharma');
  const [totalMembers, setTotalMembers] = useState(4);
  const [motherTongue, setMotherTongue] = useState('Hindi');
  const [casteCategory, setCasteCategory] = useState('general');
  const [highestEducation, setHighestEducation] = useState('graduate');
  const [economicActivity, setEconomicActivity] = useState('salaried_pvt');
  const [digitalPayment, setDigitalPayment] = useState('frequent_upi');

  // Step 4: Geolocation
  const [lat, setLat] = useState<number>(26.8467);
  const [lng, setLng] = useState<number>(80.9462);
  const [isLocating, setIsLocating] = useState(false);

  // Generated Certificate
  const [generatedResult, setGeneratedResult] = useState<GeneratedSeIdRecord | null>(() => getStoredSeId());

  // Voice Form Helper
  const [activeVoiceField, setActiveVoiceField] = useState<string | null>(null);

  const handleVoiceInputForField = (fieldName: string, setter: (val: any) => void) => {
    setActiveVoiceField(fieldName);
    const recognizer = createSpeechRecognizer(currentLanguage);
    recognizer.start(
      (transcript) => {
        setActiveVoiceField(null);
        if (transcript) {
          setter(transcript);
        }
      },
      () => setActiveVoiceField(null)
    );
  };

  const handleDetectGPS = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude);
        setLng(pos.coords.longitude);
        setIsLocating(false);
      },
      (err) => {
        console.warn('GPS detection failed, using state centroid', err);
        setIsLocating(false);
      }
    );
  };

  const toggleDigitalAsset = (asset: string) => {
    setDigitalAssets((prev) =>
      prev.includes(asset) ? prev.filter((a) => a !== asset) : [...prev, asset]
    );
  };

  const handleFinalSubmit = () => {
    const matchedState = STATES_DATA.find((s) => s.code === selectedStateCode) || STATES_DATA[0];

    const payload: SelfEnumerationPayload = {
      stateCode: selectedStateCode,
      stateName: matchedState.name,
      district: districtName,
      pincode,
      headName,
      mobileNumber,
      houseStructure,
      waterSource,
      cookingFuel,
      solarLighting,
      latrineType,
      totalMembers,
      motherTongue,
      casteCategory,
      digitalAssets,
      lat,
      lng,
    };

    const record = generateOfficialSeId(payload);
    setGeneratedResult(record);
    setCurrentStep(5);

    // Trigger celebratory confetti burst!
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FF9933', '#FFFFFF', '#138808', '#0F2C59', '#38BDF8'],
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  const steps = [
    { num: 1, label: t('step1') },
    { num: 2, label: t('step2') },
    { num: 3, label: t('step3') },
    { num: 4, label: t('step4') },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Step Progress Tracker */}
      <div
        className="glass-card"
        style={{
          padding: '1.25rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--saffron-500) 0%, var(--saffron-600) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
            }}
          >
            <ShieldCheck size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.3rem' }}>Simulated Self-Enumeration Portal</h2>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              15-Day Pre-Survey Window • Privacy Preserved under Section 15 of Census Act 1948
            </p>
          </div>
        </div>

        {/* Steps Pills */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {steps.map((s) => {
            const isCompleted = currentStep > s.num || currentStep === 5;
            const isCurrent = currentStep === s.num;
            return (
              <div
                key={s.num}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.35rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  background: isCurrent
                    ? 'var(--navy-800)'
                    : isCompleted
                    ? 'rgba(16, 185, 129, 0.15)'
                    : 'var(--bg-tertiary)',
                  color: isCurrent
                    ? '#ffffff'
                    : isCompleted
                    ? '#059669'
                    : 'var(--text-muted)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  border: isCurrent ? '1px solid var(--border-glow)' : '1px solid transparent',
                }}
              >
                {isCompleted ? <CheckCircle2 size={13} /> : <span>{s.num}.</span>}
                <span>{s.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* STEP 1: Verification & Mobile */}
      {currentStep === 1 && (
        <div className="glass-card" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Step 1: Citizen Mobile Verification & State Selection</h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Enter your mobile number to receive your electronic Self-Enumeration ID and digital acknowledgment pass.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
            {/* State Select */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                State / Union Territory
              </label>
              <select
                value={selectedStateCode}
                onChange={(e) => setSelectedStateCode(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--bg-tertiary)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                }}
              >
                {STATES_DATA.map((s) => (
                  <option key={s.code} value={s.code}>
                    {s.name} ({s.code}) - {s.status === 'active' ? '🟢 Window Open' : '🟡 Upcoming'}
                  </option>
                ))}
              </select>
            </div>

            {/* District */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                District Name
              </label>
              <input
                type="text"
                value={districtName}
                onChange={(e) => setDistrictName(e.target.value)}
                placeholder="e.g. Lucknow, Pune, Chennai"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--bg-tertiary)',
                  color: 'var(--text-primary)',
                }}
              />
            </div>

            {/* Mobile Number */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                Mobile Number (for SMS & SE ID)
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="tel"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="Enter 10-digit mobile number"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem 0.75rem 2.5rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-subtle)',
                    background: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                  }}
                />
                <Smartphone size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              </div>
            </div>

            {/* OTP Simulator */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                Simulated OTP Verification
              </label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-subtle)',
                    background: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    letterSpacing: '4px',
                    fontWeight: 700,
                  }}
                />
                <button
                  className="btn btn-green"
                  style={{ padding: '0.65rem 1rem' }}
                  onClick={() => setIsOtpVerified(true)}
                >
                  <CheckCircle2 size={16} /> Verified
                </button>
              </div>
            </div>
          </div>

          {/* Privacy Consent Box */}
          <div
            style={{
              background: 'rgba(15, 44, 89, 0.06)',
              border: '1px solid var(--border-glow)',
              padding: '1rem',
              borderRadius: 'var(--radius-sm)',
              marginBottom: '1.5rem',
              display: 'flex',
              gap: '0.75rem',
              alignItems: 'flex-start',
            }}
          >
            <input
              type="checkbox"
              id="privacyCheck"
              checked={privacyAgreed}
              onChange={(e) => setPrivacyAgreed(e.target.checked)}
              style={{ marginTop: '0.2rem', width: '18px', height: '18px', cursor: 'pointer' }}
            />
            <label htmlFor="privacyCheck" style={{ fontSize: '0.85rem', cursor: 'pointer', lineHeight: '1.5' }}>
              <strong>Statutory Confidentiality Consent:</strong> I understand that under <strong>Section 15 of the Census Act, 1948</strong>, my responses are 100% confidential, protected from court/tax inspections, and used exclusively for national demographic planning.
            </label>
          </div>

          {/* Navigation Button */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              className="btn btn-primary"
              disabled={!privacyAgreed || !isOtpVerified}
              onClick={() => setCurrentStep(2)}
            >
              <span>Proceed to Phase I (Housing Amenities)</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Phase I - Housing Amenities */}
      {currentStep === 2 && (
        <div className="glass-card" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem' }}>Step 2: Phase I - Housing Amenities & Structure (31 Questions)</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                Physical housing condition, drinking water, clean cooking energy, sanitation, and household assets.
              </p>
            </div>
            <span className="status-badge status-active">Phase I Standard</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '1.75rem' }}>
            {/* Structure Type */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                1. Predominant Material of Roof, Wall & Floor (Structure Type)
              </label>
              <select
                value={houseStructure}
                onChange={(e) => setHouseStructure(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
              >
                <option value="pucca_concrete">Pucca (RCC Concrete Roof & Burnt Brick/Stone Walls)</option>
                <option value="pucca_tiled">Pucca (Tiled/GI Sheet with Brick Wall)</option>
                <option value="semi_pucca">Semi-Pucca (Stone/Timber with Asbestos Roof)</option>
                <option value="kutcha_traditional">Kutcha (Mud/Thatch/Bamboo/Unburnt Brick)</option>
              </select>
            </div>

            {/* Drinking Water */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                2. Main Source of Drinking Water (Jal Jeevan Mission)
              </label>
              <select
                value={waterSource}
                onChange={(e) => setWaterSource(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
              >
                <option value="piped_tap_premises">Tap Water from Treated Source (Piped into premises)</option>
                <option value="piped_tap_untreated">Tap Water from Untreated Source</option>
                <option value="covered_well_borewell">Covered Well / Tube-well / Handpump</option>
                <option value="packaged_water">Packaged / Bottled RO Water</option>
              </select>
            </div>

            {/* Cooking Fuel */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                3. Primary Cooking Fuel (PM Ujjwala / PNG)
              </label>
              <select
                value={cookingFuel}
                onChange={(e) => setCookingFuel(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
              >
                <option value="lpg_png_piped">LPG / Piped Natural Gas (PNG)</option>
                <option value="electric_induction">Electric Induction / Solar Cooker</option>
                <option value="biogas">Bio-Gas (Gobar Gas)</option>
                <option value="firewood_cowdung">Firewood / Cowdung Cake / Charcoal</option>
              </select>
            </div>

            {/* Lighting & Rooftop Solar */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                4. Electricity & Solar Rooftop (PM Surya Ghar)
              </label>
              <select
                value={solarLighting}
                onChange={(e) => setSolarLighting(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
              >
                <option value="grid_plus_solar">Grid Electricity + Grid-tied Rooftop Solar (PM Surya Ghar)</option>
                <option value="grid_electricity">Grid Electricity (Exclusive)</option>
                <option value="standalone_solar">Off-grid Standalone Solar System</option>
                <option value="other_kerosene">Kerosene / Other</option>
              </select>
            </div>

            {/* Latrine Facility */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                5. Latrine Type & Drainage Connection (Swachh Bharat)
              </label>
              <select
                value={latrineType}
                onChange={(e) => setLatrineType(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
              >
                <option value="flush_septic_tank">Flush Latrine connected to Septic Tank</option>
                <option value="flush_sewer">Flush Latrine connected to Piped Sewer Network</option>
                <option value="twin_pit">Twin Pit Latrine with Slab</option>
                <option value="community_public">Community Public Latrine</option>
              </select>
            </div>

            {/* Rooms Count */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                6. Number of Living Rooms in Possession
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={roomsCount}
                onChange={(e) => setRoomsCount(Number(e.target.value))}
                style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
              />
            </div>
          </div>

          {/* Digital Assets Checklist */}
          <div style={{ marginBottom: '1.75rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.6rem' }}>
              7. Availability of Digital & Household Assets (Select all that apply)
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.75rem' }}>
              {[
                { id: 'smartphone', label: '📱 4G/5G Smartphone' },
                { id: 'broadband_wifi', label: '🌐 Fiber Wi-Fi Broadband' },
                { id: 'laptop_desktop', label: '💻 Computer / Tablet' },
                { id: 'smart_tv', label: '📺 Television (Smart TV)' },
                { id: 'refrigerator', label: '🧊 Refrigerator' },
                { id: 'two_wheeler', label: '🛵 Scooter / Bike / EV 2W' },
                { id: 'four_wheeler', label: '🚗 Car / Van / EV 4W' },
              ].map((item) => {
                const checked = digitalAssets.includes(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleDigitalAsset(item.id)}
                    style={{
                      padding: '0.65rem 0.85rem',
                      borderRadius: 'var(--radius-sm)',
                      background: checked ? 'rgba(16, 185, 129, 0.15)' : 'var(--bg-tertiary)',
                      border: checked ? '1px solid #10b981' : '1px solid var(--border-subtle)',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      fontWeight: checked ? 700 : 500,
                      color: checked ? '#059669' : 'var(--text-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <input type="checkbox" checked={checked} readOnly style={{ cursor: 'pointer' }} />
                    <span>{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button className="btn btn-outline" onClick={() => setCurrentStep(1)}>
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>
            <button className="btn btn-primary" onClick={() => setCurrentStep(3)}>
              <span>Proceed to Phase II (Demographics)</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Phase II - Demographics & Caste */}
      {currentStep === 3 && (
        <div className="glass-card" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem' }}>Step 3: Phase II - Population Demographics & Social Category</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                Household head identity, resident members count, mother tongue, education, and digital inclusion.
              </p>
            </div>
            <span className="status-badge status-verified">Phase II Demographics</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '1.75rem' }}>
            {/* Head Name */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                1. Full Name of Household Head
              </label>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <input
                  type="text"
                  value={headName}
                  onChange={(e) => setHeadName(e.target.value)}
                  placeholder="e.g. Aarav Sharma"
                  style={{ flex: 1, padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                />
                <button
                  className={`btn ${activeVoiceField === 'headName' ? 'mic-active' : 'btn-outline'}`}
                  style={{ padding: '0.65rem' }}
                  onClick={() => handleVoiceInputForField('headName', setHeadName)}
                  title="Speak Head Name"
                >
                  <Mic size={16} />
                </button>
              </div>
            </div>

            {/* Total Members */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                2. Total Resident Family Members
              </label>
              <input
                type="number"
                min="1"
                max="30"
                value={totalMembers}
                onChange={(e) => setTotalMembers(Number(e.target.value))}
                style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
              />
            </div>

            {/* Mother Tongue */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                3. Primary Mother Tongue
              </label>
              <select
                value={motherTongue}
                onChange={(e) => setMotherTongue(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
              >
                <option value="Hindi">Hindi (हिन्दी)</option>
                <option value="Tamil">Tamil (தமிழ்)</option>
                <option value="Telugu">Telugu (తెలుగు)</option>
                <option value="Bengali">Bengali (বাংলা)</option>
                <option value="Marathi">Marathi (मराठी)</option>
                <option value="Gujarati">Gujarati (ગુજરાતી)</option>
                <option value="Kannada">Kannada (ಕನ್ನಡ)</option>
                <option value="English">English</option>
                <option value="Urdu">Urdu (اردو)</option>
                <option value="Punjabi">Punjabi (ਪੰਜਾਬੀ)</option>
                <option value="Malayalam">Malayalam (മലയാളം)</option>
              </select>
            </div>

            {/* Social Category & Caste */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                4. Social Category & Caste Classification (Census 2027 Gazette)
              </label>
              <select
                value={casteCategory}
                onChange={(e) => setCasteCategory(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
              >
                <option value="general">General Category</option>
                <option value="obc">Other Backward Class (OBC / SEBC)</option>
                <option value="sc">Scheduled Caste (SC)</option>
                <option value="st">Scheduled Tribe (ST)</option>
                <option value="ews">Economically Weaker Section (EWS)</option>
              </select>
            </div>

            {/* Highest Education */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                5. Highest Educational Attainment of Head
              </label>
              <select
                value={highestEducation}
                onChange={(e) => setHighestEducation(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
              >
                <option value="graduate">Graduate (B.Tech, B.Sc, B.A, B.Com, etc.)</option>
                <option value="postgraduate_phd">Post-Graduate / Doctorate / Professional</option>
                <option value="higher_secondary">Higher Secondary / 12th Standard</option>
                <option value="secondary">Secondary / 10th Standard</option>
                <option value="primary">Primary / Middle School</option>
                <option value="literate_no_school">Literate without formal schooling</option>
              </select>
            </div>

            {/* Occupation */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                6. Primary Occupation Category
              </label>
              <select
                value={economicActivity}
                onChange={(e) => setEconomicActivity(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
              >
                <option value="salaried_pvt">Regular Salaried (Private / Corporate / Tech)</option>
                <option value="salaried_govt">Regular Salaried (Government / PSU)</option>
                <option value="self_employed_biz">Self-Employed (Business / Trade)</option>
                <option value="agriculture_cultivator">Farmer / Cultivator</option>
                <option value="professional_practice">Professional (Doctor, CA, Lawyer, Consultant)</option>
              </select>
            </div>
          </div>

          {/* Navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button className="btn btn-outline" onClick={() => setCurrentStep(2)}>
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>
            <button className="btn btn-primary" onClick={() => setCurrentStep(4)}>
              <span>Proceed to Geolocation Tagging</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Interactive Geolocation Map Pinning */}
      {currentStep === 4 && (
        <div className="glass-card" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem' }}>Step 4: Interactive GIS Geolocation Tagging</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                Census 2027 protocol requires digital geo-spatial pinning of the residential structure for ward alignment.
              </p>
            </div>

            <button
              className="btn btn-navy"
              style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
              onClick={handleDetectGPS}
              disabled={isLocating}
            >
              <Navigation size={16} />
              <span>{isLocating ? 'Acquiring GPS...' : 'Auto-Detect Browser GPS'}</span>
            </button>
          </div>

          {/* Interactive Simulated Map Canvas */}
          <div
            style={{
              position: 'relative',
              height: '340px',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              border: '2px solid var(--navy-800)',
              background: '#0f172a',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '1.25rem',
              backgroundImage: `radial-gradient(#1e3a8a 1.5px, transparent 1.5px), radial-gradient(#065f46 1.5px, #0b1526 1.5px)`,
              backgroundSize: '30px 30px',
              backgroundPosition: '0 0, 15px 15px',
            }}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = (e.clientX - rect.left) / rect.width;
              const y = (e.clientY - rect.top) / rect.height;
              // Adjust lat / lng proportionally
              setLat(+(20 + (1 - y) * 12).toFixed(5));
              setLng(+(72 + x * 16).toFixed(5));
            }}
          >
            {/* Map Top Overlay */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
              <span
                style={{
                  background: 'rgba(0, 0, 0, 0.75)',
                  color: '#38bdf8',
                  padding: '0.35rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  border: '1px solid rgba(56, 189, 248, 0.4)',
                }}
              >
                📍 Click anywhere on map to reposition house marker
              </span>

              <span
                style={{
                  background: 'rgba(0, 0, 0, 0.75)',
                  color: '#10b981',
                  padding: '0.35rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                }}
              >
                GPS Satellites: Active (Lock: ±3.2m)
              </span>
            </div>

            {/* Center Animated Pin Marker */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <div
                style={{
                  background: '#ff9933',
                  color: '#071931',
                  fontWeight: 800,
                  fontSize: '0.75rem',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '4px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.5)',
                  marginBottom: '2px',
                  whiteSpace: 'nowrap',
                }}
              >
                Structure ID: #{selectedStateCode}-{districtName.slice(0, 3).toUpperCase()}
              </div>
              <MapPin size={42} color="#f43f5e" fill="#f43f5e" style={{ filter: 'drop-shadow(0 4px 12px rgba(244, 63, 94, 0.7))' }} />
              <div
                style={{
                  width: '18px',
                  height: '6px',
                  background: 'rgba(0,0,0,0.4)',
                  borderRadius: '50%',
                }}
              />
            </div>

            {/* Coordinates HUD Bar */}
            <div
              style={{
                background: 'rgba(7, 25, 49, 0.9)',
                backdropFilter: 'blur(10px)',
                padding: '0.65rem 1rem',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.85rem',
                color: '#e2e8f0',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                zIndex: 10,
              }}
            >
              <div>
                <span>Latitude: </span>
                <strong style={{ color: '#38bdf8' }}>{lat.toFixed(5)}° N</strong>
              </div>
              <div>
                <span>Longitude: </span>
                <strong style={{ color: '#34d399' }}>{lng.toFixed(5)}° E</strong>
              </div>
              <div>
                <span>District: </span>
                <strong>{districtName} ({selectedStateCode})</strong>
              </div>
            </div>
          </div>

          {/* Submit Actions */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
            <button className="btn btn-outline" onClick={() => setCurrentStep(3)}>
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>
            <button className="btn btn-primary" onClick={handleFinalSubmit}>
              <Sparkles size={16} />
              <span>Generate Official Mock SE ID Card</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: Official Mock SE ID Digital Certificate */}
      {currentStep === 5 && generatedResult && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Success Banner */}
          <div
            className="glass-card"
            style={{
              padding: '1.5rem',
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.1) 100%)',
              border: '1px solid #10b981',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: '#10b981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                }}
              >
                <CheckCircle2 size={28} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.3rem', color: '#059669' }}>
                  {t('seIdSuccess')}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  {t('seIdInstruction')}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="btn btn-navy" onClick={handlePrintCertificate}>
                <Printer size={16} />
                <span>Print / Save PDF</span>
              </button>
              <button
                className="btn btn-outline"
                onClick={() => {
                  setCurrentStep(1);
                  setGeneratedResult(null);
                }}
              >
                <RotateCcw size={16} />
                <span>New Submission</span>
              </button>
            </div>
          </div>

          {/* The Official Certificate Card */}
          <div className="se-id-certificate">
            <div className="hologram-stripe" />

            {/* Certificate Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '2px solid var(--navy-800)',
                paddingBottom: '1rem',
                marginBottom: '1.25rem',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <img src="/favicon.svg" alt="Emblem" style={{ width: '52px', height: '52px' }} />
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--saffron-500)', letterSpacing: '1px' }}>
                    GOVERNMENT OF INDIA • MINISTRY OF HOME AFFAIRS
                  </div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--navy-800)' }}>
                    CENSUS 2027 DIGITAL SELF-ENUMERATION PASS
                  </h2>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Office of the Registrar General & Census Commissioner, India (ORGI)
                  </div>
                </div>
              </div>

              {/* Status Stamp */}
              <div
                style={{
                  border: '2px dashed #10b981',
                  padding: '0.4rem 0.85rem',
                  borderRadius: '6px',
                  textAlign: 'center',
                  background: 'rgba(16, 185, 129, 0.1)',
                }}
              >
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#059669' }}>ORGI VERIFIED</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 900, color: '#059669' }}>PRE-ENUMERATED</div>
              </div>
            </div>

            {/* Certificate Body Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.5rem',
                marginBottom: '1.5rem',
              }}
            >
              {/* Left Column: Details */}
              <div>
                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Unique Self-Enumeration ID (SE ID)
                  </div>
                  <div
                    style={{
                      fontSize: '1.6rem',
                      fontWeight: 900,
                      color: 'var(--saffron-600)',
                      letterSpacing: '1px',
                      fontFamily: 'monospace',
                    }}
                  >
                    {generatedResult.seId}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', fontSize: '0.85rem' }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Household Head:</span>
                    <div style={{ fontWeight: 700 }}>{generatedResult.payload.headName}</div>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Total Members:</span>
                    <div style={{ fontWeight: 700 }}>{generatedResult.payload.totalMembers} Persons</div>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>State / UT:</span>
                    <div style={{ fontWeight: 700 }}>{generatedResult.payload.stateName}</div>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>District:</span>
                    <div style={{ fontWeight: 700 }}>{generatedResult.payload.district}</div>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Structure Classification:</span>
                    <div style={{ fontWeight: 700 }}>{generatedResult.payload.houseStructure.toUpperCase()}</div>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Geo-Location Tag:</span>
                    <div style={{ fontWeight: 700 }}>{generatedResult.payload.lat.toFixed(4)}°N, {generatedResult.payload.lng.toFixed(4)}°E</div>
                  </div>
                </div>
              </div>

              {/* Right Column: QR Code & Security Stamp */}
              <div
                style={{
                  background: 'var(--bg-tertiary)',
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                {/* Visual QR Code SVG Mock */}
                <div
                  style={{
                    background: '#ffffff',
                    padding: '0.85rem',
                    borderRadius: '8px',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                    marginBottom: '0.75rem',
                  }}
                >
                  <QrCode size={110} color="#0f172a" />
                </div>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--navy-800)' }}>
                  SCAN FOR FIELD ENUMERATOR VALIDATION
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  Enumerator Access PIN: <strong>{generatedResult.enumeratorAccessCode}</strong>
                </div>
              </div>
            </div>

            {/* Barcode & Security Strip */}
            <div className="barcode-strip">
              ||||| | |||| ||| ||||||| | |||| || |||||| | ||| ||||| {generatedResult.seId}
            </div>

            {/* Legal Confidentiality Stamp */}
            <div
              style={{
                marginTop: '1rem',
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                textAlign: 'center',
                borderTop: '1px solid var(--border-subtle)',
                paddingTop: '0.75rem',
              }}
            >
              🔒 <strong>Confidentiality Mandate:</strong> This schedule is protected under Section 15 of the Census Act, 1948. Generated on {generatedResult.submissionTimestamp}.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
