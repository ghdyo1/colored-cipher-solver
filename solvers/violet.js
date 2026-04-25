export function violet(edgework, inputs){
    //ONLY if needed
    //function mod(a, b){return ((a%b)+b)%b;}

    const letters="abcdefghijklmnopqrstuvwxyz";;
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
    encrypted=encrypted.slice(6);
    let grid=["012543","015243"][Number(number[0])-1];
    for(let i=0;i<6;i++){
        grid+=String((Number(grid[i])+Number(number[1])-1)%6);
    }
    grid=grid.slice(6);
    for(let i=0;i<6;i++){
        encrypted+=encrypted[Number(grid[i])];
    }
    encrypted=encrypted.slice(6);
    let quagmirekey="";
    for(let i=0;i<quagmireword.length;i++){
        if(!quagmirekey.includes(quagmireword[i])){
            quagmirekey+=quagmireword[i];
        }
    }
    let quagmire_abc=letters;
    for(let i=0;i<quagmirekey.length;i++){
        quagmire_abc=quagmire_abc.replace(quagmirekey[i],"");
    }
    let quagmire=quagmirekey+quagmire_abc;
    for(let i=0;i<6;i++){
        encrypted+=letters[(quagmire.slice(quagmire.indexOf(key[i]))+quagmire.slice(0,quagmire.indexOf(key[i]))).indexOf(encrypted[i])];
    }
    encrypted=encrypted.slice(6);
    if(encrypted.length!=6){
        return "ERROR";
    }
    else{
        return encrypted.toUpperCase();
    }
}