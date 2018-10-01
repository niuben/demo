var React = require("react");
var ReactDom = require("react-dom");

var Hello = React.createClass({
	render(){
		return (
			<div>
				<h1 onClick={()=>{
					alert("打野")
				}} style={{height: 30}}>点击事件</h1>
				<h2>aaa</h2>
			</div>
		)
	}
});
ReactDom.render(<Hello/>, document.getElementById("root"));


