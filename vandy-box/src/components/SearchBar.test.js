import {screen, render, fireEvent} from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import SearchBar from "./SearchBar";
import userEvent from '@testing-library/user-event';


describe(SearchBar, () => {
    const HandleChange = jest.fn()
    it("Search Bar is empty when loaded", () => {
        const { getByTestId="EmptyTest"} = render(<SearchBar HandleChange={HandleChange}/>, {wrapper: MemoryRouter})
        const EmptyTest = getByTestId("EmptyTest").textContent
        expect(EmptyTest).toBe("")
    })
})