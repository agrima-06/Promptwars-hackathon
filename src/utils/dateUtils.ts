/**
 * Census 2027 Date Formatting Utilities
 * Converts standard YYYY-MM-DD strings to clean, readable text dates (e.g. '15 Apr 2026' or '15Apr26').
 */

const MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

/**
 * Format YYYY-MM-DD into readable text: '15 Apr 2026' or compact '15Apr26'
 */
export function formatCensusDate(dateStr: string, compact: boolean = false): string {
  if (!dateStr || typeof dateStr !== 'string') return dateStr || '';
  
  const parts = dateStr.trim().split('-');
  if (parts.length === 3) {
    const year = parts[0];
    const monthNum = parseInt(parts[1], 10);
    const dayNum = parseInt(parts[2], 10);

    if (!isNaN(monthNum) && monthNum >= 1 && monthNum <= 12 && !isNaN(dayNum)) {
      const month = MONTH_NAMES[monthNum - 1];
      const day = dayNum < 10 ? `0${dayNum}` : `${dayNum}`;

      if (compact) {
        const shortYear = year.slice(-2);
        return `${day}${month}${shortYear}`;
      }

      return `${day} ${month} ${year}`;
    }
  }

  return dateStr;
}

/**
 * Format a date range: '15 Apr 2026 to 30 Apr 2026'
 */
export function formatCensusDateRange(startStr: string, endStr: string, compact: boolean = false): string {
  return `${formatCensusDate(startStr, compact)} to ${formatCensusDate(endStr, compact)}`;
}
