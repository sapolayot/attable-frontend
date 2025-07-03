// Use isActive for Active Click Function and use init to set initial score
<template>
    <div class="score-wrapper">
        <i
            class="material-icons star-score"
            v-for="(current_score, index) in Array(5).keys()"
            :key="index"
            @click="isActive ? setScore(index, current_score + 1) : null"
            :style="size ? `fontSize: ${size}px` : null"
        >
            {{ score >= index + 1 ? 'star' : 'star_border' }}
        </i>
    </div>
</template>

<script>
export default {
    props: ['index', 'isActive', 'init', 'size'],
    data() {
        return {
            score: this.init ? this.init : 0,
        }
    },
    methods: {
        setScore(index, score) {
            this.score = score
            this.$emit('clicked', score)
        },
    },
    watch: {
        init() {
            this.score = this.init
        },
    },
}
</script>

<style lang="scss" scoped>
@use '@/styles/mixins.scss' as *;
.score-wrapper {
    align-items: center;
    display: flex;
    .star-score {
        cursor: pointer;
        font-size: 20px;
        color: $star;
    }
}
</style>
