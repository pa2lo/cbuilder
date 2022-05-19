<template>
	<div 
		class="block youtube-block"
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
			}"
			v-on="editorEnabled ? {} : {
				click: showEditor
			}"
		>
			<div class="imgOuter" ref="outerRef">
				<img 
					:src="computedsrc"
					:style="{
						width: `${block.data.width}px`
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
			title="Edit youtube"
			@edit="showEditor"
		/>
		<transition name="nbe-fade">
		<YoutubeBlockEditor 
			v-if="editorEnabled"
			title="Edit youtube"
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
import YoutubeBlockEditor from './editors/YoutubeBlockEditor.vue'
import blockMixin from './blockMixin'
export default {
	props: ['block'],
	mixins: [blockMixin],
	components: {ComponentControls, ComponentControlsEdit, YoutubeBlockEditor},
	data() {
		return {
			editorHeight: 290,
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
		computedsrc() {
			return `https://i.vimeocdn.com/filter/overlay?src=http://img.youtube.com/vi/${this.block.data.videoid}/0.jpg&src=http://nws.6f.sk/images/res/youtube/${this.block.data.icon}.png`
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