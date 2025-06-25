import { Customer } from "./customer"
import { CustomerTransaction } from "./customerTransaction"
import { Staff } from "./staff"

export enum DepositStatus {
    Pending = 'PENDING',
    Complete = 'COMPLETE',
    Fail = 'FAIL'
}

export enum DepositType {
    Now = 'NOW', //chuyển ngay
    Suspend = 'SUSPEND', //Phong tỏa
}

export interface Deposit {
    id: number
    expireBlockedAt: number
    createdAt: number
    updatedAt: number
    isDeleted: boolean
    code: string
    status: DepositStatus
    amount: number
    note: string
    customer: Customer
    staff: Staff
    customerTransaction: CustomerTransaction
    // wallet: Wallet
}
