
export interface QueryParam {
    page: number;
    limit: number;
    search?: string;
    [key: string]: any;
}