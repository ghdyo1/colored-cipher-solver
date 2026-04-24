const letters="abcdefghijklmnopqrstuvwxyz";
const digits="0123456789";
const colors="roygbivwak";
const hex=["f00","f70","ff0","0f0","00f","107","a0f","fff","777","000"];
const edgeworks=[
    ["SN FIRST DIGIT","SN SECOND DIGIT","SN LAST DIGIT"],
    ["SN FIRST DIGIT","SN SECOND DIGIT","SN LAST DIGIT"],
    ["NUMBER OF BATTERIES"],
    ["NUMBER OF UNLIT INDICATORS"],
    ["NUMBER OF INDICATORS"],
    ["NUMBER OF PORTS","SUM OF SN DIGITS"],
    [],
    ["NUMBER OF PORTS","NUMBER OF LIT INDICATORS"],
    ["SN FIRST CHARACTER"],
    ["SN FIRST LETTER","SN LAST LETTER","SN SECOND CHARACTER"]
];
const lengths=[
    [6,6,0,8,8,8],
    [6,6,8,8,8,4],
    [6,5,5,5,8,11],
    [6,6,6,3,8,0],
    [6,6,6,8,0,0],
    [6,8,8,6,6,12],
    [6,6,2,8,0,0],
    [6,8,0,8,8,0],
    [6,6,6,3,0,0],
    [6,8,8,16,3,14]
];
const allowed=[
    [letters,letters,"",letters,letters,letters],
    [letters,letters,letters,letters,letters,digits],
    [letters,digits,digits,digits,letters,digits+"-"],
    [letters,digits,digits,letters,letters,""],
    [letters,digits,digits,letters,"",""],
    [letters,letters,letters,"01","01",digits+" ?="],
    [letters,letters,digits.slice(1,7),letters,"",""],
    [letters,digits,"",letters,letters,""],
    [letters,"01",digits.slice(1,7),letters,"",""],
    [letters,letters,letters,"abcvi-",letters,letters+"-"]
];
let page=1;
let color="r";
let answer;
let mode="input";

import {red} from "/solvers/red.js";
import {orange} from "/solvers/orange.js";
import {yellow} from "/solvers/yellow.js";

function solve(){
    let inputs=[];
    let edgework=[];
    for(let i=0;i<2;i++){
        for(let j=0;j<3;j++){
            inputs.push(document.querySelector("#"+["t","m","b"][j]+String(i+1)).value.toLowerCase().trim());
        }
    }
    if(color=="k"){
        for(let i=0;i<2;i++){
            inputs.push(document.querySelectorAll(".arrow-input")[i].value.toLowerCase().trim());
        }
    }
    document.querySelectorAll(".edgework input").forEach(a=>{edgework.push(a.value)});
    switch(color){
        case "r":
            return red(edgework,inputs);
        case "o":
            return orange(edgework,inputs);
        case "y":
            return yellow(edgework,inputs);
    }
}
function changePage(){
    document.querySelectorAll(".p"+String(page)).forEach(a=>{a.style.display="none"});
    page=page%2+1;
    document.querySelectorAll(".p"+String(page)).forEach(a=>{a.style.display="block"});
    document.querySelector(".submit").textContent=page;
}
function changeMode(){
    if (mode=="input"){
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
        document.querySelectorAll(".screen input").forEach(a=>{a.style.display="none";a.value=""});
        document.querySelectorAll(".arrow-text").forEach(a=>{a.style.display="flex"});
        document.querySelector(".answer").style.display="flex";
        document.querySelector(".submit").textContent="";
        document.querySelector(".arrows").removeEventListener("click",changePage);
        mode="output";
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
        document.querySelector(".arrows").addEventListener("click",changePage);
        document.querySelector(".status-light").style.backgroundColor="#223";
        mode="input";
    }
}

document.querySelector(".submit").addEventListener("click",changeMode);
document.querySelector(".arrows").addEventListener("click",changePage);
document.querySelectorAll("input").forEach(a=>{a.addEventListener("input",()=>{a.value=a.value.toUpperCase();})});
document.querySelector(".palette").addEventListener("click",function(event){
    for(let i=0;i<10;i++){
        if(event.target.classList.contains("c"+colors[i])){
            document.querySelector(".module").style.backgroundColor="#"+hex[i];
            color=colors[i];
            document.querySelectorAll("input").forEach(a=>{a.value=""});
            document.querySelector(".submit").textContent=page;
            if(colors[i]=="k"){
                document.querySelectorAll(".arrow-text").forEach(a=>{a.style.display="none"});
                document.querySelectorAll(".arrow-input").forEach(a=>{a.style.display="flex"});
            }
            else{
                document.querySelectorAll(".arrow-input").forEach(a=>{a.style.display="none"});
                document.querySelectorAll(".arrow-text").forEach(a=>{a.style.display="flex"});
            }
            document.querySelectorAll(".edgework input").forEach(a=>{a.remove()});
            for(let j=0;j<edgeworks[colors.indexOf(color)].length;j++){
                let newEw=document.createElement("input");
                newEw.id="ew"+String(j+1);
                newEw.autocomplete="off";
                newEw.placeholder=edgeworks[colors.indexOf(color)][j];
                document.querySelector(".edgework").appendChild(newEw);
            }
        }
    }
    if(page==2){changePage()}
});
document.querySelectorAll(".arrow-input").forEach(a=>{a.addEventListener("input",()=>{
    if(a.value.length>1){a.value=a.value.slice(1)}
})});
document.querySelectorAll(".screens .screen input").forEach(a=>{a.addEventListener("input",()=>{
    let b=0;
    for(let i=0;i<a.value.length;i++){
        if(!allowed[colors.indexOf(color)][["t1","m1","b1","t2","m2","b2"].indexOf(a.id)].toUpperCase().includes(a.value[i])){
            a.value=a.value.slice(0,i)+"#"+a.value.slice(i+1);
        }
    }
    a.value=a.value.replaceAll("#","");
    if(a.value.length>lengths[colors.indexOf(color)][["t1","m1","b1","t2","m2","b2"].indexOf(a.id)]){a.value=a.value.slice(1)}
})});