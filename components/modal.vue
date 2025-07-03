<template>
    <modal
        name="modal-dynamic"
        classes="forget-password-modal-wrapper"
        :adaptive="true"
        width="50%"
        height="auto"
        @closed="confirm"
    >
        <section class="modal-wrapper">
            <div class="close-btn">
                <button
                    class="btn"
                    @click.prevent="$modal.hide('modal-dynamic')"
                >
                    <i class="material-icons">close</i>
                </button>
            </div>
            <div class="logo-forgot">
                <img src="~/assets/logo.png" />
            </div>
            <div class="modal-header">
                {{ header }}
            </div>
            <div class="modal-text">
                {{ text }}
            </div>
        </section>
    </modal>
</template>

<script>
export default {
    props: {
        header: null,
        text: null,
    },
    mounted() {},
    methods: {
        confirm() {
            this.$emit('clicked')
        },
    },
}
</script>

<style lang="scss" scoped>
@use '@/styles/mixins.scss' as *;
@use '@/styles/responsive.scss' as *;
// Modal Style without scope for overwrite style
.forget-password-modal-wrapper {
    background: #fff;
    border-radius: 6px;
    height: 100% !important;
    @include respond-to($phone) {
        width: 100% !important;
        min-height: auto !important;
        left: 0 !important;
    }
}

.modal-wrapper {
    padding: 40px;
}
.close-btn {
    position: absolute;
    right: 0;
    top: 0;
    .btn {
        background-color: transparent;
        padding: 16px 16px 0 0;
        border: 0;
        color: $primary;
        .material-icons {
            font-size: 18px;
        }
    }
}
.logo-forgot {
    display: flex;
    justify-content: center;
    text-align: center;
}
.modal-header {
    text-align: center;
    font-weight: 600;
    padding-top: 16px;
}
.modal-text {
    text-align: center;
    padding-top: 16px;
}
</style>
