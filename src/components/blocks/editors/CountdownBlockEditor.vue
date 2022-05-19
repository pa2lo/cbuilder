<template>
	<BlockEditor
		:title="title"
		@editorClose="$emit('editorClose')"
		@editorReset="$emit('editorReset')"
	>
		<SettingsSection>
			<TextInput title="Date" type="date" v-model="data.date" />
			<TextInput title="Time" type="time" v-model="data.time" />
			<SelectInput title="Font" :options="fontOptions" v-model="data.font" />
			<SelectInput title="Language" :options="languageOptions" v-model="data.language" />
			<ColorInput title="Text color" :value="data.color" :resetable="false" @input="updateColor" />
			<ColorInput title="Background color" :value="data.backgroundColor" :resetable="false" @input="updateBackground" />
			<SelectInput title="Timezone" :options="timezones" v-model="data.timezone" />
		</SettingsSection>
	</BlockEditor>
</template>

<script>
import throttle from 'lodash/throttle'
import timezones from '../../imports/timezones'
export default {
	props: ['title', 'settings', 'data', 'imgRef', 'outerRef'],
	data() {
		return {
			blockMaxWidth: 450,
			fontOptions: [{
				label: 'Font 1',
				val: 'beb'
			}, {
				label: 'Font 2',
				val: 'rbc'
			}],
			languageOptions: [{
				label: 'English',
				val: 'en'
			}, {
				label: 'Czech',
				val: 'cz'
			}, {
				label: 'Slovak',
				val: 'sk'
			}],
			timezones: timezones.timezones
		}
	},
	created() {
		this.blockMaxWidth = this.outerRef.getBoundingClientRect().width
		let nw = this.imgRef.naturalWidth
		if (nw > this.blockMaxWidth) this.data.width = this.blockMaxWidth
		else if (this.blockMaxWidth > 450 && this.data.width < 450) this.data.width = 450
	},
	methods: {
		updateBackground: throttle(function(val) {
			this.data.backgroundColor = val
		}, 500),
		updateColor: throttle(function(val) {
			this.data.color = val
		}, 500)
	}
}
</script>