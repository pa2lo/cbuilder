<template>
	<BlockEditor
		:title="title"
		@editorClose="$emit('editorClose')"
		@editorReset="$emit('editorReset')"
	>
		<Tabs>
			<Tab name="General">
				<SettingsSection>
					<TextInput title="Image URL" placeholder="Insert image URL..." @input="setkWidth" v-model="data.src" />
					<RangeInput title="Width" :max="maxWidth" v-model="data.width" postfix="px" />
					<TextInput title="Alternative text" placeholder='Set image "Alt" attribute' v-model="data.alt" />
					<TextInput title="Title text" placeholder='Set image "Title" attribute' v-model="data.title" />
					<MultiSwitchInput title="Align" scope="textAlign" v-model="data.align" />
					<SwitchInput title="Image link" :value="useLink" @input="handleLinkSwitch($event)" />
					<TextInput v-show="useLink" scope="link" v-model="data.link" />
				</SettingsSection>
			</Tab>
			<Tab name="Round image">
				<SettingsSection>
					<div class="settingsField">WARMING: Works only in modern clients (Gmail...)!</div>
					<RangeInput title="Top left" :max="maxWidth" v-model="data.radius[0]" postfix="px" />
					<RangeInput title="Top right" :max="maxWidth" v-model="data.radius[1]" postfix="px" />
					<RangeInput title="Bottom left" :max="maxWidth" v-model="data.radius[3]" postfix="px" />
					<RangeInput title="Bottom right" :max="maxWidth" v-model="data.radius[2]" postfix="px" />
				</SettingsSection>
			</Tab>
		</Tabs>
	</BlockEditor>
</template>

<script>
export default {
	props: ['title', 'settings', 'data', 'imgRef', 'outerRef'],
	data() {
		return {
			blockMaxWidth: 600,
			maxWidth: 600,
			useLink: false,
			oldLink: this.data.link
		}
	},
	created() {
		if (this.data.link) this.useLink = true
		this.blockMaxWidth = this.maxWidth = this.outerRef.getBoundingClientRect().width
		let nw = this.imgRef.naturalWidth
		if (nw < this.maxWidth) this.maxWidth = nw
		else if (nw > this.blockMaxWidth) this.maxWidth = this.blockMaxWidth
		if (this.data.width > this.maxWidth) this.data.width = this.maxWidth
	},
	methods: {
		setkWidth(e) {
			if (!e.length) return
			let img = new Image()
			img.src = e
			img.onload = () => {
				let nw = img.naturalWidth
				if (this.maxWidth != nw) {
					if (nw > this.blockMaxWidth) {
						this.maxWidth = this.blockMaxWidth
						this.$emit('setWidth', this.blockMaxWidth)
					} else {
						this.maxWidth = nw
						this.$emit('setWidth', nw)
					}
				}
			}
		},
		handleLinkSwitch(val) {
			if (val) {
				this.data.link = this.oldLink
				this.useLink = true
			} else {
				this.useLink = false
				this.oldLink = this.data.link
				this.data.link = ''
			}
		}
	}
}
</script>