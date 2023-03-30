import { render, screen } from "@testing-library/react";
import FriendList from "./FriendList";

describe(FriendList, () => {
    it("FriendList correctly displays friend's information", () => {
        const friend = "jinyoungpark";
        render(<FriendList friend={friend}/>);
        const handleField = screen.getByTestId("handle");
        expect(handleField).toBeInTheDocument();
        expect(handleField).toHaveTextContent("jinyoungpark");
    });
})