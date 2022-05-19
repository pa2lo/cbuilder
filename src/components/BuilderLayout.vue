<template>
	<draggable 
		:list="data"
		handle=".moveRow"
		group="rows"
		class="newsletter grow"
		:style="{
			color: settings.textColor,
			fontFamily: settings.fontFace,
			fontSize: `${settings.fontSize}px`,
			lineHeight: settings.lineHeight,
			backgroundColor: settings.backgroundColor,
			backgroundImage: settings.useBackgroundImage ? `url(${settings.backgroundImage})` : '',
			backgroundPosition: settings.backgroundPosition,
			backgroundRepeat: settings.backgroundRepeat
		}"
	>
		<NewsRow 
			v-for="(row, index) in data"
			:key="row.cid"
			:index="index"
			:row="row"
			@movedown="movedownrow(index)"
			@moveup="moveuprow(index)"
			@clone="clonerow(index)"
			@remove="removerow(index)"
		/>
	</draggable>
</template>

<script>
	let rid = 0
	import NewsRow from './NewsRow.vue'
	import ControlMethods from './mixins/ControlMethods'
	import draggable from 'vuedraggable'
    export default {
		mixins: [ControlMethods],
		components: {NewsRow, draggable},
		props: ['title', 'settings', 'data'],
		computed: {
			count() {
				return this.data.length
			}
		},
    }
</script>