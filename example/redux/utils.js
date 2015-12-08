export function reject(val){
	return new Promise(function(resolve,reject){return reject(new Error(val))});
}

export function resolve(val){
	return new Promise(function(resolve,reject){return resolve(val)});
}

export function updateItems(state,results){
	const byId = new Map([...state.items.byId]);
	const byType = new Map([...state.items.byType]);
	results.forEach(item=>{
		const {_id:id,type} = item.doc
		if(!byType.has(type)){byType.set(type,new Map());}
		byType.get(type).set(id,item);
		byId.set(id,item);
	})
	const items = assign(state.items,{byId,byType});
	return assign(state,{items});
}

export function removeItems(state,results){
	const byId = new Map([...state.items.byId]);
	const byType = new Map([...state.items.byType]);
	results.forEach(item=>{
		const {_id:id,type} = item.doc;
		if(!byType.has(type)){return;}
		byType.get(type).delete(id);
		byId.delete(id);
	})
	const items = assign(state.items,{byId,byType});
	return assign(state,{items});
}

export function mergeItem(item,props){
	if(!props){return item;}
	var changed = false;
	const newItem = {};
	newItem.doc = (props.doc && mergeDoc(item.doc,props.doc)) || item.doc;
	Object.keys(props).forEach(key=>{
		const val = props[key];
		if(typeof val !== 'undefined' && val !== null && val!==item[key] && key!=='doc'){
			changed = true;
			newItem[key] = val;
		}
	})
	changed = changed || newItem.doc!==item.doc;
	return changed?newItem:item;
}

export function assign(...props){
	return Object.assign({},...props);
}

export function setItem(state,id,props){
	const item = mergeItem(state.items.byId.get(id),props);
	if(!item){return state;}
	const {type} = item.doc;
	const byId = new Map([...state.items.byId]);
	const byType = new Map([...state.items.byType]);
	if(!byType.has(type)){byType.set(type,new Map());}
	byId.set(id,item);
	byType.get(type).set(id,item);
	const items = assign(state.items,{byId,byType});
	return assign(state,{items});
}

export function mapMap(map,fn){
	if(!map){return;}
	var arr = [];
	map.forEach((value,key)=>{
		arr.push(fn(value,key));
	})
	return arr;
}

export function mapObject(obj,fn){
	if(!obj){return};
	var arr = [];
	Object.keys(obj).forEach(key=>{
		arr.push(fn(obj[key],key));
	})
	return arr;
}
