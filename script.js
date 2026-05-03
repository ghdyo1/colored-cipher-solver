async function diary(){
    const r=await fetch("diary.json");
    return await r.json();
}
async function dfg(){
    const r=await fetch("test.json");
    return await r.json();
}
dfg().then(a=>{console.log(a.page1[1])})
const letters="abcdefghijklmnopqrstuvwxyz";
const matrix_abc="abcdefghiklmnopqrstuvwxyz";
const digit_words=["zero","one","two","three","four","five","six","seven","eight","nine"];
const morselist=[".-","-...","-.-.","-..",".","..-.","--.","....","..",".---","-.-",".-..","--","-.","---",".--.","--.-",".-.","...","-","..-","...-",".--","-..-","-.--","--.."];
const roman=["i","ii","iii","iv","v","vi","vii","viii"];
const digits="0123456789";
const colors="roygbivwaknqlfsmce";
const hex=["f00","f70","ff0","0f0","00f","217","a0f","fff","777","111","421","835","68f","282","900","f0f","f85","fe9"];
const colorwords=[["Red","Orange","Yellow","Green","Blue","Indigo","Violet","White","Gray","Black"],["Brown","Maroon","Cornflower","Forest","Crimson","Magenta","Coral","Cream"]];
let page=1;
let color="r";
let mode="input";
const edgeworks=[
    ["SN FIRST DIGIT","SN SECOND DIGIT","SN LAST DIGIT"],
    ["SN FIRST DIGIT","SN SECOND DIGIT","SN LAST DIGIT"],
    ["NUMBER OF BATTERIES"],
    ["NUMBER OF UNLIT INDICATORS"],
    ["NUMBER OF INDICATORS"],
    ["NUMBER OF PORTS","SUM OF SN DIGITS"],
    [],
    ["NUMBER OF PORTS","NUMBER OF LIT INDICATORS","SN SECOND LETTER"],
    ["SN FIRST CHARACTER"],
    ["SN FIRST LETTER","SN LAST LETTER","SN SECOND CHARACTER"],
    []//WIP
];
const lengths=[
    [6,6,0,8,8,8,1,1,1],
    [6,6,8,8,8,4,1,1,1],
    [6,5,5,5,8,11,2],
    [6,6,6,3,8,0,2],
    [6,6,6,8,0,0,2],
    [6,10,8,6,6,12,2,2],
    [6,6,2,8,0,0],
    [6,8,0,8,8,0,2,2,1],
    [6,6,6,3,0,0,1],
    [6,8,8,16,3,14,1,1,1],
    [6,6,6,6,6,6]//WIP
];
const allowed=[
    [letters,letters,"",letters,letters,letters,digits,digits,digits],
    [letters,letters,letters,letters,letters,digits,digits,digits,digits],
    [letters,digits.slice(1,9),digits.slice(1,9),digits.slice(1,9),letters,digits+"-",digits],
    [letters,digits.slice(0,8),digits,letters,letters,"",digits],
    [letters,digits.slice(1,4),digits.slice(1),letters,"","",digits],
    [letters,letters,letters,"01","01",digits+" ?=",digits,digits],
    [letters,letters,digits,letters,"",""],
    [letters,digits.slice(0,9),"",letters,letters,"",digits,digits,letters],
    [letters,"01",digits.slice(1,7),letters,"","",digits+letters],
    [letters,letters,letters,"abcvi-",letters,letters+"-",letters,letters,digits+letters],
    []//WIP
];
const pages=[2,2,2,2,2,2,2,2,2,2,2,3,2,2,3,1,2,4];

function mod(a,b){return ((a%b)+b)%b;}
function step(a,b){
    let r="";
    for(let i=0;i<a.slice(b).length;i+=2){
        r+=a.slice(b)[i];
    }
    return r;
}
function rotor(rot,row,lett,con){
    lett=con[rot][row][lett].toLowerCase();
    lett=con[rot][(row+1)%2].toLowerCase().indexOf(lett);
    return lett;
}
function composekey(placeholderword,edgeworkEL,parity){
    let placeholderkey="";
    for(let i=0;i<placeholderword.length;i++){
        if(!placeholderkey.includes(placeholderword[i])){
            placeholderkey+=placeholderword[i];
        }
    }
    let placeholder_abc=letters;
    for(let i=0;i<placeholderkey.length;i++){
        placeholder_abc=placeholder_abc.replace(placeholderkey[i],"");
    }
    let placeholder;
    if(edgeworkEL%2==parity){
        placeholder=placeholderkey+placeholder_abc;
    }
    else{
        placeholder=placeholder_abc+placeholderkey;
    }
    return placeholder;
}
function s(encrypted){
    return encrypted.slice(6);
}
function end(encrypted){
    if(encrypted.length!=6){
        return "ERROR";
    }
    else{
        return encrypted.toUpperCase();
    }
}

