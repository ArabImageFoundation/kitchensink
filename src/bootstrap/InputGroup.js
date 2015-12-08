import React from 'react';
import cx from 'classnames';

export default function InputGroup(props){

	const className = cx(
		'input-group'
	,	props && props.className
	);

	props = Object.assign({},props,{className});

	return (<div {...props}>
		{props.inputs}
		{props.children}
	</div>)
}
