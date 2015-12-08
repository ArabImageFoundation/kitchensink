import React from 'react';
import Base from './Base';
import {Person as model} from '../../models';

function view(props){
	return (<div>Person: {props.doc.name}</div>)
}

class Person extends Base{
	static model = model
}

export default Person;
