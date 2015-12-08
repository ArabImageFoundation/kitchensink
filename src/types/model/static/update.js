import t from 'tcomb-form'

export default function update(instance,specs){
	const M = this;
	return new M(t.update(instance,specs));
}
