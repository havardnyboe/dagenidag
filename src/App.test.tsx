import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";

import App from "./App";
import { datoString, idagLang } from "./utils/dag";
import navnedag from "../public/navnedager.json";

describe("App", () => {
  it("should render <main>", () => {
    render(<App />);
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("should show today's date", () => {
    render(<App />);
    expect(screen.getByTestId("dagensDato")).toHaveTextContent(datoString);
  });

  it("should show today's date", () => {
    render(<App />);
    const navnedager: { [index: string]: string } = navnedag;
    expect(screen.getByTestId("navnedag")).toHaveTextContent(
      navnedager[idagLang]
    );
  });
});
