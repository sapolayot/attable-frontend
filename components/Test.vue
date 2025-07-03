<template>
    <input
        type="text"
        @input="e => foo = e.target.value"
        :value="foo"
    >
</template>
<script>
export default {
    data() {
        return {
            foo: ''
        }
    },
}
</script>
