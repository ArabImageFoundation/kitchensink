import transform from '../../../utils/transform';

export default function toItem(index,parent,children){
	const value = this.cast();
	const doc = transform(
		value
	,	(val)=>(!t.Nil.is(val)?val:undefined)
	)
	return {
		type:this.constructor.name
	,	index
	,	parent
	,	children
	,	doc
	}
}
