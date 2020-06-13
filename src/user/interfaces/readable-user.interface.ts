export interface IReadableUser {
    readonly email: string;
    status: number;
    readonly lastName: string;
    readonly firstName: string;
    readonly patronymic: string;
    readonly roles: Array<number>;
    accessToken?: string;
}