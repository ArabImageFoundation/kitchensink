import t from 'tcomb-form';
import Model from './Model'
import React from 'react'
import isEmpty from '../utils/isEmpty'
import {
	noobj
} from '../utils/tcomb';
import {
	merge
,	getTypeInfo
,	humanize
} from 'tcomb-form/lib/util'

const SOURCE = 'tcomb-models'



class HasOne extends Model{

	constructor(props,context){
		super(props,context);
		const isMaybe = ('mandatory' in props.type.meta && !props.type.meta.mandatory);
		this.typeInfo.innerType = this.typeInfo.innerType.meta.type;
		this.typeInfo.isMaybe = isMaybe;
		this.state.hasItem = !isEmpty(this.state.value) || !isMaybe;
		this.state.findDialog = false
	}

	shouldComponentUpdate(nextProps, nextState) {
		return (
			super.shouldComponentUpdate(nextProps,nextState) ||
			nextState.hasItem != this.state.hasItem ||
			nextState.findDialog != this.state.findDialog
		);
	}

	getTemplate() {
		return this.props.options.template || this.getTemplates().hasOne
	}

	addItem(){
		this.setState({hasItem:true});
	}

	loadItem(){

	}

	toggleFindDialog(){
		this.setState({findDialog:!this.state.findDialog})
	}

	removeItem(){
		if(this.typeInfo.isMaybe){
			this.setState({hasItem:false});
		}
	}

	getLocals() {
		const options = this.props.options
		const locals = super.getLocals();
		const i18n = this.getI18n()
		const isMaybe = this.typeInfo.isMaybe;
		locals.hasItem = this.state.hasItem;
		if(isMaybe){
			locals.add = options.disableAdd ? null : {
				type: 'add'
			,	label: i18n.add
			,	click: this.addItem.bind(this)
			}
			locals.remove = options.disableRemove ? null :{
				type:'remove'
			,	label:i18n.remove
			,	click:this.removeItem.bind(this)
			}
		}
		locals.find = (options.disableFind || !options.find) ? null : {
			type:'find'
		,	label:i18n.find
		,	click:this.toggleFindDialog.bind(this)
		}
		locals.findComponent = options.find;
		locals.findDialogIsOpen = this.state.findDialog
		locals.hasButtons = locals.find || locals.remove || locals.add;
		return locals
	}

}

export default HasOne;
