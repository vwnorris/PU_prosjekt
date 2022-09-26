/**
 * Denne filen viser kun hvordan tester skal fungere.
 * Alle tester skal ligge i denne mappa
 */
const sum = require("../components/Test");

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});
