import { Product } from 'types/product';
import { News } from 'types/news';

export interface ProductTag {
    id: number
    createdAt: number
    updatedAt: number
    isDeleted: boolean
    name: string
    products: Product[]
}



export interface NewsTag {
    id: number
    createdAt: number
    updatedAt: number
    isDeleted: boolean
    name: string
    newses: News[]
}
