import t from '../src';
const DatePicker = require('material-ui/lib/date-picker/date-picker');
const DatePickerDialog = require('material-ui/lib/date-picker/date-picker-dialog');
const TextField = require('material-ui/lib/text-field');
const FlatButton = require('material-ui/lib/flat-button');
const RaisedButton = require('material-ui/lib/raised-button');
const AutoComplete = require('material-ui/lib/auto-complete');
const FloatingActionButton = require('material-ui/lib/floating-action-button');
const SelectField = require('material-ui/lib/select-field');
const Menu = require('material-ui/lib/menus/menu');
const MenuItem = require('material-ui/lib/menus/menu-item');
const MenuDivider = require('material-ui/lib/menus/menu-divider');
import React from 'react';
import transform from '../src/utils/transform';
import DeferredImage from '../src/Templates/utils/DeferredImage';

function datePicker(locals){
	return (<div><DatePicker
		floatingLabelText={locals.label}
		//value={locals.value}
		//onChange={(n,date)=>{console.log(date);locals.onChange(date)}}
	/></div>)
}

function contract(locals){
	const len = locals.path.length;
	const children = [
	,	locals.order.map(name => locals.inputs[name])
	]
	if(len==0){
		return (<Card>
			<CardHeader
				title={locals.label}
				avatar={<Avatar icon={<FontIcon className="material-icons">home</FontIcon>}/>}
			/>
			{children}
			<FlatButton label="add Photo"/>
			<FlatButton label="add Album"/>
			<FlatButton label="add Other Item"/>
		</Card>)
	}else{
		return (<div>{children}</div>)
	}
}

function textField(locals){
	if(locals.type=='hidden'){
		return <input type='hidden'/>
	}
	if (locals.type !== 'file') {
		return (<div>
			<TextField floatingLabelText={locals.label} value={locals.value} onChange={(evt)=>locals.onChange(evt.target.value)} />
		</div>)
	}else{
		return fileField(locals)
	}
}

const countries = [
	{payload: '1', text: 'Lebanon'},
	{payload: '2', text: 'Syria'},
	{payload: '3', text: 'France'}
]

function country(locals){
	return (<SelectField
		value={locals.value}
		onChange={(evt)=>locals.onChange(evt.target.value)}
		floatingLabelText={locals.label}
		menuItems={countries}/>)
}

function fileField(locals){
	const label = (locals.value && locals.value.name) || locals.label
	const inputStyle = {
		cursor: 'pointer',
		position: 'absolute',
		top: '0',
		bottom: '0',
		right: '0',
		left: '0',
		width: '100%',
		opacity: '0',
	}
	const button = (<FlatButton label={label} secondary={true}>
		<input type="file" onChange={(evt)=>locals.onChange(evt.target.files[0])} style={inputStyle}/>
	</FlatButton>)
	const image = locals.value ? <DeferredImage file={locals.value}/> : null;
	return (<div>{image}{button}</div>)
}


function autocomplete(data){
	return function(locals){
		const dataSource = transform(data(),item=><AutoComplete.Item primaryText={item}/>);
		return (<AutoComplete
			fullWidth={true}
			floatingLabelText={locals.label}
			onUpdateInput={(t) =>console.log(t)}
			showAllItems={true}
			dataSource={dataSource}
			onNewRequest={(t, index) => {console.log('request:'+index);}}
		/>)
	}
}

function photographer(){
	function data(){
		return {'a':'a',b:'b'};
	}
	return autocomplete(data);
}

t.form.Form.templates.textbox = textField
t.form.Form.templates.file = fileField;

export const File = t.model('file|files',{
	name:t.String
,	file:t.form.File
},{
	fields:{
		file:{type:'file'}
	}
,	identifier(props){
		return props && (props.file || props.name)
	}
})

export const Photo = t.model('photo|photos',{
	name:t.String
,	reference:t.String
,	title:t.String
,	subject:t.String
,	photographer:t.String
,	files:t.hasMany(File)
},{
	identifier(props){
		return props && props.name;
		if(!props){return ''}
		if(props.files && props.files.length && props.files[0].file){
			return props.files[0].file;
		}
		return props.name
	}
,	fields:{
		photographer:{
			template:photographer()
		}
	}
})

export const Album = t.model('album|albums',{
	name:t.String
,	photos:t.hasMany(Photo)
},{
	identifier(props){
		return props && props.name
	}
})

export const Item = t.model('object|Objects',{
	name:t.String
,	type:t.String
},{
	identifier(props){
		return props && props.name
	}
})


export const Studio = t.model('studio|studios',{
	name:t.String
,	address:t.String
,	telephone:t.String
},{
	identifier(props){
		return props && props.name
	}
})

export const Photographer = t.model('photographer|photographers',{
	name:t.String
,	nationality:t.String
,	studios:t.hasOne(Studio)
,	address:t.String
},{
	identifier(props){
		return props && props.name
	}
})

export const Contract = t.model('contract|contracts',{
	title:t.String
,	subject:t.String
,	date:t.Date
,	country:t.String
,	items:t.hasMany(Item)
,	photos:t.hasMany(Photo)
,	albums:t.hasMany(Album)
},{
	identifier(props){
		return props && props.title
	}
,	template:contract
,	fields:{
		date:{
			template:datePicker
		}
	}
})

export const Collection = t.model('collection|collections',{
	name:t.String
,	donor:t.String
,	contracts:t.hasMany(Contract)
},{
	cast:{
		_id:(val,{name})=>val||`person_${name.toLowerCase()}`
	,	name:(val)=>val||'anonymous'
	,	tags:(name)=>(typeof name == 'string')?{name}:name
	,	type:()=>'person'
	}
,	identifier(props){
		return props && props.name;
	}
});

export const Everything = t.model('all|all',{
	collections:t.hasMany(Collection)
})
