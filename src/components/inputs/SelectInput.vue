<template>
	<SettingsField :labelData="labelData">
		<select
			class="nb-select"
			:value="value"
			@change="$emit('input', $event.target.value)"
		>
			<option 
				v-for="(option, index) in scopedOptions"
				:key="index"
				:value="option.label ? option.val : option">
				{{ option.label || option }}
			</option>
		</select>
	</SettingsField>
</template>

<script>
import inputMixin from './inputMixin'
export default {
	mixins: [inputMixin],
	props: ['value', 'options'],
	data() {
		return {
			scopedOptions: []
		}
	},
	created() {
		this.scopedOptions = this.computedValue('options')
	}
}
</script>