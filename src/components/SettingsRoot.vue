<template>
	<aside class="sidebar flex column">
		<div class="nb-tab-triggers flex">
			<a 
				class="nb-tab-trigger"
				:class="{active: currentTab == 1}"
				@click.prevent="currentTab = 1"
			>Content</a>
			<a
				class="nb-tab-trigger"
				:class="{active: currentTab == 2, disabled: !component}"
				@click.prevent="component ? currentTab = 2 : ''"
			>Edit</a>
			<a
				class="nb-tab-trigger"
				:class="{active: currentTab == 3}"
				@click.prevent="currentTab = 3"
			>Mail settings</a>
		</div>
		<div class="nb-tab-sections grow">
			<div 
				class="nb-tab-section isScrollable"
				:class="{active: currentTab == 1}"
			>
				prva
			</div>
			<div 
				class="nb-tab-section isScrollable"
				:class="{active: currentTab == 2}"
			>
				<component :is="component" v-bind="props" :key="componentKey" />
			</div>
			<div 
				class="nb-tab-section isScrollable"
				:class="{active: currentTab == 3}"
			>
				mail settings
			</div>
		</div>
	</aside>
</template>

<script>
export default {
	data () {
		return {
			currentTab: 1,
			component: null,
			props: null,
			componentKey: 0
		}
	},
	created() {
		this.$root.$on('openSettings', ({component, props}) => {
			this.componentKey = !this.componentKey
			this.component = component
			this.props = props
			if (this.currentTab != 2) this.currentTab = 2
		})
		this.$root.$on('clearSettings', () => {
			if (this.currentTab == 2) this.currentTab = 1
			this.clearcomponents()
		})
	},
	methods: {
		clearcomponents() {
			this.component = null
			this.props = null
		}
	}
}
</script>