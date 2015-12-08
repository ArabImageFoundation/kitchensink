/**********************************************************
	MAP polyfill
	Was intended to just extend on Map's prototype and
	add a few functions, but browsers do not allow
	extending native objects yet. I don't use this, but
	I wrote the thing...so it's there...In case.
	Note, to avoid O(n) lookups, this map uses a hash,
	which means non-string keys don't work.
**********************************************************/

function defineProperty(obj){
	return function(prop,value){
		Object.defineProperty(obj,prop,{enumerable:false,value})
	}
}

class MapIterator{
	constructor(arr){
		const define = defineProperty(this);
		define('arr',arr);
		define('index',0);
		this.length = arr.length;
	}
	next(){
		if (this.index < this.length) {
			return {done:false,value:this.arr[this.index++]}
		}
		return {done:true}
	}
	[Symbol.iterator]() {
		return this;
	}
	toString() {
		return '[object Map Iterator]';
	}
};

class MapExtended{
	/**** REGULAR MAP METHODS ****/
	constructor(...args){
		const define = defineProperty(this);
		define('_items',[]);
		define('_keys',[]);
		define('_values',[]);
		define('_indexes',{});
	}
	get size(){
		return this._items.length
	}
	clear(){
		this._keys.length = 0;
		this._values.length = 0;
		this._items.length = 0;
		this._indexes = {};
	}
	delete(key){
		var index = this.indexOf(this._indexes,key);
		if(index<0){return false;}
		this._keys.splice(index,1);
		this._items.splice(index,1);
		this._values.splice(index,1);
		return true;
	}
	set(key,value){
		var index = this.indexOf(this._indexes,key);
		if(index>-1){
			this._items[index][1] = value;
			this._values[index] = value;
		}else{
			this._indexes[key] = this._items.length;
			this._items.push([key,value]);
			this._keys.push(key);
			this._values.push(value);
		}
	}
	get(key){
		const index = this.indexOf(this._indexes,key);
		return ((index >= 0) && this._values[index]);
	}
	has(key){
		return (this.indexOf(this._indexes,key) >= 0);
	}
	forEach(fn,thisArg){
		if (typeof fn != 'function') {throw new TypeError('Invalid callback function given to forEach');}
		this._items.forEach(function(item){
			fn.call(item[1],item[0]);
		})
	}
	entries(){
		return new MapIterator(this._items.slice());
	}
	keys(){
		return new MapIterator(this._keys.slice());
	}
	values(){
		return new MapIterator(this._values.slice());
	}
	[Symbol.iterator]() {
		return this.entries();
	}
	toString(){
		return '[Object Map]';
	}
	/**** NEW METHODS ****/
	indexOf(key){
		const index = this._indexes[key];
		if(index>=0){return index;}
		return -1;
	}
	map(fn, asArr, thisArg){
		if (typeof fn != 'function') {throw new TypeError('Invalid callback function given to map');}
		const arr = [];
		if(asArr){
			this.forEach(function(v,k){
				arr.push(fn.call(thisArg,v,k,this))
			});
			return arr;
		}else{
			this.forEach(function(v,k){
				arr.push([k,fn.call(thisArg,v,k,this)])
			});
			return new MapExtended(arr);
		}
	}
	concat(map){
		retMap = new MapExtended([...this,...map]);
	}
	extend(map){
		const retMap = this.clone();
		map.forEach(function(value,key){
			const has = retMap.has(key);
			const isMap = (value instanceof Map);
			if(isMap){
				if(!has){
					retMap.set(key,new MapExtended([...value]));
				}else{
					const oldMap = retMap.get(key);
					retMap.set(key,oldMap.extend(value));
				}
			}else{
				retMap.set(key,value);
			}
		});
		return retMap;
	}
	clone(){
		const retMap = new MapExtended([...this]);
	}
	filter(predicate,thisArg){
		if (typeof predicate != 'function') {throw new TypeError('Invalid callback function given to filter');}
		const retMap = new MapExtended();
		this.forEach(function(value,key){
			const res = predicate.call(thisArg,value,key);
			if(res){retMap.push(key,value);}
		});
		return retMap;
	}
}

export default MapExtended;
