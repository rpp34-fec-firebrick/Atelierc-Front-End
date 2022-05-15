import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import AddToCart from './AddToCart.js';
import Description from './Description.js';
import ImageWheel from './ImageWheel.js';
import ProductInformation from './ProductInformation.js';
import StyleSelection from './StyleSelection.js'

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

it ("Renders AddToCart without crashing", () => {
  const container = document.createElement('div');
  const root = createRoot(container);
  act(() => {
    ReactDOM.createRoot(container).render(<AddToCart currentProductId={71967}/>);
  });
})

it ("Should render ImageWheel without crashing", () => {
  const container = document.createElement('div');
  const root = createRoot(container);
  act(() => {
    ReactDOM.createRoot(container).render(<ImageWheel currentProductId={71967}/>);
  });
})

it ("Should render ProductInformation without crashing", () => {
  const container = document.createElement('div');
  const root = createRoot(container);
  act(() => {
    ReactDOM.createRoot(container).render(<ProductInformation currentProductId={71967}/>);
  });
})

it ("Should render StyleSelection without crashing", () => {
  const container = document.createElement('div');
  const root = createRoot(container);
  act(() => {
    ReactDOM.createRoot(container).render(<StyleSelection currentProductId={71967}/>);
  });
})

describe('StyleSelection Component', () => {

  test('Should render StyleSelection without crashing', () => {
      render(<StyleSelection currentProductId={71967}/>);

      const widget = screen.getByTestId('style');

      expect(widget).toHaveTextContent("Style >");
  });
});


describe('ImageWheel Component', () => {
  test('Tests ImageWheel Length', async () => {
    render(<ImageWheel currentProductId={71967} />);

    await waitFor(() => screen.getByTestId('imageWheel'));

    let images = screen.queryAllByTestId('imageRender');
      console.log(images.length)
    expect(images.length).toEqual(0);
  });
})

