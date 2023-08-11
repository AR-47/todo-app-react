import { sortByAscDates, sortByDescDates } from "./compareTwoDates";

const [date1, date2] = [new Date(1999), new Date(2023)];

test("sortByAscDates passes basic test", () => {
  expect(sortByAscDates(date1, date2)).toBeLessThan(0);
});

test("sortByDescDates passes basic test", () => {
  expect(sortByDescDates(date2, date1)).toBeLessThan(0);
});
