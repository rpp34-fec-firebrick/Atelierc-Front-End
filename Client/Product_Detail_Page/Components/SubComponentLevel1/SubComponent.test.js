import React from 'react';
import ReactDOM from 'react-dom';

import '@testing-library/jest-dom';
import { render, cleanup } from "@testing-library/react";
import { act } from 'react-dom/test-utils';
// import "jest-dom/extend-expect";
import { createRoot } from 'react-dom/client';
import {describe, expect, test} from '@jest/globals'
import renderer from "react-test-renderer"

import AddToCartButton from './AddToCartButton.js';
import ImageRender from './ImageRender.js';
import DescriptionListRender from './DescriptionListRender.js';
import DescriptionList from './DescriptionList.js';
import StyleRender from './StyleRender.js';
import QuantitySelector from './QuantitySelector.js';
import SizeSelector from './SizeSelector.js';


afterEach(cleanup)

 it ("Renders AddToCartButton without crashing", () => {
  const container = document.createElement('div');
  const root = createRoot(container);
  root.render(<AddToCartButton />);
 })

 it ("Renders ImageRender without crashing", () => {
  const container = document.createElement('div');
  const root = createRoot(container);
  root.render(<ImageRender />);
})

it ("Renders DescriptionListRender without crashing", () => {
  const container = document.createElement('div');
  const root = createRoot(container);
    root.render(<DescriptionListRender />);
})

it ("Renders DescriptionList without crashing", () => {
  const container = document.createElement('div');
  const root = createRoot(container);
    root.render(<DescriptionList />);
})

it ("Renders StyleRender without crashing", () => {
  const container = document.createElement('div');
  const root = createRoot(container);
    root.render(<StyleRender />);
})

it ("Renders QuantitySelector without crashing", () => {
  const container = document.createElement('div');
  const root = createRoot(container);
  act(() => {
    root.render(<QuantitySelector />);
  });
})

it ("Renders SizeSelector without crashing", () => {
  const container = document.createElement('div');
  const root = createRoot(container);
  act(() => {
    root.render(<SizeSelector />);
  });
})