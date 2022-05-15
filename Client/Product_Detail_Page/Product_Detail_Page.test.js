import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import Product_Detail_Page from './Product_Detail_Page.js';
import SizeSelector from './Components/SubComponentLevel1/SizeSelector.js'
import SizeSelectorRender from './Components/SubComponentLevel1/SubComponentLevel2/SizeSelectorRender.js';
import DescriptionListRender from './Components/SubComponentLevel1/SubComponentLevel2/DescriptionListRender.js';
import QuantitySelectorRender from './Components/SubComponentLevel1/SubComponentLevel2/QuantitySelectorRender.js';

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

it ("Renders Product Detail Page without crashing", () => {
  const container = document.createElement('div');
  const root = createRoot(container);
  act(() => {
    ReactDOM.createRoot(container).render(<Product_Detail_Page />);
  });
})

it ("Should render SizeSelector without crashing", () => {
  const container = document.createElement('div');
  const root = createRoot(container);
  act(() => {
    ReactDOM.createRoot(container).render(<SizeSelector />);
  });
})

it ("Should render QuantitySelectorRender without crashing", () => {
  const container = document.createElement('div');
  const root = createRoot(container);
  act(() => {
    ReactDOM.createRoot(container).render(<QuantitySelectorRender />);
  });
})

describe('Product Detail Page Widget', () => {

  test('Should render Product Detail Page widget without crashing', () => {
      render(<Product_Detail_Page />);

      const widget = screen.getByTestId('Product_Detail_Page');

      expect(widget).toBeInTheDocument();
  });

  test('Should render Price widget when no productId is passed', () => {
    render(<Product_Detail_Page />);

    const widget = screen.getByTestId('Product_Detail_Page');

    expect(widget).toHaveTextContent("$");
  });

  test('Checks to make sure that the image wheel is rendered', async () => {
    render(<Product_Detail_Page currentProductId={71967} />);

    await waitFor(() => screen.getByTestId('Product_Detail_Page'));

    const imageWheel = screen.getByTestId('ImageWheel');
    expect(imageWheel).toBeInTheDocument();
  });

  test('Checks to make sure that the ProductInformation component is rendered', async () => {
    render(<Product_Detail_Page currentProductId={71967} />);

    await waitFor(() => screen.getByTestId('Product_Detail_Page'));

    const productInformation = screen.getByTestId('ProductInformation');
    expect(productInformation).toBeInTheDocument();

  });

  test('Checks to make sure that the StyleSelection component is rendered', async () => {
    render(<Product_Detail_Page currentProductId={71967} />);

    await waitFor(() => screen.getByTestId('Product_Detail_Page'));

    const styleSelection = screen.getByTestId('StyleSelection');
    expect(styleSelection).toBeInTheDocument();
  });

  test('Checks to make sure that the AddToCart component is rendered', async () => {
    render(<Product_Detail_Page currentProductId={71967} />);

    await waitFor(() => screen.getByTestId('Product_Detail_Page'));

    const addToCart = screen.getByTestId('AddToCart');
    expect(addToCart).toBeInTheDocument();
  });

});

