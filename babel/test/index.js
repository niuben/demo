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