
import PouchDB from 'pouchdb';
var db = new PouchDB('items');

function assign(...props){
	return Object.assign({},...props);
}

function itemFromDocument(doc){
	return {
		id:doc._id
	,	rev:doc._rev && doc._rev.split('-')[0]
	,	doc
	}
}

function assignResultsToItems(results){
	return results.rows.map(
		({doc})=>itemFromDocument(doc)
	)
}

export function setup(){
	return getAll();
}

export function mergeDoc(oldDoc,newDoc){
	var changed = false;
	const retDoc = assign(oldDoc);
	Object.keys(newDoc).forEach(key=>{
		const val = newDoc[key];
		if((key == 'children' || key == 'parents') && oldDoc[key]){
			const toAssign = newDoc[key].filter(id=>oldDoc[key].indexOf(id)<0);
			if(!toAssign.length){return;}
			changed = true;
			retDoc[key] = [...oldDoc[key],...toAssign];
			return
		}
		if(typeof val !== 'undefined' && val !== null && val!==retDoc[key]){
			changed = true;
			retDoc[key] = val;
		}
	})
	return changed ? retDoc : oldDoc;
}

export function clear(){
	return db.destroy().then(()=>db=new PouchDB('items'));
}

export function getAll(opts){
	const options = assign({
		include_docs:true
	,	attachments:true
	},opts);
	return db.allDocs(options)
		.then(assignResultsToItems)
	;
}

export function getAllOfType(type,include_docs){
	return db.query(
		(doc,emit)=>emit(doc.type)
	,	{
			startkey:type
		,	endkey:`${type}\uffff`
		,	include_docs
		}
	).then(assignResultsToItems)
}

export function find(type,prop,value,include_docs=true){
	return db.query(
		(doc,emit)=>doc.type == type && emit(doc[prop])
	,	{
			startkey:value
		,	endkey:`${value}\uffff`
		,	include_docs
		}
	).then(assignResultsToItems)
}

find.person = (name)=>find('person','name',name);

export function getItem(id,fetchChildren){
	return db.get(id,{attachments:true})
		.then(doc=>{
			const item = itemFromDocument(doc);

			const children = doc.children;

			if(!fetchChildren || !children || !children.length){return [item]}

			return db.allDocs({
				keys:doc.children
			,	include_docs:true
			}).then(results=>[item,...
				results.rows.map(({doc})=>itemFromDocument(doc))
			])
		})
}

export function remove(items){
	if(!Array.isArray(items)){item = [items];}
	const docs = items.map(item=>assign(item.doc,{_deleted:true}));
	return db.bulkDocs(docs)
}

export function upsert(items){

	const keys = [];

	items = items.map(item=>{
		const {type,doc,children:origChildren} = item
		const children = (origChildren && origChildren.length) ? origChildren.slice() : null;
		return assign(item,{doc,children});
	})
	items = items.map(item=>{
		// assigning parents and children
		const {children,parent,doc} = item;
		const {_id:id} = doc;
		if(children && children.length){
			doc.children = children.map(index=>{
				const {doc:{_id}} = items[index];
				return _id;
			})
		}
		if(typeof parent!=='undefined' && parent !== null){
			const {doc:{_id}} = items[parent];
			doc.parents = [_id]
		}
		keys.push(id);
		return item;
	})
	;

	return db.allDocs({
		keys
	,	include_docs:true
	}).then(results=>db.bulkDocs(results.rows.map((row,i)=>{
		const {error,key,value} = row;
		const item = items[i];
		const doc = item.doc;
		if(row.error){ //document did not exist
			return doc;
		}
		const mergedDoc = mergeDoc(doc,row.doc);
		if(mergedDoc==doc){return false;}
		const newRevDoc = assign({_rev:value.rev},doc);
		return newRevDoc;
	}))).then(result=>result.map(({id,ok,rev},i)=>{
		const item = items[i];
		const doc = item.doc;
		return ({
			id
		,	rev:rev.split('-')[0]
		,	type:doc.type
		,	doc:assign(items[i].doc,{_rev:rev})
		})
	}))
}
