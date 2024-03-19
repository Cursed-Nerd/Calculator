let prevDisplay = document.getElementById("prevDisplay");
let currDisplay = document.getElementById("currDisplay");
let curr = "0", prev = "", operation = "", ans = "", taken = false;
currDisplay.textContent = curr;

window.addEventListener("keydown",userInput);
let btns = document.querySelectorAll('button');
btns.forEach(btn => {
    btn.addEventListener("click", () => {
        takeInput(btn.value);
    })
})
function userInput(e){
    takeInput(e.key);
}

function takeInput(value){
    let val = value;
    if(isFinite(val)){ // numbers
        if(curr.toString().length == 12){
            resize();
        }
        if(curr.toString().length == 20){
            reset(true);
            return;
        }
        if(taken){
            curr = "0";
            taken = false;
        }
        if(curr == '0'){
            if(val == '0') return;
            curr = "";
            curr+=val;
        }
        else curr+=val;        
    }
    else if(val == '.'){
        curr+=val;
    }
    else if(['/', '-', '+', '*'].includes(val)){ // operations
        operation = val;
        if(prev.length == 0){
            prev = curr;
            curr = '0';
        }
        taken = true;
    }
    else if(val == "Backspace" || val == 'C'){ // remove last element
        if(curr.length > 0 && curr != '0') curr = curr.slice(0,-1);
    }
    else if(val == '=' || val == 'Enter'){ // print result
        if(prev.length == 0 || curr.length == 0 || operation.length == 0) return;

        ans = calculate(prev,curr,operation);
        if(ans.toString().length > 20){
            reset(true);
            return;
        }
        else{
            if(ans.toString().length > 10) resize();
            else  currDisplay.style.fontSize = '';
        }

        currDisplay.textContent = ans;
        prevDisplay.textContent = prev + operation + curr + " =";
        prev = ans;
        curr = "0";
        operation = ""
        return;
    }
    else return;
    prevDisplay.textContent = prev + operation;
    currDisplay.textContent = curr;
    console.log(val, ", Curr: " + curr, "Prev: " + prev, "operation: " + operation);
}

function calculate(a,b,op){
    a = parseFloat(a);
    b = parseFloat(b);
    console.log(a,op,b);
    
    if(op == '+'){
        return a+b;
    }
    else if(op == '-'){
        return a-b;
    }
    else if(op == '/'){
        return a/b;
    }
    else if(op == '*'){
        if(a == 0 || b == 0) return 0;
        return a*b;
    }
    return prev;
}

function reset(print){
    if(print) curr = "CALM DOWN BRO";
    currDisplay.textContent = curr;
    curr = "0", prev = "", operation = "", ans = "", taken = false;
    return;
}

function resize(){
    currDisplay.style.fontSize = '25px';
}