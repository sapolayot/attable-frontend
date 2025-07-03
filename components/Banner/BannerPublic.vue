<template>
    <hooper class="hooper-wrapper" :settings="hooperSettings" :itemsToShow="3">
        <slide v-for="(banner, index) in banners" :key="index">
            <div class="img-wrapper">
                <img class="slideimg" :src="banner.path" />
            </div>
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
}
</script>

<style lang="scss" scoped>
@use '@/styles/mixins.scss' as *;
.img-wrapper {
    height: 100%;
}
.slideimg {
    height: 100%;
    width: 100%;
    object-fit: cover;
}
</style>
