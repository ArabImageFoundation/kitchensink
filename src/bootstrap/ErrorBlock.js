import React from 'react';
import cx from 'classnames';

export default function ErrorBlock(props){

	const className = cx(
		'help-block'
	,	{'error-block':props.hasError}
	,	props && props.className
	);

	props = Object.assign({},props,{className});

	return (<span {...props}>
		{props.error}
		{props.children}
	</span>)
}
