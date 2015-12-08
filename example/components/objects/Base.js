import React,{Component,PropTypes} from 'react';
import {
	getRealMeta,
	extractModels
} from './utils';
import t from '../../../src/Model';
const Form = t.form.Form;
const ModelForm = t.form.ModelForm;

function summaryMode(props){
	const {summary} = props;
	return (<div>
		{summary}
	</div>);
}

function editMode(props,type){
	const formProps = Object.assign({},props,{
		type
	,	ref:'form'
	,	options:{
			factory:ModelForm
		}
	});
	return (<Form {...formProps}/>);
}

function viewMode(props){
	return summaryMode(props);
}

class Base extends Component{
	static propTypes = {
		value:PropTypes.object
	,	mode:PropTypes.string
	}
	static defaultProps = {
		mode:'summary'
	}
	static filter = function(regexp,props){
		const sum = this.sum;
		return regexp.test(sum(props));
	}
	static views = {
		summary:summaryMode
	,	edit:editMode
	,	view:viewMode
	}
	constructor(props,context){
		super(props,context);
		this.onChange = this.onChange.bind(this);
		this.state = {
			value:props && props.value || null
		};
	}
	getValue(){
		var values = this.refs.form.getValue();
		if(!values){return;}
		return this.constructor.model.cast(values);
	}
	getValues(callback){
		const result = this.validate();
		if(result.errors.length){
			if(callback){
				callback(result.errors);
			}
			console.log(result.errors);
			return null;
		}
		const value = result.value;
		return value.getValues();
	}
	onChange(value,path){
		this.setState({value},()=>{
			this.props.onChange && this.props.onChange(value,path);
		})
	}
	validate(){
		return this.refs.form.validate();
	}
	render(){
		const mode = this.props.mode || 'summary';
		if(!this.constructor.views[mode]){
			return (<div>Error, unknown template {mode}</div>)
		}
		const model = this.constructor.model;
		const type = model;
		const summary = model.identifier(this.props.value);
		const props = Object.assign({},this.props,{
			summary
		,	displayName:model.displayName
		,	onEdit:this.onEdit
		,	onSave:this.onSave
		,	onChange:this.onChange
		,	onRemove:this.onRemove
		,	onEdit:this.onEdit
		,	value:this.state.value
		});
		return this.constructor.views[mode](props,type);
	}
}


export default Base
