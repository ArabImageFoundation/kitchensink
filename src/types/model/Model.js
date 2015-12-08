import t from 'tcomb-form'
import transform from '../../utils/transform'
import merge from '../../utils/merge'
import assign from '../../utils/assign'
import getModelOptions from '../../utils/getModelOptions'
import createModelClass from './createModelClass'
import isModel from './static/isModel'
import BaseClass from './BaseClass';

import {
	defaults as BaseClassDefaults
,	unexposed as BaseClassUnexposed
,	options as BaseClassOptions
} from './BaseClassDefaults';

export default function model(monicker,struct,opts){

	monicker = monicker.split('|');
	const [name] = monicker;
	const plural = monicker[1] || name;

	struct = assign(struct,{
		_id:t.maybe(t.String)
	,	modified:t.String
	})

	const unexposed = (opts && opts.unexposed) || BaseClassUnexposed;

	const NewModel = Object.assign(
		createModelClass(name,BaseClass)
	,	BaseClass
	,	{
			displayName:name
		,	type: name.toLowerCase()
		,	plural
		,	defaults: assign(BaseClassDefaults, opts &&  opts.cast)
		,	identifier: (opts && opts.identifier || BaseClass.identifier)
		,	meta: {
				kind:'struct'
			,	name
			,	plural
			,	props:struct
			,	relations:transform(
					struct
				,	field=>field.meta.relations
				,	{
						onEmpty(){return true;}
					}
				)
			,	identity:false
			}
		,	options: {
				fields: merge(
					transform(
						struct
					,	(field,name)=>(
							(unexposed && unexposed.indexOf(name) >=0) && {type:'hidden'} ||
							isModel(field) && getModelOptions(field)
						)
					)
				,	BaseClassOptions.fields
				,	opts && opts.fields
				)
			,	order:opts && opts.order
			,	legend:opts && opts.legend
			,	error:opts && opts.error
			,	disabled:opts && opts.disabled
			,	template:(opts && opts.template) || BaseClassOptions.template
			,	factory:(opts && opts.factory) || BaseClassOptions.factory
			,	unexposed
			}
		}
	);
	if(opts && opts.methods){
		Object.assign(NewModel.prototype,opts.methods);
	}
	return NewModel;
}
