export function white(edgework, inputs){
    const letters="abcdefghijklmnopqrstuvwxyz";
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
    encrypted=encrypted.slice(6);
    let key=key1+key2;
    for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
            key+=key[[[0,7,9,11],[3,5,13,14],[4,6,8,15],[1,2,10,12]][(i+ports)%4][j]];
        }
    }
    key=key.slice(16);
    let seankey="";
    for(let i=0;i<key.length;i++){
        if(!seankey.includes(key[i])){
            seankey+=key[i];
        }
    }
    let sean_abc=letters;
    for(let i=0;i<seankey.length;i++){
        sean_abc=sean_abc.replace(seankey[i],"");
    }
    let sean;
    if(lit%2==0){
        sean=seankey+sean_abc;
    }
    else{
        sean=sean_abc+seankey;
    }
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
    encrypted=encrypted.slice(6);
    if(encrypted.length!=6){
        return "ERROR";
    }
    else{
        return encrypted.toUpperCase();
    }
}