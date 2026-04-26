export function gray(edgework, inputs){
    function step(a,b){
        let r="";
        for(let i=0;i<a.slice(b).length;i+=2){
            r+=a.slice(b)[i];
        }
        return r;
    }

    const digits="0123456789";
    const letters="abcdefghijklmnopqrstuvwxyz";
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
    encrypted=encrypted.slice(6);
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
    encrypted=encrypted.slice(6);
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
    encrypted=encrypted.slice(6);
    encrypted+=step(encrypted,0)+step(encrypted,1);
    encrypted=encrypted.slice(6);
    if(encrypted.length!=6){
        return "ERROR";
    }
    else{
        return encrypted.toUpperCase();
    }
}