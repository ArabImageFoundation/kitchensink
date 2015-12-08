import t from 'tcomb-form';
import {create} from '../../../utils/tcomb';
export const RELATIONS_KEY = Symbol('relations');
export const OWN_PROPERTIES = Symbol('own');

export default function constructor(value,path,M,obj){

	if (process.env.NODE_ENV !== 'production') {
		path = path || [M.displayName];
		t.assert(t.Object.is(value),()=>`Invalid value ${t.stringify(value)} supplied to ${path.join('/')} (expected an object)`);
	}

	if(M.is(value)){return value;}

	if(!(obj instanceof M)){
		return new M(value,path);
	}

	const {props,relations} = M.meta;

	const ownRelations = [];
	const ownProperties = {};

	Object.keys(props).forEach(function(k){
		var expected = props[k];
		var actual = value[k];
		const val = create(expected, actual, ( process.env.NODE_ENV !== 'production' ? path.concat(k + ': ' + t.getTypeName(expected)) : null ));
		if(relations!==true && (k in relations)){
			if(!t.Nil.is(val)){
				ownRelations.push(val);
			}
		}else{
			ownProperties[k] = val;
		}
		obj[k] = val;
	})

	obj[RELATIONS_KEY] = ownRelations;
	obj[OWN_PROPERTIES] = ownProperties;

	if (process.env.NODE_ENV !== 'production') {
		Object.freeze(obj);
	}
}
