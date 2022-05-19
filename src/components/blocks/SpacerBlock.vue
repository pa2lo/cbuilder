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
				backgroundColor: block.settings.backgroundColor,
				height: `${block.data.height}px`
			}"
			@click="showEditor(false)"
		>
			<div 
				class="resizable-handle"
				@mousedown.prevent="setHeight"
			>
				<span class="icco icco-code"></span> {{ block.data.height }}px
			</div>
		</div>
		<ComponentControls
			@movedown="$emit('movedown')"
			@moveup="$emit('moveup')"
			@buildsettings="showSettings"
			@clone="$emit('clone')"
			@remove="remove"
		/>
	</div>
</template>

<script>
import ComponentControls from '../ComponentControls.vue'
import SpacerBlockSettings from './settings/SpacerBlockSettings.vue'
import blockMixin from './blockMixin'
export default {
	props: ['block'],
	mixins: [blockMixin],
	components: {ComponentControls},
	data() {
		return {
			settingsComponent: SpacerBlockSettings,
			settingsProps: {
				settings: this.block.settings,
				data: this.block.data
			}
		}
	},
	methods: {
		setHeight(e) {
			const elBottom = e.clientY - this.block.data.height
			this.showEditor()
			this.editorEnabled = true

			const mousemove = e => {
				let y = Math.min(Math.max(parseInt(e.clientY - elBottom), 15), 130)
				this.block.data.height = y
            }

            const mouseup = () => {
                document.removeEventListener('mousemove', mousemove)
				document.removeEventListener('mouseup', mouseup)
				document.body.classList.remove('resizable-resizing')
				this.editorEnabled = false
            }

            document.addEventListener('mousemove', mousemove)
			document.addEventListener('mouseup', mouseup)
			document.body.classList.add('resizable-resizing')
		}
	}
}
</script>