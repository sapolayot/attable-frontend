<template>
    <div
        class="dropdown-wrapper"
        :class="className"
        @mouseleave="isShow = false"
    >
        <div class="input-group" @click.prevent="isShow = !isShow">
            <label v-if="text || showText">{{
                text
                    ? text.value
                        ? text.value
                        : text
                    : showText.value
                    ? showText.value
                    : showText
            }}</label>
            <p class="placeholder" v-if="!text">
                {{ !showText ? placeholder : null }}
            </p>
            <i class="material-icons">expand_more</i>
        </div>
        <div
            class="drop-list"
            :class="`${isShow ? 'isShow' : 'hide'}`"
            :style="`${overfloat ? overfloat : null}`"
        >
            <div
                class="drop-items"
                v-for="(item, index) in items"
                :key="index"
                @click.prevent="clicked(item)"
            >
                {{ item.value ? item.value : item }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['items', 'text', 'overflow', 'className', 'placeholder', 'value'],
    data() {
        return {
            isShow: false,
            num: 30 * this.overflow,
            showText: null,
        }
    },
    methods: {
        clicked(value) {
            this.showText = value
            this.$emit('clicked', value)
            this.$emit('input', value) // emit to v-model
            this.isShow = false
        },
    },
    computed: {
        overfloat() {
            return 'max-height: ' + `${this.overflow * 32}px`
        },
    },
}
</script>

<style lang="scss" scoped>
@use '@/styles/mixins.scss' as *;
@use '@/styles/responsive.scss' as *;
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
.dropdown-wrapper {
    position: relative;
    width: 100%;
    .input-group {
        border-bottom: 1px solid $border;
        justify-content: space-between;
        padding: 8px 8px 6px 0px;
        text-align: left;
        display: flex;
        width: 100%;
        align-content: center;
        @include respond-to($phone) {
            padding: 8px 0px 8px 0px;
        }
        &:hover,
        &:focus {
            border-color: $accent;
            cursor: pointer;
        }
    }
    .drop-list {
        box-shadow: $dropdown-shadow;
        background-color: $white;
        border-radius: 5px;
        position: absolute;
        overflow: auto;
        margin: 0 0 0 0;
        z-index: 1000;
        display: none;
        width: 100%;
        .drop-items {
            padding: 8px 12px 8px 12px;
            font-size: 12px;
            font-weight: 400;
            background-color: $white;
            &:hover,
            &:focus {
                background-color: $hover;
                cursor: pointer;
            }
        }
    }
    .isShow {
        display: block;
    }
    .placeholder {
        color: #bdbdbd;
        text-align: left;
    }
}

.require .dropdown-wrapper .input-group {
    border-bottom: $accent solid 1px !important;
}
</style>
