export function yellow(edgework, inputs){
    function mod(a,b){return ((a%b)+b)%b;}

    const letters="abcdefghijklmnopqrstuvwxyz";
    const morselist=[".-","-...","-.-.","-..",".","..-.","--.","....","..",".---","-.-",".-..","--","-.","---",".--.","--.-",".-.","...","-","..-","...-",".--","-..-","-.--","--.."];
    let batteries=Number(edgework[0]);
    let encrypted=inputs[0];
    let number1=inputs[1];
    let number2=inputs[2];
    let number3=inputs[3];
    let morsekey=inputs[4];
    let numberchain=inputs[5];

    let morseletters=[];
    for(let i=0;i<8;i++){
        morseletters.push(letters.indexOf(morsekey[i]));
    }
    let morsechars=[0,".",".",0,".","-",0,".","_",0,"-",".",0,"-","-",0,"-","_",0,"_",".",0,"_","-"];
    let lowest=26;
    let lowestindex;
    for(let i=0;i<8;i++){
        for(let j=0;j<8;j++){
            if(morseletters[j]<lowest){
                lowest=morseletters[j];
                lowestindex=j;
            }
        }
        morseletters[lowestindex]=26;
        morsechars[lowestindex*3]=i;
        lowest=26;
    }
    const number=number1+number2+number3;
    let morse="_";
    for(let i=0;i<number.length;i++){
        if(morsechars[morsechars.indexOf(Number(number[i])-1)+1]=="_"){
            morse+="_";
        }
        morse+=morsechars[morsechars.indexOf(Number(number[i])-1)+1]+morsechars[morsechars.indexOf(Number(number[i])-1)+2];
        if(morsechars[morsechars.indexOf(Number(number[i])-1)+2]=="_"){
            morse+="_";
        }
    }
    while(morse[morse.length-1]=="_"){
        morse=morse.slice(0,morse.length-1);
    }
    morse+="_";
    for(let i=0;i<26;i++){
        morse=morse.replaceAll("_"+morselist[i]+"_",letters[i]);
    }
    let keyword="";
    let digitrow_abc=letters;
    for(let i=0;i<morse.length;i++){
        if(!keyword.includes(morse[i])){
            keyword+=morse[i];
        }
    }
    for(let i=0;i<morse.length;i++){
        digitrow_abc=digitrow_abc.replace(morse[i],"");
    }
    let digitrow;
    if(batteries%2==1){
        digitrow=keyword+digitrow_abc;
    }
    else{
        digitrow=digitrow_abc+keyword;
    }
    digitrow+="111111111222222222333333331112223331112223331112223312312312312312312312312312";
    let remaining=digitrow.slice(0,26);
    let lettertris="";
    for(let i=0;i<6;i++){
        for(let j=1;j<=3;j++){
             lettertris+=digitrow[digitrow.indexOf(encrypted[i])+26*j];
        }
    }
    for(let i=0;i<6;i++){
        for(let j=0;j<3;j++){
            for(let k=1;k<=3;k++){
                if(lettertris[i+j*6]==k){
                    remaining=remaining.slice(3**(2-j)*(k-1),3**(2-j)*k);
                }
            }
        }
        encrypted+=remaining;
        remaining=digitrow.slice(0,26);
    }
    encrypted=encrypted.slice(6);
    let finalnumbers=[];
    let currentnumber="";
    for(let i=0;i<numberchain.length;i++){
        if(numberchain[i]=="-"){
            finalnumbers.push(Number(currentnumber));
            currentnumber="";
        }
        else{
            currentnumber+=numberchain[i];
        }
    }
    finalnumbers.push(Number(currentnumber));
    finalnumbers=[finalnumbers[3],-finalnumbers[1],-finalnumbers[2],finalnumbers[0]];
    const x=mod(finalnumbers[0]*finalnumbers[3]-finalnumbers[1]*finalnumbers[2],26);
    let N;
    for(let i=1;i<26;i++){
        if(x*i%26==1){
            N=i;
        }
    }
    for(let i=0;i<4;i++){
        finalnumbers[i]=mod(finalnumbers[i]*N,26);
    }
    let letter1;
    let letter2;
    for(let i=0;i<3;i++){
        letter1=letters.indexOf(encrypted[i*2])+1;
        letter2=letters.indexOf(encrypted[i*2+1])+1;
        encrypted+=letters[mod((letter1*finalnumbers[0]+letter2*finalnumbers[1])%26-1,26)]+letters[mod((letter1*finalnumbers[2]+letter2*finalnumbers[3])%26-1,26)];
    }
    encrypted=encrypted.slice(6);
    if(encrypted.length!=6){
        return "ERROR";
    }
    else{
        return encrypted.toUpperCase();
    }
}