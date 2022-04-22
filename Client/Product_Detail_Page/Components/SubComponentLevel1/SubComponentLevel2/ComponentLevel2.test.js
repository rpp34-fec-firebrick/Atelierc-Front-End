import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

import '@testing-library/jest-dom';
import { render, cleanup } from "@testing-library/react";
import { act } from 'react-dom/test-utils';
// import "jest-dom/extend-expect";
import {describe, expect, test} from '@jest/globals'
import renderer from "react-test-renderer"

import QuantitySelectorRender from './QuantitySelectorRender.js';
import SizeSelectorRender from './SizeSelectorRender.js';


afterEach(cleanup)

it ("Renders QuantitySelectorRender without crashing", () => {
  const container = document.createElement('div');
  var root = createRoot(container);
  act(() => {
    root.render(<QuantitySelectorRender />);
  });

})

// it ("renders without crashing", () => {
//   var div = document.createElement('div');
//   ReactDOM.render(<SizeSelectorRender />, div)
// })