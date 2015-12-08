import React from 'react';
import cx from 'classnames';

export default function ButtonGroup(props){

	const className = cx(
		(props.vertical && 'btn-group-vertical') || 'btn-group'
	,	props && props.className
	);

	props = Object.assign({},props,{className});

	return (<div {...props}>
		{props.buttons}
		{props.children}
	</div>)
}
