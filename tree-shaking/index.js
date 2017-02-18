// import React from 'react';
// import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';

// const App = React.createClass({
// 	render: function(){
// 		return <h1>tree shaking </h1>
// 	}
// });

const pathConfig = 
  (<Router history={browserHistory}>
    <Route path="*" component={App}></Route>
  </Router>)
