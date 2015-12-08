import React from 'react';
import {Models} from '../objects';

export default function renderItem(props,key,filter){
	const type = props.type || (props.item && props.item.doc && props.item.doc.type)
	const Component = type && Models[type];
	if(!Component){return;};
	const modelProps = {
		value:props.item.doc
	,	mode:'summary'
	}
	const wrapperProps = {
		key
	}
	return (<div key={key}>
		<Component {...modelProps}/>
		<button onClick={()=>props.onEdit(props.item.doc._id)}>edit</button>
		<button onClick={()=>props.onRemove(props.item)}>x</button>
	</div>);
}
