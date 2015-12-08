import React from 'react';
import B from '../../bootstrap';
import cx from 'classnames'

export default function renderFieldset(children, locals) {

	const len = locals.path.length;

	const props = {
		className:cx(
			'fieldset'
		,	`fieldset-depth-${len}`
		,	(len > 0) && `fieldset-${locals.path.join('-')}`
		,	(locals.className) && className[locals.className]
		)
	,	disabled: locals.disabled
	//,	legend: locals.label
	};

	return (<B.Fieldset {...props}>{children}</B.Fieldset>)
}
