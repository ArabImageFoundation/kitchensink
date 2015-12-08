import React,{Component} from 'react';
import {connect} from 'react-redux';
import {mapMap,mapObject,assign} from '../redux/utils';
import {Everything} from '../models';
import mapStateToProps from '../redux/mapStateToProps';
import bindActions from '../redux/bindActions';
//import {renderItem,renderMultipleItems} from './utils';
import KeyListener from './utils/keyListener';
import t from '../../src';
import B from '../../src/bootstrap'
const Form = t.form.Form;
import TypeAhead from './utils/TypeAhead';
import ObjectFinder from './ObjectFinder'
import Main from './material'
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import Colors from 'material-ui/lib/styles/colors';
/**
const selector = t.struct({
	type:t.enums(assign(modelsList,{'all':'all'}))
,	filter:t.String
})
**/

const searchTemplate = (props) =>(<span>{props.order.map(inputName=>props.inputs[inputName])}</span>);
const keysListener = KeyListener();
class App extends Component{

	constructor(props,context){
		super(props,context);
		const {dispatch} = props;
		Object.keys(bindActions).forEach(name=>{
			this[name] = bindActions[name](dispatch);
		});
		this.state={
			konami:false
		,	muiTheme: ThemeManager.getMuiTheme(LightRawTheme)
		}
	}
	componentDidMount(){
		this.setupDatabase();
		keysListener.interval = 500;
		keysListener.add('esc',()=>this.keyPress('cancel'))
		keysListener.addSeq('konami',()=>this.setState({konami:!this.state.konami}))
		keysListener.listen();
	}

	renderItems(){
		const {type,filter} = this.props.view;
		const currentFilter = filter ? new RegExp(filter,'i') : null;
		const items = (type=='all' || !type) ? this.props.items.byId : this.props.items.byType.get(type);
		return mapMap(items,(item,key)=>renderItem(
			{
				item
			,	onSave:this.save
			,	onRemove:this.removeItem
			,	onEdit:this.setEditMode
			}
		,	key
		,	currentFilter
		))
	}

	renderEditForm(){
		const {edit,id} = this.props.mode;
		if(!edit || !id){return;}
		const item = this.props.items.byId.get(id);
		if(!item){return;}
		const props = {
			item
		,	onCancel:this.setViewMode
		,	onSave:this.save
		,	valid:true
		}
		return <EditForm {...props}/>
	}

	renderMenu(){
		return;
		const {type,create,view} = this.props.mode;
		const items = [
			('Create...')
		,	...mapObject(modelsList,(plural,modelName)=>
				<a href='#' key={plural} onClick={this.setCreateMode(modelName)}>{modelName}</a>
			)
		,	('-----')
		]
		return (<B.NavBarLinks right items={items}/>);
	}

	renderCreateForm(){
		const {type,create,view} = this.props.mode;
		return create && type && (<EditForm type={type} onSave={this.save} onCancel={this.setViewMode} valid={false}/>);
	}

	static childContextTypes = {
		muiTheme: React.PropTypes.object,
	}

	getChildContext() {
		return {
			muiTheme: this.state.muiTheme,
		};
	}

	componentWillMount() {
		let newMuiTheme = ThemeManager.modifyRawThemePalette(
			this.state.muiTheme
		,	{
				accent1Color: Colors.deepOrange500
			,	leftNav:{
					width:800
				}
			}
		);
		this.setState({muiTheme: newMuiTheme});
	}

	render(){
		return (<div style={{paddingTop:50}} className={this.state.konami&&'konami'}>
			<B.ContainerFluid>
				<div style={{width:'70%'}}>
				<Form type={Everything}/>

				</div>
			</B.ContainerFluid>
			{/**this.renderEditForm()**/}
			{/**this.renderCreateForm()**/}
		</div>)
	}
}


export default connect(mapStateToProps)(App);
