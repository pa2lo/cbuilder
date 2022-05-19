<template>
	<div
		:style="{
			width: width+'px'
		}"
	>
		{{ value }}
		<Saturation
			:satHeight = satHeight
			:width = width
			:hsl = hsl
		/>
	</div>
</template>

<script>
import Saturation from './Saturation.vue'
export default {
	components: {Saturation},
	props: {
		value: String,
		width: {
			type: Number,
			default: 200
		}
	},
	data() {
		return {
			satHeight: 120,
			originalValue: this.value,
			h: '',
			s: '',
			v: '',
			r: '',
			g: '',
			b: '',
			hex: ''
		}
	},
	mounted() {
		//console.log('mounted')
		/*this.hex = this.value
		let rgb = this.hex2rgb(this.value)
		let hsv = this.rgb2hsl(rgb)
		this.r = rgb.r
		this.g = rgb.g
		this.b = rgb.b
		this.h = hsv.h
		this.s = hsv.s
		this.v = hsv.v*/
	},
	computed: {
		hsl() {
			console.log('updejtid')
			return this.hex2hsl(this.value)
			/* return {
				h: this.h,
				s: this.s,
				v: this.v
			} */
		}
	},
	methods: {
		hex2hsl(hex) {
			return this.rgb2hsl(this.hex2rgb(hex))
		},
		hex2rgb(hex) {
			// Convert hex to RGB first
			let r = 0, g = 0, b = 0;
			if (hex.length == 4) {
				return {
					r: parseInt( `${hex[1]}${hex[1]}`, 16 ),
					g: parseInt( `${hex[1]}${hex[1]}`, 16 ),
					b: parseInt( `${hex[1]}${hex[1]}`, 16 ),
				}
			} else if (hex.length == 7) {
				return {
					r: parseInt( hex.slice(1, 3), 16 ),
					g: parseInt( hex.slice(3, 5), 16 ),
					b: parseInt( hex.slice(5, 7), 16 ),
				}
			}
		},
		rgb2hsl({ r, g, b }) {
			// Then to HSL
			r /= 255;
			g /= 255;
			b /= 255;
			let cmin = Math.min(r,g,b),
				cmax = Math.max(r,g,b),
				delta = cmax - cmin,
				h = 0,
				s = 0,
				v = 0;

			if (delta == 0)
				h = 0;
			else if (cmax == r)
				h = ((g - b) / delta) % 6;
			else if (cmax == g)
				h = (b - r) / delta + 2;
			else
				h = (r - g) / delta + 4;

			h = Math.round(h * 60);

			if (h < 0)
				h += 360;

			s = parseFloat((cmax === 0 ? 0 : 1 - cmin / cmax).toFixed(2))
            v = parseFloat(cmax.toFixed(2))

			//v = (cmax + cmin) / 2;
			//s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * v - 1));
			s = +(s * 100).toFixed(1);
			v = +(v * 100).toFixed(1);

			return {
				h: h,
				s: s,
				v: v
			};
		},
		HSLToHex(h,s,l) {
			s /= 100;
			l /= 100;

			let c = (1 - Math.abs(2 * l - 1)) * s,
				x = c * (1 - Math.abs((h / 60) % 2 - 1)),
				m = l - c/2,
				r = 0,
				g = 0,
				b = 0;

			if (0 <= h && h < 60) {
				r = c; g = x; b = 0;
			} else if (60 <= h && h < 120) {
				r = x; g = c; b = 0;
			} else if (120 <= h && h < 180) {
				r = 0; g = c; b = x;
			} else if (180 <= h && h < 240) {
				r = 0; g = x; b = c;
			} else if (240 <= h && h < 300) {
				r = x; g = 0; b = c;
			} else if (300 <= h && h < 360) {
				r = c; g = 0; b = x;
			}
			// Having obtained RGB, convert channels to hex
			r = Math.round((r + m) * 255).toString(16);
			g = Math.round((g + m) * 255).toString(16);
			b = Math.round((b + m) * 255).toString(16);

			// Prepend 0s, if necessary
			if (r.length == 1)
				r = "0" + r;
			if (g.length == 1)
				g = "0" + g;
			if (b.length == 1)
				b = "0" + b;

			return "#" + r + g + b;
		}
	}
}
</script>

<style>

</style>