export default function defineProperty(obj,prop,value){
	Object.defineProperty(obj,prop,{value,enumerable:false})
}
