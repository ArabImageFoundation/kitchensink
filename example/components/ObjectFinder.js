import React, {Component} from 'react';

class Finder extends Component{
	constructor(props){
		super(props)
		this.state = {value:''}
	}
	render(){
		return <input onChange={evt=>{this.setState({value:evt.target.value})}} value={this.state.value}/>
	}
}

export default Finder;
