import React from 'react';
import B from '../../bootstrap';
import cx from 'classnames'

export default function renderError(locals) {
	return (<B.Alert key='error' type="danger">{locals.error}</B.Alert>)
}
