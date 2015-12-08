import React from 'react';
import cx from 'classnames';

export default function Button(props){

	const type = props.type || 'default';

	const className = cx(
		'btn'
	,	`btn-${type}`
	,	{
			'btn-block': props && props.block
		,	'active': props && props.active
		}
	,	props && props.size && `btn-${opts.size}`
	,	props && props.className
	);

	props = Object.assign({},props,{className});

	const icon = props.icon ? <span className={`glyphicon glyphicon-${props.icon}`} aria-hidden="true"/> : false

	return (<button type="button" {...props}>{icon}{props.label}{props.children}</button>)
}
