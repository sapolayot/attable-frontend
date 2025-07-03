<template>
    <div
        class="drop-items"
        :class="`${toggle ? 'selected' : disable ? 'disable' : null}`"
        @click.prevent="clickItems(item)"
    >
        <div class="icon" :class="`${toggle ? 'show' : 'hide'}`">
            <i class="material-icons">done</i>
        </div>
        <label>{{ item }}</label>
    </div>
</template>
<script>
export default {
    props: ['item', 'itemValue'],
    computed: {
        toggle: function() {
            if (this.itemValue.includes(this.item)) {
                return true
            }
            return false
        },
        disable: function() {
            if (this.itemValue.includes('No restriction')) {
                return true
            }
            return false
        },
    },
    methods: {
        clickItems(item) {
            if (!this.disable || item == 'No restriction') {
                this.$emit('clickItems', item)
            }
        },
    },
}
</script>
<style lang="scss" scoped>
@use '@/styles/mixins.scss' as *;
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
.disable.drop-items {
    color: $disable;
}
.selected.drop-items {
    background-color: $accent;
    color: $white;
}
.none.drop-items {
    background-color: $white;
}
.show.icon {
    display: block;
}
.icon {
    display: none;
}
.drop-items {
    background-color: $white;
    border-radius: 4px;
    font-weight: 400;
    padding: 8px 8px;
    margin: 8px 8px;
    font-size: 12px;
    display: flex;
    height: 100%;
    flex-shrink: 0;
    i {
        font-size: 18px;
    }
    label {
        margin: 0 12px;
        flex-shrink: 0;
    }
    &:hover,
    &:focus {
        cursor: pointer;
    }
}
</style>
