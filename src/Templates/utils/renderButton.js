import React from 'react';
import B from '../../bootstrap';
import cx from 'classnames'

export default function renderRowButton(button) {
	const {type} = button;
	const icon = (type == 'move-up') ? 'chevron-up' :
		(type == 'move-down') ? 'chevron-down' :
		(type == 'remove') ? 'remove' :
		(type == 'add') ? 'plus' :
		(type == 'find') ? 'search' :
		''
	const props = {
		onClick: button.click
	,	key: button.type
	,	className: cx(
			`btn-${type}`
		,	(type == 'add' || type == 'find') && 'btn-primary'
		)
	//,	label:button.label
	,	icon
	}
	return (<B.Button {...props}/>)
}
