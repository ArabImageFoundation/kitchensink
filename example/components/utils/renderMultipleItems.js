import React from 'react';
import {mapMap} from '../../redux/utils';
import renderItem from './renderItem';

export default function renderMultipleItems(items,type,filter){
	const currentFilter = filter ? new RegExp(filter,'i') : null;
	items = (type=='all' || !type) ? items.byId : items.byType.get(type);
	return mapMap(items,(item,key)=>renderItem(
		{
			item
		,	onSave:this.save
		,	onRemove:this.removeItem
		,	onEdit:this.setEditMode
		}
	,	key
	,	currentFilter
	))
}
