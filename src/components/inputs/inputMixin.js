export default {
	props: {
		title: String,
		tooltip: String,
		scope: String
	},
	computed: {
		labelData() {
			return {
				title: this.computedValue('title'),
				tooltip: this.computedValue('tooltip')
			}
		}
	},
	methods: {
		computedValue(model, defaultval = false) {
			if (this[model]) return this[model]
			else if (this.scope && scopedInputs[this.scope][model]) return scopedInputs[this.scope][model]
			else return defaultval
		}
	}
}