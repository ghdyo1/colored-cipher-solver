export function black(edgework, inputs){
    function rotor(rot,row,lett,con){
        lett=con[rot][row][lett].toLowerCase();
        lett=con[rot][(row+1)%2].toLowerCase().indexOf(lett);
        return lett;
    }

    const digits="0123456789";
    const letters="abcdefghijklmnopqrstuvwxyz";
    const roman=["i","ii","iii","iv","v","vi","vii","viii"];
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

    let key1key="";
    for(let i=0;i<keyword1.length;i++){
        if(!key1key.includes(keyword1[i])){
            key1key+=keyword1[i];
        }
    }
    let key1_abc=letters;
    for(let i=0;i<key1key.length;i++){
        key1_abc=key1_abc.replace(key1key[i],"");
    }
    let key1;
    if(letters.indexOf(firstletter)%2==0){
        key1=key1key+key1_abc;
    }
    else{
        key1=key1_abc+key1key;
    }
    key1=key1.replace(buttonl,"#");
    key1+=buttonl;
    let key2key="";
    for(let i=0;i<keyword2.length;i++){
        if(!key2key.includes(keyword2[i])){
            key2key+=keyword2[i];
        }
    }
    let key2_abc=letters;
    for(let i=0;i<key2key.length;i++){
        key2_abc=key2_abc.replace(key2key[i],"");
    }
    let key2;
    if(letters.indexOf(lastletter)%2==1){
        key2=key2key+key2_abc;
    }
    else{
        key2=key2_abc+key2key;
    }
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
    encrypted=encrypted.slice(6);
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
    encrypted=encrypted.slice(6);
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
    encrypted=encrypted.slice(6);
    if(encrypted.length!=6){
        return "ERROR";
    }
    else{
        return encrypted.toUpperCase();
    }
}