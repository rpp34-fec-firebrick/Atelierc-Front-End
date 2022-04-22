import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'regenerator-runtime/runtime';

import Questions_Answers from './Questions_Answers';
import { data } from './fixtures/questions_answers';

const server = setupServer(
    rest.post('/questions', (req, res, ctx) => {
        return res(ctx.json(data))
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Related product & Mhy outfit listm    ', () => {

    test('renders', async () => {
        render(<Questions_Answers />);

        await waitFor(() => screen.getByText("There isn't any questions for this product yet"));

        expect(screen.getByText("There isn't any questions for this product yet")).toBeTruthy();
    })
}) 