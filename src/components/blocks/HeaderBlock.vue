<template>
	<div 
		class="block header-block"
		:class="{
			edited: settingsOpen == true,
			editorenabled: editorEnabled == true
		}"
	>
		<div
			class="block-inner"
			:style="{
				padding: blockPadding,
				backgroundColor: block.settings.backgroundColor,
				fontSize: `${block.data.fontSize}px`,
				color: block.data.color,
				textAlign: block.data.textAlign,
				fontWeight: block.data.bold ? 'bold' : '',
				fontFamily: block.data.fontFace,
				fontStyle: block.data.fontStyle,
				textDecoration: block.data.underline ? 'underline' : ''
			}"
			v-on="editorEnabled ? {} : {
				click: showEditor
			}"
		>
			<span 
				v-text="block.data.content" 
				class="contentEditableText"
				ref="headerBlockText" 
				:contenteditable="editorEnabled" 
				v-on="editorEnabled ? {
					input: updateContent,
					paste: handlePaste
				} : {}"
			/>
		</div>
		<ComponentControls
			@movedown="$emit('movedown')"
			@moveup="$emit('moveup')"
			@buildsettings="showSettings"
			@clone="$emit('clone')"
			@remove="remove"
		/>
		<ComponentControlsEdit
			title="Edit header"
			@edit="showEditor"
		/>
		<transition name="nbe-fade">
		<HeaderBlockEditor 
			v-if="editorEnabled"
			title="Edit header"
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
import BasicBlockSettings from './settings/BasicBlockSettings.vue'
import HeaderBlockEditor from './editors/HeaderBlockEditor.vue'
import blockMixin from './blockMixin'
import debounce from 'lodash/debounce'
export default {
	props: ['block'],
	mixins: [blockMixin],
	components: {ComponentControls, ComponentControlsEdit, HeaderBlockEditor},
	data() {
		return {
			settingsComponent: BasicBlockSettings,
			settingsProps: {
				settings: this.block.settings
			}
		}
	},
	computed: {
		blockPadding() {
			return `${this.block.settings.padding[0]}px ${this.block.settings.padding[1]}px ${this.block.settings.padding[2]}px ${this.block.settings.padding[3]}px`
		}
	},
	methods: {
		updateContent: debounce(function(v) {
				if (v.target.outerText) this.block.data.content = v.target.outerText
		}, 750),
		handlePaste(event) {
			event.preventDefault()
			let text = (event.originalEvent || event).clipboardData.getData('text/plain')
			document.execCommand("insertHTML", false, text)
		},
		showEditorCallback() {
			this.$nextTick(() => {
				this.$refs.headerBlockText.focus()
			})
		}
	}
}
</script>