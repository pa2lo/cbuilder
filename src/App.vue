<template>
	<div>
		<header class="header flex ai-center">
			<div class="header-buttons flex ai-center">
				<a href="/dashboard" class="inlineLink ttip right" data-title="Return to dashboard"><span class="icco icco-x md-24"></span></a>
				<a @click.prevent="preview" href="#" class="button">Preview</a>
				<a @click.prevent="save" href="#" class="button success">Save</a>
			</div>
			<div class="newsTitle flex ai-center">
				Title
			</div>
			<div class="headerSourceLinkCont">
				<a href="https://github.com/pa2lo/cbuilder" target="_blank" class="headerSourceLink inlineLink flex ai-center">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
						<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
					</svg>
					<span>Github</span>
				</a>
			</div>
		</header>
		<div class="main">
			<settings-root></settings-root>
			<builder-main :title="title" :data="rows" :settings="settings"></builder-main>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
		return {
			title: 'test1',
			settings: {
				preheader: false,
				textColor: '#000000',
				fontFace: 'Tahoma, Geneva, sans-serif',
				fontSize: 14,
				lineHeight: '1.5',
				backgroundColor: '#FFFFFF',
				useBackgroundImage: true,
				backgroundImage: 'https://lobotkap2.flox.sk/files/news/bgheader4.jpg',
				backgroundPosition: 'center top',
				backgroundRepeat: 'no-repeat'
			},
			rows: [{
				cid: '1-row',
				settings: {
					hideOnMobile: false,
					padding: [25, 25],
					background: {
						color: '#800040',
						image: '',
						position: 'center top',
						repeat: 'no-repeat'
					},
					contentBackground: {
						color: 'transparent',
						image: '',
						position: 'center top',
						repeat: 'no-repeat'
					},
					contentPadding: [0, 0, 0, 0],
					contentBorderColor: false,
					contentBorderWidth: [0, 0, 0, 0],
					contentBorderRadius: [0, 0, 0, 0]
				},
				cols: [{
					settings: {
						backgroundColor: false,
						hideOnMobile: false,
						padding: [0, 0, 0, 0]
					},
					blocks: [{
						cid: '3-block',
						name: 'HeaderBlock',
						settings: {
							backgroundColor: '',
							padding: [0, 0, 0, 0]
						},
						data: {
							format: 'h2',
							fontSize: 20,
							color: '#000000',
							textAlign: 'center',
							bold: true,
							underline: false,
							fontFace: '',
							fontStyle: 'normal',
							link: '',
							content: 'Maj heding'
						}
					}, {
						cid: '5-block',
						name: 'HeaderBlock',
						settings: {
							backgroundColor: '',
							padding: [0, 0, 0, 0]
						},
						data: {
							format: 'h2',
							fontSize: 20,
							color: '#FFFFFF',
							textAlign: 'center',
							bold: false,
							underline: false,
							fontFace: '',
							fontStyle: 'italic',
							link: 'https://www.google.sk',
							content: 'Maj heding link'
						}
					}, {
						cid: '18-block',
						name: 'SpacerBlock',
						settings: {
							backgroundColor: ''
						},
						data: {
							height: 40
						}
					}, {
						cid: '20-block',
						name: 'SeparatorBlock',
						settings: {
							backgroundColor: '',
							padding: [15, 15]
						},
						data: {
							color: '#FFFFFF',
							style: 'solid',
							height: 1
						}
					}, {
						cid: '22-block',
						name: 'ButtonBlock',
						settings: {
							backgroundColor: '',
							padding: [0, 0, 0, 0]
						},
						data: {
							content: 'Click here',
							link: 'https://www.google.sk',
							color: '#FFFFFF',
							backgroundColor: '#946124',
							align: 'center',
							fullWidth: false,
							fontSize: 20,
							bold: true,
							fontFace: '',
							lineHieght: '',
							vSpace: 14,
							hSpace: 22,
							borderRadius: 4,
							borderType: 'none',
							borderWidth: 1,
							borderColor: ''
						}
					}, {
						cid: '28-block',
						name: 'CountdownBlock',
						settings: {
							backgroundColor: '',
							padding: [0, 0, 0, 0]
						},
						data: {
							date: '2020-12-12',
							time: '00:00:01',
							font: 'beb',
							language: 'en',
							color: '#000000',
							backgroundColor: '#FFFFFF',
							timezone: '',
							width: 450
						}
					}, {
						cid: '29-block',
						name: 'YoutubeBlock',
						settings: {
							backgroundColor: '',
							padding: [0, 0, 0, 0]
						},
						data: {
							videoid: '',
							icon: 'ico1',
							width: 600,
							alt: '',
							title: ''
						}
					}, {
						cid: '15-block',
						name: 'ImageBlock',
						settings: {
							backgroundColor: '',
							padding: [0, 0, 0, 0]
						},
						data: {
							src: '/images/logo.png',
							width: '200',
							align: 'center',
							title: '',
							link: '',
							alt: 'Alttext',
							radius: [0, 0, 0, 0]
						}
					}, {
						cid: '16-block',
						name: 'TextBlock',
						settings: {
							backgroundColor: '',
							padding: [0, 0, 0, 0],
							textColor: '',
							lineHeight: '',
							fontFace: '',
							fontSize: '',
							textAlign: 'left'
						},
						data: {
							content: '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos minima id, laudantium aliquam magnam eaque non similique nobis sapiente illo!</p><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos minima id, laudantium aliquam magnam eaque non similique nobis!</p>'
						}
					}]
				}]
			}, {
				cid: '8-row',
				settings: {
					hideOnMobile: false,
					padding: [35, 35],
					background: {
						color: '#0062bb',
						image: '',
						position: 'center top',
						repeat: 'no-repeat'
					},
					contentBackground: {
						color: '#1162bb',
						image: '',
						position: 'center top',
						repeat: 'no-repeat'
					},
					contentPadding: [0, 0, 0, 0],
					contentBorderColor: false,
					contentBorderWidth: [0, 0, 0, 0],
					contentBorderRadius: [0, 0, 0, 0]
				},
				cols: [{
					settings: {
						backgroundColor: false,
						hideOnMobile: false,
						padding: [0, 0, 0, 0]
					},
					blocks: [{
						cid: '10-block',
						name: 'HeaderBlock',
						settings: {
							backgroundColor: '',
							padding: [0, 0, 0, 0]
						},
						data: {
							format: 'h2',
							fontSize: 24,
							color: '#FFFFFF',
							textAlign: 'center',
							bold: false,
							underline: false,
							fontFace: '',
							fontStyle: 'italic',
							link: '',
							content: 'Maj heding'
						}
					}, {
						cid: '11-block',
						name: 'HeaderBlock',
						settings: {
							backgroundColor: '',
							padding: [0, 0, 0, 0]
						},
						data: {
							format: 'h2',
							fontSize: 20,
							color: '#FFFFFF',
							textAlign: 'center',
							bold: false,
							underline: true,
							fontFace: '',
							fontStyle: 'italic',
							link: 'https://www.google.sk',
							content: 'Maj heding 2'
						}
					}]
				}]
			}]
		}
	},
	mounted() {
		this.setMinComponentId()
	},
	methods: {
		preview() {
			alert('Not implemented yet!')
		},
		save() {
			console.log(this.rows)
		},
		setMinComponentId() { // update window.compID for new min value
			this.rows.forEach((r) => {
				let rcid = parseInt(r.cid)
				if (rcid >= window.compID) {
					window.compID = rcid+1
				}
				r.cols.forEach((col) => {
					if (col.blocks) {
						col.blocks.forEach((b) => {
							let bcid = parseInt(b.cid)
							if (bcid >= window.compID) {
								window.compID = bcid+1
							}
						})
					}
				})
			})
		}
	}
	}
</script>