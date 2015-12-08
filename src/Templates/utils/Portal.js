import React,{Component} from 'react';
import ReactDOM from 'react-dom'

var portals = 0;

class Portal extends Component{
	constructor(props){
		super(props);
		this.portalElement = null;
		this.defaultId = `Portal_${(portals++)}`;
	}
	getId(){
		return this.props.portalId || this.defaultId;
	}
	getPortalElement(){
		if(!this.portalElement){
			const id = this.getId();
			let p = document.getElementById(id);
			if(!p){
				p = document.createElement('div');
				p.id = id
				document.body.appendChild(p);
			}
			this.portalElement = p;
		}
		return this.portalElement;
	}
	removePortalElement(){
		this.portalElement && document.body.removeChild(this.portalElement);
	}
	updatePortalElement(){
		this.portalElement && ReactDOM.render(
			(<div {...this.props}>
				{this.props.children}
			</div>)
		,	this.portalElement
		);
	}

	componentDidMount() {
		this.getPortalElement();
		this.updatePortalElement();
	}

	componentWillUnmount(){
		this.removePortalElement();
	}
	componentDidUpdate(){
		this.updatePortalElement();
	}
	render(){
		return null;
	}
}

export default Portal;
