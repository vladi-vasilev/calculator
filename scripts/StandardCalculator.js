class StandardCalculator {
    constructor(currentOperandTextElement, previousOperandTextElement) {
        this.currentOperandTextElement = currentOperandTextElement;
        this.previousOperandTextElement = previousOperandTextElement;
        this.clearAll();
    }

    clearAll() {
        this.clearEntry();
        this.firstOperand = '';
        this.operation = null;
        this.canOverwrite = false;
        this.singleOperation = false;
    }

    clearEntry() {
        this.currentOperand = '0';
    }

    deleteLastDigit() {
        if (this.currentOperand !== '0')
            this.currentOperand = this.currentOperand.slice(0, -1);

        if (this.currentOperand === '')
            this.clearEntry();

        this.canOverwrite = false;
    }

    toggleNegative() {
        if (this.currentOperand !== '0')
            this.currentOperand = (this.currentOperand[0] !== '-') ? `-${this.currentOperand}` : this.currentOperand.substring(1);

        this.canOverwrite = false;
    }

    appendDigit(digit) {
        //this check can be removed but the calculator will refresh 
        //every time we try to add a 0 when the currentOperand is 0
        if (digit === '0' && this.currentOperand === '0') return;

        if (this.currentOperand === '0' || this.canOverwrite) {
            this.currentOperand = '';
            this.canOverwrite = false;
        }

        this.currentOperand = this.currentOperand + digit;
    }

    appendDecimal() {
        if (!this.currentOperand.includes('.'))
            this.currentOperand = `${this.currentOperand}.`;

        this.canOverwrite = false;
    }

    chooseOperation(usedOperation) {
        if (this.singleOperation) {
            if (this.currentOperand !== '0') {
                if (this.firstOperand === '') {
                    this.operation = usedOperation;
                    return this.computeSingle();
                }
                else {
                    const lastOperation = this.operation;

                    this.operation = usedOperation;
                    this.computeSingle();

                    this.operation = lastOperation;
                    return this.compute();
                }
            } else {
                return this.singleOperation = false;
            }

        } else {
            if (this.firstOperand !== '') {
                if (this.currentOperand !== '0') {
                    this.compute();
                } else {
                    return this.operation = usedOperation;
                }
            }
        }

        if (parseFloat(this.currentOperand) == 0)
            this.clearEntry();


        this.firstOperand = this.currentOperand;
        this.clearEntry();
        this.operation = usedOperation;
    }

    compute() {
        const first = parseFloat(this.firstOperand);
        const second = parseFloat(this.currentOperand);
        let computation;

        if (isNaN(first) || isNaN(second)) return;

        switch (this.operation) {
            case '+':
                computation = first + second;
                break;
            case '-':
                computation = first - second;
                break;
            case '*':
                computation = first * second;
                break;
            case '/':
                computation = first / second;
                break;

            default:
                return;
        }

        // let a = computation * presision
        // let b = a / presision
        // // let c = Math.round(b);
        // let c = b;
        // currentOperand = c.toString();
        // console.log('multy', a, b, c)

        this.currentOperand = computation.toString();

        this.operation = null;
        this.firstOperand = '';
        this.canOverwrite = true;
    }

    computeSingle() {
        const operand = parseFloat(this.currentOperand);
        let computation;

        if (isNaN(operand)) return;

        switch (this.operation) {
            case '%':
                computation = operand / 100;
                break;
            case 'oneOf':
                computation = 1 / operand;
                break;
            case 'powerOfTwo':
                computation = Math.pow(operand, 2);
                break;
            case 'square-root':
                computation = Math.sqrt(operand);
                break;

            default:
                return;
        }

        // let a = computation * presision
        // let b = a / presision
        // let c = Math.round(b);
        // let c = b;
        // currentOperand = c.toString();
        // currentOperand = computation.toString();
        // console.log('single', a, b, c)


        // currentOperand = (Math.round(computation * presision) / presision).toString();
        this.currentOperand = computation.toString();

        this.operation = null;
        this.canOverwrite = true;
        this.singleOperation = false;
    }

    updateDisplay() {
        // // currentOperandTextElement.innerText = getDisplayNumber(currentOperand);
        this.currentOperandTextElement.innerText = this.currentOperand;

        if (this.operation != null) {
            // previousOperandTextElement.innerText = `${getDisplayNumber(firstOperand)} ${formatOperation()}`;
            this.previousOperandTextElement.innerText = `${this.firstOperand} ${this.formatOperation(this.operation)}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }

    // put in helper functions file?
    formatOperation(operation) {
        switch (operation) {
            case '*': return '×';
            case '/': return '÷';
            case 'xPowerOfY': return '';
            default: return operation;
        }
    }
}

export default StandardCalculator;