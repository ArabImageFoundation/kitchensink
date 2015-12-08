import React from 'react';
import B from '../bootstrap';
import cx from 'classnames';

const FontIcon = require('material-ui/lib/font-icon');
const Card = require('material-ui/lib/card/card');
const CardActions = require('material-ui/lib/card/card-actions');
const CardExpandable = require('material-ui/lib/card/card-expandable');
const CardHeader = require('material-ui/lib/card/card-header');
const CardMedia = require('material-ui/lib/card/card-media');
const CardText = require('material-ui/lib/card/card-text');
const CardTitle = require('material-ui/lib/card/card-title');
import renderFieldset from './utils/renderFieldset'
import renderError from './utils/renderError'
import renderHelp from './utils/renderHelp'
const Avatar = require('material-ui/lib/avatar');

function create(overrides = {}) {

	function model(locals){
		const len = locals.path.length;
		const children = [
			(locals.help) && model.renderHelp(locals)
		,	(locals.error && locals.hasError) && model.renderError(locals)
		,	locals.order.map(name => locals.inputs[name])
		]
		if(len==0){
			return (<Card>
				<CardHeader
					title={locals.label}
					avatar={<Avatar icon={<FontIcon className="material-icons">home</FontIcon>}/>}
				/>
				{children}
			</Card>)
		}else{
			return (<div>{children}</div>)
		}
	}

	model.renderHelp = overrides.renderHelp || renderHelp
	model.renderError = overrides.renderError || renderError
	model.renderFieldset = overrides.renderFieldset || renderFieldset

	return model;
}

export default create();
