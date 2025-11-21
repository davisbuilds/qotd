/**
 * Application-wide constants for timing, storage keys, and UI values
 */

/**
 * Timing constants in milliseconds
 */
export const TIMING = {
  /** Auto-refresh interval for quotes (1 minute) */
  AUTO_REFRESH_INTERVAL: 60_000,
  /** Quote transition animation duration */
  QUOTE_TRANSITION_DURATION: 500,
  /** Debounce delay for localStorage writes */
  DEBOUNCE_DELAY: 500,
} as const

/**
 * LocalStorage keys
 */
export const STORAGE_KEYS = {
  /** Key for storing favorite quotes */
  FAVORITES: 'qotd-favorites',
} as const

/**
 * UI constants for consistent sizing
 */
export const UI = {
  /** Button size classes for icon buttons */
  BUTTON_SIZES: {
    large: 'h-14 w-14 p-3',
    medium: 'h-12 w-12 p-2',
    small: 'h-10 w-10 p-1.5',
  },
  /** Common button styling for icon buttons */
  ICON_BUTTON_BASE: 'rounded-full shadow-lg hover:shadow-xl transition-all duration-300',
} as const
