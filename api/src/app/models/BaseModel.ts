import {Model}             from 'sequelize';
import {FindOptions}       from 'sequelize/types/lib/model';
import {PaginationOptions} from '../interfaces/PaginationOptions';
import {PaginationResults} from '../interfaces/PaginationResults';

export default abstract class BaseModel extends Model
{
    public static async paginate<M extends Model>(this: { new(): M } & typeof BaseModel, options?: FindOptions, paginationOptions?: PaginationOptions): Promise<PaginationResults<M>> {
        const perPage = paginationOptions?.perPage || 20;
        const page = Math.max(paginationOptions?.page || 1, 1);
        const count = await this.count(options);
        const data = await this.findAll<M>({
            ...options,
            offset: (perPage * (page - 1)),
            limit : perPage
        });
        
        return {
            page    : page,
            perPage : perPage,
            total   : count,
            maxPages: Math.ceil(count / perPage),
            data    : data
        };
    }
}
