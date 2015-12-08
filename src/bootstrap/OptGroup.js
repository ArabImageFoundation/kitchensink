import React from 'react';
import cx from 'classnames';
import Option from './Option';

export default function OptGroup(props){

	props = Object.assign({},props);

	return (<optgroup {...props}>
		{props.options && props.options.map(option=>(<Option {...option}/>))}
		{props.children}
	</optgroup>)
}
