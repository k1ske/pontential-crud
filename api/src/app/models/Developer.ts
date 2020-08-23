import {DataTypes}     from 'sequelize';
import {Injector}      from '../Injector';
import DatabaseService from '../services/DatabaseService';
import BaseModel       from './BaseModel';

export default class Developer extends BaseModel
{
    public id!: string;
    public nome!: string;
    public idade!: number;
    public hobby!: string;
    public datanascimento!: string;
}

Developer.init({
    id            : {
        type        : DataTypes.UUIDV4,
        defaultValue: DataTypes.UUIDV4,
        primaryKey  : true
    },
    nome          : {
        type     : DataTypes.STRING,
        allowNull: false
    },
    idade         : {
        type     : DataTypes.INTEGER,
        allowNull: false
    },
    hobby         : {
        type     : DataTypes.STRING,
        allowNull: false
    },
    datanascimento: {
        type     : DataTypes.DATEONLY,
        allowNull: false
    }
}, {
    sequelize  : Injector.resolve<DatabaseService>(DatabaseService),
    tableName  : 'developers',
    underscored: true,
    paranoid   : false,
    timestamps : false
});
