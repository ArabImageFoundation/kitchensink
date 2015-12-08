import React from 'react';
import B from '../../bootstrap';
import cx from 'classnames'

export default function renderHelp(locals) {
	return (<B.Alert key='help'>{locals.help}</B.Alert>)
}
