import React from 'react';
import cx from 'classnames';

export default function Radio(props){

	const className = cx(
		'radio'
	,	{disabled:props && props.disabled}
	,	props && props.className
	);

	const id = props.id || '';
	const label = props.label

	return (<div className={className}>
		<label htmlFor={id}>
			<input type='radio' {...props}/>
			{label}
		</label>
	</div>)
}