function red(edgework, inputs){
    let firstdigit=Number(edgework[0]);
    let seconddigit=Number(edgework[1]);
    let lastdigit=Number(edgework[2]);
    let encrypted=inputs[0];
    let replace=inputs[1];
    let KW1=inputs[3];
    let KW2=inputs[4];
    let KW3=inputs[5];

    let endreplace=[];
    for(let i=0;i<6;i++){
        if(encrypted[i]=="j"){
            endreplace.push(i);
            encrypted+=replace[i];
        }
        else{
            encrypted+=encrypted[i];
        }
    }
    encrypted=s(encrypted);
    let key1="";
    let matrix1_abc=matrix_abc;
    for(let i=0;i<KW1.length;i++){
        if ((!key1.includes(KW1[i]) && KW1[i]!="j")||(!key1.includes("i") && KW1[i]=="j")){
            if(KW1[i]=="j"){
                key1+="i";
            }
            else{
                key1+=KW1[i];
            }
        }
    }
    for(let i=0;i<key1.length;i++){
        matrix1_abc=matrix1_abc.replace(key1[i],"");
    }
    let matrix1;
    if(firstdigit%2==1){
        matrix1=key1+matrix1_abc;
    }
    else{
        matrix1=matrix1_abc+key1;
    }
    let letter1;
    let letter2;
    let row1;
    let row2;
    let col1;
    let col2;
    for(let i=0;i<3;i++){
        letter1=matrix1.indexOf(encrypted[i*2]);
        letter2=matrix1.indexOf(encrypted[i*2+1]);
        row1=Math.floor(letter1/5);
        row2=Math.floor(letter2/5);
        col1=letter1%5;
        col2=letter2%5;
        if(letter1==letter2){
            encrypted+=matrix1[letter1]+matrix1[letter2];
        }
        else if(row1==row2){
            encrypted+=matrix1[mod((letter1%5-1),5)+row1*5]+matrix1[mod((letter2%5-1),5)+row2*5];
        }
        else if(col1==col2){
            encrypted+=matrix1[mod(letter1-5,25)]+matrix1[mod(letter2-5,25)];
        }
        else{
            encrypted+=matrix1[row1*5+col2]+matrix1[row2*5+col1]
        }
    }
    encrypted=s(encrypted);
    let key2="";
    let matrix2_abc=matrix_abc;
    for(let i=0;i<KW2.length;i++){
        if ((!key2.includes(KW2[i]) && KW2[i]!="j")||(!key2.includes("i") && KW2[i]=="j")){
            if(KW2[i]=="j"){
                key2+="i";
            }
            else{
                key2+=KW2[i];
            }
        }
    }
    for(let i=0;i<key2.length;i++){
        matrix2_abc=matrix2_abc.replace(key2[i],"");
    }
    let matrix2;
    if(seconddigit%2==0){
        matrix2=key2+matrix2_abc;
    }
    else{
        matrix2=matrix2_abc+key2;
    }
    let set2=[];
    let letter="";
    for(let i=0;i<6;i++){
        letter=matrix2.indexOf(encrypted[i]);
        set2.push(Math.floor(letter/5));
        set2.push(mod(letter,5));
    }
    for(let i=0;i<6;i++){
        encrypted+=matrix1[set2[i]*5+set2[i+6]];
    }
    encrypted=s(encrypted);
    let key3=[];
    let matrix3_abc=matrix_abc;
    for(let i=0;i<KW3.length;i++){
        if ((!key3.includes(KW3[i]) && KW3[i]!="j")||(!key3.includes("i") && KW3[i]=="j")){
            if(KW3[i]=="j"){
                key3+="i";
            }
            else{
                key3+=KW3[i];
            }
        }
    }
    for(let i=0;i<key3.length;i++){
        matrix3_abc=matrix3_abc.replace(key3[i],"");
    }
    let matrix3;
    if(lastdigit%2==1){
        matrix3=key3+matrix3_abc;
    }
    else{
        matrix3=matrix3_abc+key3;
    }
    for(let i=0;i<3;i++){
        letter1=matrix3.indexOf(encrypted[i*2]);
        letter2=matrix3.indexOf(encrypted[i*2+1]);
        row1=Math.floor(letter1/5);
        col1=letter2%5;
        row2=Math.floor(letter2/5);
        col2=letter1%5;
        encrypted+=matrix1[row1*5+col1]+matrix2[row2*5+col2];
    }
    encrypted=s(encrypted);
    for(let i=0;i<6;i++){
        if(endreplace.includes(i)){
            encrypted+="j";
        }
        else{
            encrypted+=encrypted[i];
        }
    }
    encrypted=s(encrypted);
    return end(encrypted);
}
function orange(edgework, inputs){
    let firstdigit=Number(edgework[0]);
    let seconddigit=Number(edgework[1]);
    let lastdigit=Number(edgework[2]);
    let encrypted=inputs[0];
    let replace=inputs[1];
    let string1=inputs[2];
    let string2=inputs[3];
    let KW=inputs[4];
    let number=inputs[5];

    let endreplace=[];
    for(let i=0;i<6;i++){
        if(encrypted[i]=="j"){
            endreplace.push(i);
            encrypted+=replace[i];
        }
        else{
            encrypted+=encrypted[i];
        }
    }
    encrypted=s(encrypted);
    let key1="";
    let matrix1_abc=matrix_abc;
    for(let i=0;i<KW.length;i++){
        if ((!key1.includes(KW[i]) && KW[i]!="j")||(!key1.includes("i") && KW[i]=="j")){
            if(KW[i]=="j"){
                key1+="i";
            }
            else{
                key1+=KW[i];
            }
        }
    }
    for(let i=0;i<key1.length;i++){
        matrix1_abc=matrix1_abc.replace(key1[i],"");
    }
    let matrix1;
    if(lastdigit%2==0){
        matrix1=key1+matrix1_abc;
    }
    else{
        matrix1=matrix1_abc+key1;
    }
    const string=string1+string2;
    let keyword="";
    let letter1;
    let letter2;
    let row;
    let col;
    for(let i=0;i<string.length/2;i++){
        letter1=matrix1.indexOf(string[i*2]);
        letter2=matrix1.indexOf(string[i*2+1]);
        row=Math.floor(letter1/5);
        col=letter2%5;
        keyword+=matrix1[row*5+col];
    }
    let matrix2="aflqvbgmrwchnsxdiotyekpuz";
    let KW3="";
    for(let i=0;i<number.length;i++){
        KW3+=digit_words[digits.indexOf(number[i])];
    }
    let key3="";
    let matrix3_abc=matrix_abc;
    for(let i=0;i<KW3.length;i++){
        if ((!key3.includes(KW3[i]) && KW3[i]!="j")||(!key3.includes("i") && KW3[i]=="j")){
            if(KW3[i]=="j"){
                key3+="i";
            }
            else{
                key3+=KW3[i];
            }
        }
    }
    for(let i=0;i<key3.length;i++){
        matrix3_abc=matrix3_abc.replace(key3[i],"");
    }
    let matrix3;
    if(seconddigit%2==1){
        matrix3=key3+matrix3_abc;
    }
    else{
        matrix3=matrix3_abc+key3;
    }
    let s=0;
    for(let i=0;i<number.length;i++){
        s+=Number(number[i]);
    }
    const grouplen=s%4+2;
    let groups=[];
    let currentgroup="";
    let used=0;
    while(used!=6){
        while(currentgroup.length!=grouplen && used!=6){
            currentgroup+=encrypted[used];
            used++;
        }
        groups.push(currentgroup);
        currentgroup="";
    }
    for(let i=0;i<groups.length;i++){
        encrypted+=groups[i].split("").reverse().join("");
    }
    encrypted=s(encrypted);
    for(let i=0;i<6;i++){
        encrypted+=matrix2[matrix3.indexOf(encrypted[i])];
    }
    encrypted=s(encrypted);
    let key4="";
    let matrix4_abc=matrix_abc;
    for(let i=0;i<keyword.length;i++){
        if ((!key4.includes(keyword[i]) && keyword[i]!="j")||(!key4.includes("i") && keyword[i]=="j")){
            if(keyword[i]=="j"){
                key4+="i";
            }
            else{
                key4+=keyword[i];
            }
        }
    }
    for(let i=0;i<key4.length;i++){
        matrix4_abc=matrix4_abc.replace(key4[i],"");
    }
    let matrix4;
    if(firstdigit%2==0){
        matrix4=key4+matrix4_abc;
    }
    else{
        matrix4=matrix4_abc+key4;
    }
    let l1;
    let l2;
    let r1;
    let r2;
    let c1;
    let c2;
    for(let i=0;i<3;i++){
        l1=matrix2.indexOf(encrypted[i*2]);
        l2=matrix3.indexOf(encrypted[i*2+1]);
        r1=Math.floor(l1/5);
        r2=Math.floor(l2/5);
        c1=l2%5;
        c2=l1%5;
        encrypted+=matrix1[r1*5+c1]+matrix4[r2*5+c2];
    }
    encrypted=s(encrypted);
    for(let i=0;i<6;i++){
        if(endreplace.includes(i)){
            encrypted+="j";
        }
        else{
            encrypted+=encrypted[i];
        }
    }
    encrypted=s(encrypted);
    return end(encrypted);
}
function yellow(edgework, inputs){
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
    let digitrow=composekey(morse,batteries,1);
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
    encrypted=s(encrypted);
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
    encrypted=s(encrypted);
    return end(encrypted);
}
function green(edgework, inputs){
    let unlit=Number(edgework[0]);
    let encrypted=inputs[0];
    let homotens=inputs[1];
    let homoones=inputs[2];
    let homophonic=inputs[3];
    let ragbabyword=inputs[4];

    let homo=[[],[],[]];
    for(let i=0;i<3;i++){
        for(let j=0;j<26-letters.indexOf(homophonic[i]);j++){
            homo[i].push(String(j+1+26*i));
        }
        for(let j=0;j<letters.indexOf(homophonic[i]);j++){
            homo[i].splice(j,0,String(26-letters.indexOf(homophonic[i])+j+1+26*i));
        }
    }
    let key="";
    let currentdigits="";
    for(let i=0;i<6;i++){
        if(homotens[i]!="0"){
            currentdigits+=homotens[i];
        }
        currentdigits+=homoones[i];
        if(Number(currentdigits)<27){
            key+=letters[homo[0].indexOf(currentdigits)];
        }
        else if(currentdigits>52){
            key+=letters[homo[2].indexOf(currentdigits)];
        }
        else{
            key+=letters[homo[1].indexOf(currentdigits)];
        }
        currentdigits="";
    }
    let ragbaby=composekey(ragbabyword,unlit,0);
    for(let i=0;i<6;i++){
        encrypted+=ragbaby[mod(ragbaby.indexOf(encrypted[i])-(i+1),26)];
    }
    encrypted=s(encrypted);
    const letterstable="ufhkqiplxnzesgbvmcwjrdotyaiwczymlkjodgfsqrnbtxhuevapwbsmejtucpfahzoqliknyvgxrdgrinqvwotyajxbmhcfklduszepdltvsuikwcxrfjzanyhmqogepbfsvceiujkpgntyhblrqoxmadwzjocywfpadkhiuvtsmengqlzbrxbphoraknuetdzyqimsfjgvwcxlandsqwtgxkfpcovblmyezhrjiuaqjpbusgwnxzvdyletcofhrimkbhftdgerxjamunzvykospilcwqjhukdmsnebiczywlxqfportavgasntzdbgwyileorcqfxjpkhmvurpcqabvlgwfenikymdutsjxozhyixnvwqsuhfomzdgkjpctbelarimpczlegjarntwsyfqdoubkhvxjgkoxmubavrtfycnpwqzesilhdsvhdbznmkwjieuyfxrqplgcatotzxgopnbwaiyrhqlvkjscduefmdjqzywtpkixcvabfnueolhsgrmcjoedyhbnixzrtpwgalfkusmvqfehlyobgrxqkvzuimjtnacdpswmogapthizxrfklysvdbwuqnecjrxmsbpwoejadiynqlgkctuhzfvzjvwfbeotkrdhscpigqnayluxmvwfxuekrlbqtmchsqjozydapin";
    for(let i=0;i<6;i++){
        encrypted+=letters[letterstable.slice(letters.indexOf(key[i])*26,(letters.indexOf(key[i])+1)*26).indexOf(encrypted[i])];
    }
    encrypted=s(encrypted);
    return end(encrypted);
}
function blue(edgework, inputs){
    let indicators=Number(edgework[0]);
    let encrypted=inputs[0];
    let tridigitalrows=inputs[1];
    let tridigitalcols=inputs[2];
    let tridigitalword=inputs[3];

    let tridigital=composekey(tridigitalword,indicators,0);
    let key="";
    for(let i=0;i<6;i++){
        key+=tridigital[(Number(tridigitalrows[i])*9)-9+Number(tridigitalcols[i])-1];
    }
    for(let i=0;i<6;i++){
        encrypted+=letters[25-letters.indexOf(encrypted[i])];
    }
    encrypted=s(encrypted);
    for(let i=0;i<6;i++){
        encrypted+=letters[mod(letters.indexOf(encrypted[i])-letters.indexOf(key[i]),26)-1];
    }
    encrypted=s(encrypted);
    return end(encrypted);
}
function indigo(edgework, inputs){
    let ports=Number(edgework[0]);
    let offset=Number(edgework[1]);
    let encrypted=inputs[0];
    let logickey=inputs[1];
    let morseword=inputs[2];
    let topbinary=inputs[3];
    let bottombinary=inputs[4];
    let logicgateencr=inputs[5];

    let morse=composekey(morseword,ports,1);
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
    encrypted=s(encrypted);
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
    encrypted=s(encrypted);
    return end(encrypted);
}
function violet(edgework, inputs){
    let encrypted=inputs[0];
    let key=inputs[1];
    let number=inputs[2];
    let quagmireword=inputs[3];
    
    for(let i=0;i<6;i++){
        if(letters.slice(0,13).includes(encrypted[i])){
            encrypted+=(letters.slice(13+Math.floor(letters.indexOf(key[i])/2))+letters.slice(13,13+Math.floor(letters.indexOf(key[i])/2)))[letters.indexOf(encrypted[i])];
        }
        else{
            encrypted+=letters[(letters.slice(13+Math.floor(letters.indexOf(key[i])/2))+letters.slice(13,13+Math.floor(letters.indexOf(key[i])/2))).indexOf(encrypted[i])];
        }
    }
    encrypted=s(encrypted);
    let grid=["012543","015243"][Number(number[0])-1];
    for(let i=0;i<6;i++){
        grid+=String((Number(grid[i])+Number(number[1])-1)%6);
    }
    grid=grid.slice(6);
    for(let i=0;i<6;i++){
        encrypted+=encrypted[Number(grid[i])];
    }
    encrypted=s(encrypted);
    let quagmire=composekey(quagmireword,0,0);
    for(let i=0;i<6;i++){
        encrypted+=letters[(quagmire.slice(quagmire.indexOf(key[i]))+quagmire.slice(0,quagmire.indexOf(key[i]))).indexOf(encrypted[i])];
    }
    encrypted=s(encrypted);
    return end(encrypted);
}
function white(edgework, inputs){
    let ports=Number(edgework[0]);
    let lit=Number(edgework[1]);
    let secondletter=edgework[2];
    let encrypted=inputs[0];
    let numberbased=inputs[1];
    let key1=inputs[3];
    let key2=inputs[4];

    let base=0;
    for(let i=0;i<6;i++){
        base+=letters.indexOf(encrypted[i])+1;
    }
    base%=8;
    base+=2;
    let number=parseInt(numberbased,base);
    for(let i=0;i<6;i++){
        encrypted+=letters[(letters.indexOf(encrypted[i])+number)%26];
    }
    encrypted=s(encrypted);
    let key=key1+key2;
    for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
            key+=key[[[0,7,9,11],[3,5,13,14],[4,6,8,15],[1,2,10,12]][(i+ports)%4][j]];
        }
    }
    key=key.slice(16);
    let sean=composekey(key,lit,0);
    let seanshifter=[];
    for(let i=0;i<26;i++){
        seanshifter.push(sean[i]);
    }
    let reserved;
    for(let i=0;i<6;i++){
        encrypted+=seanshifter[(seanshifter.indexOf(encrypted[i])+13)%26];
        if(letters.indexOf(secondletter)%2==0){
            seanshifter.splice(0,0,seanshifter[12]);
            seanshifter.splice(13,1);
            reserved=seanshifter[0];
            seanshifter[0]=seanshifter[13];
            seanshifter[13]=reserved;
            seanshifter.splice(26,0,seanshifter[13]);
            seanshifter.splice(13,1);
        }
        else{
            seanshifter.splice(13,0,seanshifter[25]);
            seanshifter.splice(26,1);
            reserved=seanshifter[0];
            seanshifter[0]=seanshifter[13];
            seanshifter[13]=reserved;
            seanshifter.splice(13,0,seanshifter[0]);
            seanshifter.splice(0,1);
        }
    }
    encrypted=s(encrypted);
    return end(encrypted);
}
function gray(edgework, inputs){
    let firstchar=edgework[0];
    let encrypted=inputs[0];
    let invert=inputs[1];
    let gridscr=inputs[2];
    let key=inputs[3];

    const scrambler=["21453","21534","31524","31452","41523","41532","51234","51423","51432","23154","25134","24153","34152","35124","45123","45132","54123","54132","24513","25413","34512","35214","35412","43512","45213","53412","54213","24531","25431","34521","35421","43251","43521","45231","53421","54231"][(digits+letters).indexOf(firstchar)];
    let binary;
    let letter;
    for(let i=0;i<6;i++){
        binary=(letters.indexOf(encrypted[i])+1).toString(2);
        while(binary.length!=5){
            binary="0"+binary;
        }
        if(invert[i]=="1"){
            for(let j=0;j<5;j++){
                if(binary[j]=="0"){
                    binary+="1";
                }
                else{
                    binary+="0";
                }
            }
            binary=binary.slice(5);
        }
        for(let j=0;j<5;j++){
            binary+=binary[Number(scrambler[j])-1];
        }
        binary=binary.slice(5);
        letter=0;
        for(let j=0;j<5;j++){
            if(binary[4-j]=="1"){
                letter+=2**j;
            }
        }
        encrypted+=letters[letter-1];
    }
    encrypted=s(encrypted);
    let grid;
    switch(gridscr.length){
        case 2:
            grid=[[0,0,0],[0,0,0]];
            break;
        case 3:
            grid=[[0,0],[0,0],[0,0]];
            break;
        case 4:
            grid=[[0,0],[0,0],[0],[0]];
            break;
        case 5:
            grid=[[0,0],[0],[0],[0],[0]];
            break;
        case 6:
            grid=[[0],[0],[0],[0],[0],[0]];
            break;
    }
    let d=0;
    for(let i=0;i<grid.length;i++){
        for(let j=0;j<grid[gridscr.indexOf(String(i+1))].length;j++){
            grid[gridscr.indexOf(String(i+1))][j]=encrypted[d];
            d++;
        }
    }
    for(let i=0;i<3;i++){
        for(let j=0;j<grid.length;j++){
            if(grid[j][i]!=undefined){
                encrypted+=grid[j][i];
            }
        }
    }
    encrypted=s(encrypted);
    const fixed=(letters.slice(13)+letters.slice(13)).slice(0,-1)+(step(letters,0)+step(letters,0)).slice(0,-1)+(step(letters,1)+step(letters,1)).slice(0,-1);
    let string;
    let col1;
    let col2;
    let e;
    let f;
    for(let i=0;i<3;i++){
        string=letters.slice(0,13);
        for(let j=0;j<3;j++){
            string+=fixed.slice(((step(letters,0)+step(letters,1)).indexOf(key[i])%13)+25*j,((step(letters,0)+step(letters,1)).indexOf(key[i])%13)+13+25*j);
        }
        col1=string.slice(0,26).indexOf(encrypted[i])%13;
        col2=string.slice(26).indexOf(encrypted[i+3])%13;
        if(col1==col2){
            encrypted+=string.slice(0,26)[(string.slice(0,26).indexOf(encrypted[i])+13)%26]+string.slice(26)[(string.slice(26).indexOf(encrypted[i+3])+13)%26];
        }
        else{
            e=0;
            f=0;
            if(string.slice(13,26).includes(encrypted[i])){
                e+=13;
            }
            if(string.slice(39).includes(encrypted[i+3])){
                f+=13;
            }
            encrypted+=string.slice(0,26)[col2+e]+string.slice(26)[col1+f];
        }
    }
    encrypted=s(encrypted);
    encrypted+=step(encrypted,0)+step(encrypted,1);
    encrypted=s(encrypted);
    return end(encrypted);
}
function black(edgework, inputs){
    let firstletter=edgework[0];
    let lastletter=edgework[1];
    let secondchar=edgework[2];
    let encrypted=inputs[0];
    let keyword1=inputs[1];
    let keyword2=inputs[2];
    let plugboard=inputs[3];
    let enigmastart=inputs[4];
    let replace=inputs[5];
    let buttonl=inputs[6];
    let buttonr=inputs[7];

    let key1=composekey(keyword1,letters.indexOf(firstletter),0);
    key1=key1.replace(buttonl,"#");
    key1+=buttonl;
    let key2=composekey(keyword2,letters.indexOf(lastletter),1);
    key2=key2.replace(buttonr,"#");
    key2+=buttonr;
    let numbers="";
    const rows=[["123","456","789"],["147","258","369"]];
    for(let i=0;i<3;i++){
        numbers+=String(key1.indexOf(encrypted[i*2])%9+1);
        for(let j=0;j<3;j++){
            for(let k=0;k<3;k++){
                if(rows[0][Math.floor(key1.indexOf(encrypted[i*2])/9)][j]==rows[1][Math.floor(key2.indexOf(encrypted[i*2+1])/9)][k]){
                    numbers+=rows[0][Math.floor(key1.indexOf(encrypted[i*2])/9)][j];
                }
            }
        }
        numbers+=String(key2.indexOf(encrypted[i*2+1])%9+1);
    }
    for(let i=0;i<3;i++){
        for(let j=0;j<numbers.slice(i,9).length;j+=3){
            numbers+=numbers.slice(i,9)[j];
        }
    }
    numbers=numbers.slice(9);
    let row1;
    let row2;
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            if(rows[0][j].includes(numbers[i*3+1])){
                row1=j;
            }
            if(rows[1][j].includes(numbers[i*3+1])){
                row2=j;
            }
        }
        encrypted+=key1[Number(numbers[i*3])+row1*9-1]+key2[Number(numbers[i*3+2])+row2*9-1];
    }
    encrypted=s(encrypted);
    if(digits.includes(secondchar)){
        secondchar=Number(secondchar);
    }
    else{
        secondchar=letters.indexOf(secondchar)+10;
    }
    secondchar%=4;
    secondchar+=2;
    let rs=[];
    for(let i=0;i<secondchar;i++){
        rs.push([]);
    }
    for(let i=0;i<6;i++){
        rs[i%secondchar].splice(Math.floor(i/secondchar),0,"#");
    }
    let used=0;
    for(let i=0;i<secondchar;i++){
        for(let j=0;j<rs[i].length;j++){
            rs[i][j]=encrypted[used];
            used++;
        }
    }
    for(let i=0;i<6;i++){
        for(let j=0;j<secondchar;j++){
            if(rs[j][i]!=undefined){
                encrypted+=rs[j][i];
            }
        }
    }
    encrypted=s(encrypted);
    const rotors=[["ekmflgdqvzntowyhxuspaibrcj",letters.replace("d","D").replace("q","Q")],["ajdksiruxblhwtmcqgznpyfvoe",letters.replace("e","E").replace("r","R")],["bdfhjlcprtxvznyeiwgakmusqo",letters.replace("i","I").replace("v","V")],["esovpzjayquirhxlnftgkdcmwb",letters.replace("j","J").replace("w","W")],["vzbrgityupsdnhlxawmjqofeck",letters.replace("m","M").replace("z","Z")],["jpgvoumfyqbenhzrdkasxlictw",letters.replace("l","L").replace("y","Y")],["nzjhgrcxmyswboufaivlpekqdt",letters.replace("h","H").replace("u","U")],["fkqhtlxocbjspdzramewniuygv",letters.replace("c","C").replace("p","P")]];
    const reflectors=[[letters,"lusnpqomjiyahdgefxcvbtzrkw"],[letters,"xqumfepowltjdzhgbvykcriasn"],[letters,"eskoaqmjyhcpgtdlfubnrxzviw"]];
    let config=plugboard.split("-").reverse();
    let replacelist=replace.split("-");
    for(let i=0;i<3;i++){
        for(let j=0;j<8;j++){
            if(config[i]==roman[j]){
                config[i]=rotors[j];
            }
        }
        if(config[3]==letters[i]){
            config[3]=reflectors[i];
        }
    }
    for(let i=0;i<6;i++){
        for(let j=0;j<replacelist.length;j++){
            if(replacelist[j].includes(encrypted[i])){
                encrypted=encrypted.slice(0,i)+replacelist[j][(replacelist[j].indexOf(encrypted[i])+1)%2]+encrypted.slice(i+1);
            }
        }
    }
    for(let i=0;i<3;i++){
        for(let j=0;j<2;j++){
            config[2-i][j]=config[2-i][j].slice(config[2-i][1].toLowerCase().indexOf(enigmastart[i]))+config[2-i][j].slice(0,config[2-i][1].toLowerCase().indexOf(enigmastart[i]));
        }
    }
    let letter;
    for(let i=0;i<6;i++){
        letter=letters.indexOf(encrypted[i]);
        for(let i=0;i<4;i++){
            letter=rotor(i,0,letter,config);
        }
        for(let i=0;i<3;i++){
            letter=rotor(2-i,1,letter,config);
        }
        letter=letters[letter];
        for(let j=0;j<replacelist.length;j++){
            if(replacelist[j].includes(letter)){
                letter=replacelist[j][(replacelist[j].indexOf(letter)+1)%2];
            }
        }
        encrypted+=letter;
        if(config[1][1][0]==config[1][1][0].toUpperCase()){
            for(let i=0;i<3;i++){
                for(let j=0;j<2;j++){
                    config[i][j]=config[i][j].slice(1)+config[i][j][0];
                }
            }
        }
        else if(config[0][1][0]==config[0][1][0].toUpperCase()){
            for(let i=0;i<2;i++){
                for(let j=0;j<2;j++){
                    config[i][j]=config[i][j].slice(1)+config[i][j][0];
                }
            }
        }
        else{
            for(let i=0;i<2;i++){
                config[0][i]=config[0][i].slice(1)+config[0][i][0];
            }
        }
    }
    encrypted=s(encrypted);
    return end(encrypted);
}
function brown(edgework, inputs){
    let firstdigit=Number(edgework[0]);
    let encrypted=inputs[0];
    let r1=inputs[1];
    let r2=inputs[2];
    let r3=inputs[3];
    let r4=inputs[4];
    let r5=inputs[5];

    for(let i=0;i<6;i++){
        let w=letters.indexOf(r1[i])+1;
        let x=letters.indexOf(r2[i])+1;
        let y=Number(r3[i])*10+Number(r4[i]);
        let z=letters.indexOf(r5[i])+1;
    }
    encrypted=s(encrypted);
    return end(encrypted);
}

