let fontSizeArr = () => {
	let arr = []
	arr.push({
		label: 'Default',
		val: ''
	})
	for (let i = 12; i <= 32; i++) {
		arr.push({
			label: `${i}px`,
			val: i
		})
	}
	return arr
}

window.scopedInputs = {
	hideOnMobile: {
		title: 'Hide on mobile',
		tooltip: 'Works only in clients which supports CSS media queries (Gmail, Hotmail...)!'
	},
	useBackgroundImage: {
		title: 'Use background image',
		tooltip: 'Set background color as fallback for clients not supporting background images!'
	},
	link: {
		title: 'Link URL',
		placeholder: 'Insert link URL...'
	},
	backgroundImage: {
		title: 'Background image',
		clearable: 'true',
		selectFile: 'true',
		placeholder: 'Insert image URL...'
	},
	backgroundPosition: {
		title: 'Background position',
		options: ['left top', 'left center', 'left bottom', 'center top', 'center center', 'center bottom', 'right top', 'right center', 'right bottom']
	},
	backgroundRepeat: {
		title: 'Background repeat',
		options: ['no-repeat', 'repeat', 'repeat-x', 'repeat-y']
	},
	fontFamily: {
		title: 'Font family stack',
		options: [{
			label: "Default",
			val: ''
		}, {
			label: "Arial, Helvetica, sans-serif",
			val: "Arial, Helvetica, sans-serif"
		}, {
			label: "'Arial Black', Gadget, sans-serif",
			val: "'Arial Black', Gadget, sans-serif"
		}, {
			label: "Impact, Charcoal, sans-serif",
			val: "Impact, Charcoal, sans-serif"
		}, {
			label: "'MS Sans Serif', Geneva, sans-serif",
			val: "'MS Sans Serif', Geneva, sans-serif"
		}, {
			label: "Tahoma, Geneva, sans-serif",
			val: "Tahoma, Geneva, sans-serif"
		}, {
			label: "'Trebuchet MS', Helvetica, sans-serif",
			val: "'Trebuchet MS', Helvetica, sans-serif"
		}, {
			label: "Verdana, Geneva, sans-serif",
			val: "Verdana, Geneva, sans-serif"
		}, {
			label: "Lucida, sans-serif",
			val: "Lucida, sans-serif"
		}, {
			label: "'Book Antiqua', 'Palatino Linotype', Palatino, serif",
			val: "'Book Antiqua', 'Palatino Linotype', Palatino, serif"
		}, {
			label: "Bookman, serif",
			val: "Bookman, serif"
		}, {
			label: "Georgia, serif",
			val: "Georgia, serif"
		}, {
			label: "'MS Serif', 'New York', serif",
			val: "'MS Serif', 'New York', serif"
		}, {
			label: "'Times New Roman', Times, serif",
			val: "'Times New Roman', Times, serif"
		}]
	},
	lineHieght: {
		title: 'Line height',
		options: [{
			label: "Default",
			val: ''
		}, {
			label: "1",
			val: "1"
		}, {
			label: "1,25",
			val: "1.25"
		}, {
			label: "1,5",
			val: "1.5"
		}, {
			label: "1,75",
			val: "1.75"
		}, {
			label: "2",
			val: "2"
		}]
	},
	fontSize: {
		title: 'Font size',
		options: fontSizeArr()
	},
	textAlign: {
		title: 'Text align',
		options: [{
			label: 'left',
			val: 'left',
			icon: '<span class="icco icco-align-left md-24"></span>'
		}, {
			label: 'center',
			val: 'center',
			icon: '<span class="icco icco-align-center md-24"></span>'
		}, {
			label: 'right',
			val: 'right',
			icon: '<span class="icco icco-align-right md-24"></span>'
		}]
	},
	textAlignAdvanced: {
		title: 'Text align',
		options: [{
			label: 'left',
			val: 'left',
			icon: '<span class="icco icco-align-left md-24"></span>'
		}, {
			label: 'center',
			val: 'center',
			icon: '<span class="icco icco-align-center md-24"></span>'
		}, {
			label: 'right',
			val: 'right',
			icon: '<span class="icco icco-align-right md-24"></span>'
		}, {
			label: 'justify',
			val: 'justify',
			icon: '<span class="icco icco-align-justify md-24"></span>'
		}]
	}
}