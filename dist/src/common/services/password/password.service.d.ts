declare class PasswordService {
    hashPassword(Password: string): Promise<string>;
    comparePassword(hashPassword: string, newPassword: string): Promise<true>;
}
export default PasswordService;
