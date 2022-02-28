import * as React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Navback } from "./nav-back.component";

describe("Navback", () => {
    const fn = jest.fn();
    // automatically unmount and cleanup DOM after the test is finished.
    afterEach(cleanup);
    test("It should pop one history", async () => {
        render(
            <Navback
                {...{
                    history: {
                        goBack: fn,
                    },
                }}
            />
        );

        const back = await screen.getByText(/back/i);

        fireEvent.click(back);

        expect(fn).toHaveBeenCalled();
    });
});
