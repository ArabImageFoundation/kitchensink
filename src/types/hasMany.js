import t from 'tcomb-form'
import HasManyFactory from '../Factories/HasMany';

export default function hasMany(struct,min,max,name){
	min = min || 0;
	max = max || Infinity;
	name = name || struct.type;
	const subTypeName = `hasMany(${name},${min},${max})`
	struct = t.refinement(
		t.list(struct,name)
	,	({length})=>length>=min && length<=max
	,	subTypeName
	)
	Object.assign(
		struct.meta
	,	{
			relations:['hasMany',min,max]
		,	min
		,	max
		}
	);
	struct.getTcombFormFactory = function(opts){
		return HasManyFactory
	}
	return struct;
}
