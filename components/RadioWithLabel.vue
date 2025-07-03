<template>
    <div class="wrapper">
        <div
            :class="`radio ${value === data ? 'active' : ''}`"
            @click="emitToParent"
        >
            <div v-if="value === data" class="active" />
        </div>
        <label @click="emitToParent">
            {{ label }}
        </label>
    </div>
</template>
<script>
export default {
    props: ['value', 'label', 'data'],
    methods: {
        emitToParent() {
            this.$emit('input', this.data)
        },
    },
}
</script>
<style lang="scss" scoped>
@use '@/styles/mixins.scss' as *;
@use '@/styles/responsive.scss' as *;

.wrapper {
    display: flex;
    align-items: center;
    .radio {
        height: 24px;
        width: 24px;
        border-radius: 50%;
        border: 1px solid #dadada;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        &.active {
            border-color: $accent;
        }
        .active {
            width: 63%;
            height: 63%;
            border-radius: 50%;
            background: $accent;
        }
    }
    label {
        padding-left: 16px;
        font-weight: 500;
        color: black;
    }
}
</style>
