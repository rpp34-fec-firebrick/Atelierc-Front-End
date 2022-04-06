import React from 'react';
import ReactDOM from 'react-dom';
import Questions_Answers from './Questions_Answers.js';

/*
 * @jest-environment jsdom
 */

test('should render to the dom', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Questions_Answers />, div);
})