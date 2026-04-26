export function orange(edgework, inputs){
    function mod(a,b){return ((a%b)+b)%b;}

    const matrix_abc="abcdefghiklmnopqrstuvwxyz";
    const digits="0123456789";
    const digit_words=["zero","one","two","three","four","five","six","seven","eight","nine"];
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
    encrypted=encrypted.slice(6);
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
    encrypted=encrypted.slice(6);
    for(let i=0;i<6;i++){
        encrypted+=matrix2[matrix3.indexOf(encrypted[i])];
    }
    encrypted=encrypted.slice(6);
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
    encrypted=encrypted.slice(6);
    for(let i=0;i<6;i++){
        if(endreplace.includes(i)){
            encrypted+="j";
        }
        else{
            encrypted+=encrypted[i];
        }
    }
    encrypted=encrypted.slice(6);
    if(encrypted.length!=6){
        return "ERROR";
    }
    else{
        return encrypted.toUpperCase();
    }
}