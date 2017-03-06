import * as t from "babel-types";
export default function(babel){	
	return {
		visitor: {
			Identifier(path) {				
				if(path.node.name == "foo"){
					path.node.name = "hello"
				}	
			},
			BinaryExpression(path) {
			
			}	
		}
	}	
}
