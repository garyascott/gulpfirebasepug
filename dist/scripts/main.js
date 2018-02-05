"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var greet_1 = require("./greet");
var showHello = function (divName, name) {
    var elt = document.getElementById(divName);
    elt.innerText = greet_1.sayHello(name);
};
showHello("greeting", "Typescript");
