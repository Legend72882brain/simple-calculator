let display = document.getElementById('display');
let expression = '';

function appendNumber(num) {
    expression += num;
    updateDisplay();
}

function appendOperator(operator) {
    if (expression === '' && operator !== '-') return;
    
    // Prevent multiple operators in a row (except for negative numbers)
    if (expression && '+-*/.'.includes(expression.charAt(expression.length - 1))) {
        if (operator !== '-' || expression.charAt(expression.length - 1) === '-') {
            return;
        }
    }
    
    expression += operator;
    updateDisplay();
}

function deleteLast() {
    expression = expression.slice(0, -1);
    updateDisplay();
}

function clearDisplay() {
    expression = '';
    updateDisplay();
}

function updateDisplay() {
    display.value = expression || '0';
}

function calculate() {
    if (expression === '') return;
    
    try {
        // Replace display symbols with actual operators
        let calc = expression
            .replace(/÷/g, '/')
            .replace(/×/g, '*')
            .replace(/−/g, '-');
        
        // Validate the expression
        if (/[+\-*/.^]$/.test(calc)) {
            return; // Don't calculate if expression ends with operator
        }
        
        // Evaluate the expression
        let result = eval(calc);
        
        // Round to avoid floating point errors
        result = Math.round(result * 100000000) / 100000000;
        
        expression = result.toString();
        updateDisplay();
    } catch (error) {
        display.value = 'Error';
        expression = '';
    }
}

// Keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (key >= '0' && key <= '9') {
        appendNumber(key);
    } else if (key === '.') {
        appendOperator('.');
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        appendOperator(key);
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Backspace') {
        event.preventDefault();
        deleteLast();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearDisplay();
    }
});

// Initialize display
updateDisplay();
