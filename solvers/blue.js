export function blue(edgework, inputs){
    function mod(a, b){return ((a%b)+b)%b;}

    const letters="abcdefghijklmnopqrstuvwxyz";
    let indicators=Number(edgework[0]);
    let encrypted=inputs[0];
    let tridigitalrows=inputs[1];
    let tridigitalcols=inputs[2];
    let tridigitalword=inputs[3];

    let tridigitalkey="";
    for(let i=0;i<tridigitalword.length;i++){
        if(!tridigitalkey.includes(tridigitalword[i])){
            tridigitalkey+=tridigitalword[i];
        }
    }
    let tridigital_abc=letters;
    for(let i=0;i<tridigitalkey.length;i++){
        tridigital_abc=tridigital_abc.replace(tridigitalkey[i],"");
    }
    let tridigital;
    if(indicators%2==0){
        tridigital=tridigitalkey+tridigital_abc;
    }
    else{
        tridigital=tridigital_abc+tridigitalkey;
    }
    let key="";
    for(let i=0;i<6;i++){
        key+=tridigital[(Number(tridigitalrows[i])*9)-9+Number(tridigitalcols[i])-1];
    }
    for(let i=0;i<6;i++){
        encrypted+=letters[25-letters.indexOf(encrypted[i])];
    }
    encrypted=encrypted.slice(6);
    for(let i=0;i<6;i++){
        encrypted+=letters[mod(letters.indexOf(encrypted[i])-letters.indexOf(key[i]),26)-1];
    }
    encrypted=encrypted.slice(6);
    if(encrypted.length!=6){
        return "ERROR";
    }
    else{
        return encrypted.toUpperCase();
    }
}