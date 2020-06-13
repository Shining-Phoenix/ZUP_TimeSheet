export interface ISubdivision  {
    readonly pk: string
    readonly base_pk: number;
    readonly name: string;
    readonly code: string;
    readonly parent_pk: string;
    readonly organization_pk: string;
}