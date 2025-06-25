import { Customer } from "./customer"
import { Deposit } from "./deposit"

export enum CustomerTransactionType {
    BuyOrder = 'BUY_ORDER', //thanh toán đơn hàng
    Transfer = 'TRANSFER', //chuyển khoản từ tk C
    SavingPayment = 'SAVING_PAYMENT',// thanh toán tiết kiệm
    RefundOrder = 'REFUND_ORDER', //Hoàn đơn hủy (Staff thao tác)
}



export interface CustomerTransaction {
    id: number
    createdAt: number
    updatedAt: number
    isDeleted: boolean
    code: string
    beforeChange: number
    change: number
    afterChange: number
    isCompleted: boolean
    expireBlockedAt: number
    type: CustomerTransactionType
    customer: Customer
    deposit: Deposit
}
