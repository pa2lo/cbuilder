<template>
	<div 
		class="block countdown-block"
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
			<div class="imgOuter" ref="outerRef">
				<img 
					:src="countdownSrc"
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
			title="Edit countdown"
			@edit="showEditor"
		/>
		<transition name="nbe-fade">
		<CountdownBlockEditor 
			v-if="editorEnabled"
			title="Edit countdown"
			:style="[editorPosition]"
			:data="block.data"
			:imgRef="imgEl()"
			:outerRef="outerRefEL()"
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
import CountdownBlockEditor from './editors/CountdownBlockEditor.vue'
import blockMixin from './blockMixin'
export default {
	props: ['block'],
	mixins: [blockMixin],
	components: {ComponentControls, ComponentControlsEdit, CountdownBlockEditor},
	data() {
		return {
			editorHeight: 370,
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
		countdownSrc() {
			let url = `http://nws.6f.sk/imagemaker/countdown.gif?time=${this.block.data.date}+${this.block.data.time}&backgroundColor=${this.block.data.backgroundColor.replace('#', '')}&textColor=${this.block.data.color.replace('#', '')}&lang=${this.block.data.language}&fface=${this.block.data.font}`
			if (this.block.data.timezone) url += `&timezone=${this.block.data.timezone}`
			return url
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
		imgEl() {
			return this.$refs.img
		}
	}
}
</script>