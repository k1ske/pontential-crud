export interface PaginationResults<M>
{
    page: number,
    perPage: number,
    total: number;
    maxPages: number;
    data: M[]
}