function solve(){
    let inputs=[];
    let edgework=[];
    for(let i=0;i<2;i++){
        for(let j=0;j<3;j++){
            inputs.push(document.querySelector("#"+"tmb"[j]+(i+1)).value.toLowerCase());
        }
    }
    if(color=="k"){
        for(let i=0;i<2;i++){
            inputs.push(document.querySelectorAll(".arrow-input")[i].value.toLowerCase());
        }
    }
    document.querySelectorAll(".edgework input").forEach(a=>{edgework.push(a.value.toLowerCase())});
    try{
        switch(color){
            case "r":
                return red(edgework,inputs);
            case "o":
                return orange(edgework,inputs);
            case "y":
                return yellow(edgework,inputs);
            case "g":
                return green(edgework,inputs);
            case "b":
                return blue(edgework,inputs);
            case "i":
                return indigo(edgework,inputs);
            case "v":
                return violet(edgework,inputs);
            case "w":
                return white(edgework,inputs);
            case "a":
                return gray(edgework,inputs);
            case "k":
                return black(edgework,inputs);
        }
    }
    catch(error){
        return "ERROR";
    }
}
function changePage(newPage){
    if(newPage=="next"){
        newPage=(((page-1)+1)%pages[colors.indexOf(color)])+1;
    }
    if(newPage=="prev"){
        newPage=(((page-1)-1+pages[colors.indexOf(color)])%pages[colors.indexOf(color)])+1;
    }
    document.querySelectorAll(".screens .screen input").forEach(a=>{a.style.display="none"});
    document.querySelectorAll(".p"+newPage).forEach(a=>{a.style.display="flex"});
    document.querySelector(".submit").textContent=newPage;
    page=newPage;
}
function changeMode(){
    if(mode=="input"){
        let ewi=0;
        document.querySelectorAll(".edgework input").forEach(a=>{if(a.value==""){ewi+=1}});
        document.querySelectorAll(".screens .screen input").forEach(a=>{if(a.value.length>0||lengths[colors.indexOf(color)][["t1","m1","b1","t2","m2","b2"].indexOf(a.id)]==0){ewi+=0}else{ewi+=1}});
        if(color=="k"){
            document.querySelectorAll(".arrow-input").forEach(a=>{if(a.value.length==0){ewi+=1}})
        }
        if(ewi>0){
            document.querySelector(".keyboard").textContent="Please input everything!";
        }
        else{
            if(solve()=="ERROR"){
                document.querySelector(".answer").textContent="ERROR";
                document.querySelector(".answer").style.color="#f00";
                document.querySelector(".status-light").style.backgroundColor="#b00";
            }
            else{
                document.querySelector(".answer").textContent=solve();
                document.querySelector(".answer").style.color="#fff";
                document.querySelector(".status-light").style.backgroundColor="#0b0";
            }
            if(color=="k"){
                for(let i=0;i<2;i++){
                    document.querySelectorAll(".arrow-text")[i].textContent=document.querySelectorAll(".arrow-input")[i].value;
                }
            }
            else{
                document.querySelectorAll(".arrow-text")[0].textContent="<";
                document.querySelectorAll(".arrow-text")[1].textContent=">";
            }
            document.querySelectorAll(".screen input").forEach(a=>{a.style.display="none"});
            document.querySelectorAll(".arrow-text").forEach(a=>{a.style.display="flex"});
            document.querySelector(".answer").style.display="flex";
            document.querySelector(".submit").textContent="";
            document.querySelectorAll(".arrow")[0].removeEventListener("click",()=>{changePage("prev")});
            document.querySelectorAll(".arrow")[1].removeEventListener("click",()=>{changePage("next")});
            document.querySelector(".keyboard").textContent="Press the page screen to start a new solve";
            mode="output";
        }
    }
    else{
        page=1;
        document.querySelectorAll(".screen input.p1").forEach(a=>{a.style.display="flex"});
        document.querySelectorAll(".arrow-text")[0].textContent="<";
        document.querySelectorAll(".arrow-text")[1].textContent=">";
        if(color=="k"){
            document.querySelectorAll(".arrow-text").forEach(a=>{a.style.display="none"});
            document.querySelectorAll(".arrow-input").forEach(a=>{a.style.display="flex"});
        }
        else{
            document.querySelectorAll(".arrow-input").forEach(a=>{a.style.display="none"});
            document.querySelectorAll(".arrow-text").forEach(a=>{a.style.display="flex"});
        }
        document.querySelector(".answer").style.display="none";
        document.querySelector(".submit").textContent="1";
        document.querySelectorAll(".arrow")[0].addEventListener("click",()=>{changePage("prev")});
        document.querySelectorAll(".arrow")[1].addEventListener("click",()=>{changePage("next")});
        document.querySelector(".status-light").style.backgroundColor="#223";
        document.querySelector(".keyboard").textContent="Press the page screen to solve the module";
        mode="input";
    }
}
function recreateEdgeworks(){
    document.querySelectorAll(".edgework input").forEach(a=>{a.remove()});
    for(let j=0;j<edgeworks[colors.indexOf(color)].length;j++){
        let newEw=document.createElement("input");
        newEw.id="ew"+String(j+1);
        newEw.autocomplete="off";
        newEw.placeholder=edgeworks[colors.indexOf(color)][j];
        document.querySelector(".edgework").appendChild(newEw);
    }
    document.querySelectorAll(".edgework input").forEach(a=>(a.addEventListener("input",()=>{
        if(a.value.length>lengths[colors.indexOf(color)][5+Number(a.id[2])]){
            a.value=a.value.slice(0,lengths[colors.indexOf(color)][5+Number(a.id[2])]);
        }
        a.value=a.value.toUpperCase();
        for(let i=0;i<a.value.length;i++){
            if(!allowed[colors.indexOf(color)][5+Number(a.id[2])].toUpperCase().includes(a.value[i])){
                a.value=a.value.slice(0,i)+"#"+a.value.slice(i+1);
            }
        }
        a.value=a.value.replaceAll("#","");
    })));
}
function recreateInputs(){
    document.querySelectorAll(".screens .screen input").forEach(a=>{a.remove()});
    for(let i=0;i<pages[colors.indexOf(color)];i++){
        for(let j=0;j<3;j++){
            let newInput=document.createElement("input");
            newInput.classList="tmb"[j]+" p"+(i+1);
            newInput.id="tmb"[j]+(i+1);
            newInput.autocomplete="off";
            document.querySelectorAll(".screens .screen")[j].appendChild(newInput);
        }
    }
    changePage(1);
}

