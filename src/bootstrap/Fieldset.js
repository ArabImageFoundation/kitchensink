import React from 'react';
import cx from 'classnames';

export default function Fieldset(props){

	const legend = (props.legend) ? (<legend>{props.legend}</legend>) : null;

	props = Object.assign({},props);

	return (<fieldset {...props}>
		{legend}
		{props.children}
	</fieldset>)
}
