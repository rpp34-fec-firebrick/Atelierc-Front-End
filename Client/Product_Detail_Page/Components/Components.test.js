import React from 'react';
import ReactDOM from 'react-dom';

import '@testing-library/jest-dom';
import { render, cleanup } from "@testing-library/react";
import { createRoot } from 'react-dom/client';
// import "jest-dom/extend-expect";
import {describe, expect, test} from '@jest/globals'
import renderer from "react-test-renderer"

import Features from './Features.js';
import AddToCart from './AddToCart.js';
import ImageWheel from './ImageWheel.js';
import Description from './Description.js';
import StyleSelection from './StyleSelection.js';
import ProductInformation from './ProductInformation.js';

afterEach(cleanup)

 it ("Renders Features without crashing", () => {
  const container = document.createElement('div');
  const root = createRoot(container);
  root.render(<Features />);
 })

 it ("Renders AddToCart without crashing", () => {
  const container = document.createElement('div');
  const root = createRoot(container);
  root.render(<AddToCart />);
})

it ("Renders ImageWheel without crashing", () => {
  const container = document.createElement('div');
  const root = createRoot(container);
  root.render(<ImageWheel />);
})

it ("Renders Description without crashing", () => {
  const container = document.createElement('div');
  const root = createRoot(container);
  root.render(<Description />);
})

it ("Renders StyleSelection without crashing", () => {
  const container = document.createElement('div');
  const root = createRoot(container);
  root.render(<StyleSelection />);
})

it ("Renders ProductInformation without crashing", () => {
  const container = document.createElement('div');
  const root = createRoot(container);
  root.render(<ProductInformation />);
})