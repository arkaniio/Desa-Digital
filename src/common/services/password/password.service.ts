import { BadGatewayException, BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import * as bcrypt from "bcrypt"
import { hash } from "node:crypto";

@Injectable()
class PasswordService {

    async hashPassword(Password: string) {

        const hashPassword = await bcrypt.hash(Password, 10)

        if (!hashPassword) throw new BadRequestException("Failed to hashing password from user!")

        return hashPassword

    }

    async comparePassword(hashPassword: string, newPassword: string) {

        const comparePassword = await bcrypt.compare(newPassword, hashPassword)

        if (!comparePassword) throw new BadRequestException("Failed to compare the password!")

        return comparePassword

    }

}

export default PasswordService