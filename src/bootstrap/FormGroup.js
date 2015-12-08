import React from 'react';
import cx from 'classnames';

export default function FormGroup(props){

	const className = cx(
		'form-group'
	,	{'has-error':props.hasError}
	,	props && props.className
	);

	props = Object.assign({},props,{className});

	return (<div {...props}>
		{props.forms}
		{props.children}
	</div>)
}
