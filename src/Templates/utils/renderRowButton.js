import React from 'react';
import B from '../../bootstrap';
import cx from 'classnames'

export default function renderRowButton(renderer,buttonName,locals){
	const button = locals[buttonName]
	return (<B.Row key={button.type}>
		<B.Column breakpoints={{lg:12}}>
			<div style={{marginBottom:15}}>
				{renderer.renderButton(button)}
			</div>
		</B.Column>
	</B.Row>)
}
