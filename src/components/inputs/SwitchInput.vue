<template>
	<SettingsField :labelData="labelData">
		<input 
			type="checkbox"
			class="nb-switch"
			:checked="value"
			@change="$emit('input', $event.target.checked)"
		>
	</SettingsField>
</template>

<script>
import inputMixin from './inputMixin'
export default {
	mixins: [inputMixin],
	props: {
		value: Boolean,
	}
}
</script>