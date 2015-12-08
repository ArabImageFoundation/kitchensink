import React,{Component,PropTypes} from 'react'
import cx from 'classnames';

class Modal extends Component{
	static propTypes = {
		open:PropTypes.bool
	,	onClose:PropTypes.func.isRequired
	,	title:PropTypes.any
	,	footer:PropTypes.array
	}
	static defaultProps = {
		open:false
	}
	componentDidMount(){
		this.addBodyClasses(this.props.open);
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.open == this.props.open){return;}
		this.addBodyClasses(nextProps.open);
	}
	addBodyClasses(open){
		const hasClass = document.body.className.match(/ modal-open/);
		if(open && !hasClass){
			document.body.className+=' modal-open';
		}else if(hasClass){
			document.body.className=document.body.className.replace(/ modal-open/,'');
		}
	}
	render(){
		var props = this.props;
		const className = cx(
			'modal'
		,	{
				fade:!(props && props.noFade)
			,	'modal-isOpen in':props && props.open
			}
		,	props && props.className
		);
		const modalClassName = cx(
			'modal-dialog'
		,	{
				'modal-sm':props && (props.small || props.sm)
			,	'modal-lg':props && (props.large || props.lg)
			}
		)

		const modalBackdropClassName = cx(
			'modal-backdrop'
		,	{
				fade:!(props && props.noFade)
			,	'in':props && props.open
			}
		);

		const style = props && props.open ? Object.assign({},{display:'block',paddingRight:15},props.style) : null;
		props = Object.assign({},props,{className,style});
		const title = props.title
		const footer = props.footer
		const closeButton = props.onClose && (<button type="button" className="close" onClick={props.onClose} data-dismiss="modal" aria-label="Close"><span aria-hidden="true">{props.closeLabel || '×'}</span></button>);
		return (<div {...props}>
			<div className={modalBackdropClassName} onClick={props.onClose}/>
			<div className={modalClassName} style={{zIndex:1050}}>
				<div className="modal-content">
					<div className="modal-header">
						{closeButton}
						<h4 className="modal-title">{title}</h4>
					</div>
					<div className="modal-body">{props.children}</div>
					{props.footer && <div className="modal-footer">{props.footer}</div>}
				</div>
			</div>
		</div>)
	}
}

export default Modal;
