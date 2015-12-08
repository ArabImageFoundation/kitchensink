var hasOwnProperty = Object.prototype.hasOwnProperty;

export default function isEmpty(obj) {

	if (obj == null || typeof obj == 'undefined' || obj.length === 0){return true};
	if (obj.length > 0){return false}
	return (Object.keys(obj).length === 0)

}
