import React from 'react';
import ReactDOM from 'react-dom';

import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, fireEvent, waitFor, waitForElementToBeRemoved, screen, cleanup } from '@testing-library/react';
import { describe, expect, test } from '@jest/globals';
import { createRoot } from 'react-dom/client';
import '@testing-library/jest-dom';
import 'regenerator-runtime/runtime';

import renderer from "react-test-renderer"

import Questions_Answers from './Questions_Answers';
import fixtures from './fixtures/questions_answers'

const server = setupServer(
    rest.post('/questions', (req, res, ctx) => {
      return res(ctx.json(fixtures.data));
    }),

    rest.post('/questionSubmit', (req, res, ctx) => {
      return res.end();
    }),

    rest.post('/answerSubmit', (req, res, ctx) => {
      return res.end();
    })
  );


beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
  cleanup();
});

afterAll(() => {
  server.close();
});

describe('Questions and Answers Widget', () => {

  test('Should render Questions and Answers widget without crashing', () => {
      render(<Questions_Answers />);

      const widget = screen.getByTestId('QnAWidget');

      expect(widget).toBeInTheDocument();
  });

  test('Should render Question and Answers widget when no productId is passed', () => {
    render(<Questions_Answers />);

    const widget = screen.getByTestId('QnAWidget');

    expect(widget).toHaveTextContent("There isn't any questions for this product yet");
  });

  test('Question modal should exist on "Add a Question" button click and should have an id of "questionModal"', () => {
    render(<Questions_Answers />);

    const questionBtn = screen.getByTestId('questionBtn');

    fireEvent.click(questionBtn);

    const modal = screen.getByTestId('modal');

    expect(modal).toBeInTheDocument();
    expect(modal.id).toBe("questionModal");
    expect(modal).toHaveTextContent('Ask Your Question');
  });

  test('Answer modal should exist on "Add Answer" button click and should have an id of "answerModal"', async () => {
    render(<Questions_Answers productId={64912} />);

    await waitFor(() => screen.getByTestId('questionList'));

    const addAnswerBtn = screen.queryAllByTestId('addAnswer')[0];

    fireEvent.click(addAnswerBtn);

    const modal = screen.getByTestId('modal');

    expect(modal).toBeInTheDocument();
    expect(modal.id).toBe("answerModal");
    expect(modal).toHaveTextContent('Submit Your Answer');
  });

  test('Question modal inputs should change', async () => {
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

    expect(questionBody).toHaveValue('Testing question body');
    expect(nickname).toHaveValue('testing123');
    expect(email).toHaveValue('sample@email.com');

    fireEvent.click(submit);

    // await waitFor(() => expect(screen.getByTestId('modal')).not.toBeInTheDocument());
  });

  test('Answer modal inputs should change', async () => {
    render(<Questions_Answers productId={64912} />);

    await waitFor(() => screen.getByTestId('questionList'));

    const addAnswerBtn = screen.queryAllByTestId('addAnswer')[0];

    fireEvent.click(addAnswerBtn);

    const answerBody = screen.getByTestId('answerBody');
    const nickname = screen.getByTestId('nickname');
    const email = screen.getByTestId('email');
    const submit = screen.getByTestId('submitAnswer');

    fireEvent.change(answerBody, {
      target: {
        value: 'Testing answer body'
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

    expect(answerBody).toHaveValue('Testing answer body');
    expect(nickname).toHaveValue('testing123');
    expect(email).toHaveValue('sample@email.com');

    fireEvent.click(submit);

    // await waitFor(() => expect(screen.getByTestId('modal')).not.toBeInTheDocument());
  });

  test('Photo modal should appear when an image is clicked', async () => {
    render(<Questions_Answers productId={64912} />);

    await waitFor(() => screen.getByTestId('questionList'));

    fireEvent.click(screen.queryAllByTestId('photo')[0]);

    const modal = screen.getByTestId('modal');
    const close = screen.getByTestId('close');

    expect(modal).toBeInTheDocument();
    expect(modal.id).toBe("photoModal");

    fireEvent.click(close);

    await waitFor(() => expect(modal).not.toBeInTheDocument());
  });

  test('Should render Question and Answers widget when productId is passed', async () => {
    render(<Questions_Answers productId={64912} />);

    await waitFor(() => screen.getByTestId('questionList'));

    const questionList = screen.getByTestId('questionList');

    expect(questionList).toBeInTheDocument();
  });

  test('There should be two questions on page load', async () => {
    render(<Questions_Answers productId={64912} />);

    await waitFor(() => screen.getByTestId('questionList'));

    const questions = screen.queryAllByTestId('question');

    expect(questions.length).toEqual(2);
  });

  test('Clicking the "More Answered Questions" button should load two more questions each time it is clicked', async () => {
    render(<Questions_Answers productId={64912} />);

    await waitFor(() => screen.getByTestId('questionList'));

    fireEvent.click(screen.getByText('MORE ANSWERED QUESTIONS'));

    let questions = screen.queryAllByTestId('question');

    expect(questions.length).toEqual(4);

    fireEvent.click(screen.getByText('MORE ANSWERED QUESTIONS'));

    questions = screen.queryAllByTestId('question');

    expect(questions.length).toEqual(6);
  });

  test('There should be two answers loaded on page load for each question', async () => {
    render(<Questions_Answers productId={64912} />);

    await waitFor(() => screen.getByTestId('questionList'));

    const answers = screen.queryAllByTestId('answer');

    console.log('ANSWERS', answers)

    expect(answers.length).toEqual(2);
  });

  test('All answers for a question should load on click of "Load More Answers"', async () => {
    render(<Questions_Answers productId={64912} />);

    await waitFor(() => screen.getByTestId('questionList'));

    fireEvent.click(screen.queryAllByText('LOAD MORE ANSWERS')[0]);

    const answers = screen.queryAllByTestId('answer');

    expect(answers.length).toEqual(9);
  });

  test('There should be two answers after expanding and retracting answer list for a question', async () => {
    render(<Questions_Answers productId={64912} />);

    await waitFor(() => screen.getByTestId('questionList'));

    fireEvent.click(screen.queryAllByText('LOAD MORE ANSWERS')[0]);

    fireEvent.click(screen.queryByText('COLLAPSE ANSWERS'));

    const answers = screen.queryAllByTestId('answer');

    expect(answers.length).toEqual(2);
  });

  });