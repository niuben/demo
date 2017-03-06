
var React = require("react");
var ReactDom = require("react-dom");

// var Ant = require("antd");

// import {Button, Modal, Table} from "antd";

var Hello = React.createClass({
	componentDidMount(){

	},
	render(){
		return (
			<div id="title">
				title
			</div>
		)
	}
});
ReactDom.render(<Hello/>, document.getElementById("root"));


