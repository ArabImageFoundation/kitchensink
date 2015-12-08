import t from 'tcomb-form'

export default function extend(structs,name){
	var props = {};
	var prototype = {};
	[this].concat(structs).forEach(function (struct, i) {
		if (isObject(struct)) {
			t.mixin(props, struct);
		}
		else {
			if (process.env.NODE_ENV !== 'production') {
				assert(isStruct(struct), function () { return 'Invalid argument structs[' + i + '] ' + t.stringify(struct) + ' supplied to ' + displayName + '.extend(structs, name)'; });
			}
			t.mixin(props, struct.meta.props);
			t.mixin(prototype, struct.prototype);
		}
	});
	var ret = struct(props, name);
	t.mixin(ret.prototype, prototype);
	return ret;
};
