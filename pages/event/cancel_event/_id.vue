<template>
    <section class="main-content">
        <div class="text-wrapper">
            <h1>You have requested to cancel your event.</h1>
            <DropdownSingle
                class="text-dropdown"
                @clicked="cancelClick"
                :items="listCancel"
            />
            <p class="text-warning">
                After submitting, please wait for our team to contact you back
                after the review is completed. Please note that during the
                review, your event is still deemed active. We shall notify you
                by your registered email !
            </p>
            <button
                type="submit"
                class="submitbtn"
                :disabled="!cancelReason"
                @click="$modal.show('confirm')"
            >
                Submit
            </button>
            <p class="text-warning">
                Please also note that your decision to cancel the event may
                affect your rating and your future event's show up in our
                Websites.
            </p>
        </div>
        <Confirm
            @clicked="cancelSubEvent"
            :title="title"
            :subCancel="subCancel"
        />
    </section>
</template>

<script>
import DropdownSingle from '~/components/Dropdown/DropdownSingle'
import Confirm from '~/components/ConfirmModal/Confirm'
import eventAPI from '~/api/graphql/events'
export default {
    components: {
        DropdownSingle,
        Confirm,
    },
    data() {
        return {
            listCancel: [
                'Minimum seats are not reached',
                'Unexpected accident',
                'Place is Unavailable',
            ],
            cancelReason: null,
            title: 'You are about to cancel your approved event.',
            subCancel: 'Please click below button to confirm.',
        }
    },
    methods: {
        cancelClick(value) {
            this.cancelReason = value
        },
        cancelSubEvent() {
            eventAPI
                .cancelSubEvent(this.$route.params.id, this.cancelReason)
                .then(res => {
                    this.$router.push('/event')
                })
        },
    },
}
</script>
<style lang="scss" scoped>
@use '@/styles/mixins.scss' as *;
@use '@/styles/responsive.scss' as *;
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

h1 {
    @include title-text(2em);
    font-weight: 600;
    color: #4d4d4d;
    text-align: center;
}
.footer {
    background-color: $footer-color;
    justify-content: center;
    text-align: center;
    display: flex;
    width: 100%;
    font-size: 14px;
    height: 48px;
    align-items: center;
}
a {
    cursor: pointer;
}
.main-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 75%;
    margin: 0 auto;
    margin-bottom: 24px;
    margin-top: 24px;
    @include respond-to($phone) {
        width: 90%;
    }
    .text-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .dropdown-cancel {
            display: flex;
            width: 40%;
            margin-top: 50px;
        }
        .text-dropdown {
            display: flex;
            width: 40%;
        }
        .text-warning {
            display: flex;
            width: 60%;
            text-align: center;
            justify-content: center;
            align-items: center;
            padding: 50px;
        }
        .submitbtn {
            display: flex;
            justify-content: center;
            width: 152px;
            padding: 10px 36px;
            border-radius: 4px !important;
        }
        .cancelbtn {
            width: 152px;
            padding: 10px 36px;
            border-radius: 4px !important;
            background: #ffffff;
            color: #800020;
        }
    }
}
</style>
