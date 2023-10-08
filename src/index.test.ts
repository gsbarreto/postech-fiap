import { expect, test } from "vitest";
import Main from "./index";

test("expected to be instance of Main", () => {
  const main = new Main();
  expect(main).toBeInstanceOf(Main);
});
