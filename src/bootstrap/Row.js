import React from 'react';
import cx from 'classnames';

export default function Row(props){

	const className = cx(
		'row'
	,	props && props.className
	)
	props = Object.assign({},props,{className})

	return (<div {...props}/>)
}
