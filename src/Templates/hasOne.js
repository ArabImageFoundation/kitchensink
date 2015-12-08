import React from 'react';
import B from '../bootstrap';
import cx from 'classnames';

import renderButton from './utils/renderButton'
import renderFieldset from './utils/renderFieldset'
import renderError from './utils/renderError'
import renderHelp from './utils/renderHelp'
import renderRowButton from './utils/renderRowButton'

function create(overrides = {}) {

	function hasOne(locals){
		return locals.findDialogIsOpen ?
			hasOne.renderFieldset(
				[
					hasOne.renderFindDialog(locals)
				]
			,	locals
			)
			: locals.hasItem ?
				(
					hasOne.renderFieldset(
						[
						(locals.help && hasOne.renderHelp(locals))
					,	(locals.error && locals.hasError && hasOne.renderError(locals))
					,	...locals.order.map(name => locals.inputs[name])
					,	locals.hasButtons && hasOne.renderButtons(locals)
					]
					,	locals
					)
				):(
					hasOne.renderFieldset(
						[
							locals.hasButtons && hasOne.renderButtons(locals)
						]
					,	locals
					)
				)
	}


	hasOne.renderFindDialog = overrides.renderFindDialog || function renderFindDialog(locals){
		const Find = locals.findComponent;
		return <Find locals={locals} key='find'/>
	}

	hasOne.renderButtons = overrides.renderButtons || function renderButtons(locals){
		return (<B.Row key='buttons'>
			<B.Column breakpoints={{lg:12}}>
				<div style={{marginBottom:15}}>
					{
						locals.hasItem ?
							[
								(locals.remove && hasOne.renderRemoveButton(locals.remove))
							,	(locals.find && hasOne.renderFindButton(locals.find))
							] :
							[
								(locals.add && hasOne.renderAddButton(locals.add))
							,	(locals.find && hasOne.renderFindButton(locals.find))
							]
					}
				</div>
			</B.Column>
		</B.Row>)
	}

	hasOne.renderFindButton = overrides.renderFindButton || renderButton
	hasOne.renderAddButton = overrides.renderAddButton || renderButton
	hasOne.renderRemoveButton = overrides.renderRemoveButton || renderButton
	hasOne.renderHelp = overrides.renderHelp || renderHelp
	hasOne.renderError = overrides.renderError || renderError
	hasOne.renderButton = overrides.renderButton || renderButton
	hasOne.renderFieldset = overrides.renderFieldset || renderFieldset

	return hasOne;
}

export default create();
