import React from 'react';
import ReactDOM from 'react-dom';
import Product_Detail_Page from './Product_Detail_Page.js';

// test('Should render to the DOM', () => {
//   expect(handleImageClick()).toLog('hi')
// })

// test('the data is peanut butter', async () => {
//   const data = await app.post('/products');
//   expect(data).not.toBe(null);
// });

import '@testing-library/jest-dom';
import { render, cleanup } from "@testing-library/react";
import "jest-dom/extend-expect";
import renderer from "react-test-renderer"



 it ("renders without crashing", () => {
   var div = document.createElement('div');
   ReactDOM.render(Product_Detail_Page, div)
 })