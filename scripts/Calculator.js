import StandardCalculator from './StandardCalculator.js';
import ScientificCalculator from './ScientificCalculator.js';
import { standardButtonsArr, scientificButtonsArr } from './consts.js';

class Calculator {
    constructor(rootElement) {
        this.rootElement = rootElement;
        this.calculatorType = 'standard';
        this.buildCalculatorElements();
        this.setCalculatorClass();
    }

    buildCalculatorElements() {
        this.buildCalculatorTypeSelector();
        this.buildCalculatorDisplay();
        this.buildCalculatorButtons();
    }

    buildCalculatorTypeSelector() {
        let calculatorTypesArr = ['standard', 'scientific'];

        let div = this.createDivElement(['']);

        let select = document.createElement('select');
        select.id = 'calculator-type';
        select.addEventListener('change', event => this.handleCalculatorTypeChange(event.target.value));

        calculatorTypesArr.forEach(type => {
            let option = document.createElement('option');
            option.value = type;
            option.innerHTML = type.toUpperCase();
            select.appendChild(option);
        });

        div.appendChild(select);
        this.rootElement.appendChild(div);
    }

    handleCalculatorTypeChange(value) {
        this.previousOperandTextElement.innerHTML = '';
        this.currentOperandTextElement.innerHTML = '0';
        this.rootElement.removeChild(this.buttonsContainer);

        this.calculatorType === 'standard' ? this.calculatorType = 'scientific' : this.calculatorType = 'standard';

        this.setCalculatorClass();

        this.buildCalculatorButtons();
    }

    setCalculatorClass() {
        this.calculatorClass = (this.calculatorType === 'standard') ? new StandardCalculator(this.currentOperandTextElement, this.previousOperandTextElement) : new ScientificCalculator(this.currentOperandTextElement, this.previousOperandTextElement);
    }

    buildCalculatorDisplay() {
        let div = this.createDivElement(['output']);

        this.previousOperandTextElement = this.createParagraphElement('0', ['current-operand']);
        this.currentOperandTextElement = this.createParagraphElement('', ['previous-operand']);

        div.appendChild(this.previousOperandTextElement);
        div.appendChild(this.currentOperandTextElement);

        this.rootElement.appendChild(div);
    }

    createParagraphElement(text, classListArr) {
        let p = document.createElement('p');
        p.innerHTML = text;
        this.addClassList(p, classListArr);

        return p;
    }

    buildCalculatorButtons() {
        this.buttonsContainer = this.createDivElement(['buttons']);

        let buttonArr = null;
        let buttonPerRow = 4;
        if (this.calculatorType === 'standard') {
            buttonArr = standardButtonsArr;
        } else {
            buttonPerRow = 5;
            buttonArr = scientificButtonsArr;
        }

        for (let i = 0; i < buttonArr.length; i++) {
            let index = i + 1;

            if (index % buttonPerRow == 0) {
                let row = this.createDivElement(['row']);

                for (let j = index - buttonPerRow; j < index; j++) {
                    row.appendChild(this.createButtonElement(buttonArr[j]));
                }

                this.buttonsContainer.appendChild(row);
            }
        }

        this.rootElement.appendChild(this.buttonsContainer);
    }

    createDivElement(classListArr) {
        let div = document.createElement('div');
        this.addClassList(div, classListArr);
        return div;
    }

    addClassList(element, classListArr) {
        classListArr.forEach(classText => {
            if (classText !== '') {
                element.classList.add(classText);
            }
        });
    }

    createButtonElement({ classListArr, value, text, datasetKey, datasetValue }) {
        let button = document.createElement('button');
        button.value = value;
        button.type = 'button';
        button.innerHTML = text;
        button.dataset[datasetKey] = datasetValue;
        this.addClassList(button, classListArr);

        button.addEventListener('click', event => this.handleInput(event.target.value));

        return button;
    }

    handleInput(value) {
        value = value.toString();

        switch (value) {
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.calculatorClass.appendDigit(value);
                break;

            case '+':
            case '-':
            case '*':
            case '/':
            case 'xPowerOfY':
                this.calculatorClass.chooseOperation(value);
                break;

            case '%':
            case 'oneOf':
            case 'powerOfTwo':
            case 'square-root':
            case 'log':
            case 'abs':
            case 'tenOnX':
            case 'factorial':
                this.calculatorClass.singleOperation = true;
                this.calculatorClass.chooseOperation(value);
                break;

            case '=':
            case 'Enter':
                this.calculatorClass.compute();
                break;

            case 'del':
            case 'Backspace':
                this.calculatorClass.deleteLastDigit();
                break;

            case 'clear-entry':
                this.calculatorClass.clearEntry()
                break;

            case 'clear-all':
            case 'Escape':
                this.calculatorClass.clearAll();
                break;

            case 'pi':
                this.calculatorClass.pi();
                break;

            case '.':
                this.calculatorClass.appendDecimal();
                break;

            case 'plus-minus':
                this.calculatorClass.toggleNegative();
                break;

            default:
                return;
        }

        this.calculatorClass.updateDisplay();
    }

}

export default Calculator;