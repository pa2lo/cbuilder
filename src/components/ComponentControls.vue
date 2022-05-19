<template>
	<div class="nb-controls topLeft expandable">
		<div class="nb-control expander">
			<span class="icco icco-more-vertical"></span>
		</div>
		<div class="expanded">
			<button class="nb-control move ttip" :class="[moveClass]" data-title="Move">
				<span class="icco icco-move"></span>
			</button>
			<button class="nb-control move-down ttip" data-title="Move down" @click="$emit('movedown')">
				<span class="icco icco-down"></span>
			</button>
			<button class="nb-control move-up ttip" data-title="Move up" @click="$emit('moveup')">
				<span class="icco icco-up"></span>
			</button>
			<button class="nb-control settings ttip" data-title="Settings" @click="$emit('buildsettings')">
				<span class="icco icco-sliders md-16"></span>
			</button>
			<button class="nb-control clone ttip" data-title="Clone" @click="$emit('clone')">
				<span class="icco icco-copy md-16"></span>
			</button>
			<button class="nb-control remove ttip" data-title="Remove" @click="$emit('remove')">
				<span class="icco icco-x"></span>
			</button>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		moveClass: {
			type: String,
			default: 'moveBlock'
		}
	}
}
</script>