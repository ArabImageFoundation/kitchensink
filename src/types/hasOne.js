import t from 'tcomb-form';
import {
	isTypeName
,	isIdentity
,	isStruct
} from '../utils/tcomb';

import HasOneFactory from '../Factories/HasOne'

export default function hasOne(type, mandatory, name) {

	if (process.env.NODE_ENV !== 'production') {
		t.assert(isStruct(type),()=>`Invalid argument types ${t.stringify(types)} supplied to hasOne(types, [mandatory, name]) combinator (expected an array of at least 2 types)`);
		t.assert(t.Nil.is(mandatory) || t.Boolean.is(mandatory),()=>`Invalid argument mandatory ${t.stringify(mandatory)} supplied to hasOne(types, [mandatory, name]) combinator (expected a boolean)`)
		t.assert(isTypeName(name), ()=>`Invalid argument name ${t.stringify(name)} supplied to hasOne(types, [mandatory, name]) combinator (expected a string)`);
	}

	var displayName = name || hasOne.getDefaultName(type);

	function HasOne(value, path) {

		if(HasOne.is(value)){
			return value;
		}

		if (process.env.NODE_ENV !== 'production') {
			forbidNewOperator(this, HasOne);
		}

		return (!mandatory && t.Nil.is(value)) ? null : create(type, value, path);
	}

	HasOne.meta = {
		kind: 'hasOne'
	,	type
	,	name
	,	mandatory
	,	identity: isIdentity(type)
	};

	HasOne.displayName = displayName;

	HasOne.is = function (x) {
		return (!mandatory && t.Nil.is(x)) || is(x, type);
	};

	HasOne.update = function (instance, spec) {
		return HasOne(t.update(instance, spec));
	};

	HasOne.getTcombFormFactory = function(opts){
		return HasOneFactory
	}

	return HasOne;
}

hasOne.getDefaultName = function (type){
	return `hasOne(${t.getTypeName(type)})`
};
