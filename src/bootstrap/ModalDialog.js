import React from 'react'
import cx from 'classnames';
import Modal from './Modal';

export default function ModalDialog(props){
	var footer = [
		(
			props && props.onCancel && (<button
				onClick={props.onCancel}
				key='cancel'
				type="button"
				className="btn btn-default"
				data-dismiss="modal">
					{props.cancelLabel || '✖'}
			</button>)
		)
	,	(
			props && props.onConfirm && (<button
				onClick={props.onConfirm}
				key='ok'
				disabled={props && props.disabled}
				type="button"
				className={"btn btn-primary"+(props && props.disabled ? ' disabled':'')}>
					{props.confirmLabel || '✔'}
			</button>)
		)
	].filter(Boolean);

	if(props.footer){
		if(Symbol.iterator in props.footer){footer = [...props.footer,...footer];}
		else{footer.push(props.footer);}
	}
	props = Object.assign({},props,{footer});
	return (<Modal {...props}/>);
}
