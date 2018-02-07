import { sayHello } from "./greet";

let showHello = (divName: string, name: string) =>{
    const elt = document.getElementById(divName);
    elt.innerText = sayHello(name);
}

showHello("greeting","Typescript");