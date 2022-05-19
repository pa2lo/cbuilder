<template>
	<div class="hu-cp-wrapper">
		<button
			class="hu-picker-opener"
			@click="pickerOpen = !pickerOpen"
		>
			<span class="hu-picker-placeholder-bg">
				<span class="hu-picker-placeholder" :style="{backgroundColor: value || 'transparent'}"/>
			</span>
			<span class="hu-picker-icon"><span class="material-icons md-18">colorize</span></span>
		</button>
		<picker-popup
			v-if="pickerOpen"
			:value="value"
			:colorsDefault="colorsDefault"
			:showButtons="showButtons"
			:originalColor="originalColor"
			:alignLeft="alignLeft"
			@input="$emit('input', $event)"
			@closePop="closePop"
		/>
	</div>
</template>

<script>
import PickerPopup from './PickerPopup.vue'
export default {
	components: {
		PickerPopup
	},
	props: {
        value: {
            type: [String, Boolean],
            default: 'rgba(0,0,0,0)'
        },
        colorsDefault: {
            type: Array,
            default: () => [
                '#000000', '#FFFFFF', '#FF1900', '#F47365', '#FFB243', '#FFE623', '#6EFF2A', '#1BC7B1',
                '#00BEFF', '#2E81FF', '#5D61FF', '#FF89CF', '#FC3CAD', '#BF3DCE', '#8E00A7', 'rgba(0,0,0,0)'
            ]
		},
		showButtons: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			originalColor: this.value,
			pickerOpen: false,
			alignLeft: false
		}
	},
	mounted() {
		if (this.$el.getBoundingClientRect().left < 120) {
			this.alignLeft = true
		}
	},
	methods: {
		/*emitColor(color) {
			this.$emit('input', color)
		},*/
		closePop(type = false) {
			if (type == 'reset') {
				this.$emit('input', false)
			} else if (type == 'return') {
				this.$emit('input', this.originalColor)
			}
			//if(color != null) this.$emit('input', color)
			this.pickerOpen = false
		}
	}
}
</script>