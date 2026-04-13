export interface Country {
  name: string;
  code: string;
  flag: string;
}

export const countries: Country[] = [
  { name: 'Romania', code: 'RO', flag: '🇷🇴' },
  { name: 'United States', code: 'US', flag: '🇺🇸' },
  { name: 'United Kingdom', code: 'GB', flag: '🇬🇧' },
  { name: 'Germany', code: 'DE', flag: '🇩🇪' },
  { name: 'France', code: 'FR', flag: '🇫🇷' },
  { name: 'Italy', code: 'IT', flag: '🇮🇹' },
  { name: 'Spain', code: 'ES', flag: '🇪🇸' },
  { name: 'Canada', code: 'CA', flag: '🇨🇦' },
  { name: 'Australia', code: 'AU', flag: '🇦🇺' },
  { name: 'Japan', code: 'JP', flag: '🇯🇵' },
  { name: 'China', code: 'CN', flag: '🇨🇳' },
  { name: 'India', code: 'IN', flag: '🇮🇳' },
  { name: 'Brazil', code: 'BR', flag: '🇧🇷' },
  { name: 'Mexico', code: 'MX', flag: '🇲🇽' },
  { name: 'Russia', code: 'RU', flag: '🇷🇺' },
  { name: 'South Korea', code: 'KR', flag: '🇰🇷' },
  { name: 'Netherlands', code: 'NL', flag: '🇳🇱' },
  { name: 'Switzerland', code: 'CH', flag: '🇨🇭' },
  { name: 'Sweden', code: 'SE', flag: '🇸🇪' },
  { name: 'Norway', code: 'NO', flag: '🇳🇴' },
  { name: 'Denmark', code: 'DK', flag: '🇩🇰' },
  { name: 'Finland', code: 'FI', flag: '🇫🇮' },
  { name: 'Belgium', code: 'BE', flag: '🇧🇪' },
  { name: 'Austria', code: 'AT', flag: '🇦🇹' },
  { name: 'Portugal', code: 'PT', flag: '🇵🇹' },
  { name: 'Greece', code: 'GR', flag: '🇬🇷' },
  { name: 'Turkey', code: 'TR', flag: '🇹🇷' },
  { name: 'Poland', code: 'PL', flag: '🇵🇱' },
  { name: 'Czech Republic', code: 'CZ', flag: '🇨🇿' },
  { name: 'Hungary', code: 'HU', flag: '🇭🇺' },
  { name: 'Bulgaria', code: 'BG', flag: '🇧🇬' },
  { name: 'Moldova', code: 'MD', flag: '🇲🇩' },
  { name: 'Ukraine', code: 'UA', flag: '🇺🇦' },
  { name: 'Israel', code: 'IL', flag: '🇮🇱' },
  { name: 'United Arab Emirates', code: 'AE', flag: '🇦🇪' },
  { name: 'Saudi Arabia', code: 'SA', flag: '🇸🇦' },
  { name: 'South Africa', code: 'ZA', flag: '🇿🇦' },
  { name: 'Argentina', code: 'AR', flag: '🇦🇷' },
  { name: 'Chile', code: 'CL', flag: '🇨🇱' },
  { name: 'Colombia', code: 'CO', flag: '🇨🇴' },
];

export const getCountryByCode = (code: string) => countries.find(c => c.code === code);
