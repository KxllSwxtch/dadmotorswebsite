import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

/**
 * Utility functions for the application
 */

/**
 * Format a date from YYYYMM format to a readable string
 * @param dateStr - Date string in YYYYMM format
 * @returns Formatted date string or the original if invalid
 */
export function formatDate(dateStr: string): string {
	if (!dateStr || dateStr.length < 6) return dateStr || ''

	const year = dateStr.substring(0, 4)
	const month = dateStr.substring(4, 6)

	return `${year}/${month}`
}

/**
 * Transform a badge value for API calls if needed
 * @param value - The badge value to transform
 * @returns Transformed badge value
 */
export function transformBadgeValue(value: string): string {
	// If badge value contains parentheses or other special characters
	// this function can handle any special encoding or transformations
	return encodeURIComponent(value)
}
