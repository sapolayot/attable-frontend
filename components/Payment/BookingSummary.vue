<template>
    <div>
        <HeaderWithUnderline title="Detail" underline>
            <div class="left">
                <label class="label-text">
                    Email Address
                </label>
                <p>{{ dinerMail }}</p>
            </div>
            <div class="right">
                <label class="label-text">
                    Mobile Phone
                </label>
                <p>{{ dinerTel }}</p>
            </div>
        </HeaderWithUnderline>
        <HeaderWithUnderline title="Diner" underline>
            <div class="diner-wrapper">
                <div
                    class="diner-row"
                    v-for="(diner, i) in diners"
                    :key="`diner-loop-${i}`"
                >
                    <div class="col">
                        <p>{{ diner.fullName }}</p>
                    </div>
                    <div class="col">
                        <p class="red">
                            {{ showRestriction(i).toString() }}
                        </p>
                    </div>
                </div>
            </div>
        </HeaderWithUnderline>
        <HeaderWithUnderline title="About You" underline>
            <div class="row">
                <div class="col">
                    <p>{{ aboutme }}</p>
                </div>
            </div>
        </HeaderWithUnderline>
        <HeaderWithUnderline title="Chef's House Rule" underline>
            <div class="row">
                <div class="col">
                    <p>
                        {{ subEvent.event.rule }}
                    </p>
                </div>
            </div>
        </HeaderWithUnderline>
    </div>
</template>
<script>
import HeaderWithUnderline from '~/components/Payment/HeaderWithUnderline'

export default {
    props: ['diners', 'dinerMail', 'dinerTel', 'aboutme', 'subEvent'],
    components: {
        HeaderWithUnderline,
    },
    data() {
        return {
            email: 'amysean@gmail.com',
            phone: '099-99999999',
            showRes: null,
        }
    },
    mounted() {
        this.showRes = this.diners.map(value => {
            return value.foodRestriction.map(item => {
                return item.allergicName
            })[0]
        })
    },
    methods: {
        showRestriction(index) {
            return this.diners[index].foodRestriction.map(item => {
                return item.allergicName
            })
        },
    },
}
</script>
<style lang="scss" scoped>
@use '@/styles/mixins.scss' as *;
@use '@/styles/responsive.scss' as *;

.page-wrapper {
    $paddingMock: 12px;
    .left {
        flex: 1;
        padding-right: $paddingMock;
        @include respond-to($phone) {
            padding-right: 0px;
        }
        &.end {
            align-self: flex-end;
            @include respond-to($phone) {
                align-self: stretch;
            }
        }
    }
    .right {
        flex: 1;
        padding-left: $paddingMock;
        @include respond-to($phone) {
            padding-left: 0px;
            margin-top: 6px;
        }
    }
    .label-text {
        display: block;
        color: $accent;
        font-size: 16px;
        margin-bottom: 6px;

        &.small {
            font-size: 0.7em;
            color: #828282;
        }
    }
}

.diner-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    .diner-row {
        flex: 1;
        display: flex;
        margin-top: 6px;
        .red {
            color: $accent;
        }
    }
}
.row {
    display: flex;
}
.col {
    flex: 1;
}
</style>
