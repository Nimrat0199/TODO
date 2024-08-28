const inp = document.querySelector("input");
const btn = document.querySelector("button");
const tododiv = document.querySelector("#todo");
const compdiv = document.querySelector("#comp");


document.addEventListener("DOMContentLoaded",()=>{
    let ls1 = JSON.parse(localStorage.getItem("todo")) || []
    if(ls1.length!=0){
        ls1.forEach((item)=>{
            addbox(item,tododiv);
        })
    }
    
    let ls2 = JSON.parse(localStorage.getItem("comp")) || []
    if(ls2.length!=0){
        ls2.forEach((item)=>{
            addbox(item,compdiv);
        })
    }
    
})

function addbox(text,container){
    let outerdiv = document.createElement("div");
    outerdiv.classList.add("flex","items-center");
    let input = document.createElement("input");
    let innerdiv= document.createElement("div");
    let i = document.createElement("i");
    i.classList.add("fa-solid","fa-trash");
    i.addEventListener("click",(e)=>{
        remove(text,e.target.parentElement.parentElement.id);
        outerdiv.remove();
    })
    
    if(container==compdiv) input.defaultChecked=true;


    input.type="checkbox";
    input.classList.add("ml-3");
    input.addEventListener("change",()=>{
        
        if(input.checked){
            outerdiv.remove();
            compdiv.append(outerdiv);
            remove(text,"todo");
            store(text,"comp");
        }
        else{
            outerdiv.remove();
            tododiv.append(outerdiv);
            remove(text,"comp")
            store(text,"todo");
        }
    })
    outerdiv.append(input);
    let str = "border-black border-2 px-2 text-left w-[80%] mx-auto my-3";
    let lst = str.split(" ");
    lst.forEach((a)=>{
        innerdiv.classList.add(a);
    })
    innerdiv.innerText=text;
    outerdiv.append(innerdiv);
    outerdiv.append(i);
    container.append(outerdiv);
}

function store(text,container){
    let ls = JSON.parse(localStorage.getItem(container)) || []
    ls.push(text);
    localStorage.setItem(container,JSON.stringify(ls));
}

function remove(text,container){
    let ls = JSON.parse(localStorage.getItem(container));
    ls=ls.filter((item)=>{
        return item!=text;
    })
    localStorage.setItem(container,JSON.stringify(ls));
}


inp.addEventListener("keydown",(e)=>{
    if(e.key=="Enter"){
        btn.click();
    }
})

btn.addEventListener("click",()=>{
    let txt = inp.value;
    if(txt!=""){
        addbox(txt,tododiv);
        store(txt,"todo");
        inp.value="";
    }
})