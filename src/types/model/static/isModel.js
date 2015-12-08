export default function isModel(m){
	if(!m || !m.meta || !m.meta.kind){return false;}
	const {kind} = m.meta;
	return (
		kind == 'struct' && !!m.meta.relations ||
		(
			/list|maybe|subtype/.test(kind) &&
			isModel(m.meta.type)
		)
	);
}
