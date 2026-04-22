let letters="abcdefghijklmnopqrstuvwxyz";
let matrix_abc="abcdefghiklmnopqrstuvwxyz";
let digits="0123456789";
let colors="roygbivwak";
let hex=["f00","f70","ff0","0f0","00f","107","a0f","fff","777","000"];
let page=1;
let color="r";

function solve(){
    let inputs=[];
    for(let i=0;i<2;i++){
        for(let j=0;j<3;j++){
            inputs.push(document.querySelector("#"+["t","m","b"][j]+(i+1).toString()).value);
        }
    }
}
function changePage(){
    document.querySelectorAll(".p"+page.toString()).forEach(a=>{a.style.display="none"});
    page=page%2+1;
    console.log(page);
    document.querySelectorAll(".p"+page.toString()).forEach(a=>{a.style.display="block"});
    document.querySelector(".submit").textContent=page;
}

document.querySelector(".submit").addEventListener("click",solve);
document.querySelector(".palette").addEventListener("click",function(event){
    for(let i=0;i<10;i++){
        if(event.target.classList.contains("c"+colors[i])){
            document.querySelector(".module").style.backgroundColor="#"+hex[i];
            let color=colors[i];
            document.querySelectorAll("input").forEach(a=>{a.value=""});
            document.querySelector(".submit").textContent=page;
            if(colors[i]=="k"){
                document.querySelectorAll(".arrow-text").forEach(a=>{a.textContent=""});
            }
            else{
                document.querySelectorAll(".arrow-text")[0].textContent="<";
                document.querySelectorAll(".arrow-text")[1].textContent=">";
            }
        }
    }
});
document.querySelector(".arrows").addEventListener("click",changePage);