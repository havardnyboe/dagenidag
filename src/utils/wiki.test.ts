import { describe, expect, it } from "vitest";
import { idagLang } from "./dag";
import { historienIdag } from "./wiki";

const hist_idag = await historienIdag(idagLang.replace(" ", "_"));
const hist_1_feb = await historienIdag("1._februar");
const hist_11_feb = await historienIdag("11._februar");
const hist_9_mars = await historienIdag("9._mars");
const hist_17_mars = await historienIdag("17._mars");

const hendelser = [hist_idag, hist_1_feb, hist_11_feb, hist_9_mars, hist_17_mars];

const testData = [
  {
    year: [40, " f.Kr."],
    content: "Ifølge Ussher-Lightfoot-kalenderen ble jorden skapt denne dagen kl. 18. ",
  },
  {
    year: [4004, " f.Kr."],
    content: "Ifølge Ussher-Lightfoot-kalenderen ble jorden skapt denne dagen kl. 18. ",
  },
  {
    year: [1836],
    content: "Sam Houston ble innsatt som første president i Republikken Texas. ",
  },
  {
    year: [1953],
    content: "Laos ble uavhengig. ",
  },
  {
    year: [1999],
    content:
      "Maurice Papon, fransk politiker, fengslet for forbrytelser mot menneskeheten begått under andre verdenskrig. ",
  },
  {
    year: [2021],
    content: "Munchmuseet i Bjørvika ble åpnet av kong Harald og dronning Sonja. ",
  },
];

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
