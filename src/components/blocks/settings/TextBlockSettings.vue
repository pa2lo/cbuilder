<template>
	<div class="settingsContainer">
		<h2 class="settingsContTitle">Block settings</h2>
		<SettingsSection>
			<RangeInput title="Top space" postfix="px" v-model.number="settings.padding[0]" />
			<RangeInput title="Bottom space" postfix="px" v-model.number="settings.padding[2]" />
			<RangeInput title="Left space" postfix="px" v-model.number="settings.padding[3]" />
			<RangeInput title="Right space" postfix="px" v-model.number="settings.padding[1]" />
			<!-- Row background -->
			<ColorInput title="Background color" v-model="settings.backgroundColor" />
		</SettingsSection>
		<SettingsSection title="Text settings">
			<ColorInput title="Text color" v-model="settings.textColor" />
			<SelectInput scope='lineHieght' v-model="settings.lineHeight" />
			<SelectInput scope='fontFamily' v-model="settings.fontFace" />
			<SelectInput scope='fontSize' v-model="settings.fontSize" />
			<MultiSwitchInput scope="textAlignAdvanced" v-model="settings.textAlign" />
		</SettingsSection>
	</div>
</template>

<script>
export default {
	props: ['settings']
}
</script>