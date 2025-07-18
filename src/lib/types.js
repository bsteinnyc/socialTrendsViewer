// TypeScript interfaces converted to JSDoc comments for better IDE support

/**
 * @typedef {Object} TrendPost
 * @property {string} id
 * @property {string} username
 * @property {string} date
 * @property {string} content
 * @property {number} likes
 * @property {number} shares
 * @property {number} comments
 * @property {string} url
 * @property {string} [thumbnail]
 */

/**
 * @typedef {Object} Demographics
 * @property {Array<{range: string, percentage: number}>} ageGroups
 * @property {Array<{name: string, percentage: number}>} regions
 */

/**
 * @typedef {Object} Trend
 * @property {string} id
 * @property {string} name
 * @property {"instagram" | "twitter" | "google" | "youtube"} platform
 * @property {string} date
 * @property {string} category
 * @property {number} engagement
 * @property {number} rank
 * @property {TrendPost[]} posts
 * @property {Demographics} [demographics]
 * @property {Object} [growth]
 */

/**
 * @typedef {Object} ApiError
 * @property {string} message
 * @property {string} code
 * @property {number} status
 */
