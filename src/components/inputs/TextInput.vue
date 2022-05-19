<template>
	<SettingsField :labelData="labelData">
		<input
			class="nb-text"
			:class="{clearable: isClearable}"
			:type="inputType"
			:value="value"
			:placeholder="placeholderText"
			@input="$emit('input', $event.target.value)"
		/>
		<span 
			v-if="isClearable" 
			class="nb-text-clear ttip"
			data-title="Clear"
			:class="{disabled: !value}"
			@click="$emit('input', '')"
		>
			<span class="icco icco-x md-18"></span>
		</span>
	</SettingsField>
</template>

<script>
import inputMixin from './inputMixin'
export default {
	mixins: [inputMixin],
	props: ['value', 'clearable', 'placeholder', 'type'],
	data() {
		return {
			placeholderText: false,
			isClearable: false,
			inputType: this.type || 'text'
		}
	},
	created() {
		this.placeholderText = this.computedValue('placeholder')
		this.isClearable = this.computedValue('clearable')
	}
}
</script>