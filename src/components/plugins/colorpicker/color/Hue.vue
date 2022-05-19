<template>
    <div
        class="hue"
        @mousedown.prevent.stop="selectHue"
    >
        <canvas ref="canvasHue" />
        <div
            :style="[
				slideHueStyle,
				{background: `hsl(${hueval}, 100%, 50%)`}
			]"
            class="slide"
        />
    </div>
</template>

<script>
export default {
    props: {
        hsv: {
            type: Object,
            default: null
        },
        width: {
            type: Number,
            default: 198
        },
        height: {
            type: Number,
            default: 14
        }
    },
    data() {
        return {
			hueval: this.hsv.h,
            slideHueStyle: {}
        }
    },
    // 不能监听，否则操作saturation时，这里的slide会抖动
    // watch: {
    //     'hsv.h'() {
    //         this.renderSlide()
    //     }
    // },
    mounted() {
        this.renderColor()
        this.renderSlide()
    },
    methods: {
        renderColor() {
            const canvas = this.$refs.canvasHue
            const width = this.width
            const height = this.height
            const ctx = canvas.getContext('2d')
            canvas.width = width
            canvas.height = height

            const gradient = ctx.createLinearGradient(0, 0, width, 0)
            gradient.addColorStop(0, '#FF0000') // 红
            gradient.addColorStop(0.17 * 1, '#FF00FF') // 紫
            gradient.addColorStop(0.17 * 2, '#0000FF') // 蓝
            gradient.addColorStop(0.17 * 3, '#00FFFF') // 青
            gradient.addColorStop(0.17 * 4, '#00FF00') // 绿
            gradient.addColorStop(0.17 * 5, '#FFFF00') // 黄
            gradient.addColorStop(1, '#FF0000') // 红
            ctx.fillStyle = gradient
			ctx.fillRect(0, 0, width, height)
        },
        renderSlide() {
			this.hueval = this.hsv.h
            this.slideHueStyle = {
                left: (1 - this.hsv.h / 360) * this.width - 10 + 'px'
            }
        },
        selectHue(e) {
            const { left: hueLeft } = this.$el.getBoundingClientRect()
            //const ctx = e.target.getContext('2d')

            const mousemove = e => {
                let x = e.clientX - hueLeft

                if (x < 0) x = 0
                if (x > this.width) x = this.width

                this.slideHueStyle = {
                    left: x - 10 + 'px'
                }
                // 如果用最大值，选择的像素会是空的，空的默认是黑色
				//const imgData = ctx.getImageData(Math.min(x, this.width - 1), 0, 1, 1)
				//const [r, g, b] = imgData.data
				//this.$emit('selectHue', { r, g, b })
				let newhue = ( 1 - (x / this.width) ) * 360
				this.hueval = newhue
				this.$emit('selectHue', newhue )
            }

            mousemove(e)

            const mouseup = () => {
                document.removeEventListener('mousemove', mousemove)
				document.removeEventListener('mouseup', mouseup)
				/* setTimeout(() => {
					this.$emit('dragging', false)
				}, 100); */
            }

            document.addEventListener('mousemove', mousemove)
			document.addEventListener('mouseup', mouseup)
			/* this.$emit('dragging', true) */
        }
    }
}
</script>