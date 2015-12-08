import actions from './actions'

 var searchTimeout =  null;
const searchTimeoutInterval =  300;

export default {
	save:(dispatch) => (items) => dispatch(actions.save({items}))
,	clear:(dispatch) => () => dispatch(actions.clear())
,	getAll:(dispatch) => () => dispatch(actions.getAll())
,	removeItem:(dispatch) => (item) => dispatch(actions.remove({items:[item]}))
,	remove:(dispatch) => (items) => dispatch(actions.remove({items}))
,	getItem:(dispatch) => (id) => dispatch(actions.getItem({id}))
,	invalidateItem:(dispatch) => (id) => dispatch(actions.invalidateItem({id}))
,	showItemsOfType:(dispatch) => (type) => dispatch(actions.showItemsOfType({type}))
,	filter:(dispatch) => (text) => dispatch(actions.filter({filter:text}))
,	setCreateMode:(dispatch) => (type) => () => dispatch(actions.setCreateMode({type}))
,	setEditMode:(dispatch) => (id) => dispatch(actions.setEditMode({id}))
,	setViewMode:(dispatch) => (type) => dispatch(actions.setViewMode())
,	onViewChange:(dispatch) => ({type,filter:text},[path]) => (path=='type') ? dispatch(actions.showItemsOfType({type})) : dispatch(actions.filter({filter:text}))
,	onSearch:(dispatch) => ({type,filter:text}) => {
		clearTimeout(searchTimeout);
		searchTimeout = setTimeout(()=>dispatch(actions.find({type,text})),searchTimeoutInterval);
	}
,	setupDatabase:(dispatch) => () => dispatch(actions.setupDatabase())
,	keyPress:(dispatch) => (key) => dispatch(actions.keyPress({key}))
}
