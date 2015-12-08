import React from 'react';
import cx from 'classnames';

export default function NavBarForm(props){

	const className = cx(
		'navbar-form'
	,	{
			'navbar-right':props && props.right
		}
	)

	const form = props && props.form;

	props = Object.assign({},props,{className})

	return (<form {...props}>
		{form}
		{props.children}
	</form>);

}
