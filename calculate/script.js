

alert(

    "\n WELCOME ENJOY WELL YOUR CALCULATE "

)



const request = document.getElementById('request');
const response = document.getElementById('response');
const chiffres = document.querySelectorAll('.nombre');
const signes = document.querySelectorAll('.signe');
const resetBtn = document.querySelector('.reset');
const egalBtn = document.querySelector('.egale');

let clear = document.querySelector('.clear')


request.disabled = true;
response.disabled = true;

function appendToRequest(char) {
    request.value += char;
}

chiffres.forEach(btn => {
    btn.addEventListener('click', () => {
        appendToRequest(btn.textContent);
    });
});


clear.addEventListener('click',()=>{
      request.value = '';
      response.value = '';
})

signes.forEach(btn => {
    btn.addEventListener('click', () => {
        const val = btn.textContent;

        if (val === '^2') {
            appendToRequest('^2');
        } else if (val === '√' || val === '&radic;') {
            appendToRequest('sqrt(');
        } else {
            appendToRequest(val);
        }
    });
});

resetBtn.addEventListener('click', () => {
    const current = request.value;
    if (current.length > 0) {
        request.value = current.slice(0, -1); 
    }
});

egalBtn.addEventListener('click', () => {
    try {
        const expr = request.value
            .replace(/\^2/g, '^2')        
            .replace(/\[/g, '(')
            .replace(/\]/g, ')');

        const result = math.evaluate(expr);
        response.value = result;
    } catch (error) {
        response.value = "Erreur";
    }
});
