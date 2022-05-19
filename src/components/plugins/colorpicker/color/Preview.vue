<template>
    <!-- <canvas /> -->
	<div class="hu-preview-colors">
		<button 
			:style="{
				color: oldColor || 'transparent'
			}"
			@click="selectColor"
		/>
		<span 
			:style="{
				background: color
			}"
		/>
	</div>
</template>

<script>
import mixin from './mixin'
export default {
    mixins: [mixin],
    props: {
        color: {
            type: String,
            default: 'rgba(0,0,0,0)'
		},
		oldColor: {
			type: [String, Boolean],
			default: 'rgba(0,0,0,0)'
		}
	},
	methods: {
		selectColor() {
			/*let retcolor = this.oldColor
			if (this.oldColor == false || this.oldColor == "transparent") */
			this.$emit('selectColor', this.oldColor == 'transparent' || this.oldColor == false ? 'rgba(0,0,0,0)' : this.oldColor)
		}
	}
}
</script>