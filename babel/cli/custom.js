import * as babylon from "babylon";
import traverse from "babel-traverse";
import generator from "babel-generator";
//import plugins from "./plugin.js";

const code = `foo === bar`;

const ast = babylon.parse(code);
// console.log(ast);
//traverse(ast, {
//	enter(path){
//		if(path.node.type === "Identifier" && path.node.name === "n"){
//			path.node.name = "x";
//		}
//	}
//});

//traverse(ast, plugins().visitor);
//console.log(ast);
console.log(generator(ast));



