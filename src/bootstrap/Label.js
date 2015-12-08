import React from 'react';
import cx from 'classnames';

export default function Label(props){

	const className = cx(
		'control-label'
	,	props && props.className
	,	props && props.align && `text-${props.align}`
	);

	props = Object.assign({},props,{className});

	return (<label {...props}/>)
}
