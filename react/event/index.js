
var React = require("react");
var ReactDom = require("react-dom");

// var Ant = require("antd");

// import {Button, Modal, Table} from "antd";

var Hello = React.createClass({
	componentDidMount(){
		var sonEles = document.getElementsByClassName("son")
		for (var i = 0; i < sonEles.length; i++) {
			sonEles[i].addEventListener("click", function(){
				alert("son");
			});
		};
	},
	render(){
		return (
			<div style={{height: 300, width: 300, border: "1px solid #F00"}} onClick={()=>{
				alert("father");
			}}>
				father
				<div className="son" style={{height: 200, width: 200, margin: 50, border: "1px solid #F00"}}>
					son
				</div>

				<div className="son" style={{height: 200, width: 200, margin: 50, border: "1px solid #F00"}}>
					son
				</div>	

			</div>
		)
	}
});
ReactDom.render(<Hello/>, document.getElementById("root"));


