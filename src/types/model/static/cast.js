
export default function cast(value){
	const {defaults} = this;
	if(!defaults){return value;}
	const newValue = Object.assign({},value);
	Object.keys(defaults).forEach(key=>{
		const defVal = defaults[key];
		const currVal = value[key];
		if(typeof defVal == 'function'){
			newValue[key] = defVal(currVal,newValue,this.displayName);
		}else{
			newValue[key] = currVal;
		}
	});
	return newValue;
}
