<template>
    <hooper
        class="hooper-wrapper"
        :settings="hooperSettings"
        :itemsToShow="this.maxWidth > 480 ? 1.5 : 1"
    >
        <slide v-for="(banner, index) in banners" :key="index">
            <img :style="`background-image: url('${banner.path}');`" />
        </slide>
        <hooper-navigation slot="hooper-addons" />
    </hooper>
</template>
<script>
import { Hooper, Slide, Navigation as HooperNavigation } from 'hooper'
import 'hooper/dist/hooper.css'
export default {
    props: ['banners'],
    data() {
        return {
            hooperSettings: {
                initialSlide: 1,

                centerMode: true,
                infiniteScroll: true,
                autoPlay: true,
                playSpeed: 5000,
                shortDrag: false,
                wheelControl: false,
            },
            maxWidth: Math.max(
                document.documentElement.clientWidth,
                window.innerWidth || 0
            ),
        }
    },
    components: {
        Hooper,
        Slide,
        HooperNavigation,
    },
    mounted() {},
}
</script>

<style lang="scss" scoped>
@use '@/styles/mixins.scss' as *;
@use '@/styles/responsive.scss' as *;
.hooper {
    height: 400px;
    @include respond-to($phone) {
        height: 200px;
    }
    img {
        background-size: cover;
        width: 100%;
        height: 100%;
        background-position: left center;
    }
}
</style>
