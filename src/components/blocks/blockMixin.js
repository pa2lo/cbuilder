export default {
	data() {
		return {
			settingsOpen: false,
			editorEnabled: false,
			backupData: null,
			editorPosition: false
		}
	},
	beforeDestroy() {
		if (this.editorEnabled == true) this.closeEditor()
		this.clearSettings()
	},
	methods: {
		getEditorPosition() {
			if (this.editorPosition == false) {
				const editorHeight = this.editorHeight || 401
				let elPos = this.$el.getBoundingClientRect()
				let topPos = Math.max(8, elPos.top - 12)
				let topPosH = topPos + editorHeight
				let winHeight = window.innerHeight
				if (winHeight < topPosH) topPos = topPos + (winHeight - topPosH - 8)
				
				this.editorPosition = {
					left: elPos.left - 328 + "px",
					top: topPos + "px"
				}
			}
		},
		showEditor(enableEditor = true) {
			if (!this.editorEnabled) {
				this.getEditorPosition()
				this.showSettings()
				this.initClick = true
				if (enableEditor) this.editorEnabled = true
				this.backupData = JSON.parse(JSON.stringify(this.block.data))
				document.body.addEventListener('mousedown', this.handleClicks)
				if (this.showEditorCallback) this.showEditorCallback()
			}
		},
		handleClicks(event) {
			if (!(this.$el == event.target || this.$el.contains(event.target))) {
				this.closeEditor()
			}
		},
		closeEditor(reset = false) {
			this.editorEnabled = false
			this.initClick = false
			document.body.removeEventListener('mousedown', this.handleClicks)
			if (reset) this.block.data = this.backupData
			this.editorPosition = false
		},
		showSettings() {
			if (!this.settingsOpen) {
				const props = this.settingsProps
				this.$root.$emit('openSettings', {
					component: this.settingsComponent,
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