import React from 'react';
import ReactDOM from 'react-dom';

import '@testing-library/jest-dom';
import { render, cleanup } from "@testing-library/react";
// import "jest-dom/extend-expect";
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

 it ("renders without crashing", () => {
   var div = document.createElement('div');
   ReactDOM.render(AddToCartButton, div)
 })

 it ("renders without crashing", () => {
  var div = document.createElement('div');
  ReactDOM.render(ImageRender, div)
})

it ("renders without crashing", () => {
  var div = document.createElement('div');
  ReactDOM.render(DescriptionListRender, div)
})

it ("renders without crashing", () => {
  var div = document.createElement('div');
  ReactDOM.render(DescriptionList, div)
})

it ("renders without crashing", () => {
  var div = document.createElement('div');
  ReactDOM.render(StyleRender, div)
})

it ("renders without crashing", () => {
  var div = document.createElement('div');
  ReactDOM.render(QuantitySelector, div)
})

it ("renders without crashing", () => {
  var div = document.createElement('div');
  ReactDOM.render(SizeSelector, div)
})