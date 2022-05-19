<template>
	<div class="settingsContainer">
		<h2 class="settingsContTitle">Block settings</h2>
		<SettingsSection>
			<RangeInput title="Height" min=15 max=130 postfix="px" v-model.number="data.height" />
			<!-- Row background -->
			<ColorInput title="Background color" v-model="settings.backgroundColor" />
		</SettingsSection>
	</div>
</template>

<script>
export default {
	props: ['settings', 'data']
}
</script>