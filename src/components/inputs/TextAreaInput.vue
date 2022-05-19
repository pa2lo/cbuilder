<template>
	<SettingsField :labelData="labelData">
		<textarea
			class="nb-textarea"
			:rows="rows"
			:value="value"
			:placeholder="placeholderText"
			@input="$emit('input', $event.target.value)"
		/>
	</SettingsField>
</template>

<script>
import inputMixin from './inputMixin'
export default {
	mixins: [inputMixin],
	props: {
		value: String,
		placeholder: String,
		rows: {
			type: Number,
			default: 2
		}
	},
	data() {
		return {
			placeholderText: false
		}
	},
	created() {
		this.placeholderText = this.computedValue('placeholder')
	}
}
</script>