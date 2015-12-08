import constructor from './methods/constructor'
import getValues from './methods/getValues'
import identifier from './static/identifier'
import toItem from './methods/toItem'
import instanceCast from './methods/cast'
import cast from './static/cast'
import extend from './static/extend'
import isModel from './static/isModel'
import update from './static/update'
import ModelFactory from '../../Factories/Model';

function Model(value,path,M){
	M = M || Model;
	return constructor(value,path,M,this);
}

Object.assign(Model, {
	is:isModel
,	cast
,	update
,	extend
,	identifier
,	getTcombFormFactory(opts){
	return ModelFactory
	}
});

Object.assign(Model.prototype, {
	cast:instanceCast
,	getValues
,	toItem
})

export default Model;
