import toggleStatus from "./toggleStatus";

test("toggleStatis retuns the next status when provided one", () => {
  expect(toggleStatus("in-progress")).toBe("done");
  expect(toggleStatus("done")).toBe("in-progress");
});
