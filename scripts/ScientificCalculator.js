import StandardCalculator from './StandardCalculator.js';

class ScientificCalculator extends StandardCalculator {
    compute() {
        const first = parseFloat(this.firstOperand);
        const second = parseFloat(this.currentOperand);
        let computation;

        console.log(this.operation)
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

            case 'xPowerOfY':
                computation = Math.pow(first, second);;
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

    pi() {
        this.currentOperand = Math.PI;
        this.canOverwrite = true;
    }

    factorial(value) {
        console.log(value)
        if (value === 0) {
            return 1;
        }
        else {
            return value * this.factorial(value - 1);
        }
    }

    computeSingle() {
        const operand = parseFloat(this.currentOperand);
        let computation;

        if (isNaN(operand)) return;

        switch (this.operation) {
            case 'log':
                computation = Math.log10(operand);
                break;
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
            case 'tenOnX':
                computation = Math.pow(10, operand);
                break;
            case 'abs':
                computation = Math.abs(operand);
                break;
            case 'factorial':
                computation = this.factorial(operand);
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


}

export default ScientificCalculator;