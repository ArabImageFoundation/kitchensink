import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import {getDefaultStyle} from 'redux-devtools/lib/react/DebugPanel';
import getStore from '../redux/store';
import App from './App';
import B from '../../src/bootstrap'

const store = getStore();

function getStyle(show){
	return function(props){
		return Object.assign(
			{}
		,	getDefaultStyle(props)
		,	{
				right:show?0:-255
			,	maxWidth:'100%'
			,	width:300
			,	transition:'all .3s'
			}
		);
	}
}
class Root extends Component{
	constructor(props,context){
		super(props,context)
		this.state = {
			showDebug:false
		,	pinnedDebug:false
		}
	}
	render(){
		return (<div>
			<Provider store={store}>
				<App />
			</Provider>
			<DebugPanel top right bottom getStyle={getStyle(this.state.showDebug||this.state.pinnedDebug)}>
				<div className={this.state.showDebug?'showDebug':'hideDebug'} style={{height:'100%'}} onMouseOver={()=>this.setState({showDebug:true})} onMouseOut={()=>this.setState({showDebug:false})}>
					<DevTools store={store} monitor={LogMonitor}/>
					<div style={{position:'absolute',top:0,right:0,background:(this.state.pinnedDebug?'red':'black'),cursor:'pointer'}} onClick={()=>this.setState({pinnedDebug:!this.state.pinnedDebug})}>📌</div>
				</div>
			</DebugPanel>
		</div>);
	}
};

(function monkeyPatchLogMonitorToGetRidOfWarning(){
	LogMonitor.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
		var node = ReactDOM.findDOMNode(this.refs.elements);
		if (!node) {
			this.scrollDown = true;
		} else if (this.props.stagedActions.length < nextProps.stagedActions.length) {
			var scrollTop = node.scrollTop;
			var offsetHeight = node.offsetHeight;
			var scrollHeight = node.scrollHeight;
			this.scrollDown = Math.abs(scrollHeight - (scrollTop + offsetHeight)) < 20;
		} else {
			this.scrollDown = false;
		}
	};

	LogMonitor.prototype.componentDidUpdate = function componentDidUpdate() {
		var node = ReactDOM.findDOMNode(this.refs.elements);
		if (!node) {return;}
		if (this.scrollDown) {
			var offsetHeight = node.offsetHeight;
			var scrollHeight = node.scrollHeight;
			node.scrollTop = scrollHeight - offsetHeight;
			this.scrollDown = false;
		}
	}
})();

export default Root;
