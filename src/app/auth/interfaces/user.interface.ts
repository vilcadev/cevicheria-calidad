export interface User{
    sub: string;
    name: string;
    iat: number;
    role: string;
}

export interface Usuario{
    id:string;
    name:string;
    email:string;
    passwrod:string;
    role?:string;
    jwt:string;
}
