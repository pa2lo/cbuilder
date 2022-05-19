<template>
	<BlockEditor
		:title="title"
		@editorClose="$emit('editorClose')"
		@editorReset="$emit('editorReset')"
	>
		<SettingsSection>
			<RangeInput min=1 max=30 title="Height" postfix="px" v-model="data.height" />
			<ColorInput title="Color" :resetable="false" v-model="data.color" />
			<SelectInput title="Style" :options="styleOptions" v-model="data.style" />
		</SettingsSection>
	</BlockEditor>
</template>

<script>
export default {
	props: ['title', 'settings', 'data'],
	data() {
		return {
			styleOptions: [{
				label: 'Solid',
				val: 'solid'
			}, {
				label: 'Dotted',
				val: 'dotted'
			}, {
				label: 'Dashed',
				val: 'dashed'
			}, {
				label: 'Double',
				val: 'double'
			}]
		}
	}
}
</script>