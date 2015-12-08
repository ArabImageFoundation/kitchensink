export const defaults = {
		_id:(val,props,type)=>val || type
	,	modified:()=>(new Date())
	}
export const unexposed = ['_id','modified']
export const options = {
}
