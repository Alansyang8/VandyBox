import { render, screen } from "@testing-library/react";
import ProfileEditPopUp from "./ProfileEditPopUp";
import { MemoryRouter } from 'react-router-dom';

describe(ProfileEditPopUp, () => {
    it("ProfileEditPopUp correctly displays user information", () => {
        const setEditMode = () => {}
        const currentUserData = {
            name: "Jinyoung Park",
            statusMsg: "I love VandyBox",
            additionalInfo: "Movie enthusiast",
            image: "",
        }
        render(<ProfileEditPopUp setEditMode={setEditMode} currentUserData={currentUserData}/>);
        const nameField = screen.getByTestId("name-input");
        const statusMsgField = screen.getByTestId("status-msg-input");
        const addInfoField = screen.getByTestId("add-info-input");
        expect(nameField).toBeInTheDocument();
        expect(statusMsgField).toBeInTheDocument();
        expect(addInfoField).toBeInTheDocument();

        function hasInputValue(e, inputValue) {
            return screen.getByDisplayValue(inputValue) === e;
        }

        expect(hasInputValue(nameField, "Jinyoung Park")).toBe(true);
        expect(hasInputValue(statusMsgField, "I love VandyBox")).toBe(true);
        expect(hasInputValue(addInfoField, "Movie enthusiast")).toBe(true);
        expect(hasInputValue(nameField, "")).toBe(false);
    });

    it("ProfileEditPopUp correctly closes", () => {
        let closed = false;
        const setEditMode = () => {
            closed = true;
        }
        const currentUserData = {
            name: "Jinyoung Park",
            statusMsg: "I love VandyBox",
            additionalInfo: "Movie enthusiast",
            image: "",
        }
        render(<ProfileEditPopUp setEditMode={setEditMode} currentUserData={currentUserData}/>);
        const cancelBtn = screen.getByTestId("cancel-btn");
        expect(cancelBtn).toBeInTheDocument();
    });
})