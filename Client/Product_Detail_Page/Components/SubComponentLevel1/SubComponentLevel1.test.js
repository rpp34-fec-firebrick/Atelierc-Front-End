import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import Stars from './Stars.js';
import AddToOutfit from './AddToOutfit.js'
import ImageRender from './ImageRender.js';
import SizeSelector from './SizeSelector.js';
import StyleRender from './StyleRender.js'
import DescriptionList from './DescriptionList.js';
import QuantitySelector from './QuantitySelector.js'
import AddToCartButton from './AddToCartButton.js'
import SizeSelectorRender from './SubComponentLevel2/SizeSelectorRender.js'

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
    ReactDOM.createRoot(container).render(<Stars currentProductId={71967}/>);
  });
})

it ("Should Render each file without crashing", () => {
  const container = document.createElement('div');
  const root = createRoot(container);
  act(() => {
    ReactDOM.createRoot(container).render(<AddToOutfit currentProductId={71967}/>);
  });
})

it ("Should Render each file without crashing", () => {
  const container = document.createElement('div');
  const root = createRoot(container);
  act(() => {
    ReactDOM.createRoot(container).render(<SizeSelector currentProductId={71967}/>);
  });
})

it ("Should Render each file without crashing", () => {
  const container = document.createElement('div');
  const root = createRoot(container);
  act(() => {
    ReactDOM.createRoot(container).render(<QuantitySelector currentProductId={71967}/>);
  });
})

it ("Should Render each file without crashing", () => {
  const container = document.createElement('div');
  const root = createRoot(container);
  act(() => {
    ReactDOM.createRoot(container).render(<AddToCartButton currentProductId={71967}/>);
  });
})

it ("Should Render each file without crashing", () => {
  const container = document.createElement('div');
  const root = createRoot(container);
  act(() => {
    ReactDOM.createRoot(container).render(<ImageRender currentProductId={71967}/>);
  });
})


it ("Should Render each file without crashing", () => {
  const container = document.createElement('div');
  const root = createRoot(container);
  act(() => {
    ReactDOM.createRoot(container).render(<StyleRender  currentProductId={71967}/>);
  });
})

describe('Product Detail Page Widget', () => {
  test('Clicking the "More Answered Questions" button should load two more questions each time it is clicked', async () => {
    render(<DescriptionList currentProductId={71967} />);

    await waitFor(() => screen.getByTestId('descriptionFeatures'));

    let images = screen.queryAllByTestId('descriptionFeatures');
      console.log(images, 'lkasjdflksjdlfkjsdlfkjslfksjlskjfdlkdsj')
    expect(images.length).toEqual(undefined);
  });
})

