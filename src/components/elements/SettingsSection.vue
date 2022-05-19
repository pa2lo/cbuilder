<template>
	<div
		class="settingsSectionWrap"
		:class="{expanded: !isPacked}"
	>
		<h3 
			v-if="title"
			class="settingsSectionTitle"
			@click="isPacked = !isPacked"
		>
			{{ title }}
			<div class="settingsSectionIco"><span class="icco icco-down"></span></div>
		</h3>
		<div class="settingsSectionCont">
			<slot />
		</div>
	</div>
</template>

<script>
export default {
	props: {
		title: String,
		packed: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			isPacked: this.packed
		}
	}
}
</script>