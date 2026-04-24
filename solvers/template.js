export function /*color*/a(edgework, inputs){
    //ONLY if needed
    //function mod(a, b){return ((a%b)+b)%b;}

    const;
    let firstdigit=Number(edgework[0]);
    let encrypted=inputs[0];

    encrypted=encrypted.slice(6);
    if(encrypted.length!=6){
        return "ERROR";
    }
    else{
        return encrypted.toUpperCase();
    }
}