<template>
	<div 
		class="block image-block"
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
			<div class="imgOuter" ref="outerRef">
				<img 
					:src="block.data.src"
					:style="{
						width: `${block.data.width}px`,
						borderRadius: imageRadius
					}"
					ref="img"
				/>
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
			title="Edit image"
			@edit="showEditor"
		/>
		<transition name="nbe-fade">
		<ImageBlockEditor 
			v-if="editorEnabled"
			title="Edit image"
			:style="[editorPosition]"
			:settings="block.settings"
			:data="block.data"
			:imgRef="imgEl()"
			:outerRef="outerRefEL()"
			@setWidth="setWidth"
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
import ImageBlockEditor from './editors/ImageBlockEditor.vue'
import blockMixin from './blockMixin'
export default {
	props: ['block'],
	mixins: [blockMixin],
	components: {ComponentControls, ComponentControlsEdit, ImageBlockEditor},
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
		imageRadius() {
			return `${this.block.data.radius[0]}px ${this.block.data.radius[1]}px ${this.block.data.radius[2]}px ${this.block.data.radius[3]}px`
		}
	},
	mounted() {
		let mw = this.$refs.outerRef.getBoundingClientRect().width
		if (this.block.data.width > mw) this.block.data.width = mw
	},
	methods: {
		outerRefEL() {
			return this.$refs.outerRef
		},
		setWidth(w) {
			this.block.data.width = w
		},
		imgEl() {
			return this.$refs.img
		}
	}
}
</script>