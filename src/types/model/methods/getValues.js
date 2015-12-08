import {RELATIONS_KEY} from './constructor';

export default function getValues(parentIndex,items){
	items = items || [];
	parentIndex = parentIndex || 0;
	const thisIndex = items.length;
	const children = [];
	const main = this.toItem(thisIndex,parentIndex,children);
	items.push(main);
	this[RELATIONS_KEY].forEach((doc,i)=>{
		if(t.Array.is(doc)){
			doc.forEach((doc,ii)=>{
				children.push(items.length);
				doc.getValues(thisIndex,items);
			});
		}else{
			children.push(items.length);
			doc.getValues(thisIndex,items);
		}
	});
	return items;
}
