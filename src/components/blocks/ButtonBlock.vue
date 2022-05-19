<template>
	<div 
		class="block button-block"
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
				textAlign: block.data.align
			}"
			v-on="editorEnabled ? {} : {
				click: showEditor
			}"
		>
			<span
				style="text-align: center; border-style: solid;"
				:style="{
					fontSize: `${block.data.fontSize}px`,
					color: block.data.color,
					backgroundColor: block.data.backgroundColor,
					display: block.data.fullWidth ? 'block' : 'inline-block',
					fontWeight: block.data.bold ? 'bold' : '',
					fontFamily: block.data.fontFace,
					padding: `${block.data.vSpace}px ${block.data.hSpace}px`,
					borderRadius: `${block.data.borderRadius}px`,
					borderWidth: computedBorderWidth,
					lineHeight: block.data.lineHieght,
					borderColor: block.data.borderColor || 'transparent'
				}"
			>
				<span 
					v-text="block.data.content" 
					class="contentEditableText"
					ref="buttonBlockText" 
					:contenteditable="editorEnabled" 
					v-on="editorEnabled ? {
						input: updateContent,
						paste: handlePaste
					} : {}"
				/>
			</span>
		</div>
		<ComponentControls
			@movedown="$emit('movedown')"
			@moveup="$emit('moveup')"
			@buildsettings="showSettings"
			@clone="$emit('clone')"
			@remove="remove"
		/>
		<ComponentControlsEdit
			title="Edit button"
			@edit="showEditor"
		/>
		<transition name="nbe-fade">
		<ButtonBlockEditor 
			v-if="editorEnabled"
			title="Edit button"
			:style="[editorPosition]"
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
import ButtonBlockEditor from './editors/ButtonBlockEditor.vue'
import blockMixin from './blockMixin'
import debounce from 'lodash/debounce'
export default {
	props: ['block'],
	mixins: [blockMixin],
	components: {ComponentControls, ComponentControlsEdit, ButtonBlockEditor},
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
		},
		computedBorderWidth() {
			if (this.block.data.borderType == 'none') return 0
			else if (this.block.data.borderType == 'around') return `${this.block.data.borderWidth}px`
			else if (this.block.data.borderType == 'bottom') return `0 0 ${this.block.data.borderWidth}px`
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
				this.$refs.buttonBlockText.focus()
			})
		}
	}
}
</script>