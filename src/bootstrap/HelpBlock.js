import React from 'react';
import cx from 'classnames';

export default function HelpBlock(props){

	const className = cx(
		'help-block'
	,	{'error-block':props.hasError}
	,	props && props.className
	);

	props = Object.assign({},props,{className,'data-role':'tooltip'});

	return (<span {...props}/>)
}
