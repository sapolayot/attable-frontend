import Dropdown from '~/components/Dropdown/Dropdown'
import DropdownSingle from '~/components/Dropdown/DropdownSingle'
import Timepicker from '~/components/Timepicker/Timepicker'
import moment, { weekdays } from 'moment'
import { mapState } from 'vuex'
import eventAPI from '~/api/graphql/events'
import sampleAPI from '~/api/graphql/sample'
import Vue from 'vue'
import userAPI from '~/api/graphql/user'
import axios from 'axios'
import apiConfig from '~/config/endpoint'
import {
    required,
    minLength,
    email,
    maxLength,
    numeric,
    minValue,
    maxValue
} from 'vuelidate/lib/validators'

export default {

}
