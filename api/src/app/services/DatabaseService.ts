import {
    Dialect,
    Sequelize
}                from 'sequelize';
import {Service} from '../Injector';
import {env}     from '../Helpers';

@Service
export default class DatabaseService extends Sequelize
{
    constructor() {
        super(env('DB_DATABASE'), env('DB_USER'), env('DB_PASS'), {
            dialect: <Dialect>env('DB_DIALECT'),
            host   : env('DB_HOST'),
            port   : parseInt(env('DB_PORT')),
            define : {
                underscored: true
            },
            logging: false
        });
    }
}
