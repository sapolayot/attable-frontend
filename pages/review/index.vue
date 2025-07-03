<template>
    <div v-if="statusShow" class="page-wrapper">
        <loading
            :active.sync="isLoading"
            :can-cancel="false"
            :is-full-page="true"
        />
        <h1 class="header">
            Please give your review below
        </h1>
        <div
            class="qeustion-wrapper"
            v-for="(text, index) in reviewList"
            :key="index"
        >
            <p>{{ text }}</p>
            <Score
                :index="index"
                :isActive="true"
                :size="30"
                @clicked="setScore(index, $event)"
            />
        </div>
        <div class="qeustion-wrapper">
            8. Other comments (ข้อคิดเห็นอื่นๆ)
            <textarea v-model="comment">sss</textarea>
        </div>
        <button
            class="btn_confirm_review"
            :disabled="comment === null || comment === ''"
            @click="createReview"
        >
            confirm
        </button>
        <modal
            @clicked="reviewFinish"
            @closed="isLoading = false"
            header="Thank you for your review."
            text="Thank you very much for taking your time to review our chef. Your valuable comments will be shared with our chef to help enhance his/her future events."
        />
    </div>
</template>

<script>
import { mapState } from 'vuex'
import modal from '~/components/modal'
import Score from '~/components/Score/Score'
import reviewAPI from '~/api/graphql/review'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
    components: {
        modal,
        Score,
        Loading,
    },
    data() {
        return {
            statusShow: false,
            isLoading: false,
            score: [0, 0, 0, 0, 0, 0, 0],
            thanksModal: false,
            reviewList: [
                "1. Overall Event's Atmosphere (บรรยากาศโดยรวม)",
                "2. Chef's Hospitality (การดูแลและความเป็นกันเองของเชฟ)",
                '3. Tasting Experience (ประสบการณ์การกินอาหาร)',
                '4. Food Quality (คุณภาพของอาหาร)',
                "5. Event's Timeliness (การตรงต่อเวลา)",
                '6. Location (สถานที่จัดงาน)',
                '7. Service (การบริการ)',
            ],
            comment: null,
            review: 0,
            reviewerNumber: 0,
        }
    },
    methods: {
        setScore(i, number) {
            this.score[i] = number
        },
        switchThanksModal() {
            this.$modal.show('modal-dynamic')
            this.thanksModal = this.thanksModal
        },
        createReview() {
            this.isLoading = true
            const review = {
                reviewEvent: {
                    rate1: this.score[0],
                    rate2: this.score[1],
                    rate3: this.score[2],
                    rate4: this.score[3],
                    rate5: this.score[4],
                    rate6: this.score[5],
                    rate7: this.score[6],
                    comment: this.comment,
                },
                reserveId: this.$route.query.reserveId,
                chefId: this.$route.query.chefId,
            }
            reviewAPI.reviewSubEvent(review).then(res => {
                this.switchThanksModal()
            })
        },
        reviewFinish() {
            this.$router.push('/')
        },
    },
    computed: {
        ...mapState({
            user: state => state.auth.auth,
        }),
    },
    mounted() {
        reviewAPI
            .getReviewByReservationId(Number(this.$route.query.reserveId))
            .then(res => {
                if (res.getReviewByReservationId) {
                    this.$router.push('/review/not-review')
                } else {
                    this.statusShow = true
                }
            })
    },
}
</script>

<style lang="scss" scoped>
@use '@/styles/mixins.scss' as *;

.page-wrapper {
    width: 100%;
    max-width: 600px;
    margin: auto;
    padding: 30px 0;
    .qeustion-wrapper {
        padding: 14px 0;
        .score-wrapper {
            padding-left: 10px;
            .star-score {
                cursor: pointer;
                font-size: 30px;
                color: $star;
            }
        }
    }
}

.btn_confirm_review {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>
