<template>
	<div class="settingsContainer">
		<h2 class="settingsContTitle">Row settings</h2>
		<SettingsSection>
			<RangeInput title="Top space" postfix="px" v-model.number="row.settings.padding[0]" />
			<RangeInput title="Bottom space" postfix="px" v-model.number="row.settings.padding[1]" />
			<SwitchInput scope="hideOnMobile" v-model="row.settings.hideOnMobile" />
			<!-- Row background -->
			<ColorInput title="Background color" v-model="row.settings.background.color" />
			<SwitchInput scope="useBackgroundImage" :value="background" @input="handleSwitchInput($event, 'background', 'image')" />
			<TextInput v-show="background" scope="backgroundImage" v-model="row.settings.background.image" />
			<SelectInput v-show="background" scope="backgroundPosition" v-model="row.settings.background.position" />
			<SelectInput v-show="background" scope="backgroundRepeat" v-model="row.settings.background.repeat" />
		</SettingsSection>
		<SettingsSection
			title="Content box settings"
		>
			<!-- Content background -->
			<ColorInput	title="Background color" v-model="row.settings.contentBackground.color"	/>
			<SwitchInput scope="useBackgroundImage" :value="contentBackground" @input="handleSwitchInput($event, 'contentBackground', 'image')" />
			<TextInput v-show="contentBackground" scope="backgroundImage" v-model="row.settings.contentBackground.image" />
			<SelectInput v-show="contentBackground" scope="backgroundPosition" v-model="row.settings.contentBackground.position" />
			<SelectInput v-show="contentBackground" scope="backgroundRepeat" v-model="row.settings.contentBackground.repeat" />
			<!-- Content padding -->
			<SwitchInput title="Enable spacing" :value="contentPadding" @input="handleSwitch($event, 'contentPadding')" />
			<RangeInput v-show="contentPadding" title="Top space" postfix="px" v-model.number="row.settings.contentPadding[0]" />
			<RangeInput v-show="contentPadding" title="Bottom space" postfix="px" v-model.number="row.settings.contentPadding[2]" />
			<RangeInput v-show="contentPadding" title="Left space" postfix="px" v-model.number="row.settings.contentPadding[3]" />
			<RangeInput v-show="contentPadding" title="Right space" postfix="px" v-model.number="row.settings.contentPadding[1]" />
			<!-- Content border -->
			<SwitchInput title="Enable border" :value="contentBorderWidth" @input="handleSwitch($event, 'contentBorderWidth')" />
			<ColorInput v-show="contentBorderWidth"	title="Border color" v-model="row.settings.contentBorderColor" />
			<RangeInput v-show="contentBorderWidth" title="Border top width" postfix="px" max=10 v-model.number="row.settings.contentBorderWidth[0]" />
			<RangeInput v-show="contentBorderWidth" title="Border bottom width" postfix="px" max=10 v-model.number="row.settings.contentBorderWidth[2]" />
			<RangeInput v-show="contentBorderWidth" title="Border left width" postfix="px" max=10 v-model.number="row.settings.contentBorderWidth[3]" />
			<RangeInput v-show="contentBorderWidth" title="Border right width" postfix="px" max=10 v-model.number="row.settings.contentBorderWidth[1]" />
			<!-- Content border radius -->
			<SwitchInput title="Enable rounded corners" :value="contentBorderRadius" @input="handleSwitch($event, 'contentBorderRadius')" />
			<RangeInput v-show="contentBorderRadius" title="Top left corner" postfix="px" v-model.number="row.settings.contentBorderRadius[0]" />
			<RangeInput v-show="contentBorderRadius" title="Top right corner" postfix="px" v-model.number="row.settings.contentBorderRadius[1]" />
			<RangeInput v-show="contentBorderRadius" title="Bottom right corner" postfix="px" v-model.number="row.settings.contentBorderRadius[2]" />
			<RangeInput v-show="contentBorderRadius" title="Bottom left corner" postfix="px" v-model.number="row.settings.contentBorderRadius[3]" />
		</SettingsSection>
	</div>
</template>

<script>
export default {
	props: ['row'],
	data() {
		return {
			background: false,
			contentBackground: false,
			contentPadding: false,
			contentBorderWidth: false,
			contentBorderRadius: false,
			default: {
				background: this.row.settings.background.image,
				contentBackground: this.row.settings.contentBackground.image,
				contentPadding: this.row.settings.contentPadding,
				contentBorderWidth: this.row.settings.contentBorderWidth,
				contentBorderRadius: this.row.settings.contentBorderRadius
			},
		}
	},
	created() {
		if (this.row.settings.background.image) this.background = true
		if (this.row.settings.contentBackground.image) this.contentBackground = true
		if (this.row.settings.contentPadding.some(v => v > 0)) this.contentPadding = true
		if (this.row.settings.contentBorderWidth.some(v => v > 0)) this.contentBorderWidth = true
		if (this.row.settings.contentBorderRadius.some(v => v > 0)) this.contentBorderRadius = true
	},
	methods: {
		handleSwitch(val, model) {
			if (val) {
				this.row.settings[model] = this.default[model]
				this[model] = true
			} else {
				this[model] = false
				this.default[model] = this.row.settings[model]
				this.row.settings[model] = [0, 0, 0, 0]
			}
		},
		handleSwitchInput(val, model, option) {
			if (val) {
				this.row.settings[model][option] = this.default[model]
				this[model] = true
			} else {
				this[model] = false
				this.default[model] = this.row.settings[model][option]
				this.row.settings[model][option] = ''
			}
		}
	}
}
</script>