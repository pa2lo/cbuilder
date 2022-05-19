<template>
    <div
        class="hu-color-picker"
		:class="{ left: alignLeft }"
    >
	<!-- v-clickoutside="closePop" -->
		<Saturation
			ref="saturation"
			:color="rgbString"
			:hsv="hsv"
			:size="saturationWidth"
			@selectSaturation="selectSaturation"
			@dragging="setDragging"
		/>
		<div class="hu-cp-container">
			<Hue
				ref="hue"
				:hsv="hsv"
				:width="hueWidth"
				:height="hueHeight"
				@selectHue="selectHue2"
				@dragging="setDragging"
			/>
			<div class="color-show">
				<Preview
					:color="rgbaString"
					:height="previewHeight"
					:oldColor="originalColor"
					@selectColor="selectColor"
				/>
				<!-- <Box
					type="HEX"
					:color="modelHex"
					:alpha="a"
					@inputColor="inputHex"
				/> -->
			</div>
			<Colors
				:color="rgbaString"
				:colors-default="colorsDefault"
				@selectColor="selectColor"
			/>
		</div>
		<div v-if="showButtons" class="hu-buttons">
			<button v-if="resetable" class="hu-button" title="Reset color to transparent" @click.stop="resetPop">Reset</button>
			<button class="hu-button cancel" title="Return original color and close" @click.stop="cancelPop">Cancel</button>
			<button class="hu-button save" title="Save and close" @click.stop="closePop">Save</button>
		</div>
    </div>
</template>

<script>
import mixin from './mixin'
import Saturation from './Saturation.vue'
import Hue from './Hue.vue'
import Preview from './Preview.vue'
import Box from './Box.vue'
import Colors from './Colors.vue'
export default {
    components: {
        Saturation,
        Hue,
        Preview,
        Box,
		Colors
    },
	mixins: [mixin],
	props: ['value', 'colorsDefault', 'showButtons', 'originalColor', 'alignLeft', 'resetable'],
    data() {
        return {
			dragging: false,
			saturationWidth: 218,
            hueWidth: 198,
            hueHeight: 10,
            previewHeight: 30,
            modelRgba: '',
            modelHex: '',
            r: 0,
            g: 0,
            b: 0,
            a: 1,
            h: 0,
            s: 0,
            v: 0
        }
    },
    computed: {
        isLightTheme() {
            return this.theme === 'light'
        },
        rgba() {
            return {
                r: this.r,
                g: this.g,
                b: this.b,
                a: this.a
            }
        },
        hsv() {
            return {
                h: this.h,
                s: this.s,
                v: this.v
            }
        },
        rgbString() {
            return `rgb(${this.r}, ${this.g}, ${this.b})`
        },
        rgbaStringShort() {
            return `${this.r}, ${this.g}, ${this.b}, ${this.a}`
        },
        rgbaString() {
            return `rgba(${this.rgbaStringShort})`
        },
        hexString() {
            return this.rgb2hex(this.rgba, true)
        }
    },
    created() {
		let clr = this.value
		if (this.value == 'transparent' || this.value == false) {
			clr = 'rgba(0,0,0,0)'
			//this.originalColor = 'rgba(0,0,0,0)'
		}/* else this.originalColor = this.value*/
		Object.assign(this, this.setColorValue(clr))
		//Object.assign(this, this.setColorValue(this.value))
		this.setText()

		//document.body.addEventListener('click', this.handleClick)

        // 避免初始化时，也会触发changeColor事件
        this.$watch('rgba', () => {
			this.$emit('input', this.a == 0 ? '' : this.modelHex)
			//this.$emit('input', this.modelHex)
        })
	},
	/*beforeDestroy() {
		document.body.removeEventListener('click', this.handleClick)
	},*/
    methods: {
		/* handle click outside */
		/*handleClick(event) {
			if (!(this.$el == event.target || this.$el.contains(event.target))) {
				this.closePop()
			}
		},*/
		/* handle dragging */
		setDragging(v) {
			this.dragging = v
		},
		/* pop related */
		closePop() {
			if(!this.dragging) this.$emit('closePop')
		},
		cancelPop() {
			//this.selectColor(this.originalColor, true)
			//this.closePop(this.originalColor)
			this.$emit('closePop', 'return')
		},
		resetPop() {
			//this.selectColor("rgba(0,0,0,0)", true)
			//this.closePop()
			this.$emit('closePop', 'reset')
		},
        selectSaturation(color) {
			this.a = 1
            const { r, g, b, h, s, v } = this.setColorValue(color)
            Object.assign(this, { r, g, b, h, s, v })
            this.setText()
        },
        selectHue(color) {
			this.a = 1
            //const { r, g, b, h, s, v } = this.setColorValue(color)
			const { r, g, b, s, v } = this.setColorValue(color)
			this.h = color
            Object.assign(this, { r, g, b, s, v })
            this.setText()
            this.$nextTick(() => {
                this.$refs.saturation.renderColor()
                this.$refs.saturation.renderSlide()
            })
		},
		selectHue2(hue) {
			this.a = 1
			const { r, g, b, h, s, v } = this.setColorValue({
				h: hue,
				s: this.s,
				v: this.v,
				type: 5
			})
			//Object.assign(this, { r, g, b, h, s, v })
			Object.assign(this, { r, g, b, s, v })
			this.h = hue
			this.setText()
            this.$nextTick(() => {
                this.$refs.saturation.renderColor()
                this.$refs.saturation.renderSlide()
			})
		},
        selectAlpha(a) {
            this.a = a
            this.setText()
        },
        inputHex(color) {
			let newcolor = color
			if (color.length == 4) newcolor = `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`
            const { r, g, b, a, h, s, v } = this.setColorValue(newcolor)
            Object.assign(this, { r, g, b, a, h, s, v })
            this.modelHex = color
            //this.modelRgba = this.rgbaStringShort
            this.$nextTick(() => {
                this.$refs.saturation.renderColor()
                this.$refs.saturation.renderSlide()
                this.$refs.hue.renderSlide()
            })
        },
        inputRgba(color) {
            const { r, g, b, a, h, s, v } = this.setColorValue(color)
            Object.assign(this, { r, g, b, a, h, s, v })
            this.modelHex = this.hexString
            //this.modelRgba = color
            this.$nextTick(() => {
                this.$refs.saturation.renderColor()
                this.$refs.saturation.renderSlide()
                this.$refs.hue.renderSlide()
            })
        },
        setText() {
            this.modelHex = this.hexString
            //this.modelRgba = this.rgbaStringShort
        },
        selectColor(color, norender = false) {
            const { r, g, b, a, h, s, v } = this.setColorValue(color)
            Object.assign(this, { r, g, b, a, h, s, v })
			this.setText()
			if (norender) return
            this.$nextTick(() => {
                this.$refs.saturation.renderColor()
                this.$refs.saturation.renderSlide()
                this.$refs.hue.renderSlide()
            })
        }
    }
}
</script>