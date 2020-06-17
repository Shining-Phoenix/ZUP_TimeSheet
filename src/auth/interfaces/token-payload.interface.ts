export interface ITokenPayload {
    pk: number,
    status: number,
    expiresIn: number,
    roles: number[],
    base_pk: number
}