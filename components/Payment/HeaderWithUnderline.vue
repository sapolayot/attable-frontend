<template>
    <section class="wrapper">
        <h2>{{ title }}</h2>
        <div class="underline" v-if="underline" />
        <div class="content-wrapper">
            <slot />
        </div>
    </section>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: '',
        },
        underline: {
            type: Boolean,
            default: true,
        },
    },
}
</script>
<style lang="scss" scoped>
@use '@/styles/mixins.scss' as *;
@use '@/styles/responsive.scss' as *;

.wrapper {
    width: 100%;
    margin-top: 10px;
    padding-bottom: 16px;
    h2 {
        font-size: 1.1em;
        font-weight: 550;
    }

    .underline {
        margin-top: 12px;
        height: 1px;
        width: 100%;
        background: $accent;
    }

    .content-wrapper {
        margin-top: 20px;
        display: flex;

        @include respond-to($phone) {
            flex-direction: column;
        }
    }
}
</style>
