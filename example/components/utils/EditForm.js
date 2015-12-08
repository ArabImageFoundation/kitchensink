import React,{Component,PropTypes} from 'react'
import renderItem from './renderItem';
import B from '../../../src/bootstrap'
import t from '../../../src';
const Form = t.form.Form;
import {Models} from '../objects';

function onChange(value,path){
	const result = this.refs.form.validate();
	const valid = !!result.errors.length;
	if(!valid){console.log(result);}
	this.setState({valid:true,value});
}

function save(evt){
	evt && evt.preventDefault();
	var value = this.refs.form.getValues();
	if (value){
		console.log('WTF',value);
		//this.props.onSave(values);
	}else{
		console.log('OMMAAAAK!!!')
	}
}

function cancel(evt){
	evt && evt.preventDefault();
	this.props.onCancel();
}

class EditForm extends Component{
	static propTypes = {
		valid:PropTypes.bool
	,	item:PropTypes.object
	,	onCancel:PropTypes.func.isRequired
	,	onSave:PropTypes.func.isRequired
	,	type:PropTypes.string
	}
	constructor(props,context){
		super(props,context);
		this.state = {valid:props.valid,value:props.item && props.item.doc}
		this.onChange = onChange.bind(this);
		this.save = save.bind(this);
		this.cancel = cancel.bind(this);
	}
	render(){
		const {item,type} = this.props
		const modelType = type || (item && item.doc && item.doc.type);
		const Component = modelType && Models[modelType];
		if(!Component){return false;}
		const formProps = {
			ref:'form'
		,	value:item && item.doc
		,	options:this.props.options
		,	mode:'edit'
		,	onChange:this.onChange
		}
		const dialogProps = {
			open:true
		,	onClose:this.cancel
		,	onCancel:this.cancel
		,	disabled:!this.state.valid
		,	onConfirm:this.save
		,	confirmLabel:'Save'
		}
		return (<B.ModalDialog {...dialogProps}>
			<form onSubmit={this.save}>
				<Component {...formProps}/>
			</form>
		</B.ModalDialog>)
	}
}

export default EditForm;
