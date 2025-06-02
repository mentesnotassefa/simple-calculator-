const display = document.getElementById("display");

function appendTo(input) {
    display.value += input;
}
function cleanDisplay() {
    display.value = "";
}
function calculate() {
    try{
        display.value = eval(display.value);
    }
    catch(error){
        display.value = "Error";
    }
      
    
}