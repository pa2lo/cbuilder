<template>
	<SettingsField :labelData="labelData" elType="div">
		<ColorPicker 
			:value="value"
			:resetable="resetable"
			@input="$emit('input', $event)"
		/>
	</SettingsField>
</template>

<script>
import ColorPicker from '../plugins/colorpicker'
import inputMixin from './inputMixin'
export default {
	mixins: [inputMixin],
	props: ['value', 'resetable'],
	components: {ColorPicker}
}
</script>