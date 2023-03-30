import ProfilePage from "./ProfilePage";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe(ProfilePage, () => {
  const userData = {
    topThreeMovies: [69, 69, 69],
    favorites: [69],
    UserProfile: "richardtli",
    name: "Richard",
    handle: "richardlit",
    statusMsg: "Hello World",
    additionalInfo: "Class of 2025, Computer Science",
  };

  it("ProfilePage loads", () => {
    const { getByTestId = "name" } = render(
      <ProfilePage />,
      { wrapper: MemoryRouter }
    );
    const test = getByTestId("name").textContent;
    expect(test).toBe("Richard");
  });

})