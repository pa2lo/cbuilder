<template>
	<component
		:is="elType"
		class="settingsField flex"
	>
		<div class="settingsFieldTitle flex ai-center">
			{{ labelData.title }}
			<span
				v-if="labelData.tooltip"
				class="ttip long"
				:data-title="labelData.tooltip"
			><i class="icco icco-info md-24"></i></span>
		</div>
		<div class="settingsFieldInputCont flex ai-center jc-end">
			<slot />
		</div>
	</component>
</template>

<script>
export default {
	props: {
		labelData: Object,
		elType: {
			type: String,
			default: 'label'
		}
	}
}
</script>