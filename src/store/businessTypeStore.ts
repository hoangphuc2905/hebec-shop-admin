import { businessTypeApi } from "api/business-type.api";
import { action, makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";
import { BusinessType } from "types/business-type";


class BusinessTypeStore {
    constructor() {
        makeAutoObservable(this)
        makePersistable(this, { name: 'SampleStore', properties: ['list'], storage: localStorage });
    }
    query = {
        page: 1, limit: 0,

    }
    totalItems = 0;
    list: BusinessType[] = []
    isRefresh = false
    isFetchMore = false
    isFetching = false


    @action
    fetchList = async () => {
        try {
            this.isRefresh = true
            this.isFetching = true
            this.query.page = 1
            const res = await businessTypeApi.findAll(this.query)
            this.list = res.data.businessTypes
            this.totalItems = res.data.total
        } finally {
            this.isRefresh = false
            this.isFetching = false
        }

    }
}

const businessTypeStore = new BusinessTypeStore()

export { businessTypeStore }