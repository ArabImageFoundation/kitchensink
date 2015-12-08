import React from 'react';
import cx from 'classnames';

export default function NavBarLinks(props){

	const className = cx(
		'nav'
	,	'navbar-nav'
	,	{
			'navbar-right':props && props.right
		}
	)

	const links = props && props.links;
	const items = props && props.items;
	props = Object.assign({},props,{className})

	return (<ul {...props}>
		{links && Object.keys(links).map(key=><li key={key}><a href={links[key]}>{key}</a></li>)}
		{items && items.map((value,key)=><li key={key}>{typeof value == 'string' ?<p className='navbar-text'>{value}</p> : value}</li>)}
		{props && props.children}
	</ul>);
}
