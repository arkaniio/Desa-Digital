export type UserUpdateDto = {
    Username?: string;
    Email?: string;
    Password?: string;
};
export declare class CreateUserDto {
    Email: string;
    Password: string;
    Username: string;
    Role: string;
}
export declare class LoginDto {
    Email: string;
    Password: string;
}
