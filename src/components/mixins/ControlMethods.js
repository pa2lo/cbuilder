export default {
	methods: {
		removerow(index) {
			// Vue.delete(this.data, index)
			this.data.splice(index, 1);
		},
		movedownrow(index) {
			const newindex = index + 1
			this.data.move(index, newindex)
		},
		moveuprow(index) {
			const newindex = index - 1
			this.data.move(index, newindex)
		},
		clonerow(index) {
			const clone = JSON.parse(JSON.stringify(this.data[index]))
			clone.cid = `${window.compID++}-row`
			if (clone.cols) {
				clone.cols.forEach(col => {
					if (col.blocks) {
						col.blocks.forEach(b => {
							b.cid = `${window.compID++}-block`
						})
					}
				})
			}
			this.data.splice(index+1, 0, clone)
		}
	}
}