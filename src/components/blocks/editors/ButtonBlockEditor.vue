<template>
	<BlockEditor
		:title="title"
		@editorClose="$emit('editorClose')"
		@editorReset="$emit('editorReset')"
	>
		<Tabs>
			<Tab name="General">
				<SettingsSection>
					<TextInput title="Button text" v-model="data.content" />
					<MultiSwitchInput title="Link type" :value="linkType" @input="linkTypeChange" :options="linkTypeOptions" />
					<TextInput v-show="linkType == 'url'" scope="link" v-model="data.link" />
					<TextInput v-show="linkType == 'mail'" title="Email address" placeholder="Insert e-mail address..." :value="mailAddress" @input="updateLinkMail($event, 'mailAddress')" />
					<TextInput v-show="linkType == 'mail'" title="Subject" :value="mailSubject" placeholder="Insert email subject..." @input="updateLinkMail($event, 'mailSubject')" />
					<TextAreaInput v-show="linkType == 'mail'" title="Message" :value="mailText" placeholder="Add text to email..." @input="updateLinkMail($event, 'mailText')" />
					<ColorInput title="Color" :resetable="false" v-model="data.color" />
					<ColorInput title="Background color" :resetable="false" v-model="data.backgroundColor" />
					<MultiSwitchInput title="Align" scope="textAlign" v-model="data.align" />
				</SettingsSection>
			</Tab>
			<Tab name="Typography">
				<SettingsSection>
					<SwitchInput title="Bold" v-model="data.bold" />
					<SelectInput scope="fontSize" v-model="data.fontSize" />
					<SelectInput scope="fontFamily" v-model="data.fontFace" />
					<SelectInput scope="lineHieght" v-model="data.lineHieght" />
					<!-- 
					<SwitchInput title="Underline" v-model="data.underline" />
					
					<SelectInput title="Font style" :options="fontStyleOptions" v-model="data.fontStyle" /> -->
				</SettingsSection>
			</Tab>
			<Tab name="Design">
				<SettingsSection>
					<SwitchInput title="Full width" v-model="data.fullWidth" />
					<RangeInput min=1 max=20 title="Height space" postfix="px" v-model="data.vSpace" />
					<RangeInput min=1 max=60 title="Width space" postfix="px" v-model="data.hSpace" />
					<RangeInput min=0 max=70 title="Round corners" postfix="px" v-model="data.borderRadius" />
					<MultiSwitchInput title="Border style" :value="data.borderType" @input="changeBorderType" :options="borderTypeOptions" />
					<RangeInput v-if="data.borderType != 'none'" min=1 max=15 title="Border width" postfix="px" v-model="data.borderWidth" />
					<ColorInput v-if="data.borderType != 'none'" title="Border color" v-model="data.borderColor" />
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
			oldLink: '',
			oldMail: '',
			oldBorderColor: '',
			linkTypeOptions: [{
				label: 'URL',
				val: 'url'
			}, {
				label: 'Mail',
				val: 'mail'
			}],
			borderTypeOptions: [{
				label: 'None',
				val: 'none'
			}, {
				label: 'Around',
				val: 'around'
			}, {
				label: 'Bottom',
				val: 'bottom'
			}],
			fontStyleOptions: ['normal', 'italic', 'oblique'],
			linkType: 'url',
			mailAddress: '',
			mailSubject: '',
			mailText: ''
		}
	},
	created() {
		if (this.data.link.indexOf('mailto:') != -1) {
			this.linkType = 'mail'
			let mailParams = this.getUrlGetParams(this.data.link)
			this.mailAddress = this.data.link.split('mailto:')[1].split('?')[0]
			if (mailParams.subject) this.mailSubject = this.encodeTxt(mailParams.subject)
			if (mailParams.body) this.mailText = this.encodeTxt(mailParams.body)
			this.oldMail = this.data.link
		} else {
			this.oldLink = this.data.link
		}
	},
	methods: {
		linkTypeChange(val) {
			if (val == "url") {
				this.oldMail = this.data.link
				this.linkType = 'url'
				this.data.link = this.oldLink
			} else {
				this.oldLink = this.data.link
				this.linkType = 'mail'
				this.data.link = this.oldMail
			}
		},
		getUrlGetParams(address) {
			let urlparamspart = address.split('?')[1],
				params = {}
			if (!urlparamspart) return false
			let urlparams = urlparamspart.split('&')
			urlparams.forEach(v => {
				if (v.indexOf('=') == "-1") return
				let vsplit = v.split('=')
				params[vsplit[0]] = vsplit[1]
			})
			return params
		},
		encodeTxt(txt) {
			return encodeURI(txt.trim()).replace('&', '%26').replace('?', '%3F')
		},
		decodeTxt(txt) {
			return decodeURI(txt.trim().replace('%26', '&').replace('%3F', '?'))
		},
		updateLinkMail(val, type) {
			this[type] = val
			let newHref = "mailto:" + this.mailAddress.trim()
			let addressArray = []
			if (this.mailSubject) addressArray.push('subject='+this.encodeTxt(this.mailSubject))
			if (this.mailText) addressArray.push('body='+this.encodeTxt(this.mailText))
			let joinparams = addressArray.join('&')
			if (joinparams.trim()) newHref += "?"+joinparams
			this.oldMail = this.data.link = newHref
		},
		changeBorderType(val) {
			this.data.borderType = val
			if (val == "none") {
				this.oldBorderColor = this.data.borderColor
				this.data.borderColor = ''
				this.disabledBorder = true
			} else {
				if (this.disabledBorder) {
					this.data.borderColor = this.oldBorderColor
					this.disableBorder = false
				}
			}
		}
	}
}
</script>