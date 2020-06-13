export interface IUser  {
    readonly pk: number
    readonly lastName: string;
    readonly firstName: string;
    readonly patronymic: string;
    readonly roles: Array<number>;
    readonly email: string;
    readonly password: string;
    readonly id_1c: string;
    readonly base_pk: number;
    status: number;
}