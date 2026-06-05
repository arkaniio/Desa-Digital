import { BadGatewayException, BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import * as bcrypt from "bcrypt"
import { hash } from "node:crypto";

@Injectable()
class PasswordService {

    async hashPassword(password: string): Promise<string> {

        if (password == null) throw new NotFoundException("Failed to detect password!")

        const hashPassword = await bcrypt.hash(password, 10)

        if (!hashPassword) throw new BadRequestException("Failed to hashing password from user!")

        return hashPassword

    }

    async comparePassword(hashPassword: string, newPassword: string): Promise<boolean> {

        if (hashPassword && newPassword == null) throw new NotFoundException("Failed to found the hash password and new password!")

        const comparePassword = await bcrypt.compare(newPassword, hashPassword)

        if (!comparePassword) throw new BadRequestException("Failed to compare the password!")

        return comparePassword

    }

}

export default PasswordService