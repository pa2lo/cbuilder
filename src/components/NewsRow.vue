<template>
	<div 
		class="row"
		:id="'row-'+index"
		:class="{edited: settingsOpen == true}"
		:style="{
			padding: rowPadding,
			backgroundColor: row.settings.background.color || 'transparent',
			backgroundImage: row.settings.background.image ? `url(${row.settings.background.image})` : '',
			backgroundPosition: row.settings.background.position,
			backgroundRepeat: row.settings.background.repeat
		}"
		@mousedown.self="showSettings"
	>
		<div
			class="rowContent"
			:class="[row.settings.layout ? `layout-${row.settings.layout}` : '', colsCount]"
			:style="{
				padding: contentPadding,
				borderWidth: contentBorderWidth,
				borderRadius: contentBorderRadius,
				borderColor: row.settings.contentBorderColor || '#000000',
				backgroundColor: row.settings.contentBackground.color || 'transparent',
				backgroundImage: row.settings.contentBackground.image ? `url(${row.settings.contentBackground.image})` : '',
				backgroundPosition: row.settings.contentBackground.position,
				backgroundRepeat: row.settings.contentBackground.repeat
			}"
			@mousedown.self="showSettings"
		>
			<NewsRowColumn
				v-for="(col, index) in row.cols"
				:key="index"
				:index="index"
				:settings="col.settings"
				:data="col.blocks"
				@click.self="showSettings"
			/>
		</div>
		<ComponentControls
			moveClass="moveRow"
			@movedown="$emit('movedown')"
			@moveup="$emit('moveup')"
			@buildsettings="showSettings"
			@clone="$emit('clone')"
			@remove="remove"
		/>
	</div>
</template>

<script>
import RowSettings from './settings/RowSettings.vue'
import ComponentControls from './ComponentControls.vue'
import NewsRowColumn from './NewsRowColumn.vue'
export default {
	components: {ComponentControls, NewsRowColumn},
	props: ['row', 'index'],
	data() {
		return {
			settingsOpen: false,
			mouseover: false
		}
	},
	computed: {
		rowPadding() {
			return `${this.row.settings.padding[0]}px 0 ${this.row.settings.padding[1]}px 0`
		},
		contentPadding() {
			return `${this.row.settings.contentPadding[0]}px ${this.row.settings.contentPadding[1]}px ${this.row.settings.contentPadding[2]}px ${this.row.settings.contentPadding[3]}px`
		},
		contentBorderWidth() {
			return `${this.row.settings.contentBorderWidth[0]}px ${this.row.settings.contentBorderWidth[1]}px ${this.row.settings.contentBorderWidth[2]}px ${this.row.settings.contentBorderWidth[3]}px`
		},
		contentBorderRadius() {
			return `${this.row.settings.contentBorderRadius[0]}px ${this.row.settings.contentBorderRadius[1]}px ${this.row.settings.contentBorderRadius[2]}px ${this.row.settings.contentBorderRadius[3]}px`
		},
		colsCount() {
			return `cols-${this.row.cols.length}`
		}
	},
	beforeDestroy() {
		this.clearSettings()
	},
	methods: {
		showSettings() {
			if (!this.settingsOpen) {
				const props = {
					row: this.row
				}
				this.$root.$emit('openSettings', {
					component: RowSettings,
					props
				})
				this.settingsOpen = true
				this.$root.$on('openSettings', this.closeSettings)
			}
		},
		closeSettings() {
			this.settingsOpen = false
			this.$root.$off('openSettings', this.closeSettings)
		},
		clearSettings() {
			if (this.settingsOpen == true) {
				this.closeSettings()
				this.$root.$emit('clearSettings')
			}
		},
		remove() {
			this.clearSettings()
			this.$emit('remove', this.settingsOpen)
		}
	}
}
</script>