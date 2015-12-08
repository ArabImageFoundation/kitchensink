import React from 'react';
import cx from 'classnames';

export default function NavBarHeader(props){

	const className = cx(
		'navbar-header'
	,	props && props.className
	);

	props = Object.assign({},props,{className});

	return (<div {...props}/>)
}
