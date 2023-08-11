/**
 * @param date1
 * @param date2
 * @returns number
 */
export const sortByAscDates = (date1: Date, date2: Date) =>
  Date.parse(date1.toString()) - Date.parse(date2.toString());

/**
 * @param date1
 * @param date2
 * @returns number
 */
export const sortByDescDates = (date1: Date, date2: Date) =>
  Date.parse(date2.toString()) - Date.parse(date1.toString());
