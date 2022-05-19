<template>
	<div class="nb-controls topRight">
		<button class="nb-control full ttip" :data-title="title" @click="$emit('edit')">
			<span class="icco icco-edit2 md-16"></span>
			<small>{{ title }}</small>
		</button>
	</div>
</template>

<script>
export default {
	props: {
		title: String
	}
}
</script>