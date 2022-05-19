<template>
	<div
		class="vcp-saturation"
		:style="{
			height: satHeight+'px',
			backgroundColor: `hsl(${hsl.h}, 100%, 50%)`
		}"
	>
		<div
			class="slide"
			:style="slideStyle"
		/>
	</div>
</template>

<script>
export default {
	props: ['satHeight', 'hsl', 'width'],
	computed: {
		slideStyle() {
			return {
				top: ( ( 1 - (this.hsl.v / 100) ) * this.satHeight ) - 5 +"px",
				left: ( (this.hsl.s / 100) * this.width ) - 5 +"px",
			}
		}
	}
}
</script>

<style lang="scss">
.vcp-saturation {
	position: relative;
	&::before, &::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	&::before {
		background: linear-gradient(to right, #fff, transparent);
	}
	&::after {
		background: linear-gradient(transparent, #000);
	}

	.slide {
		z-index: 1;
		position: absolute;
		width: 10px;
		height: 10px;
		border-radius: 5px;
		box-shadow: 0 0 0 1px #fff;
	}
}
</style>