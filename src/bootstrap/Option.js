import React from 'react';
import cx from 'classnames';

export default function Option(props){

	props = Object.assign({},props);

	return (<option {...props}>{props.text}</option>)
}
