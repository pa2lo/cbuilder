<template>
	<div class="nb-tabs">
		<div class="nb-tab-triggers flex">
			<a
				class="nb-tab-trigger smaller"
				v-for="(tab, index) in tabs"
				:key="tab.name"
				:class="{active: selectedIndex == index}"
				@click="selectTab(index)"
			>
				{{ tab.$attrs.name }}
			</a>
		</div>
		<div class="nb-tabs-sections isScrollable">
			<slot />
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			selectedIndex: 0,
			tabs: []
		}
	},
	created() {
		this.tabs = this.$children
	},
	mounted () {
		this.selectTab(0)
	},
	methods: {
		selectTab (i) {
			this.selectedIndex = i
			
			this.tabs.forEach((tab, index) => {
				tab.isActive = (index === i)
			})
		}
	}
}
</script>