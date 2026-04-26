export function /*color*/a(edgework, inputs){
    //ONLY if needed
    //function mod(a,b){return ((a%b)+b)%b;}

    //const;
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

    // let placeholderkey="";
    // for(let i=0;i<placeholderword.length;i++){
    //     if(!placeholderkey.includes(placeholderword[i])){
    //         placeholderkey+=placeholderword[i];
    //     }
    // }
    // let placeholder_abc=letters;
    // for(let i=0;i<placeholderkey.length;i++){
    //     placeholder_abc=placeholder_abc.replace(placeholderkey[i],"");
    // }
    // let placeholder;
    // if(/**/%2==/**/){
    //     placeholder=placeholderkey+placeholder_abc;
    // }
    // else{
    //     placeholder=placeholder_abc+placeholderkey;
    // }