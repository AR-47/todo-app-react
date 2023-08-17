/**
 * @param date1
 * @param date2
 * @returns a number where, number < -0 if date1 is older than date2,  number > 0 if date2 is older than date1 and 0 if the two dates are equal
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
