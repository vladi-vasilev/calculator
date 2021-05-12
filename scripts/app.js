import Calculator from './Calculator.js';

const rootElement = document.getElementById('calculator-root');
let calculator = new Calculator(rootElement);

// Keyboard support
window.addEventListener('keydown', event => calculator.handleInput(event.key));
