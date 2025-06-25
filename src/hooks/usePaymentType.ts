import { paymentTypeApi } from "api/paymentType.api"
import { useState } from "react"
import { PaymentType } from "types/paymentType"
import { QueryParam } from "types/query"

export interface PaymentTypeQuery extends QueryParam {

}

export const usePaymentType = () => {
    const [data, setData] = useState<PaymentType[]>([])
    const [total, setTotal] = useState(0)

    const fetchData = async (query: PaymentTypeQuery) => {
        const { data } = await paymentTypeApi.findAll(query)

        setData(data.paymentTypes)
        setTotal(data.total)
    }

    return { paymentTypes: data, total, fetchData }
}