<template>
    <modal
        :name="name"
        :adaptive="true"
        :height="maxWidth <= 480 ? '80%' : maxWidth <= 1440 ? 'auto' : '60%'"
        :width="maxWidth >= 480 ? '60%' : '100%'"
        :scrollable="true"
    >
        <div class="close-btn">
            <button class="btn" @click.prevent="$modal.hide(name)">
                <i class="material-icons">close</i>
            </button>
        </div>
        <div class="term-modal-wrapper">
            <div class="logo-signup">
                <img src="~/assets/logo.png" />
            </div>
            <div class="termcon-content">
                <Term :termtext="termcondition" />
            </div>
            <div class="footer-wrapper">
                <div class="btn-wrapper">
                    <button class="return" @click.prevent="$modal.hide(name)">
                        return
                    </button>
                </div>
            </div>
        </div>
    </modal>
</template>

<script>
import Term from '~/components/Term/Term.vue'
export default {
    layout: 'detail',
    props: ['termcondition', 'name'],
    components: {
        Term,
    },
}
</script>

<style lang="scss" scoped>
@use '@/styles/mixins.scss' as *;
@use '@/styles/responsive.scss' as *;
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
.logo-signup {
    display: flex;
    justify-content: center;
    text-align: center;
}
.close-btn {
    position: absolute;
    display: flex;
    justify-content: flex-end;
    right: 0;
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
.term-modal-wrapper {
    height: 100%;
    padding: 4% 6%;
    @include respond-to($phone) {
        padding: 4% 4%;
    }
    * {
        margin: 10px 0;
    }
    .termcon-content {
        height: 48%;
        @include respond-to($phone) {
            height: 235px;
        }
        .term-wrapper {
            height: 100%;
            overflow-y: auto;
            padding: 0 10px;
        }
    }
    .footer-wrapper {
        border-top: 1px solid $accent;
        margin-top: 30px;
        .confirm {
            display: flex;
            justify-content: center;
            margin-top: 20px;
            @include respond-to($phone) {
                input {
                    margin: 0;
                    padding: 8px;
                }
            }
            * {
                margin: 0 10px;
            }
        }
        .btn-wrapper {
            margin: 40px;
            display: flex;
            flex-direction: row;
            justify-content: center;
            * {
                margin: 0 10px;
            }
            .return {
                padding: 10px 30px;
                border-radius: 4px;
                font-size: 14px;
                font-weight: 600;
                color: #800020;
                background-color: #fff;
            }
            button {
                padding: 10px 30px;
            }
        }
    }
}
</style>
