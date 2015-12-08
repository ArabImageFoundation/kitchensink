import React from 'react';
import cx from 'classnames';

export default function Checkbox(props){

	const className = cx(
		'checkbox'
	,	{disabled:props && props.disabled}
	,	props && props.className
	);

	const id = props.id || '';
	const label = props.label

	return (<div className={className}>
		<label htmlFor={id}>
			<input type='checkbox' {...props}/>
			{label}
		</label>
	</div>)
}
