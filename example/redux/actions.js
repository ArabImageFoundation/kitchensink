import {
	makeActionReducers
} from './reduxUtils';
import {
	upsert
,	getAll
,	getItem
,	clear
,	mergeDoc
,	remove
,	find
,	findPerson
,	setup
} from './db';
import {
	resolve
,	reject
,	updateItems
,	removeItems
,	mergeItem
,	setItem
,	assign
} from './utils';
import {
	STATUS_UNKNOWN
,	STATUS_DONE
,	STATUS_ERROR
,	STATUS_PROCESSING
,	MODE_VIEW
,	MODE_EDIT
,	MODE_CREATE
} from './consts'

const [actionsCreators,reducer] = makeActionReducers({
	setupDatabase:{
		async(){
			return setup().then(items=>({items}));
		}
	,	reducer(state,meta,{items}){
			return updateItems(assign(state,{ready:true}),items.map(item=>assign(item,{status:STATUS_DONE})));
		}
	}
,	clear:{
		meta:{}
	,	async(meta){
			return clear()
		}
	,	reducer(state,meta){
			const byId = new Map();
			const byType = new Map();
			const items = assign(state.items,{byId,byType});
			return assign(state,{items});
			return state;
		}
	}
,	getItem:{
		meta:{
			id:''
		,	withChildren:true
		}
	,	async({id,withChildren},{getState}){
			const state = getState();
			const item = state.items.byId.get(id);
			if(!item || item.status==STATUS_UNKNOWN){
				return getItem(id,withChildren).then(items=>({items}))
			}
			if(item && item.doc.children && item.doc.children.length){
				const keys = item.children.doc.filter(id=>!state.items.byId.get(id));
				if(keys.length){
					return getAll({keys}).then(items=>({items}));
				}
			}
			return resolve({items:[item]});
		}
	,	reducer(state,{id},{items}){
			return updateItems(state,items.map(item=>assign(item,{status:STATUS_DONE})));
		}
	}
,	findPeople:{
		meta:{
			type:null
		,	text:''
		}
	,	async({type,text}){
			if(!text){return resolve([]);}
			text = type?`${type}_${text}`:text;
			return find(text);
		}
	,	reducer(state,{type,text},payload){
			console.log(payload);
			return state;
		}
	}
,	find:{
		meta:{
			type:null
		,	text:''
		}
	,	async({type,text}){
			if(!text || !(type in find)){return resolve([]);}
			return find[type](text);
		}
	,	reducer(state,{type,text},payload){
			console.log(payload);
			return state;
		}
	}
,	remove:{
		meta:{
			items:null
		}
	,	async({items}){
			if(!items || !items.length){return reject('no items were passed')}
			return remove(items).then(results=>{
				const successful = []
				const failed = [];
				const itemsResult = items.slice();
				results.forEach((res,i)=>{
					if(res.ok){
						itemsResult[i] = assign(itemsResult[i],{status:STATUS_DONE});
						successful.push(itemsResult[i]);
					}
					else{
						itemsResult[i] = assign(itemsResult[i],{status:STATUS_ERROR});
						failed.push(itemsResult[i]);
					}
				})
				return {items:itemsResult,successful,failed};``
			})
		}
	,	reducer(state,meta,{items,successful}){
			return removeItems(state,successful)
		}
	}
,	getAll:{
		meta:{}
	,	async(meta){
			return getAll().then(result=>({items:result}))
		}
	,	reducer(state,meta,{items}){
			return updateItems(state,items.map(item=>assign(item,{status:STATUS_DONE})));
		}
	}
,	invalidateItem:{
		meta:{
			id:''
		}
	,	reducer({id}){
			return setItem(state,id,{status:STATUS_UNKNOWN});
		}
	}
,	save:{
		meta:{items:[]}
	,	async({items}){
			if(!items.length){return reject('no items provided');}
			return upsert(items).then(results=>({items:results}))
		}
	,	reducer:{
			start(state,{items}){
				items = items.map(item=>assign(item,{status:STATUS_PROCESSING}));
				return updateItems(state,items);
			}
		,	success(state,meta,{items}){
				items = items.map(item=>assign(item,{status:STATUS_DONE}));
				return updateItems(state,items);
			}
		}
	}
,	showItemsOfType:{
		meta:{
			type:'all'
		}
	,	reducer(state,{type}){
			const view = state.view;
			if(view.type==type || !/person|all/.test(type)){return state;}
			return assign(state,{view:assign(view,{type})})
		}
	}
,	filter:{
		meta:{filter:''}
	,	reducer(state,{filter}){
			const view = state.view;
			if(view.filter == filter){return state;}
			return assign(state,{view:assign(view,{filter})});
		}
	}
,	keyPress:{
		meta:{key:null}
	,	async({key},{dispatch,getState}){
			if(!key){return reject('no key provided');}
			const state = getState();
			const mode = state.mode;
			if(key == 'cancel' && (mode.edit || mode.create)){
				dispatch(actionsCreators.setViewMode());
			}
			return resolve();
		}
	}
,	setCreateMode:{
		meta:{
			type:null
		}
	,	reducer(state,{type}){
			const mode = state.mode;
			if(mode.create==true){return state};
			const create = true;
			const view = false;
			const edit = false;
			return assign(state,{mode:{create,view,edit,type}});
		}
	}
,	setEditMode:{
		meta:{
			id:''
		,	type:null
		}
	,	reducer(state,{id,type}){
			const mode = state.mode;
			if(mode.edit==true){return state};
			const create = false;
			const view = false;
			const edit = true;
			return assign(state,{mode:{create,view,edit,id,type}});
		}
	}
,	setViewMode:{
		meta:{}
	,	reducer(state){
			const mode = state.mode;
			if(mode.view==true){return state};
			const create = false;
			const view = true;
			const edit = false;
			return assign(state,{mode:{create,view,edit}});
		}
	}
})

Object.defineProperty(actionsCreators,'reducer',{value:reducer,enumerable:false});
export default actionsCreators;
