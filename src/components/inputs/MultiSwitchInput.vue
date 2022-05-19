<template>
	<SettingsField :labelData="labelData">
		<div class="nb-mswitch-cont flex">
			<label
				v-for="(option, index) in scopedOptions"
				:key="index"
				class="nb-mswitch-label"
				:class="{
					ttip: option.icon
				}"
				:data-title="option.label"
			>
				<input
					class="nb-mswitch-input"
					type="radio" 
					:name="uuid"
					:value="option.val"
					:checked="option.val == value"
					@change="$emit('input', option.val)"
				/>
				<div class="nb-mswitch-option" v-html="option.icon || option.label" />
			</label>
		</div>
	</SettingsField>
</template>

<script>
import inputMixin from './inputMixin'
import uuid from '../mixins/uuid'
export default {
	mixins: [inputMixin, uuid],
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