import UserProfile from "./UserProfile";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe(UserProfile, () => {
  const userData = {
    topThreeMovies: ["Avengers", "Puss in Boots", "Pokemon"],
    favorites: ["Puss in Boots"],
    UserProfile: "richardtli",
    name: "Richard",
    handle: "richardlit",
    statusMsg: "Hello World",
    additionalInfo: "Class of 2025, Computer Science",
  };

  it("UserProfile displays User's name", () => {
    const { getByTestId = "name" } = render(
      <UserProfile userData={userData} />,
      { wrapper: MemoryRouter }
    );
    const test = getByTestId("name").textContent;
    expect(test).toBe("Richard");
  });

  it("UserProfile displays User's handle", () => {
    const { getByTestId = "handle" } = render(
      <UserProfile userData={userData} />,
      { wrapper: MemoryRouter }
    );
    const test = getByTestId("handle").textContent;
    expect(test).toBe("@richardlit");
  });

  it("UserProfile displays User's additionalInfo", () => {
    const { getByTestId = "additionalInfo" } = render(
      <UserProfile userData={userData} />,
      { wrapper: MemoryRouter }
    );
    const test = getByTestId("additionalInfo").textContent;
    expect(test).toBe("Class of 2025, Computer Science");
  });

  it("UserProfile displays To Watch Tab", () => {
    const { getByTestId = "toWatch" } = render(
      <UserProfile userData={userData} />,
      { wrapper: MemoryRouter }
    );
    const test = getByTestId("toWatch").textContent;
    expect(test).toBe("To Watch");
  });

  it("UserProfile displays Fav Movies Tab", () => {
    const { getByTestId = "favMovies" } = render(
      <UserProfile userData={userData} />,
      { wrapper: MemoryRouter }
    );
    const test = getByTestId("favMovies").textContent;
    expect(test).toBe("Fav Movies");
  });

  it("UserProfile displays Friends Tab", () => {
    const { getByTestId = "friends" } = render(
      <UserProfile userData={userData} />,
      { wrapper: MemoryRouter }
    );
    const test = getByTestId("friends").textContent;
    expect(test).toBe("Friends");
  });

  it("UserProfile displays Follow Button", () => {
    const { getByTestId = "follow" } = render(
      <UserProfile userData={userData} />,
      { wrapper: MemoryRouter }
    );
    const test = getByTestId("follow").textContent;
    expect(test).toBe("Follow");
  });

  it("UserProfile displays Edit Button", () => {
    const { getByTestId = "edit" } = render(
      <UserProfile userData={userData} />,
      { wrapper: MemoryRouter }
    );
    const test = getByTestId("edit").textContent;
    expect(test).toBe("Edit");
  });
});
