import t from 'tcomb-form';
import {humanize} from 'tcomb-form/lib/util'
import {noobj} from '../utils/tcomb';
import React from 'react';
import merge from '../utils/merge';

class Model extends t.form.Struct{

	validate() {
		let value = {}
		let errors = []
		let hasError = false
		let result

		if (this.typeInfo.isMaybe && this.isValueNully()) {
			this.removeErrors()
			return new t.ValidationResult({errors: [], value: null})
		}

		for (const ref in this.refs) {
			if (this.refs.hasOwnProperty(ref)) {
				result = this.refs[ref].validate()
				errors = errors.concat(result.errors)
				value[ref] = result.value
			}
		}

		if (errors.length === 0) {
			const InnerType = this.typeInfo.innerType
			value = new InnerType(value)
			if (this.typeInfo.isSubtype && errors.length === 0) {
				result = t.validate(value, this.props.type, this.getValidationOptions())
				hasError = !result.isValid()
				errors = errors.concat(result.errors)
			}
		}

		this.setState({ hasError: hasError })
		return new t.ValidationResult({errors, value})
	}

	getTemplate() {
		return this.props.options.template || this.getTemplates().model
	}

	getDefaultLabel(){
		return this.typeInfo.innerType.name;
	}

	getInputs() {
		const { ctx } = this.props
		const props = this.getTypeProps()
		const type = this.typeInfo.innerType.options
		const options = merge(this.typeInfo.innerType.options,this.props.options)
		const auto = this.getAuto()
		const i18n = this.getI18n()
		const config = this.getConfig()
		const templates = this.getTemplates()
		const value = this.state.value
		const inputs = {}

		for (const prop in props) {
			if (props.hasOwnProperty(prop)) {
				const propType = props[prop]
				const propOptions = options.fields && options.fields[prop] ? options.fields[prop] : noobj
				inputs[prop] = React.createElement(t.form.getComponent(propType, propOptions), {
					key: prop,
					ref: prop,
					type: propType,
					options: propOptions,
					value: value[prop],
					onChange: this.onChange.bind(this, prop),
					ctx: {
						context: ctx.context,
						uidGenerator: ctx.uidGenerator,
						auto,
						config,
						name: ctx.name ? `${ctx.name}[${prop}]` : prop,
						label: humanize(prop),
						i18n,
						templates,
						path: ctx.path.concat(prop)
					}
				})
			}
		}
		return inputs
	}
}

export default Model;
