function camelCaseToConst(name){
	return name.replace(/([A-Z])/g,letter=>`_${letter}`).toUpperCase();
}

function makeDispatch(dispatch,type){
	return function disp(suffix,props){
		return dispatch(Object.assign({type:`${type}_${suffix}`},props));
	}
}

function makeSyncActionCreator(type,metaDefault={}){
	return function syncActionCreator(_meta){
		return {
			type
		,	meta:Object.assign({},metaDefault,_meta)
		}
	}
}

function makeAsyncActionCreator(type,fn,metaDefault={}){
	return function AsyncActionCreator(_meta){
		const meta = Object.assign({},metaDefault,_meta)
		return (dispatch,getState) => {
			const disp = makeDispatch(dispatch,type)
			disp('START',{meta});
			const promise = fn(meta,{dispatch,getState,disp});
			if(!promise.then){
				return promise;
			}
			return promise.then(payload=>disp('SUCCESS',{payload,meta}))
				.catch(error=>{
					throw error;
					disp('ERROR',{error:true,payload:{error,message:error.message},meta})
				})
		}
	}
}

function createReducer(handlers){
	const keys = {};
	Object.keys(handlers).forEach(name=>{
		keys[camelCaseToConst(name)] = name;
	});
	return function reducer(state,action){
		if(!(action.type in keys)){return state;}
		const fnName = keys[action.type];
		const fn = handlers[keys[action.type]];
		const {meta,payload} = action
		return fn(state,meta,payload);
	}
}

export function makeActionReducers(obj){
	const actions= {};
	const reducers = {};
	Object.keys(obj).forEach(name=>{
		const type = camelCaseToConst(name);
		const action = obj[name];
		const {meta,reducer,async} = action;
		if(reducer){
			if(async){
				if(typeof reducer == 'function'){
					reducers[`${name}_success`] = reducer
				}else{
					Object.keys(reducer).forEach(n=>
						(reducers[`${name}_${n}`] = reducer[n])
					);
				}
			}else{
				reducers[name] = reducer;
			}
		}
		actions[name] = (async)?
			makeAsyncActionCreator(type,async,meta) :
			makeSyncActionCreator(type,meta)
		;
	});
	return [actions,createReducer(reducers)];
}
