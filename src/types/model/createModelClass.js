import {RELATIONS_KEY} from './methods/constructor';

export default function createModelClass(name,Model){
	const body = `Model.call(this,value,path,${name})`;
	const args = 'value,path';
	const func = `function ${name}(${args}){${body}}`;
	const NewModel = (new Function('Model',`return ${func}`))(Model);
	NewModel.prototype = Object.create(Model.prototype);
	NewModel.prototype.constructor = NewModel;
	NewModel.RELATIONS_KEY = RELATIONS_KEY;
	return NewModel;
}
