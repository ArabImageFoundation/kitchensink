export default function transform(obj,fn,opts,thisArg){
	const newObj = {};
	var modified = false;
	var empty = true;
	Object.keys(obj).forEach(function(key,i){
		const val = obj[key];
		const ret = fn.call(thisArg,val,key,i,obj);
		if(ret !== val && !modified){modified = true;}
		if(typeof ret!=='undefined'){
			if(empty){empty = false;}
			newObj[key]=ret;
		}
	})
	if(empty && opts && ('onEmpty' in opts)){return opts.onEmpty(obj);}
	if(!modified && opts && ('onSame' in opts)){return opts.onSame(obj);}
	return newObj;
}
