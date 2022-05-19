<template>
	<BlockEditor
		:title="title"
		@editorClose="$emit('editorClose')"
		@editorReset="$emit('editorReset')"
	>
		<Tabs>
			<Tab name="General">
				<SettingsSection>
					<TextInput title="Text" v-model="data.content" />
					<ColorInput title="Color" :resetable="false" v-model="data.color" />
					<SelectInput scope="fontSize" v-model="data.fontSize" />
					<MultiSwitchInput scope="textAlign" v-model="data.textAlign" />
					<SwitchInput title="Text link" :value="useLink" @input="handleLinkSwitch($event)" />
					<TextInput v-show="useLink" scope="link" v-model="data.link" />
				</SettingsSection>
			</Tab>
			<Tab name="Typography / format">
				<SettingsSection>
					<SelectInput title="Format" :options="formatOptions" v-model="data.format" />
					<SwitchInput title="Bold" v-model="data.bold" />
					<SwitchInput title="Underline" v-model="data.underline" />
					<SelectInput scope="fontFamily" v-model="data.fontFace" />
					<SelectInput title="Font style" :options="fontStyleOptions" v-model="data.fontStyle" />
				</SettingsSection>
			</Tab>
		</Tabs>
	</BlockEditor>
</template>

<script>
export default {
	props: ['title', 'settings', 'data'],
	data() {
		return {
			useLink: false,
			oldLink: this.data.link,
			formatOptions: [{
				label: 'Heading 1',
				val: 'h1'
			}, {
				label: 'Heading 2',
				val: 'h2'
			}, {
				label: 'Heading 3',
				val: 'h3'
			}, {
				label: 'Text',
				val: 'p'
			}],
			fontStyleOptions: ['normal', 'italic', 'oblique']
		}
	},
	created() {
		if (this.data.link) this.useLink = true
	},
	methods: {
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