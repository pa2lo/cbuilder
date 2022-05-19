<template>
	<BlockEditor
		:title="title"
		@editorClose="$emit('editorClose')"
		@editorReset="$emit('editorReset')"
	>
		<SettingsSection>
			<TextInput title="Video link or ID" placeholder="Insert YouTube link or video ID" @input="setVideo" :value="data.videoid" />
			<RangeInput title="Width" :max="maxWidth" v-model="data.width" postfix="px" />
			<MultiSwitchInput title="Icon" :options="iconOptions" v-model="data.icon" />
			<TextInput title="Alternative text" placeholder='Set image "Alt" attribute' v-model="data.alt" />
			<TextInput title="Title text" placeholder='Set image "Title" attribute' v-model="data.title" />
		</SettingsSection>
	</BlockEditor>
</template>

<script>
export default {
	props: ['title', 'settings', 'data', 'imgRef', 'outerRef'],
	data() {
		return {
			blockMaxWidth: 600,
			maxWidth: 600,
			iconOptions: [{
				label: 'Icon 1',
				val: 'ico1',
				icon: '<img src="/images/res/youtube/ico1.png" />'
			}, {
				label: 'Icon 2',
				val: 'ico2',
				icon: '<img src="/images/res/youtube/ico2.png" />'
			}, {
				label: 'Icon 3',
				val: 'ico3',
				icon: '<img src="/images/res/youtube/ico3.png" />'
			}]
		}
	},
	created() {
		this.blockMaxWidth = this.maxWidth = this.outerRef.getBoundingClientRect().width
		let nw = this.imgRef.naturalWidth
		if (nw < this.maxWidth) this.maxWidth = nw
		else if (nw > this.blockMaxWidth) this.maxWidth = this.blockMaxWidth
		if (this.data.width > this.maxWidth) this.data.width = this.maxWidth
	},
	methods: {
		setVideo(val) {
			if (val.indexOf('http') > -1 && val.indexOf('youtube.com')) {
				let newid = val.split('youtube.com/watch?v=')[1].split('&')[0]
				this.data.videoid = newid
			} else this.data.videoid = val
		}
	}
}
</script>