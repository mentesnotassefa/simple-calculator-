const display = document.getElementById("display");
const history = document.getElementById("history");

function appendTo(input) {
    if (display.value === "Error") {
        display.value = "";
    }
    display.value += input;
}

function cleanDisplay() {
    display.value = "";
    history.textContent = "";
}

function backspace() {
    if (display.value === "Error") {
        display.value = "";
    } else {
        display.value = display.value.slice(0, -1);
    }
}

function calculate() {
    try {
        let expression = display.value.replace(/%/g, '/100');
        let result = eval(expression);
        result = Number(result.toFixed(6));
        history.textContent = `${display.value} = ${result}`;
        display.value = result;
    } catch (error) {
        display.value = "Error";
        setTimeout(() => {
            display.value = "";
        }, 1500);
    }
}

// Prevent invalid inputs (e.g., multiple decimals, consecutive operators)
function validateInput() {
    display.addEventListener("input", () => {
        display.value = display.value.replace(/[^0-9+\-*/.()]/g, "");
        // Prevent multiple decimals in a number
        const parts = display.value.split(/[-+*/]/);
        for (let part of parts) {
            if ((part.match(/\./g) || []).length > 1) {
                display.value = display.value.slice(0, -1);
            }
        }
    });
}

// Keyboard support
document.addEventListener("keydown", (event) => {
    event.preventDefault();
    const key = event.key;
    if (/[0-9]/.test(key)) {
        appendTo(key);
    } else if (key === "+" || key === "-" || key === "*" || key === "/" || key === "%" || key === "(" || key === ")") {
        appendTo(key === "*" ? "×" : key === "/" ? "÷" : key);
    } else if (key === "." && !display.value.endsWith(".")) {
        appendTo(".");
    } else if (key === "Enter" || key === "=") {
        calculate();
    } else if (key === "Backspace") {
        backspace();
    } else if (key === "Escape" || key === "c" || key === "C") {
        cleanDisplay();
    }
});

// Initialize input validation
validateInput();