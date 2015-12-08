import React from 'react';
import cx from 'classnames';

export default function ContainerFluid(props){
	const className = cx(
		'container-fluid'
	,	props && props.className
	)
	props = Object.assign({},props,{className})

	return (<div {...props}/>)}
