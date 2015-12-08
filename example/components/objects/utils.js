import t from 'tcomb-form'
import {Models} from './index.js';

export function getRealMeta(field){
	return (field.meta.kind == 'maybe' || field.meta.kind == 'condition') ? field.meta.type.meta : field.meta;
}

function mergeMaps(map1,map2,ids){
	if(!map2.length){return;}
	map2.forEach(obj=>{
		obj.index = map1.push(obj) -1;
		ids.push(obj.id);
	})
}

function pushToMap(type,map,doc,parent,children){
	const index = map.length;
	const obj = {
		index
	,	type
	,	parent
	,	children
	,	doc
	}
	map.push(obj);
	return obj;
}

export function extractModels(value,meta,parent,map){
	const doc = {};
	const type = meta.name;
	map = map || [];
	const children = []
	const obj = pushToMap(type,map,doc,parent,children);
	const {id} = obj;
	const fields = meta.props;
	for(var fieldName in fields){
		if(t.Nil.is(value[fieldName])){continue;}
		var field = fields[fieldName]
		var meta = getRealMeta(field);
		console.log(field,meta);
		var kind = meta.kind;
		if(kind === 'model' || kind === 'hasOne'){
			const childMap = extractModels(value[fieldName],meta.type.meta,id);
			mergeMaps(map,childMap,children);
			continue;
		}
		if(kind === 'hasMany'){
			const childMap = [];
			value[fieldName].map(value=>extractModels(value,meta.type.meta,id,childMap))
			mergeMaps(map,childMap,children);
			continue;
		}
		doc[fieldName] = value[fieldName];
	}
	if(Models[type]){
		obj.doc = Models[type].model.cast(doc);
	}
	return map;
}
