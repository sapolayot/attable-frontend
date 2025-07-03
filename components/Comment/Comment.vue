<template>
    <div class="comment-wrapper">
        <div class="content-wrapper">
            <h3>Comment</h3>
            <div
                class="comment-list"
                v-for="(comment, comment_number) in commentList"
                :key="comment_number"
            >
                <div class="header">
                    <h4>
                        {{ comment.reserve.user.firstName }}
                        {{ comment.reserve.user.lastName }}
                    </h4>
                    <p class="date">
                        ·
                    </p>
                    <p class="date">
                        {{ time(comment.commentDate) }}
                    </p>
                </div>
                <div class="content">
                    <p>{{ comment.comment }}</p>
                </div>
            </div>
            <div class="page-control">
                <button class="navigation" @click="prevPage">
                    PREV
                </button>
                <div
                    class="page-numbers"
                    v-for="(page, pageNumber) in Array(totalPage).keys()"
                    :key="`pageNumber${pageNumber}`"
                    :class="{ active: active == page }"
                    @click="activate(page)"
                >
                    <p class="page-number">
                        {{ page + 1 }}
                    </p>
                </div>
                <button class="navigation" @click="nextPage">
                    NEXT
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import reviewAPI from '~/api/graphql/review'
import _ from 'lodash'
export default {
    props: ['id'],
    data() {
        return {
            commentList: [],
            totalPage: 0,
            active: 0,
        }
    },
    mounted() {
        reviewAPI.getReviewByChefId(1, 3, this.id).then(res => {
            this.commentList = res.getReviewByChefId.reviewevents
            this.totalPage = res.getReviewByChefId.totalPage
        })
    },
    methods: {
        time(value) {
            let stringDate = moment(value)
                .utc()
                .format('YYYY-MM-DD HH:mm:ss')
            return moment(stringDate).fromNow()
        },
        activate(index) {
            this.active = index
            reviewAPI.getReviewByChefId(index + 1, 3, this.id).then(res => {
                this.commentList = res.getReviewByChefId.reviewevents
                this.totalPage = res.getReviewByChefId.totalPage
            })
        },
        nextPage() {
            if (this.active < this.totalPage - 1) {
                this.activate(this.active + 1)
            }
        },
        prevPage() {
            if (this.active > 0) {
                this.activate(this.active - 1)
            }
        },
        deep(item, path) {
            return _.get(item, path)
        },
    },
}
</script>

<style lang="scss" scoped>
@use '@/styles/mixins.scss' as *;
@use '@/styles/responsive.scss' as *;
.comment-wrapper {
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    justify-content: center;
    display: flex;
    margin-top: 32px;
    .content-wrapper {
        padding: 24px 0;
        width: 90%;
        .comment-list {
            margin-bottom: 35px;
            .header {
                display: flex;
                align-items: center;
                margin-top: 26px;
                .date {
                    color: $light-grey;
                    margin-left: 10px;
                }
            }
            .content {
                margin-top: 8px;
            }
        }
        .page-numbers {
            color: $light-grey;
            margin: 0 15px;
            padding: 4px 10px;
            border-radius: 100%;
            cursor: pointer;
            &.active {
                background-color: $accent;
                color: $white;
            }
        }
        .page-control {
            display: flex;
            justify-content: center;
            margin-bottom: 36px;
            align-items: center;
            button {
                background-color: $white;
                border: 0;
                padding: 0;
                color: $light-grey;
                margin: 0 15px;
                border-radius: 100%;
                @include respond-to($phone) {
                    width: 26px;
                    height: 26px;
                    margin: 0 5px;
                }
            }
        }
    }
}
h3 {
    font-size: 30px;
    @include respond-to($phone) {
        font-size: 18px;
    }
}
h4 {
    font-size: 24px;
    font-weight: 600;
    @include respond-to($phone) {
        font-size: 14px;
    }
}
</style>
