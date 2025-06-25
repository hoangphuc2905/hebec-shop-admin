import { areaApi } from "api/area.api";
import { action, makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";
import { Area } from "types/area";



class AreaStore {
    constructor() {
        makeAutoObservable(this)
        makePersistable(this, { name: 'AreaStore', properties: ['list'], storage: localStorage });
    }
    query = {
        page: 1, limit: 0,

    }
    totalItems = 0;
    list: Area[] = []

    @action
    fetchList = async () => {
        try {
            this.query.page = 1
            const res = await areaApi.findAll(this.query)
            this.list = res.data.areas
            this.totalItems = res.data.total
        } finally {
        }

    }
}

const areaStore = new AreaStore()

export { areaStore }