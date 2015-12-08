import React from 'react';
import cx from 'classnames';

export default function Container(props){
	const className = cx(
		'container'
	,	{fluid:props && props.fluid}
	,	props && props.className
	)
	props = Object.assign({},props,{className})

	return (<div {...props}/>)
}
