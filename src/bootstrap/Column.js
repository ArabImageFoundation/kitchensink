import React from 'react';
import getBreakpoints from './getBreakPoints';
import cx from 'classnames';

export default function Column(props){

	const className = cx(
		props.breakpoints && getBreakpoints(props.breakpoints)
	,	{
			'sidebar':props && props.sidebar
		}
	,	props && props.className
	)
	props = Object.assign({},props,{className})

	return (<div {...props}/>)
}
