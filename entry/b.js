
var React = require("react");
var ReactDom = require("react-dom");

// var Ant = require("antd");

// import {Button, Modal, Table} from "antd";

var Hello = React.createClass({
	render(){
		return "Hello World!";
	}
});
ReactDom.render(<Hello/>, document.getElementById("root"));


