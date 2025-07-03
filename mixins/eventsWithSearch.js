import eventsAPI from "~/api/graphql/events"
import Fuse from "fuse.js"
import moment from "moment"
// events พวกนี้ ผ่านการ filter เอาเฉพาะ status ที่ไม่ requesting เท่านั้นนะ
const eventWithSearch = {
    data() {
        return {
            events: [],
            page: 1,
            pagesize: 100,
            searchText: null,
            filterOption: null,
            currentDate: new Date(),
            isLoading: false
        }
    },
    methods: {
        clickFilter(filter) {
            this.filterOption = filter
            if (this.filterOption === "featured") {
                this.title = "FEATURED EVENTS"
            }
            else if (this.filterOption === "featured") {
                this.title = "SPECIAL TABLES"
            }
            else if (this.filterOption === "upcoming") {
                this.title = "UPCOMING EVENT"
            }
            else if (this.filterOption === "special") {
                this.title = "SPECIAL TABLES"
            }
            else if (this.filterOption == "allEvent") {
                this.title = "ALL EVENTS"
            }
            return
        }
    },
    computed: {
        eventList() {
            if (this.searchText) {
                const options = {
                    keys: [
                        "eventName",
                        "eventType",
                        "chef.user.firstName",
                        "chef.user.lastName"
                    ]
                }
                const fuse = new Fuse([ ...this.events ], options)
                const result = fuse.search(this.searchText)
                return result
            }
            return this.events
        },
        eventListWithApprovedAndRequesting() {
            const status = [ "Approved", "In_progress" ]
            return this.eventList.filter(
                each => status.includes(each.status) || each.status == "Requesting"
            )
        },
        eventListWithApprovedAndFeatured() {
            const status = [ "Approved", "In_progress" ]
            return this.eventList
                .filter(each => {
                    return (
                        status.includes(each.status) &&
                        each.eventCategory == "Go_Prac"
                    )
                })
        },
        eventListWithApprovedAndUpcoming() {
            const status = [ "Approved", "In_progress" ]
            var upcomming = this.eventList
                .filter(each => {
                    const filter = each.subevent.filter((item)=>{
                        var eventDate = moment(item.eventDate).format("DD-MM-YYYY")
                        eventDate = moment(eventDate, "DD-MM-YYYY")
                        const upcoming = eventDate.diff(this.currentDate, "days") + 1 > 0
                        return upcoming
                    })
                    return status.includes(each.status) && filter.length > 0
                })
            return upcomming
        },
        eventListWithApprovedAndSpecial() {
            const status = [ "Approved", "In_progress" ]
            return this.eventList
                .filter(each => {
                    return (
                        status.includes(each.status) && each.eventType == "Special"
                    )
                })
        },
        filterByFilterOption() {
            var list = []
            const status = [ "Approved", "In_progress" ]
            const id = this.$route.query.id
            if (id == 0) {
                list = this.eventList.filter(each => {
                    return (
                        status.includes(each.status) &&
                        each.eventCategory == "Go_Prac"
                    )
                })
            }
            else if (id == 1) {
                const status = [ "Approved", "In_progress" ]
                list = this.eventList.filter(each => {
                    const filter = each.subevent.filter((item)=>{
                        var eventDate = moment(item.eventDate).format("DD-MM-YYYY")
                        eventDate = moment(eventDate, "DD-MM-YYYY")
                        const upcoming = eventDate.diff(this.currentDate, "days") + 1 > 0
                        return upcoming
                    })
                    return status.includes(each.status) && filter
                })
            }
            else if (id == 2) {
                const status = [ "Approved", "In_progress" ]
                list = this.eventList.filter(each => {
                    return (
                        status.includes(each.status) && each.eventType == "Special"
                    )
                })
            }
            else {
                const status = [ "Approved", "In_progress" ]
                list = this.eventList.filter(each => status.includes(each.status))
            }
            if (this.filterOption) {
                if (this.filterOption === "featured") {
                    const status = [ "Approved", "In_progress" ]
                    list = this.eventList.filter(each => {
                        return (
                            status.includes(each.status) &&
                            each.eventCategory == "Go_Prac"
                        )
                    })
                }
                else if (this.filterOption === "upcoming") {
                    const status = [ "Approved", "In_progress" ]
                    list = this.eventList.filter(each => {
                        const filter = each.subevent.filter((item)=>{
                            var eventDate = moment(item.eventDate).format("DD-MM-YYYY")
                            eventDate = moment(eventDate, "DD-MM-YYYY")
                            const upcoming = eventDate.diff(this.currentDate, "days") + 1 > 0
                            return upcoming
                        })
                        return status.includes(each.status) && filter
                    })
                }
                else if (this.filterOption === "special") {
                    const status = [ "Approved", "In_progress" ]
                    list = this.eventList.filter(each => {
                        return (
                            status.includes(each.status) &&
                            each.eventType == "Special"
                        )
                    })
                }
                else if (this.filterOption === "allEvent") {
                    const status = [ "Approved", "In_progress" ]
                    list = this.eventList.filter(
                        each => status.includes(each.status)
                    )
                }
            }
            return list
        }
    },
    mounted() {
        this.isLoading = true
        eventsAPI.getEvents(this.page, this.pagesize).then(res => {
            this.events = res.getListAllEvents.events
            this.isLoading = false
        }).catch(()=>{
            this.isLoading = false
        })
    }
}

export default eventWithSearch
