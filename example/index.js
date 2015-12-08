import style from "./style.styl";
import React from 'react';
import ReactDOM from 'react-dom';
var App = require('./components/Root.js').default;

function render(){
	ReactDOM.render(<App/>, document.getElementById('Content'));
}


if(module.hot) {
	module.hot.accept("./components/Root.js", function() {
		App = require('./components/Root.js').default
		render();
	});
}

render();
