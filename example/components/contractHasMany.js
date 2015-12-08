import React from 'react';
import B from '../bootstrap';
import cx from 'classnames'
const Avatar = require('material-ui/lib/avatar');
import renderButton from './utils/renderButton'
import renderFieldset from './utils/renderFieldset'
import renderError from './utils/renderError'
import renderHelp from './utils/renderHelp'
import renderRowButton from './utils/renderRowButton'
import LeftNav from 'material-ui/lib/left-nav'
const FlatButton = require('material-ui/lib/flat-button');
const Dialog = require('material-ui/lib/dialog');
const List = require('material-ui/lib/lists/list');
const ListDivider = require('material-ui/lib/lists/list-divider');
const ListItem = require('material-ui/lib/lists/list-item');
const RaisedButton = require('material-ui/lib/raised-button');
const FontIcon = require('material-ui/lib/font-icon');
const FloatingActionButton = require('material-ui/lib/floating-action-button');
const Paper = require('material-ui/lib/paper');

class Overlay extends React.Component{
	render(){
		const style={
			width:'100%'
		,	height:'100%'
		,	background:'rgba(0,0,0,.5)'
		}
		const props = {
			style
		,	onClick(){this.props.onDismiss}
		}
		return (<div {...props}>
			{this.props.children}
		</div>)
	}
}

class Bar extends React.Component{
	render(){
		const style={
			background:'white'
		}
		const props = {
			style
		}
		return (<Overlay>
			<div {...props}>
				{this.props.children}
			</div>
		</Overlay>)
	}
}

import ReactDOM from 'react-dom'

var Portal = React.createClass({
	render: () => null,
	portalElement: null,
	componentDidMount() {
		var p = this.props.portalId && document.getElementById(this.props.portalId);
		if (!p) {
			var p = document.createElement('div');
			p.id = this.props.portalId;
			document.body.appendChild(p);
		}
		this.portalElement = p;
		this.componentDidUpdate();
	},
	componentWillUnmount() {
		document.body.removeChild(this.portalElement);
	},
	componentDidUpdate() {
		ReactDOM.render(<div {...this.props}>{this.props.children}</div>, this.portalElement);
	}
});

function breadcrumbs(path,tail){
	return path
		.filter(item=>(typeof item == 'string'))
		.concat(tail)
		.join(' | ')
}

function create(overrides = {}) {

	var HasMany = React.createClass({
		getInitialState(){
			return {item:-1}
		}
	, 	currentItem(){
			const open = this.state.item>-1;
			const locals = this.props.locals;
			const item = open && locals.items[this.state.item];
			let standardActions = [
				{ text: 'Ok'}
			];
			return (<Portal>
				<Dialog
					ref='dialog'
					open={this.state.item>-1}
					title={item && item.type||''}
					actions={standardActions}
					actionFocus="submit"
					onRequestClose={()=>this.setState({item:-1})}
					autoScrollBodyContent={true}
					>
					{
						open && item && item.input
					}
				</Dialog>
			</Portal>)
		}
	,	render(){
			const {locals} = this.props
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

			return (<Paper>
				{this.currentItem()}
				{(locals.help) && renderHelp(locals)}
				{(locals.error && locals.hasError) && renderError(locals)}

				<List subheader={locals.label}>
					{locals.items.map((item,i) => {
							const onClick = ()=>{this.setState({item:i})}
							return item.buttons.length === 0 ?
								renderRowWithoutButtons(item,onClick, locals) :
								renderRow(item,onClick, locals)
					})}
				</List>
				{(locals.add) && (<RaisedButton onClick={locals.add.click} primary={true}>
					<FontIcon className="material-icons">add</FontIcon>
				</RaisedButton>)}
			</Paper>)
		}
	})

	function renderRowButton(button){
		return (<B.Row key={button.type}>
			<B.Column breakpoints={{lg:12}}>
				<div style={{marginBottom:15}}>
					{renderButton(button)}
				</div>
			</B.Column>
		</B.Row>)
	}
	function renderRowWithoutButtons(item,i /* , locals*/) {
		return (<B.Row key={item.key} className='item'>
			<B.Column breakpoints={{xs:12}}>{item.input}</B.Column>
		</B.Row>)
	}

	function renderRow(row,onClick, locals) {
		const rightIconButton=row.buttons[0] && (<FloatingActionButton onClick={row.buttons[0].click} mini={true} secondary={true}>
			<FontIcon className="material-icons">close</FontIcon>
		</FloatingActionButton>)
		const secondaryText = (<p>
			{row.type}
		</p>)
		const image = (row.identifier instanceof File) ? (<Avatar src={row.identifier}/>) : null;
		const identifier = (<p onClick={onClick}>{(image) ? row.identifier.name : row.identifier || '(empty)'}</p>)
		return (<ListItem
			key={row.key}
			leftAvatar={image}
			primaryText={identifier}
			secondaryText={secondaryText}
			rightIconButton={rightIconButton}
		/>)
		return (<B.Row key={row.key} className='item'>
			{row.identifier || row.type + '(empty)'}
			<FlatButton onClick={onClick} label="edit" primary={true}/>
			{row.buttons[0] && <FlatButton onClick={row.buttons[0].click} label="x"/>}
		</B.Row>)
	}

	return function(locals){
		return <HasMany locals={locals}/>
	}
}
export default create()
