import React from 'react';
import ReactDOM from 'react-dom';

import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {render, act, fireEvent, waitFor, screen, cleanup} from '@testing-library/react';
import {describe, expect, test} from '@jest/globals';
import { createRoot } from 'react-dom/client';
import '@testing-library/jest-dom';
import 'regenerator-runtime/runtime';

// import "jest-dom/extend-expect";
import renderer from "react-test-renderer"

import  Questions_Answers from './Questions_Answers';
import { data } from './fixtures/questions_answers';

const server = setupServer(
    rest.post('/questions', (req, res, ctx) => {
      return res(ctx.json(data))
    }),

    rest.post('/questionSubmit', (req, res, ctx) => {
      return res.end();
    })
  );

beforeAll(() => server.listen());

afterEach(() => {
  server.resetHandlers()
  cleanup();

});

afterAll(() => server.close());

describe('Questions and Answers Widget', () => {

    test('Should render Questions and Answers widget without crashing', async () => {
        render(<Questions_Answers />);

        const widget = screen.getByTestId('QnAWidget');

        expect(widget).toBeInTheDocument();
    });

    test('Should render Question and Answers widget when no productId is passed', async () => {
      render(<Questions_Answers />);

      const widget = screen.getByTestId('QnAWidget');

      expect(widget).toHaveTextContent("There isn't any questions for this product yet");
    });

    test('Modal should exist on "Add a Question" button click and should have an id of "questionModal"', () => {
      render(<Questions_Answers />);

      const questionBtn = screen.getByTestId('questionBtn');

      fireEvent.click(questionBtn);

      const modal = screen.getByTestId('modal');

      expect(modal).toBeInTheDocument();
      expect(modal.id).toBe("questionModal");
      expect(modal).toHaveTextContent('Ask Your Question');
    });

    test('Modal inputs should change', () => {
      render(<Questions_Answers />);

      const questionBtn = screen.getByTestId('questionBtn');

      fireEvent.click(questionBtn);

      const questionBody = screen.getByTestId('questionBody');
      const nickname = screen.getByTestId('nickname');
      const email = screen.getByTestId('email');
      const submit = screen.getByTestId('submitQuestion');

      fireEvent.change(questionBody, {
        target: {
          value: 'Testing question body'
        }
      });

      fireEvent.change(nickname, {
        target: {
          value: 'testing123'
        }
      });

      fireEvent.change(email, {
        target: {
          value: 'sample@email.com'
        }
      });

      expect(questionBody).toHaveTextContent('Testing question body');
      expect(nickname).toHaveValue('testing123');
      expect(email).toHaveValue('sample@email.com');

      fireEvent.click(submit);

      const modal = screen.getByTestId('modal');

      // test if modal goes away after submit?
    });

    // test('Should render Question and Answers widget when productId is passed', async () => {
    //   await render(<Questions_Answers productId={64912} />);

    //   const questionList = screen.getByTestId('questionList');

    //   expect(questionList).toBeInTheDocument();
    // });

  });