import t from 'tcomb-form';

export const noobj = {};

export function toSameLength(value, keys, uidGenerator) {
	if (value.length === keys.length) {
		return keys
	}
	const ret = []
	for (let i = 0, len = value.length; i < len; i++ ) {
		ret[i] = keys[i] || uidGenerator.next()
	}
	return ret
}

export function isIdentity(type){return t.isType(type) ? type.meta.identity : true}
export function isTypeName(name) {return t.Nil.is(name) || t.String.is(name);}
export function getFunctionName(f){return f.displayName || f.name || '<function' + f.length + '>';}
export function forbidNewOperator(x, type) {
	t.assert(!(x instanceof type), function () { return 'Cannot use the new operator to instantiate the type ' + t.getTypeName(type); });
}
export function isStruct(x) {
	return t.isType(x) && ( x.meta.kind === 'struct' );
}
export function create(type, value, path) {
	if (t.isType(type)) {
		return t.Struct.is(type) ? new type(value, path) : type(value, path);
	}
	if (process.env.NODE_ENV !== 'production') {
		path = path || [getFunctionName(type)];
		t.assert(value instanceof type, function () { return 'Invalid value ' + t.stringify(value) + ' supplied to ' + path.join('/'); });
	}
	return value;
}

export function getTypeInfo(type,isMaybe=false,isSubtype=false) {
	let innerType = type
	let kind
	let innerGetValidationErrorMessage

	while (innerType) {
		kind = innerType.meta.kind
		if (t.Function.is(innerType.getValidationErrorMessage)) {
			innerGetValidationErrorMessage = innerType.getValidationErrorMessage
		}
		if (kind === 'maybe') {
			isMaybe = true
			innerType = innerType.meta.type
			continue
		}
		if (kind === 'subtype') {
			isSubtype = true
			innerType = innerType.meta.type
			continue
		}
		break
	}

	const getValidationErrorMessage = innerGetValidationErrorMessage ? (value, path, context) => {
		const result = t.validate(value, type, {path, context})
		if (!result.isValid()) {
			for (let i = 0, len = result.errors.length; i < len; i++ ) {
				if (t.Function.is(result.errors[i].expected.getValidationErrorMessage)) {
					return result.errors[i].message
				}
			}
			return innerGetValidationErrorMessage(value, path, context)
		}
	} : undefined

	return {
		type,
		isMaybe,
		isSubtype,
		innerType,
		getValidationErrorMessage
	}
}
