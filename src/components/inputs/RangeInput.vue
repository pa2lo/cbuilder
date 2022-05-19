<template>
	<SettingsField :labelData="labelData" elType="div">
		<input 
			class="nb-range-slider"
			type="range"
			:value="value"
			:min="min || 0"
			:max="max || 50"
      		@input="$emit('input', $event.target.value)"
		/>
		<label class="nb-input-group flex ai-center">
			<input
				class="nb-text range"
				type="text"
				:value="value"
				@input="$emit('input', $event.target.value)"
			/>
			<span v-if="postfix" class="nb-range-postfix">{{ postfix }}</span>
		</label>
	</SettingsField>
</template>

<script>
import inputMixin from './inputMixin'
export default {
	mixins: [inputMixin],
	props: ["value", "min", "max", "postfix"]
}
</script>