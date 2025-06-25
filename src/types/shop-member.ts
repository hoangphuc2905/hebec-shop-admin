import { Gender } from "constant";

export interface ShopMember {
    id: number
    createdAt: number
    updatedAt: number
    name: string;
    isDeleted: boolean
    username: string
    password: string
    avatar: string;
    dob: string
    gender: Gender
    address: string //nơi sinh
}
