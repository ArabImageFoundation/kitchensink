function mergeArray(arr){
	return arr.map(el=>
		(el && el.constructor && el.constructor == Object) ? merge(el) :
		el
	)
}

export default function merge(...objs){
	const obj = {};
	objs.forEach((o)=>{
		if(!o){return;}
		Object.keys(o).forEach(function(key){
			obj[key] = (
				(o[key] && o[key].constructor && o[key].constructor == Object) ?
					merge(obj[key],o[key]) :
					(o[key] && Array.isArray(o[key])) ? mergeArray(o[key]):o[key]
			);
		})
	})
	return obj;
}
