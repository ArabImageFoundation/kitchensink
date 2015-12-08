import React from 'react';
import cx from 'classnames';

export default function Alert(props){

	const type = props.type || 'info';

	const className = cx(
		'alert'
	,	`alert-${type}`
	,	props && props.className
	);

	props = Object.assign({},props,{className});

	return (<div {...props}/>)
}
