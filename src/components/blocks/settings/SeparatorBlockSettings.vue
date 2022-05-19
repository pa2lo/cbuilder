<template>
	<div class="settingsContainer">
		<h2 class="settingsContTitle">Block settings</h2>
		<SettingsSection>
			<RangeInput title="Vertical space" postfix="px" v-model.number="settings.padding[0]" />
			<RangeInput title="Horizontal space" postfix="px" v-model.number="settings.padding[1]" />
			<!-- Row background -->
			<ColorInput title="Background color" v-model="settings.backgroundColor" />
		</SettingsSection>
	</div>
</template>

<script>
export default {
	props: ['settings']
}
</script>