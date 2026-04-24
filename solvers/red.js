export function red(edgework, inputs){
    function mod(a, b){return ((a%b)+b)%b;}

    const matrix_abc="abcdefghiklmnopqrstuvwxyz";
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
    encrypted=encrypted.slice(6);
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
            encrypted+=matrix1[(letter1-5)%25]+matrix1[(letter2-5)%25];
        }
        else{
            encrypted+=matrix1[row1*5+col2]+matrix1[row2*5+col1]
        }
    }
    encrypted=encrypted.slice(6);
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
    encrypted=encrypted.slice(6);
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