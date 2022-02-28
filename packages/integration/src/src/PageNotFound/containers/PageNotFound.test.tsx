// @ts-ignore
import * as React from "react";
import { screen } from '@testing-library/dom'
import PageNotFound from './PageNotFound';
import { renderWithReduxRouter } from "../../mock/utils.mock";
import { MOCK_STORE_STATE_FRESH } from "../../fixtures";

describe('PageNotFound', () => {
    test('should display a title', () => {

        renderWithReduxRouter(<PageNotFound/>, {initialState: MOCK_STORE_STATE_FRESH});

        expect(screen.getByTestId('not-found-title')).toBeTruthy();

    });
});
