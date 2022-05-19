<template>
	<div class="hu-cp-wrapper">
		<div class="hu-picker-combined-input flex">
			<button
				class="hu-picker-opener"
				@click="togglePicker"
			>
				<span class="hu-picker-placeholder" :style="{backgroundColor: value || 'transparent'}"/>
			</button>
			<input 
				class="nb-text"
				:value="value"
				placeholder="Select color..."
				@input="emitInput($event.target.value)"
				@focus="showPicker"
			/>
		</div>
		<transition name="nbe-fade">
			<picker-popup
				v-if="pickerOpen"
				ref="pickerPopup"
				:value="value"
				:colorsDefault="computedColorsDefault"
				:showButtons="showButtons"
				:originalColor="originalColor"
				:alignLeft="alignLeft"
				:style="[getPickerTop()]"
				:resetable="resetable"
				@input="$emit('input', $event)"
				@closePop="closePop"
			/>
		</transition>
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
                '#00BEFF', '#2E81FF', '#5D61FF', '#FF89CF', '#FC3CAD', '#BF3DCE', '#8E00A7'
            ]
		},
		showButtons: {
			type: Boolean,
			default: true
		},
		resetable: {
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
	beforeDestroy() {
		if (this.pickerOpen) this.closePicker()
	},
	computed: {
		computedColorsDefault() {
			let colorsArr = this.colorsDefault
			if (this.resetable) colorsArr.push('rgba(0,0,0,0)')
			return colorsArr
		}
	},
	methods: {
		togglePicker() {
			if (!this.pickerOpen) this.showPicker()
			else this.closePicker()
		},
		showPicker() {
			if (!this.pickerOpen) {
				this.pickerOpen = true
				this.initClick = true
				document.body.addEventListener('mousedown', this.handleClicks)
			}
		},
		closePicker() {
			//if (this.$refs.pickerPopup.dragging) return
			this.pickerOpen = false
			this.initClick = false
			document.body.removeEventListener('mousedown', this.handleClicks)
		},
		handleClicks(event) {
			if (!(this.$el == event.target || this.$el.contains(event.target))) {
				this.closePicker()
			}
		},
		getPickerTop() {
			let elPos = this.$el.getBoundingClientRect()
			let winHeight = window.innerHeight
			//let conte = this.$el.closest('.nb-tab-section')
			let conte = this.$el.closest('.isScrollable')
			let sct = conte ? conte.scrollTop : 0

			if ( (elPos.top + 305) > winHeight ) {
				return {top: `${this.$el.offsetTop - sct - 273}px`}
			} else {
				return {top: `${this.$el.offsetTop - sct + 32}px`}
			}
		},
		/*emitColor(color) {
			this.$emit('input', color)
		},*/
		closePop(type = false) {
			if (type == 'reset') {
				this.$emit('input', '')
			} else if (type == 'return') {
				this.$emit('input', this.originalColor)
			}
			//if(color != null) this.$emit('input', color)
			this.pickerOpen = false
		},
		emitInput(val) {
			//console.log(val)
			let nval = val.trim()
			if (!nval.length && this.resetable) this.$emit('input', '')
			if (nval[0] != "#") val = nval = `#${nval}`
			if (nval.length == 4 || nval.length == 7) {
				if (this.pickerOpen) this.$refs.pickerPopup.inputHex(nval)
				else this.$emit('input', nval)
			}
		}
	}
}
</script>