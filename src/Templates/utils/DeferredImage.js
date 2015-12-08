import React from 'react';
const Avatar = require('material-ui/lib/avatar');
const FontIcon = require('material-ui/lib/font-icon');

class DeferredImage extends React.Component{
	constructor(props,context){
		super(props,context);
		this.state = {
			src:''
		,	title:''
		}
		if(props.file){
			this.loadFile(props.file);
		}
	}
	loadFile(file){
		const reader = new FileReader();
		reader.onload = (evt) => this.setState({
			src:evt.target.result
		,	title:this.state.title || escape(file.name)
		})
		reader.readAsDataURL(file);
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.title){
			this.setState({title:nextProps.title});
		}
		if(nextProps.file){
			this.loadFile(nextProps.file);
		}
	}
	render(){
		const {src,title} = this.state;
		if(!src){
			return <Avatar {...this.props} icon={<FontIcon className="material-icons">load</FontIcon>}/>
		}
		return <Avatar {...this.props} src={src}/>
	}
}

export default DeferredImage
