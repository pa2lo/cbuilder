<template>
    <div class="color-type">
        <!-- <input
            v-model="modelColor"
            class="value"
        > -->
		<input
			class="value"
			:value="computedColor"
			@input="emitInput($event.target.value)"
		>
    </div>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            default: ''
        },
        color: {
            type: String,
            default: ''
		},
		alpha: {
			type: Number,
			default: 1
		}
    },
    computed: {
		computedColor() {
			if (this.alpha == 0) {
				return ''
			} else {
				return this.color
			}
		},
        /* modelColor: {
            get() {
				return this.color
            },
            set(val) {
				if (this.type == "HEX") {
					if (val[0] != "#") val = `#${val}`
					if (val.length > 3) {
						this.$emit('inputColor', val)
					}
				} else this.$emit('inputColor', val)
            }
        } */
	},
	methods: {
		emitInput(val) {
			let nval = val.trim()
			if (this.type == "HEX") {
				if (nval[0] != "#") val = nval = `#${nval}`
				if (nval.length == 4 || nval.length == 7) {
					this.$emit('inputColor', nval)
				}
			} else this.$emit('inputColor', nval)
		}
	}
}
</script>