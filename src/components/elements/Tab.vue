<template>
	<div v-show="isActive" class="nb-tab">
		<slot />
	</div>
</template>

<script>
export default {
	data() {
		return {
			isActive: false
		}
	}
}
</script>