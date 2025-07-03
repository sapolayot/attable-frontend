<template>
    <div class="dropdown-wrapper" @mouseleave="isShow = false">
        <div class="width-wrapper">
            <div
                class="input-group"
                :class="className"
                @click.prevent="isShow = !isShow"
            >
                <p class="valueShow" v-if="!isHide">
                    {{ holder ? holder : 'Select food restriction' }}
                </p>
                <p v-if="isHide">
                    {{
                        initial[0]
                            ? initial.toString()
                            : holder
                            ? holder
                            : 'Select food restriction'
                    }}
                </p>
                <i class="material-icons">expand_more</i>
            </div>
            <div
                class="drop-list"
                :style="`${overflow ? overfloat : null}`"
                :class="`${isShow ? 'isShow' : 'hide'} ${className}`"
            >
                <div v-for="(item, index) in items" :key="index">
                    <Items
                        :itemValue="value"
                        :item="item.value ? item.value : item"
                        @clickItems="clickItems"
                    />
                </div>
            </div>
        </div>
        <div class="res-list-wrapper" v-if="value[0] && !isHide">
            <div
                class="res-wrapper"
                v-for="(res_list, index) in value"
                :key="index"
            >
                <p>
                    {{ res_list }}
                </p>
                <div class="xicon" @click.prevent="clickItems(res_list)">
                    <i class="material-icons" :id="index.toString()">
                        close
                    </i>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Items from '~/components/Dropdown/Items'
export default {
    props: ['items', 'overflow', 'initial', 'holder', 'className', 'isHide'],
    components: {
        Items,
    },
    data() {
        return {
            isShow: false,
            text: null,
        }
    },
    methods: {
        clickItems(item) {
            this.text = item
            if (this.initial.indexOf(item) == -1) {
                this.initial.push(item)
                if (item == 'No restriction') {
                    this.initial = ['No restriction']
                }
            } else {
                this.initial.splice(this.initial.indexOf(item), 1)
            }
            this.$emit('clicked', this.initial)
        },
    },
    computed: {
        overfloat() {
            return 'height: ' + `${this.overflow * 40}px`
        },
        disable: function() {
            if (this.value.includes('No restriction')) {
                return true
            }
            return false
        },
        value: function() {
            return this.initial ? this.initial : []
        },
    },
}
</script>
<style lang="scss" scoped>
@use '@/styles/mixins.scss' as *;
@use '@/styles/responsive.scss' as *;
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
.dropdown-wrapper {
    position: relative;
    width: 100%;
    .width-wrapper {
        width: 100%;
        position: relative;
        @include respond-to($phone) {
            width: 100%;
        }
    }
    .input-group {
        border-bottom: 1px solid $border;
        justify-content: space-between;
        padding: 8px 8px 8px 0;
        text-align: end;
        display: flex;
        width: 45%;
        @include respond-to($phone) {
            width: 100%;
        }
        &:hover,
        &:focus {
            border-color: $accent;
            cursor: pointer;
        }
        &.full {
            width: 100%;
        }
    }
    .valueShow {
        overflow-y: hidden;
        height: 22px;
        // color: $light-grey;
    }
    .drop-list {
        box-shadow: $dropdown-shadow;
        background-color: $white;
        border-radius: 5px;
        position: absolute;
        overflow-y: scroll;
        z-index: 1000;
        display: none;
        width: 45%;
        height: 200px;
        @include respond-to($phone) {
            width: 100%;
        }
        &.full {
            width: 100%;
        }
    }
    .isShow {
        display: block;
    }
    .res-list-wrapper {
        display: flex;
        flex-wrap: wrap;
        margin: 10px 0;
        width: 100%;
        .res-wrapper {
            display: flex;
            background-color: #fdedf1;
            padding: 10px;
            border-radius: 30px;
            margin: 5px;
            align-items: center;
            flex-wrap: nowrap;
            flex-shrink: 0;
            p {
                font-size: 12px;
                color: $accent;
                margin: 0 5px;
            }
            .xicon {
                cursor: pointer;
                i {
                    color: $accent;
                    font-size: 20px;
                }
            }
        }
        .xicon {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        .material-icons {
            font-size: 18px;
            cursor: pointer;
        }
    }
}

.require .dropdown-wrapper .width-wrapper .input-group {
    border-bottom: $accent solid 1px !important;
}
</style>
