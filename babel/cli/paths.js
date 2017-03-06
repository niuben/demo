import * as babylon from "babylon";
import traverse from "babel-traverse";
import generate from "babel-generator";

const code = `function square(n) {
  return n * n;
}`;

const MyVisitor = {
	Identifier(path) {
		if(path.node.name == "square"){
			console.log(path);
		}  
	}
};

const ast = babylon.parse(code);

traverse(ast, MyVisitor);


