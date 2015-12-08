import {OWN_PROPERTIES} from './constructor';

export default function cast(){
	return this.constructor.cast(this[OWN_PROPERTIES]);
}
