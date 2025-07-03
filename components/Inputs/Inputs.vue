<template>
    <div class="input-wrapper">
        <label :class="`text ${this.text ? 'isShow' : null}`">{{
            title
        }}</label>
        <input
            :type="`${name}`"
            class="input"
            :name="`${name}`"
            :placeholder="`${holder}`"
            v-model="text"
            :readonly="readonly"
        />
    </div>
</template>

<script>
export default {
    props: ['holder', 'title', 'name', 'texts', 'readonly'],
    data() {
        return {
            text: '',
        }
    },
    mounted() {
        this.text = this.texts
    },
    watch: {
        text() {
            this.$emit('input', this.text)
        },
    },
}
</script>

<style lang="scss" scoped>
@use '@/styles/mixins.scss' as *;
.text {
    display: none;
}
.input {
    font-size: 18px;
    width: 100%;
}
.isShow {
    display: block;
}
</style>
