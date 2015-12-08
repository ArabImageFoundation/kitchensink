import React,{Component,Children,PropTypes} from 'react';
import ReactDOM from 'react-dom'
import Portal from './Portal';

const layerStyle = {
	position:'absolute'
,	top:0
,	left:0
,	right:0
,	bottom:0
}

class Layer extends Component{
	static propTypes = {
		children:PropTypes.element.isRequired
	,	onRequestClose:PropTypes.func.isRequired
	,	id:PropTypes.number.isRequired
	,	count:PropTypes.number.isRequired
	}
	render(){
		const style=Object.assign({},layerStyle);
		const {children} = this.props;
		return <div style={style}>{children}</div>
	}
}

class Panel extends Portal{
	constructor(props,context){
		super(props,context)
		this.ChildElement = props.Element || Layer;
	}
	onRemovedChildElement(id){

	}
	getId(){
		return 'Portal__panel__'
	}
	getChildren(){
		const {ChildElement} = this
		const {children} = this.props;
		const count = Children.count(children);
		if(!count){return;}
		const props = {
			count
		,	onRequestClose:this.onRemovedChildElement
		}
		return Children.map(
			children
		,	(child,id) =>
				(<ChildElement {...props,id} key={id}>{child}</ChildElement>)
		)
	}
	updatePortalElement(){
		this.portalElement && ReactDOM.render(
			(<div {...this.props}>
				{this.props.children}
			</div>)
		,	this.portalElement
		);
	}
}
