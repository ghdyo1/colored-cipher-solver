export function green(edgework, inputs){
    function mod(a,b){return ((a%b)+b)%b;}

    const letters="abcdefghijklmnopqrstuvwxyz";
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
    let ragbabykey="";
    for(let i=0;i<ragbabyword.length;i++){
        if(!ragbabykey.includes(ragbabyword[i])){
            ragbabykey+=ragbabyword[i];
        }
    }
    let ragbaby_abc=letters;
    for(let i=0;i<ragbabykey.length;i++){
        ragbaby_abc=ragbaby_abc.replace(ragbabykey[i],"");
    }
    let ragbaby;
    if(unlit%2==0){
        ragbaby=ragbabykey+ragbaby_abc;
    }
    else{
        ragbaby=ragbaby_abc+ragbabykey;
    }
    for(let i=0;i<6;i++){
        encrypted+=ragbaby[mod(ragbaby.indexOf(encrypted[i])-(i+1),26)];
    }
    encrypted=encrypted.slice(6);
    const letterstable="ufhkqiplxnzesgbvmcwjrdotyaiwczymlkjodgfsqrnbtxhuevapwbsmejtucpfahzoqliknyvgxrdgrinqvwotyajxbmhcfklduszepdltvsuikwcxrfjzanyhmqogepbfsvceiujkpgntyhblrqoxmadwzjocywfpadkhiuvtsmengqlzbrxbphoraknuetdzyqimsfjgvwcxlandsqwtgxkfpcovblmyezhrjiuaqjpbusgwnxzvdyletcofhrimkbhftdgerxjamunzvykospilcwqjhukdmsnebiczywlxqfportavgasntzdbgwyileorcqfxjpkhmvurpcqabvlgwfenikymdutsjxozhyixnvwqsuhfomzdgkjpctbelarimpczlegjarntwsyfqdoubkhvxjgkoxmubavrtfycnpwqzesilhdsvhdbznmkwjieuyfxrqplgcatotzxgopnbwaiyrhqlvkjscduefmdjqzywtpkixcvabfnueolhsgrmcjoedyhbnixzrtpwgalfkusmvqfehlyobgrxqkvzuimjtnacdpswmogapthizxrfklysvdbwuqnecjrxmsbpwoejadiynqlgkctuhzfvzjvwfbeotkrdhscpigqnayluxmvwfxuekrlbqtmchsqjozydapin";
    for(let i=0;i<6;i++){
        encrypted+=letters[letterstable.slice(letters.indexOf(key[i])*26,(letters.indexOf(key[i])+1)*26).indexOf(encrypted[i])];
    }
    encrypted=encrypted.slice(6);
    if(encrypted.length!=6){
        return "ERROR";
    }
    else{
        return encrypted.toUpperCase();
    }
}