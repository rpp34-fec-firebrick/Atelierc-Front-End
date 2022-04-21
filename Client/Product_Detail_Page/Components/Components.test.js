import React from 'react';
import ReactDOM from 'react-dom';

import '@testing-library/jest-dom';
import { render, cleanup } from "@testing-library/react";
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

 it ("renders without crashing", () => {
   var div = document.createElement('div');
   ReactDOM.render(Features, div)
 })

 it ("renders without crashing", () => {
  var div = document.createElement('div');
  ReactDOM.render(AddToCart, div)
})

it ("renders without crashing", () => {
  var div = document.createElement('div');
  ReactDOM.render(ImageWheel, div)
})

it ("renders without crashing", () => {
  var div = document.createElement('div');
  ReactDOM.render(Description, div)
})

it ("renders without crashing", () => {
  var div = document.createElement('div');
  ReactDOM.render(StyleSelection, div)
})

it ("renders without crashing", () => {
  var div = document.createElement('div');
  ReactDOM.render(ProductInformation, div)
})