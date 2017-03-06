import * as babylon from "babylon";
import traverse from "babel-traverse";
import generate from "babel-generator";

const code = `function square(n) {
  return n * n;
}`;

const MyVisitor = {
  Identifier(path) {
    console.log(path.node.name);
  }
};

let visitor = {};
visitor.MemberExpression = function() {};
visitor.FunctionDeclaration = function(path) {
	console.log(path.node.id.name);
}
visitor.Identifier = function(path) {
	console.log(path.node.name);
}


const ast = babylon.parse(code);

//traverse(ast, MyVisitor);
traverse(ast, visitor);


