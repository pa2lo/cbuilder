<template>
    <div
        class="saturation"
        @mousedown.prevent.stop="selectSaturation"
    >
        <canvas ref="canvasSaturation" />
        <div
            :style="[
				slideSaturationStyle,
				{background: color}
			]"
            class="slide"
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
            default: '#000000'
        },
        hsv: {
            type: Object,
            default: null
        },
        size: {
            type: Number,
            default: 152
		},
		height: {
			type: Number,
			default: 140
		}
    },
    data() {
        return {
            slideSaturationStyle: {}
        }
    },
    // 不能监听，否则自己改变自己时，颜色也会发生变化
    // watch: {
    //     color() {
    //         this.renderColor()
    //     }
    // },
    mounted() {
        this.renderColor()
        this.renderSlide()
    },
    methods: {
        renderColor() {
            const canvas = this.$refs.canvasSaturation
			const size = this.size
			const height = this.height
            const ctx = canvas.getContext('2d')
            canvas.width = size
            canvas.height = height

            ctx.fillStyle = `hsl(${this.hsv.h},100%,50%)`
            ctx.fillRect(0, 0, size, height)

            this.createLinearGradient('l', ctx, size, height, '#FFFFFF', 'rgba(255,255,255,0)')
            this.createLinearGradient('p', ctx, size, height, 'rgba(0,0,0,0)', '#000000')
        },
        renderSlide() {
            this.slideSaturationStyle = {
                left: this.hsv.s * this.size - 6 + 'px',
                top: (1 - this.hsv.v) * this.height - 6 + 'px'
            }
        },
        selectSaturation(e) {
			const { top: saturationTop, left: saturationLeft } = this.$el.getBoundingClientRect()
			//const ctx = e.target.getContext('2d')
			const ctx = this.$refs.canvasSaturation.getContext('2d')
			
            const mousemove = e => {
                let x = e.clientX - saturationLeft
                let y = e.clientY - saturationTop

                if (x < 0) x = 0
                if (y < 0) y = 0
                if (x > this.size) x = this.size
                if (y > this.height) y = this.height

                // 不通过监听数据变化来修改dom，否则当颜色为#ffffff时，slide会跑到左下角
                this.slideSaturationStyle = {
                    left: x - 6 + 'px',
                    top: y - 6 + 'px'
                }
                // 如果用最大值，选择的像素会是空的，空的默认是黑色
                const imgData = ctx.getImageData(Math.min(x, this.size - 1), Math.min(y, this.size - 1), 1, 1)
                const [r, g, b] = imgData.data
                this.$emit('selectSaturation', { r, g, b })
            }

            mousemove(e)

            const mouseup = (e) => {
				document.removeEventListener('mousemove', mousemove)
				document.removeEventListener('mouseup', mouseup)
				//this.$emit('dragging', false)
            }

            document.addEventListener('mousemove', mousemove)
            document.addEventListener('mouseup', mouseup)
			//this.$emit('dragging', true)
        }
    }
}
</script>