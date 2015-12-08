import React,{Component} from 'react'

function onChange(evt){
	const value = evt.target.value;
	this.setState({
		value
	,	loading:true
	,	items:[]
	});
	clearTimeout(this.timeOut);
	this.timeOut = setTimeout(()=>{
		this.setState({
			items:['a','b','c','d']
		,	loading:false
		,	selected:0
		})
	},2000);
}

function onKeyDown(evt){
	const {keyCode} = evt;
	const up = keyCode == 38;
	const down = keyCode == 40;
	const enter = keyCode == 13;
	if(!up && !down && !enter){return;}
	evt.preventDefault();
	if(enter){return this.onSelect(this.state.selected)}
	const {selected,items} = this.state;
	const max = items.length-1;
	const next = selected + (up?-1:1);
	if(next < 0 || next > max){return;}
	this.setState({selected:next});
}

function onSelect(index){
	const {items} = this.state;
	const item = items[index];
	if(!item){throw new Error('wrong index');}
	console.log('chosen',item);
}

function onClick(index){
	return (evt)=>{
		evt.preventDefault();
		this.setState({selected:index},()=>{
			this.onSelect(index);
		})
	}
}

class TypeAhead extends Component{
	constructor(props,context){
		super(props,context)
		this.onChange = onChange.bind(this);
		this.onKeyDown = onKeyDown.bind(this);
		this.onSelect = onSelect.bind(this);
		this.onClick = onClick.bind(this);
		this.timeOut = null;
		this.state = {
			value:''
		,	loading:false
		,	items:[]
		,	selected:-1
		}
	}
	render(){
		const {loading,value,items,selected} = this.state;
		return (<div>
			<input value={value} onChange={this.onChange} onKeyDown={this.onKeyDown}/>
			<div>
				{loading?<div>loading...</div>:false}
				{items && items.map((item,i)=>{
					const isSelected = (selected==i)
					return <div key={i} className={isSelected?'selected':''} onClick={this.onClick(i)}>{item}{isSelected?'*':''}</div>
				})}
			</div>
		</div>)
	}
}

export default TypeAhead;
