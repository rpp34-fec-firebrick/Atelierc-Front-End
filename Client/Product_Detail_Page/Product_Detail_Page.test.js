import React from 'react';
import ReactDOM from 'react-dom';
import Product_Detail_Page from './Product_Detail_Page.js';

import '@testing-library/jest-dom';
import { render, cleanup } from "@testing-library/react";
import '@testing-library/jest-dom'
import renderer from "react-test-renderer"



 it ("Renders Product Detail Page without crashing", () => {
   var div = document.createElement('div');
   ReactDOM.render(<Product_Detail_Page/>, div)
 })