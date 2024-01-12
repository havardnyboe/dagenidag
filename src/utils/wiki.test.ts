import { describe, expect, it } from "vitest";
import { idagLang } from "./dag";
import { historienIdag } from "./wiki";

const hist_idag = await historienIdag(idagLang.replace(" ", "_"));
const hist_11_feb = await historienIdag("11._februar");
const hist_9_mars = await historienIdag("9._mars");
const hist_17_mars = await historienIdag("17._mars");

const hendelser = [hist_idag, hist_11_feb, hist_9_mars, hist_17_mars];

describe("Wiki", () => {
  describe("historienIdag", () => {
    it("should be length 5", () => {
      hendelser.forEach((hendelse) => expect(hendelse.length).toBe(5));
    });
    it("content less than or equal to 200 characters", () => {
      hendelser.forEach((hendelse) => {
        hendelse.forEach((historie) => {
          expect(historie.content.length).toBeLessThanOrEqual(240);
        });
      });
    });
  });
});
