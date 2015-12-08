import React from 'react';
import cx from 'classnames';

export default function Addon(props){

	const className = cx(
		'form-control-static'
	,	props && props.className
	);

	props = Object.assign({},props,{className});

	return (<p {...props}/>)
}
