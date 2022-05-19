<template>
	<draggable
		:list="data"
		handle=".moveBlock"
		group="blocks"
		class="column"
		:class="colClass"
		:style="{
			padding: colPadding,
			backgroundColor: settings.backgroundColor || ''
		}"
	>
		<component
			v-for="(block, index) in data"
			:key="block.cid"
			:is="block.name"
			:block="block"
			@movedown="movedownrow(index)"
			@moveup="moveuprow(index)"
			@clone="clonerow(index)"
			@remove="removerow(index)"
		/>
	</draggable>
</template>

<script>
import HeaderBlock from './blocks/HeaderBlock.vue'
import ImageBlock from './blocks/ImageBlock.vue'
import TextBlock from './blocks/TextBlock.vue'
import SpacerBlock from './blocks/SpacerBlock.vue'
import SeparatorBlock from './blocks/SeparatorBlock.vue'
import ButtonBlock from './blocks/ButtonBlock.vue'
import CountdownBlock from './blocks/CountdownBlock.vue'
import YoutubeBlock from './blocks/YoutubeBlock.vue'
import ControlMethods from './mixins/ControlMethods'
import draggable from 'vuedraggable'
export default {
	mixins: [ControlMethods],
	components: {HeaderBlock, ImageBlock, TextBlock, SpacerBlock, SeparatorBlock, ButtonBlock, CountdownBlock, YoutubeBlock, draggable},
	props: ['settings', 'data', 'index'],
	computed: {
		colClass() {
			return `col-${this.index+1}`
		},
		colPadding() {
			if (!this.settings.padding) return '0px'
			return `${this.settings.padding.top}px ${this.settings.padding.right}px ${this.settings.padding.bottom}px ${this.settings.padding.left}px`
		}
	}
}
</script>