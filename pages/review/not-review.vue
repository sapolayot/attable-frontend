<template>
    <section>
        <div class="error-wrapper">
            <h2>WELCOME to AT TABLE</h2>
            <p>You cannot rate review because you already rated.</p>
            <nuxt-link tag="button" type="button" to="/">
                Return
            </nuxt-link>
        </div>
    </section>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@use '@/styles/mixins.scss' as *;
@use '@/styles/responsive.scss' as *;

section {
    height: calc(100vh - #{$footerHeight + $navbarHeight});
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .error-wrapper {
        width: 500px;
        height: 200px;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }

    button {
        border: 1px solid #800020;
        padding: 10px 30px;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 600;
        color: #800020;
        background-color: #fff;

        &:hover {
            background: #800020;
            color: white;
        }
    }
}
</style>
