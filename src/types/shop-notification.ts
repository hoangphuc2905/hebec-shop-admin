import { Area } from "./area"
import { Staff } from "./staff"

export interface ShopNotification {
    id: number
    createdAt: number
    updatedAt: number
    isDeleted: boolean
    title: string
    content: string
    mode: ShopNotificationMode
    lastSentAt: number
    area: Area;
    sentStaff: Staff;
}



export enum ShopNotificationMode {
    Global = 'GLOBAL', //Tất cả user
    Range = 'RANGE' // cho 1 group user
}
