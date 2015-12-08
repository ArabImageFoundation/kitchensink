import Person from './Person'

export const Models = {
	'person':Person
}

export const modelsList = {};

Object.keys(Models).forEach(name=>{
	modelsList[name] = Models[name].plural || name;
})