recreateEdgeworks();
recreateInputs();
for(let i=0;i<colorwords.length;i++){
    let newRow=document.createElement("div");
    newRow.style.height="6vw";
    newRow.style.width="100%";
    newRow.style.display="flex";
    newRow.style.justifyContent="stretch";
    for(let j=0;j<colorwords[i].length;j++){
        let index=0;
        for(let k=0;k<i;k++){
            index+=colorwords[k].length;
        }
        index+=j;
        let newColor=document.createElement("div");
        newColor.style.height="100%";
        newColor.style.width="100%";
        newColor.style.display="flex";
        newColor.style.justifyContent="center";
        newColor.style.alignItems="center";
        newColor.style.borderRadius="1vw";
        newColor.style.transitionDuration="0.3s";
        newColor.style.color="#"+hex[index];
        newColor.addEventListener("mouseover",()=>{
            newColor.style.backgroundColor="#"+hex[index];
            newColor.style.color="#222";
        });
        newColor.addEventListener("mouseout",()=>{
            newColor.style.backgroundColor="#222";
            newColor.style.color="#"+hex[index];
        })
        newColor.addEventListener("click",()=>{
            if(color!=colors[index]){
                if(mode=="output"){changeMode()}
                color=colors[index];
                document.querySelector(".module").style.backgroundColor="#"+hex[index];
                document.querySelectorAll("input").forEach(a=>{a.value=""});
                recreateInputs();
                if(color=="k"){
                    document.querySelectorAll(".arrow-text").forEach(a=>{a.style.display="none"});
                    document.querySelectorAll(".arrow-input").forEach(a=>{a.style.display="flex"});
                    document.querySelector(".keyboard").style.color="#fff";
                }
                else{
                    document.querySelectorAll(".arrow-input").forEach(a=>{a.style.display="none"});
                    document.querySelectorAll(".arrow-text").forEach(a=>{a.style.display="flex"});
                    document.querySelector(".keyboard").style.color="#000";
                }
            }
            document.querySelector(".keyboard").textContent="Press the page screen to solve the module";
            recreateEdgeworks();
            changePage(1);
        })
        newColor.classList="c"+colors[index];
        newColor.textContent=colorwords[i][j];
        newRow.appendChild(newColor);
    }
    document.querySelector(".palette").appendChild(newRow);
}

