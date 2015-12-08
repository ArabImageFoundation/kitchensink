export default function getModelOptions(model){
	if(/maybe|subtype/.test(model.meta.kind)){
		return getModelOptions(model.meta.type);
	}
	if(/list/.test(model.meta.kind)){
		return {
			item:getModelOptions(model.meta.type)
		}
	}
	return model.options;
}
