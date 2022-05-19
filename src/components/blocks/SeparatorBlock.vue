<template>
	<div 
		class="block separator-block"
		:class="{
			edited: settingsOpen == true,
			editorenabled: editorEnabled == true
		}"
	>
		<div
			class="block-inner"
			:style="{
				padding: blockPadding,
				backgroundColor: block.settings.backgroundColor
			}"
			v-on="editorEnabled ? {} : {
				click: showEditor
			}"
		>
			<div
				:style="{
					borderStyle: block.data.style,
					borderWidth: `${block.data.height}px 0 0`,
					borderColor: block.data.color
				}"
			></div>
		</div>
		<ComponentControls
			@movedown="$emit('movedown')"
			@moveup="$emit('moveup')"
			@buildsettings="showSettings"
			@clone="$emit('clone')"
			@remove="remove"
		/>
		<ComponentControlsEdit
			title="Edit separator"
			@edit="showEditor"
		/>
		<transition name="nbe-fade">
		<SeparatorBlockEditor 
			v-if="editorEnabled"
			title="Edit separator"
			:style="[editorPosition]"
			:settings="block.settings"
			:data="block.data"
			@editorReset="closeEditor(true)"
			@editorClose="closeEditor"
		/>
		</transition>
	</div>
</template>

<script>
import ComponentControls from '../ComponentControls.vue'
import ComponentControlsEdit from '../ComponentControlsEdit.vue'
import SeparatorBlockSettings from './settings/SeparatorBlockSettings.vue'
import SeparatorBlockEditor from './editors/SeparatorBlockEditor.vue'
import blockMixin from './blockMixin'
export default {
	props: ['block'],
	mixins: [blockMixin],
	components: {ComponentControls, ComponentControlsEdit, SeparatorBlockEditor},
	data() {
		return {
			settingsComponent: SeparatorBlockSettings,
			editorHeight: 210,
			settingsProps: {
				settings: this.block.settings
			}
		}
	},
	computed: {
		blockPadding() {
			return `${this.block.settings.padding[0]}px ${this.block.settings.padding[1]}px`
		}
	}
}
</script>