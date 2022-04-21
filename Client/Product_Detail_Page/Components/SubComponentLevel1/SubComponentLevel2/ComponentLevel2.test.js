import React from 'react';
import ReactDOM from 'react-dom';

import '@testing-library/jest-dom';
import { render, cleanup } from "@testing-library/react";
// import "jest-dom/extend-expect";
import {describe, expect, test} from '@jest/globals'
import renderer from "react-test-renderer"

import QuantitySelectorRender from './QuantitySelectorRender.js';
import SizeSelectorRender from './SizeSelectorRender.js';


afterEach(cleanup)

it ("renders without crashing", () => {
  var div = document.createElement('div');
  ReactDOM.render(<QuantitySelectorRender />, div)
})

// it ("renders without crashing", () => {
//   var div = document.createElement('div');
//   ReactDOM.render(<SizeSelectorRender />, div)
// })