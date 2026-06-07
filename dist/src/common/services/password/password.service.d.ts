declare class PasswordService {
    hashPassword(password: string): Promise<string>;
    comparePassword(hashPassword: string, newPassword: string): Promise<boolean>;
}
export default PasswordService;
