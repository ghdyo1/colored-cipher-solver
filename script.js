const letters="abcdefghijklmnopqrstuvwxyz";
const matrix_abc="abcdefghiklmnopqrstuvwxyz";
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
let page=1;
let color="r";
import {red} from "/solvers/red.js";

function solve(){
    let inputs=[];
    let edgework=[];
    for(let i=0;i<2;i++){
        for(let j=0;j<3;j++){
            inputs.push(document.querySelector("#"+["t","m","b"][j]+String(i+1)).value.toLowerCase());
        }
    }
    if(color=="k"){
        for(let i=0;i<2;i++){
            inputs.push(document.querySelectorAll(".arrow-input")[i].value.toLowerCase());
        }
    }
    console.log(inputs)
}
function changePage(){
    document.querySelectorAll(".p"+String(page)).forEach(a=>{a.style.display="none"});
    page=page%2+1;
    document.querySelectorAll(".p"+String(page)).forEach(a=>{a.style.display="block"});
    document.querySelector(".submit").textContent=page;
}

document.querySelector(".submit").addEventListener("click",solve);
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
            document.querySelectorAll(".edgework *").forEach(a=>{a.remove()});
            for(let j=0;j<edgeworks[colors.indexOf(color)].length;j++){
                let newEw=document.createElement("input");
                newEw.id="ew"+String(j+1);
                newEw.autocomplete="off";
                newEw.placeholder=edgeworks[colors.indexOf(color)][j];
                document.querySelector(".edgework").appendChild(newEw);
            }
        }
    }
});
document.querySelector(".arrows").addEventListener("click",changePage);
document.querySelectorAll("input").forEach(a=>{a.addEventListener("input",()=>{a.value=a.value.toUpperCase();})});