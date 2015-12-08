import t from 'tcomb-form';
import React from 'react'
import {
	noobj
,	toSameLength
} from '../utils/tcomb'
class HasMany extends t.form.List{

	constructor(props) {
		super(props)
		if(this.min() && this.count() < this.min()){
			this.state.value = this.state.value.slice();
			this.state.value.length = this.min();
		}
	}

	count(){
		return this.state.value.length;
	}

	max(){
		return this.typeInfo.innerType.meta.max
	}

	min(){
		return this.typeInfo.innerType.meta.min
	}

	getDefaultLabel(){
		return this.typeInfo.innerType.meta.type.meta.plural;
	}

	validate() {
		const value = []
		let errors = []
		let hasError = false
		let result

		if (this.typeInfo.isMaybe && this.isValueNully()) {
			this.removeErrors()
			return new t.ValidationResult({errors: [], value: null})
		}

		for (let i = 0, len = this.state.value.length; i < len; i++ ) {
			result = this.refs[i].validate()
			errors = errors.concat(result.errors)
			value.push(result.value)
		}

		// handle subtype
		if (this.typeInfo.isSubtype && errors.length === 0) {
			result = t.validate(value, this.props.type, this.getValidationOptions())
			hasError = !result.isValid()
			errors = errors.concat(result.errors)
		}

		this.setState({hasError: hasError})
		return new t.ValidationResult({errors: errors, value: value})
	}

	onChange(value, keys, path, kind) {
		const allkeys = toSameLength(value, keys, this.props.ctx.uidGenerator)
		this.setState({ value, keys: allkeys }, () => {
			this.props.onChange(value, path, kind)
		})
	}

	addItem(evt) {
		evt.preventDefault()
		if(this.count()==this.max()){return;}
		const value = this.state.value.concat(undefined)
		const keys = this.state.keys.concat(this.props.ctx.uidGenerator.next())
		this.onChange(value, keys, this.props.ctx.path.concat(value.length - 1), 'add')
	}

	onItemChange(itemIndex, itemValue, path, kind) {
		const value = this.state.value.slice()
		value[itemIndex] = itemValue
		this.onChange(value, this.state.keys, path, kind)
	}

	removeItem(i, evt){
		evt.preventDefault()
		const value = this.state.value.slice()
		value.splice(i, 1)
		const keys = this.state.keys.slice()
		keys.splice(i, 1)
		this.onChange(value, keys, this.props.ctx.path.concat(i), 'remove')
	}

	moveUpItem(i, evt) {
		evt.preventDefault()
		if (i > 0) {
			this.onChange(
				move(this.state.value.slice(), i, i - 1),
				move(this.state.keys.slice(), i, i - 1),
				this.props.ctx.path.concat(i),
				'moveUp'
			)
		}
	}

	moveDownItem(i, evt) {
		evt.preventDefault()
		if (i < this.state.value.length - 1) {
			this.onChange(
				move(this.state.value.slice(), i, i + 1),
				move(this.state.keys.slice(), i, i + 1),
				this.props.ctx.path.concat(i),
				'moveDown'
			)
		}
	}

	getTemplate() {
		return this.props.options.template || this.getTemplates().hasMany
	}

	getItems() {
		const { options, ctx } = this.props
		const auto = this.getAuto()
		const i18n = this.getI18n()
		const config = this.getConfig()
		const templates = this.getTemplates()
		const value = this.state.value
		const type = this.typeInfo.innerType.meta.type
		const identifier = type.identifier;
		const ItemComponent = t.form.getComponent(type, options.item || noobj)
		return value.map((itemValue, i) => {
			const buttons = []
			if (!options.disableRemove) {
				buttons.push({
					type: 'remove',
					label: i18n.remove,
					click: this.removeItem.bind(this, i)
				})
			}
			if (options.enableOrder) {
				buttons.push({
					type: 'move-up',
					label: i18n.up,
					click: this.moveUpItem.bind(this, i)
				})
			}
			if (options.enableOrder) {
				buttons.push({
					type: 'move-down',
					label: i18n.down,
					click: this.moveDownItem.bind(this, i)
				})
			}
			return {
				input: React.createElement(ItemComponent, {
					ref: i,
					type,
					options: options.item || noobj,
					value: itemValue,
					onChange: this.onItemChange.bind(this, i),
					ctx: {
						context: ctx.context,
						uidGenerator: ctx.uidGenerator,
						auto,
						config,
						i18n,
						name: ctx.name ? `${ctx.name}[${i}]` : String(i),
						templates,
						path: ctx.path.concat(i)
					}
				}),
				key: this.state.keys[i],
				buttons: buttons,
				identifier:identifier(itemValue) || '',
				type:type.name
			}
		})
	}

	getLocals() {
		const options = this.props.options
		const i18n = this.getI18n()
		const locals = super.getLocals()
		locals.add = options.disableAdd ? null : {
			type: 'add',
			label: i18n.add,
			click: this.addItem.bind(this)
		}
		locals.items = this.getItems()
		locals.className = options.className
		return locals
	}

}

export default HasMany
