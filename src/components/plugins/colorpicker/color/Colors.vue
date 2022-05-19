<template>
    <div>
        <ul class="colors">
            <li
                v-for="item in colorsDefault"
                :key="item"
                class="item"
                @click="selectColor(item)"
            >
                <div
                    :style="{ background: `url(${imgAlphaBase64})` }"
                    class="alpha"
                />
                <div
                    :style="{ background: item || 'transparent' }"
                    class="color"
                />
            </li>
        </ul>
    </div>
</template>

<script>
import mixin from './mixin'
export default {
    mixins: [mixin],
    props: {
        color: {
            type: String,
            default: '#000000'
        },
        colorsDefault: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            imgAlphaBase64: '',
        }
    },
    created() {
        this.imgAlphaBase64 = this.createAlphaSquare(4).toDataURL()
    },
    methods: {
        selectColor(color) {
            this.$emit('selectColor', color)
        }
    }
}
</script>