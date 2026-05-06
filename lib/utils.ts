/**
 * Shared utility functions to avoid code duplication
 */

/**
 * Get priority color class based on priority level
 */
export function getPriorityColor(priority: string): string {
  switch (priority) {
    case 'urgent': return 'bg-danger';
    case 'high': return 'bg-warning';
    case 'medium': return 'bg-info';
    case 'low': return 'bg-success';
    default: return 'bg-text-muted';
  }
}

/**
 * Get priority color class (alternative style for dashboard components)
 */
export function getPriorityColorAlt(priority: string): string {
  switch (priority) {
    case 'urgent': return 'bg-red-500';
    case 'high': return 'bg-orange-500';
    case 'medium': return 'bg-yellow-500';
    case 'low': return 'bg-green-500';
    default: return 'bg-gray-500';
  }
}

/**
 * Format currency value to USD string
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Check if a date is today
 */
export function isToday(date: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const checkDate = new Date(date);
  checkDate.setHours(0, 0, 0, 0);
  return checkDate.getTime() === today.getTime();
}

/**
 * Get start and end of day for a given date
 */
export function getDayBounds(date: Date = new Date()): { start: Date; end: Date } {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);
  return { start, end };
}

/**
 * Extract unique locations from stock data
 */
export function extractUniqueLocations<T extends { location: { id: string; name: string } }>(
  items: T[]
): Array<{ id: string; name: string }> {
  return Array.from(
    new Map(items.map((item) => [item.location.id, item.location])).values()
  );
}

/**
 * Validate date string format (ISO date: YYYY-MM-DD)
 */
export function isValidDateString(dateStr: string): boolean {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateStr)) return false;
  const date = new Date(dateStr);
  return date instanceof Date && !isNaN(date.getTime());
}

/**
 * Safe division with zero check
 */
export function safeDivide(numerator: number, denominator: number, defaultValue: number = 0): number {
  if (denominator <= 0 || !isFinite(denominator)) return defaultValue;
  return numerator / denominator;
}
