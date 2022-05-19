<template>
	<div class="nb-editor" :style="{transform: transform}">
		<header class="nb-editor-header">
			<span 
				class="nb-block-move"
				@mousedown.prevent="setTransform"
			><span class="icco icco-move"></span></span>
			{{ title }}
			<button
				class="nb-editor-close"
				@click.prevent="$emit('editorClose')"
			><span class="icco icco-x"></span></button>
		</header>
		<main class="nb-editor-content">
			<slot />
		</main>
		<footer class="nb-editor-footer flex">
			<button 
				class="nb-editor-button cancel ttip med"
				data-title="Return original settings and close"
				@click.prevent="$emit('editorReset')"
			>Cancel</button>
			<button 
				class="nb-editor-button save ttip"
				data-title="Sace and close"
				@click.prevent="$emit('editorClose')"
			>Save</button>
		</footer>
	</div>
</template>

<script>
export default {
	props: {title: String},
	data() {
		return {
			x: 0,
			y: 0
		}
	},
	created() {
		document.addEventListener('keydown', this.keydown)
	},
	beforeDestroy() {
		document.removeEventListener('keydown', this.keydown)
	},
	computed: {
		transform() {
			return `translate(${this.x}px, ${this.y}px)`
		}
	},
	methods: {
		keydown(e) {
			if (e.code == "Escape") this.$emit('editorClose')
		},
		setTransform(e) {
			const oX = e.clientX
			const oY = e.clientY
			const tX = this.x
			const tY = this.y

			const mousemove = e => {
				this.x = tX + (e.clientX - oX)
				this.y = tY + (e.clientY - oY)
			}

			const mouseup = () => {
                document.removeEventListener('mousemove', mousemove)
				document.removeEventListener('mouseup', mouseup)
				document.body.classList.remove('resizable-resizing')
            }

            document.addEventListener('mousemove', mousemove)
			document.addEventListener('mouseup', mouseup)
			document.body.classList.add('resizable-resizing')
		}
	}
}
</script>