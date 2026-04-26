export function indigo(edgework, inputs){
    function mod(a,b){return ((a%b)+b)%b;}

    const letters="abcdefghijklmnopqrstuvwxyz";
    const digits="0123456789";
    const morselist=[".-","-...","-.-.","-..",".","..-.","--.","....","..",".---","-.-",".-..","--","-.","---",".--.","--.-",".-.","...","-","..-","...-",".--","-..-","-.--","--.."];
    let ports=Number(edgework[0]);
    let offset=Number(edgework[1]);
    let encrypted=inputs[0];
    let logickey=inputs[1];
    let morseword=inputs[2];
    let topbinary=inputs[3];
    let bottombinary=inputs[4];
    let logicgateencr=inputs[5];

    let morsekey="";
    for(let i=0;i<morseword.length;i++){
        if(!morsekey.includes(morseword[i])){
            morsekey+=morseword[i];
        }
    }
    let morse_abc=letters;
    for(let i=0;i<morsekey.length;i++){
        morse_abc=morse_abc.replace(morsekey[i],"");
    }
    let morse;
    if(ports%2==1){
        morse=morsekey+morse_abc;
    }
    else{
        morse=morse_abc+morsekey;
    }
    let letterkey=morse;
    morse+=".........---------________...---___...---___...---__.-_.-_.-_.-_.-_.-_.-_.-_.-";
    let morselogickey="";
    for(let i=0;i<logickey.length;i++){
        for(let j=1;j<=3;j++){
            morselogickey+=morse[morse.indexOf(logickey[i])+26*j];
        }
    }
    let keylist=[];
    let currentsymbol="";
    let i=0;
    while(keylist.length!=6){
        while(morselogickey[i]!="_" && i<morselogickey.length-1){
            if(morselogickey[i]=="." || morselogickey[i]=="-"){
                currentsymbol+=morselogickey[i];
            }
            i++;
        }
        if(i==morselogickey.length-1){
            currentsymbol+=morselogickey[i];
        }
        if(currentsymbol!=""){
            keylist.push(currentsymbol);
        }
        i++;
        currentsymbol="";
    }
    for(let i=0;i<6;i++){
        keylist[i]=keylist[i].replaceAll("_","");
    }
    for(let i=0;i<keylist.length;i++){
        keylist[i]=letters[morselist.indexOf(keylist[i])];
    }
    let key="";
    for(let i=0;i<keylist.length;i++){
        key+=keylist[i];
    }
    let x;
    for(let i=0;i<6;i++){
        x=mod(letterkey.indexOf(encrypted[i])-offset,26);
        encrypted+=letterkey[x];
        offset=x+1;
    }
    encrypted=encrypted.slice(6);
    let binary=[];
    let currentnumber="";
    logicgateencr=logicgateencr.replace("? ","");
    logicgateencr=logicgateencr.replace("= ","");
    for(let i=0;i<logicgateencr.length;i++){
        if(digits.includes(logicgateencr[i])){
            currentnumber+=logicgateencr[i];
        }
        if(currentnumber!="" && i==logicgateencr.length-1 || !digits.includes(logicgateencr[i])){
            binary.push(Number(currentnumber).toString(2));
            currentnumber="";
        }
    }
    for(let i=0;i<3;i++){
        while(binary[i].length!=6){
            binary[i]="0"+binary[i];
        }
    }
    let gates=["and","or","xor","nand","nor","xnor","rimp","limp"];
    let lb;
    let rb;
    let res;
    for(let i=0;i<6;i++){
        lb=binary[0][i];
        rb=binary[1][i];
        res=binary[2][i];
        if(lb=="0" && rb=="0"){
            if(res=="1"){
                ["and","or","xor"].forEach(a=>{if(gates.includes(a)){gates.splice(gates.indexOf(a),1)}});
            }
            else{
                ["nand","nor","xnor","limp","rimp"].forEach(a=>{if(gates.includes(a)){gates.splice(gates.indexOf(a),1)}});
            }
            
        }
        if((lb=="0" && rb=="1")||(lb=="1" && rb=="0")){
            if(res=="1"){
                ["and","nor","xnor"].forEach(a=>{if(gates.includes(a)){gates.splice(gates.indexOf(a),1)}});
            }
            else{
                if(lb=="0" && rb=="1"){
                    ["or","xor","nand","limp"].forEach(a=>{if(gates.includes(a)){gates.splice(gates.indexOf(a),1)}});
                }
                else{
                    ["or","xor","nand","rimp"].forEach(a=>{if(gates.includes(a)){gates.splice(gates.indexOf(a),1)}});
                }
            }
        }
        if(lb=="1" && rb=="1"){
            if(res=="1"){
                ["xor","nand","nor"].forEach(a=>{if(gates.includes(a)){gates.splice(gates.indexOf(a),1)}});
            }
            else{
                ["and","or","xnor","limp","rimp"].forEach(a=>{if(gates.includes(a)){gates.splice(gates.indexOf(a),1)}});
            }
        }
    }
    let answer="";
    let a;
    let b;
    for(let i=0;i<6;i++){
        a=letters.indexOf(encrypted[i]).toString(2);
        while(a.length!=5){
            a="0"+a;
        }
        while(topbinary.length!=6){
            topbinary+="0";
        }
        if(topbinary[i]=="1"){
            for(let j=0;j<5;j++){
                if(a[j]=="0"){
                    a+="1";
                }
                else{
                    a+="0";
                }
            }
            a=a.slice(5);
        }
        b=letters.indexOf(key[i]).toString(2);
        while(b.length!=5){
            b="0"+b;
        }
        while(bottombinary.length!=6){
            bottombinary+="0";
        }
        if(bottombinary[i]=="1"){
            for(let j=0;j<5;j++){
                if(b[j]=="0"){
                    b+="1";
                }
                else{
                    b+="0";
                }
            }
            b=b.slice(5);
        }
        for(let j=0;j<5;j++){
            switch(gates[0]){
                case "and":
                    if(a[j]=="1" && b[j]=="1"){
                        answer+="1";
                    }
                    else{
                        answer+="0";
                    }
                    break;
                case "or":
                    if(a[j]=="1" || b[j]=="1"){
                        answer+="1";
                    }
                    else{
                        answer+="0";
                    }
                    break;
                case "xor":
                    if(!!(a[j]=="1" ^ b[j]=="1")){
                        answer+="1";
                    }
                    else{
                        answer+="0";
                    }
                    break;
                case "nand":
                    if(a[j]=="1" && b[j]=="1"){
                        answer+="0";
                    }
                    else{
                        answer+="1";
                    }
                    break;
                case "nor":
                    if(a[j]=="1" || b[j]=="1"){
                        answer+="0";
                    }
                    else{
                        answer+="1";
                    }
                    break;
                case "xnor":
                    if(!(a[j]=="1" ^ b[j]=="1")){
                        answer+="1";
                    }
                    else{
                        answer+="0";
                    }
                    break;
                case "rimp":
                    if(a[j]=="0" && b[j]=="1"){
                        answer+="0";
                    }
                    else{
                        answer+="1";
                    }
                    break;
                case "limp":
                    if(a[j]=="1" && b[j]=="0"){
                        answer+="0";
                    }
                    else{
                        answer+="1";
                    }
                    break;
            }
        }
    }
    answer+="0"
    let currentanswer=0;
    for(let i=0;i<6;i++){
        for(let j=0;j<5;j++){
            if(answer.slice(i*5,(i+1)*5).split("").reverse().join("")[j]=="1"){
                currentanswer+=2**j;
            }
        }
        encrypted+=letters[currentanswer];
        currentanswer=0;
    }
    encrypted=encrypted.slice(6);
    if(encrypted.length!=6){
        return "ERROR";
    }
    else{
        return encrypted.toUpperCase();
    }
}