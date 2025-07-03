<template>
    <div>
        <div class="data-group">
            <div
                class="data"
                :class="`${isOpen ? 'is-open' : 'is-close'}`"
                @click.prevent="clicked"
            >
                <slot name="title" />
            </div>
            <div class="panel" :class="`${isOpen ? 'is-open' : 'is-close'}`">
                <slot name="content" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['items'],
    data() {
        return {
            isOpen: false,
        }
    },
    methods: {
        clicked() {
            this.isOpen = !this.isOpen
        },
    },
}
</script>

<style lang="scss" scoped>
@use '@/styles/mixins.scss' as *;
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
.title {
    padding-top: 32px;
    color: #800020;
    font-size: 18px;
}
.data {
    cursor: pointer;
    width: 100%;
    display: flex;
    color: $accent;
    justify-content: space-between;
    background-color: $hover-tab;
    padding: 10px 20px;
    margin: 10px 0;
}
// .is-open, .data:hover {
//     background-color: #800020;
//     color: white;
//     border-bottom: 0;
// }
.panel {
    color: black;
    background-color: white;
    overflow: hidden;
    justify-content: flex-end;
    text-align: justify;
    padding: 10px 20px;
}
.data-group {
    font-size: 16px;
}
.is-close.panel {
    display: none;
}
.m-t-20 {
    margin-top: 20px;
}
.width-170 {
    width: 170px;
}
.img-wrapper {
    img {
        width: 100%;
        height: 100%;
    }
}
</style>