document.querySelector(".submit").addEventListener("click",changeMode);
document.querySelectorAll(".arrow")[0].addEventListener("click",()=>{changePage("prev")});
document.querySelectorAll(".arrow")[1].addEventListener("click",()=>{changePage("next")});
document.querySelectorAll("input").forEach(a=>{a.addEventListener("input",()=>{a.value=a.value.toUpperCase();})});
document.querySelectorAll(".arrow-input").forEach(a=>{a.addEventListener("input",()=>{
    if(a.value.length>1){a.value=a.value.slice(0,1)}
    if(!(letters+"#").includes(a.value.toLowerCase())){a.value=""}
})});
document.querySelectorAll(".screens .screen input").forEach(a=>{a.addEventListener("input",()=>{
    let b=0;
    for(let i=0;i<a.value.length;i++){
        if(!allowed[colors.indexOf(color)][["t1","m1","b1","t2","m2","b2"].indexOf(a.id)].toUpperCase().includes(a.value[i])){
            a.value=a.value.slice(0,i)+"#"+a.value.slice(i+1);
        }
    }
    a.value=a.value.replaceAll("#","");
    if(a.value.length>lengths[colors.indexOf(color)][["t1","m1","b1","t2","m2","b2"].indexOf(a.id)]){a.value=a.value.slice(0,lengths[colors.indexOf(color)][["t1","m1","b1","t2","m2","b2"].indexOf(a.id)])}
})});
document.querySelectorAll("input").forEach(a=>{a.addEventListener("input",()=>{
    let empty;
    document.querySelectorAll(".edgework input").forEach(b=>{if(b.value==""){empty=1}});
    document.querySelectorAll(".screens .screen input").forEach(b=>{if(b.value==""&&lengths[colors.indexOf(color)][["t1","m1","b1","t2","m2","b2"].indexOf(b.id)]!=0){empty=1}});
    if(color=="k"){document.querySelectorAll(".arrow-input").forEach(b=>{if(b.value==""){empty=1}})}
    if(empty!=1){document.querySelector(".keyboard").textContent="Press the page screen to solve the module"}
})})