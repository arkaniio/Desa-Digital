import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DigitalSignatureService {

    constructor(private prisma: PrismaService) { }

    async createDigitalSignatureService(data: any, user_id: number) {



    }

}
