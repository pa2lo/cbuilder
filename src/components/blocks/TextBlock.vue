<template>
	<div 
		class="block text-block"
		:class="{
			edited: settingsOpen == true,
			editorenabled: editorEnabled == true
		}"
	>
		<div
			class="block-inner"
			:style="{
				backgroundColor: block.settings.backgroundColor,
				color: block.settings.textColor,
				lineHeight: block.settings.lineHeight,
				fontFamily: block.settings.fontFace,
				fontSize: block.settings.fontSize ? `${block.settings.fontSize}px` : '',
				textAlign: block.settings.textAlign
			}"
			v-on="editorEnabled ? {} : {
				click: editText
			}"
		>
			<div 
				:style="{
					padding: blockPadding,
				}"
				class="textEditor"
				ref="textEditor"
				@input="updateContent"
			/>
			<div v-if="editorEnabled" class="textEditorButtons">
				<button class="textEditorButton ttip med cancel" data-title="Return original content and close" @mousedown.stop="buttonClose()">Cancel</button>
				<button class="textEditorButton ttip save" data-title="Sace and close">Save</button>
			</div>
		</div>
		<ComponentControls
			@movedown="$emit('movedown')"
			@moveup="$emit('moveup')"
			@buildsettings="showSettings"
			@clone="$emit('clone')"
			@remove="remove"
		/>
		<ComponentControlsEdit
			title="Edit text"
			@edit="editText"
		/>
	</div>
</template>

<script>
import ComponentControls from '../ComponentControls.vue'
import ComponentControlsEdit from '../ComponentControlsEdit.vue'
import TextBlockSettings from './settings/TextBlockSettings.vue'
import blockMixin from './blockMixin'
import debounce from 'lodash/debounce'
export default {
	props: ['block'],
	mixins: [blockMixin],
	components: {ComponentControls, ComponentControlsEdit},
	data() {
		return {
			settingsComponent: TextBlockSettings,
			settingsProps: {
				settings: this.block.settings
			},
			editor: false
		}
	},
	computed: {
		blockPadding() {
			return `${this.block.settings.padding[0]}px ${this.block.settings.padding[1]}px ${this.block.settings.padding[2]}px ${this.block.settings.padding[3]}px`
		}
	},
	beforeDestroy() {
		this.destroyTextEditor()
	},
	mounted() {
		this.$refs.textEditor.innerHTML = this.block.data.content
	},
	methods: {
		buttonClose(cancel) {
			this.clickedBtn = true
			this.destroyTextEditor(true, true)
		},
		updateContent: debounce(function(v) {
				this.updateContentDirect()
		}, 750),
		updateContentDirect() {
			this.block.data.content = this.$refs.textEditor.innerHTML
		},
		editText() {
			if (!this.editorEnabled) {
				tinymce.init({
					target: this.$refs.textEditor,
					menubar: false,
					inline: true,
					plugins: [
						'link',
						'lists',
						'autolink',
						'image',
						'code',
						'table'
					],
					toolbar: [
						'bold italic underline strikethrough | forecolor backcolor | alignleft aligncenter alignright alignjustify | numlist bullist',
						'fontselect | fontsizeselect | image link | table | code'
					],
					fontsize_formats: "8px 10px 12px 14px 16px 18px 20px 22px 24px 26px 28px 30px 32px 34px 36px",
					init_instance_callback: (element) => {
						this.showSettings()
						this.editor = element
						this.editorEnabled = true
						this.backupData = JSON.parse(JSON.stringify(this.block.data.content))
						element.focus()
						element.on('blur', (e) => {
							this.destroyTextEditor()
						})
					}
				})
			}
		},
		destroyTextEditor(revert = false, setclick) {
			if (this.editorEnabled && (!this.clickedBtn || setclick )) {
				if (this.editor) this.editor.destroy(false)
				if (!revert) {
					this.$refs.textEditor.querySelectorAll('p').forEach((p) => {
						if (!p.style.marginTop) p.style.marginTop = "15px"
						if (!p.style.marginBottom) p.style.marginBottom = "15px"
					})
					this.updateContentDirect()
				} else {
					this.block.data.content = this.backupData
					this.$refs.textEditor.innerHTML = this.backupData
				}
				this.editor = this.editorEnabled = false
				if (setclick) this.clickedBtn = false
			}
		}
	}
}
</script>