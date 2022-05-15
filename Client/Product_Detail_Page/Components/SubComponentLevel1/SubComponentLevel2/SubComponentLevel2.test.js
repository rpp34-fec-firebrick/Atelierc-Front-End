import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import SizeSelectorRender from './SizeSelectorRender.js'
import DescriptionListRender from './DescriptionListRender.js';
import QuantitySelectorRender from './QuantitySelectorRender.js';

import { act } from 'react-dom/test-utils';
import { rest } from 'msw';
import '@testing-library/jest-dom'
import 'regenerator-runtime/runtime';
import { setupServer } from 'msw/node';
import renderer from "react-test-renderer"
import { describe, expect, test } from '@jest/globals';
import { render, fireEvent, waitFor, waitForElementToBeRemoved, screen, cleanup } from '@testing-library/react';


const server = setupServer(
    rest.post('/products', (req, res, ctx) => {
      return res(ctx.json(response.data));
    })
  );


beforeAll(() => {
  server.listen();
});

beforeEach(() => {
  const container = document.createElement('div');
  const root = createRoot(container);
});

afterEach(() => {
  server.resetHandlers();
  cleanup();
});

afterAll(() => {
  server.close();
});

it ("Should Render each file without crashing", () => {
  const container = document.createElement('div');
  const root = createRoot(container);
  act(() => {
    ReactDOM.createRoot(container).render(<QuantitySelectorRender />);
  });
})

it ("Should Render each file without crashing", () => {
  const container = document.createElement('div');
  const root = createRoot(container);
  act(() => {
    ReactDOM.createRoot(container).render(<SizeSelectorRender />);
  });
})

it ("Should Render each file without crashing", () => {
  const container = document.createElement('div');
  const root = createRoot(container);
  act(() => {
    ReactDOM.createRoot(container).render(<DescriptionListRender />);
  });
})