import React from 'react';
import cx from 'classnames';

export default function Addon(props){

	const className = cx(
		'input-group-addon'
	,	props && props.className
	);

	props = Object.assign({},props,{className});

	return (<span {...props}/>)
}
