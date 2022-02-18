import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./App";

function init() {
    return render(
        <App />
    );
}

describe("<App />", () => {
    it('without data should show loading screen', () => {
        init();
        expect(screen.getByTestId("loading")).toBeInTheDocument();
    });

    it('Should fetch only 10 data at first and on scroll Should fetch next 10 data', async () => {
        init();
        jest.useRealTimers();
        const items = await screen.findAllByTestId("todo-item");
        expect(items.length).toBeLessThanOrEqual(10);
        fireEvent.scroll(window, { target: { scrollY: 200 } });
        await waitFor(() => {
            expect(screen.getAllByTestId("todo-item")).toHaveLength(20);
        }, { timeout: 5000 })
    });

    describe('It should test single item handling', () => {
        beforeEach(async () => {
            init();
            const items = await screen.findAllByLabelText("edit");
            fireEvent.click(items[0]);
        })

        it('input field has focus', () => {
            const inputField = screen.getByLabelText("Title");
            expect(inputField).toHaveFocus();
        })

        it('onclick edit open dialog', () => {
            expect(screen.getByRole("dialog")).toBeInTheDocument();
        })
    })

});
