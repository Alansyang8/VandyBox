import { render } from "@testing-library/react";
import ProfileHeader from "./ProfileHeader";
import { MemoryRouter } from 'react-router-dom';

describe(ProfileHeader, () => {
    it("ProfileHeader has VandyuBox Link", () => {
        const { getByTestId="ProfileHeader"} = render(<ProfileHeader/>, {wrapper: MemoryRouter})
        const EmptyTest = getByTestId("ProfileHeader").textContent
        expect(EmptyTest).toBe("VandyBox")
    })
})