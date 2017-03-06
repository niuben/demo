import * as babylon from "babylon";
import traverse from "babel-traverse";
import * as t from "babel-types";
import generate from "babel-generator";


const code = `function square(n) {
  return n * n;
}`;

const updateParamNameVisitor = {
  Identifier(path) {
    if (path.node.name === this.paramName) {
      path.node.name = "x";
    }
  }
};

const MyVisitor = {
  FunctionDeclaration(path) {
    const param = path.node.params[0];
    const paramName = param.name;
    param.name = "x";

    path.traverse(updateParamNameVisitor, { paramName });
  }
};

const ast = babylon.parse(code);
//console.log(generate(traverse(ast, MyVisitor), null, code));
//console.log(generate(ast, null, code));

traverse(ast, MyVisitor);
console.log(generate(ast, null, code));

