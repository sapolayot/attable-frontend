<template>
    <div>
        <HeaderWithUnderline title="Detail" :underline="true">
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
                <Inputs
                    v-model="dinerTel"
                    :texts="dinerTel"
                    :holder="'Phone Number'"
                />
            </div>
        </HeaderWithUnderline>
        <HeaderWithUnderline
            :underline="false"
            v-for="(diner, i) in diners"
            :key="`diner-key-${i}`"
            :title="`Diner ${i + 1}`"
        >
            <div class="left end">
                <label class="label-text" />
                <Inputs
                    v-model="diner.fullName"
                    :texts="diner.fullName"
                    holder="diner name"
                />
            </div>
            <div class="right end">
                <label class="label-text small">
                    Food Restriction
                </label>
                <!-- ---------------------foodRestriction must be array--------------------- -->
                <Dropdown
                    v-if="showAllergics[i].length > 0"
                    :initial="showAllergics[i]"
                    :items="restrictions"
                    @clicked="restrictionClicked(i, $event)"
                    :class="`res-${i}`"
                    className="full"
                    :isHide="true"
                />
                <Dropdown
                    v-if="showAllergics[i].length < 1"
                    :initial="showAllergics[i]"
                    :items="restrictions"
                    @clicked="restrictionClicked(i, $event)"
                    :class="`res-${i}`"
                    className="full"
                    :isHide="true"
                />
                <!-- ---------------------foodRestriction must be array--------------------- -->
            </div>
        </HeaderWithUnderline>
        <!-- May we know a little bit about you? -->
        <HeaderWithUnderline
            title="May we know a little bit about you?"
            :underline="false"
        >
            <div class="single">
                <textarea v-model="aboutme" />
            </div>
        </HeaderWithUnderline>
    </div>
</template>
<script>
import HeaderWithUnderline from '~/components/Payment/HeaderWithUnderline'
import Inputs from '~/components/Inputs/Inputs'
import Dropdown from '~/components/Dropdown/Dropdown'
import sampleAPI from '~/api/graphql/sample'

export default {
    props: ['dinerName', 'dinerMail', 'dinerTel', 'diners', 'bookDiner'],
    components: {
        HeaderWithUnderline,
        Inputs,
        Dropdown,
    },
    data() {
        return {
            email: 'amysean@gmail.com',
            phoneNumber: '088-1929391',
            restriction: [],
            allergics: null,
            restrictions: null,
            aboutme: null,
        }
    },
    mounted() {
        this.phoneNumber = this.dinerTel
        this.getListAllergics()
        this.checkAboutme()
    },
    methods: {
        getListAllergics() {
            sampleAPI.getListAllergics().then(res => {
                this.allergics = res.getListAllergics
                this.restrictions = res.getListAllergics.map(item => {
                    return item['allergicName']
                })
            })
        },
        restrictionClicked(index, value) {
            const allergics = this.allergics.filter(item => {
                return value ? value.indexOf(item.allergicName) !== -1 : []
            })
            allergics.forEach(item => {
                delete item.__typename
            })
            this.diners[index].foodRestriction = allergics
        },
        checkAboutme() {
            if (this.$props.bookDiner.aboutme !== '') {
                this.aboutme = this.$props.bookDiner.aboutme
            }
        },
    },
    computed: {
        showAllergics() {
            var constAllegic = []
            constAllegic = this.diners
                ? this.diners.map(item => {
                      return item['foodRestriction'].map(
                          item => item['allergicName']
                      )
                  })
                : []
            return constAllegic
        },
    },
    watch: {
        diners() {
            this.bookDiner.diners = this.diners
            this.$emit('input', this.bookDiner)
        },
        phoneNumber() {
            this.bookDiner.phoneNumber = this.dinerTel
            this.$emit('input', this.bookDiner)
        },
        aboutme() {
            this.bookDiner.aboutme = this.aboutme
            this.$emit('input', this.bookDiner)
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
        p {
            margin-top: 14px;
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
        &.small {
            font-size: 0.7em;
            color: #828282;
        }
    }
    .single {
        flex: 1;
        textarea {
            border: 1px solid #bdbdbd;
            width: 100%;
            height: 160px;
        }
    }

    width: 80%;
    margin: 0 auto;
    @include respond-to($phone) {
        width: 100%;
        padding: 0 16px;
    }
    .progress-bar {
        width: 80%;
        margin: 0 auto;
        @include respond-to($phone) {
            width: 100%;
        }
        h4.title {
            @include title-text(1.5rem);
            margin: 72px 0 32px;
            text-transform: uppercase;
            text-align: center;
            @include respond-to($phone) {
                margin: 16px 0;
            }
        }
    }
    .header-section {
        padding: 32px 0 8px;
        border-bottom: 1px solid $accent;
        margin-bottom: 24px;
        @include respond-to($phone) {
            width: 100%;
            margin: 0;
        }
        h4 {
            @include title-text(1.5rem);
            font-weight: bold;
        }
    }
    .body-section {
        @include respond-to($phone) {
            width: 100%;
        }
        padding: 24px 0;
        width: 80%;
        margin: 0 auto;
    }
}
.margin10 {
    padding: 20px 0 0 0;
}
.end {
    align-self: flex-end;
    flex-grow: 0;
    @include respond-to($phone) {
        align-self: stretch;
    }
}
</style>
