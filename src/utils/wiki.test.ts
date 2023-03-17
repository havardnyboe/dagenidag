import { describe, expect, it } from "vitest";
import { historienIdag } from "./wiki";

const baseUrl =
  "https://no.wikipedia.org/w/api.php?action=parse&origin=*&format=json&page=";
const hist_idag = await historienIdag();
const hist_11_feb = await historienIdag(new URL(`${baseUrl}11._februar`), true);
const hist_9_mars = await historienIdag(new URL(`${baseUrl}9._mars`), true);
const hist_17_mars = await historienIdag(new URL(`${baseUrl}17._mars`), true);

const hendelser = [hist_idag, hist_11_feb, hist_9_mars, hist_17_mars];

describe("Wiki", () => {
  describe("historienIdag", () => {
    it("should be length 5", () => {
      hendelser.forEach((hendelse) => expect(hendelse.length).toBe(5));
    });
    it("content less than or equal to 200 characters", () => {
      hendelser.forEach((hendelse) => {
        hendelse.forEach((historie) => {
          expect(historie.content.length).toBeLessThanOrEqual(200);
        });
      });
    });
  });
});
