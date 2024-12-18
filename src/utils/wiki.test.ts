import { describe, expect, it } from "vitest";
import { historienIdag } from "./wiki";
import { historie } from "../components";

interface Hendelse {
  dag: string;
  historie: historie[];
}

const hendelser: Hendelse[] = [];
hendelser.push(
  { dag: "1.januar", historie: await historienIdag("1._januar") },
  { dag: "2.januar", historie: await historienIdag("2._januar") },
  { dag: "3.januar", historie: await historienIdag("3._januar") },
  { dag: "7.januar", historie: await historienIdag("7._januar") },
  { dag: "9.januar", historie: await historienIdag("9._januar") },
  { dag: "17.januar", historie: await historienIdag("17._januar") },
  { dag: "20.januar", historie: await historienIdag("20._januar") },
  { dag: "31.januar", historie: await historienIdag("31._januar") },
  { dag: "9.februar", historie: await historienIdag("9._februar") },
  { dag: "17.februar", historie: await historienIdag("17._februar") },
  { dag: "28.februar", historie: await historienIdag("28._februar") },
  { dag: "29.februar", historie: await historienIdag("29._februar") },
  { dag: "9.mars", historie: await historienIdag("9._mars") },
  { dag: "17.mars", historie: await historienIdag("17._mars") },
  { dag: "31.mars", historie: await historienIdag("31._mars") },
  { dag: "9.april", historie: await historienIdag("9._april") },
  { dag: "17.april", historie: await historienIdag("17._april") },
  { dag: "30.april", historie: await historienIdag("30._april") },
  { dag: "9.mai", historie: await historienIdag("9._mai") },
  { dag: "17.mai", historie: await historienIdag("17._mai") },
  { dag: "31.mai", historie: await historienIdag("31._mai") },
  { dag: "9.juni", historie: await historienIdag("9._juni") },
  { dag: "17.juni", historie: await historienIdag("17._juni") },
  { dag: "30.juni", historie: await historienIdag("30._juni") },
  { dag: "9.juli", historie: await historienIdag("9._juli") },
  { dag: "17.juli", historie: await historienIdag("17._juli") },
  { dag: "31.juli", historie: await historienIdag("31._juli") },
  { dag: "9.august", historie: await historienIdag("9._august") },
  { dag: "17.august", historie: await historienIdag("17._august") },
  { dag: "31.august", historie: await historienIdag("31._august") },
  { dag: "9.september", historie: await historienIdag("9._september") },
  { dag: "17.september", historie: await historienIdag("17._september") },
  { dag: "30.september", historie: await historienIdag("30._september") },
  { dag: "9.oktober", historie: await historienIdag("9._oktober") },
  { dag: "17.oktober", historie: await historienIdag("17._oktober") },
  { dag: "31.oktober", historie: await historienIdag("31._oktober") },
  { dag: "9.november", historie: await historienIdag("9._november") },
  { dag: "17.november", historie: await historienIdag("17._november") },
  { dag: "30.november", historie: await historienIdag("30._november") },
  { dag: "9.desember", historie: await historienIdag("9._desember") },
  { dag: "17.desember", historie: await historienIdag("17._desember") },
  { dag: "31.desember", historie: await historienIdag("31._desember") }
);

describe("Wiki", () => {
  describe("historienIdag", () => {
    hendelser.forEach((hendelse) => {
      describe(`hendelse ${hendelse.dag}`, () => {
        it("should be length 5", () => {
          expect(hendelse.historie.length).toBe(5);
        });
        it("content less than or equal to 200 characters", () => {
          hendelse.historie.forEach((h) => {
            expect(h.content.length).toBeLessThanOrEqual(200);
          });
        });
      });
    });
  });
});
