import { getLicensePlateByIndex } from "../src/getLicensePlateByIndex";

describe("getLicensePlateByIndex", () => {
  test("throws an error if the index is negative", () => {
    expect(() => getLicensePlateByIndex(-1)).toThrow();
  });

  test("throws an error if the index is not an integer", () => {
    expect(() => getLicensePlateByIndex(3.5)).toThrow();
  });

  test("stage 0: only digits", () => {
    expect(getLicensePlateByIndex(0)).toBe("000000");
    expect(getLicensePlateByIndex(1)).toBe("000001");
    expect(getLicensePlateByIndex(999999)).toBe("999999");
  });

  test("stage 1: 5 digits + 1 letter", () => {
    expect(getLicensePlateByIndex(1000000)).toBe("00000A");
    expect(getLicensePlateByIndex(1000001)).toBe("00000B");
  });

  test("transition within stage 1", () => {
    const base = 1000000;
    expect(getLicensePlateByIndex(base + 25)).toBe("00000Z");
    expect(getLicensePlateByIndex(base + 26)).toBe("00001A");
  });

  test("end of stage 1", () => {
    const lastStage = 1000000 + (10 ** 5) * 26 - 1;
    expect(getLicensePlateByIndex(lastStage)).toBe("99999Z");
  });
});