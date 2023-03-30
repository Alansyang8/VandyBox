import Container from "./UserProfile";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe(Container, () => {
    const userData = {
      topThreeMovies: ["Avengers", "Puss in Boots", "Pokemon"],
      favorites: ["Puss in Boots"],
      UserProfile: "richardtli",
      name: "Richard",
      handle: "richardlit",
      statusMsg: "Hello World",
      additionalInfo: "Class of 2025, Computer Science",
    };

    it("Container gets a title", () => {
        const { getByTestId = "name" } = render(
          <Container title={"Trending"} />,
          { wrapper: MemoryRouter }
        );
        const test = getByTestId("name").textContent;
        expect(test).toBe("Trending");
      });

      it("Container gets children", () => {
        const { getByTestId = "name" } = render(
          <Container title={"sdfa"} />,
          { wrapper: MemoryRouter }
        );
        const test = getByTestId("name").textContent;
        expect(test).toBe("Trending");
      });
    })

    