import React from 'react';
import cx from 'classnames';

export default function NavBar(props){


	const className = cx(
		{
			'navbar': !props || props.nav
		,	'navbar-default': !props || props.default
		,	'navbar-inverse': props && props.inverse
		,	'navbar-collapse collapse': props && props.collapse
		,	'navbar-fixed-top': props && props.top && !props.static
		,	'navbar-fixed-bottom': props && props.bottom && !props.static
		,	'navbar-static-top': props && props.top && props.static
		,	'navbar-static-bottom': props && props.bottom && props.static
		}
	,	props && props.className
	);

	props = Object.assign({},props,{className});
	return (props.nav && (<nav {...props}/>)) || (<div {...props}/>)
}
