<template>
    <div class="wrapper">
        <div class="step-lists">
            <div
                v-for="(name, index) in stepNames"
                :key="index"
                :class="['step', { active: step >= index + 1 }]"
            >
                <div class="circle">
                    <div class="icon info" v-if="index == 0" />
                    <div class="icon summary" v-if="index == 1" />
                    <div class="icon payment" v-if="index == 2" />
                </div>
                <div class="label">
                    {{ name }}
                </div>
            </div>
        </div>
        <div class="line" />
    </div>
</template>

<script>
export default {
    props: ['step', 'stepNames'],
}
</script>

<style lang="scss" scoped>
@use '@/styles/responsive.scss' as *;
@use '@/styles/mixins.scss' as *;
$desktop-circle: 48px;
$mobile-circle: 30px;
$icons: (
    info: '~assets/payment/editor.svg',
    summary: '~assets/payment/summary.svg',
    payment: '~assets/payment/payment.svg',
);
.wrapper {
    position: relative;
    & > .step-lists {
        display: flex;
        flex-direction: row;
        & > .step {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            &:first-child {
                align-items: flex-start;
            }
            &:last-child {
                align-items: flex-end;
            }
            & > .circle {
                width: $desktop-circle;
                height: $desktop-circle;
                border: 2px solid $accent;
                background-color: $white;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 5;
                @include respond-to($phone) {
                    width: $mobile-circle;
                    height: $mobile-circle;
                }
                .icon {
                    width: 20px;
                    height: 20px;
                    background-color: $accent;
                    @each $class, $icon in $icons {
                        &.#{$class} {
                            mask: url(#{$icon}) no-repeat;
                        }
                    }
                    @include respond-to($phone) {
                        width: 12px;
                        height: 12px;
                    }
                }
            }
            & > .label {
                margin-top: 10px;
                opacity: 0.5;
                font-weight: 600;
            }
        }
        & > .active {
            opacity: 1;
            & > .circle {
                background-color: $accent;
                .icon {
                    background-color: $white;
                }
            }
            & > .label {
                opacity: 1;
                color: $accent;
            }
        }
    }
    .line {
        position: absolute;
        top: $desktop-circle / 2;
        height: 1.5px;
        background-color: $accent;
        transition: 0.3s;
        left: 16px;
        right: 16px;
        @include respond-to($phone) {
            top: $mobile-circle / 2;
        }
    }
}
</style>
