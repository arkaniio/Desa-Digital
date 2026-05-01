import { Body, Controller, Delete, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { DigitalSignatureService } from './digital_signature.service';
import { CurrentUser, JwtAuthGuard, Roles, RolesGuard } from '../common/auth';
import { CreateDigitalSignatureDto, UpdateSignatureDto } from './dto/digital_signature.dto';

@Controller('digital-signature')
export class DigitalSignatureController {

    constructor(private readonly digitalSignatureService: DigitalSignatureService) { }

    @Post("create")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("KEPALA_DESA", "RT")
    async createDigitalSignature(@Body() data: CreateDigitalSignatureDto, @CurrentUser() user_id: number) {
        return this.digitalSignatureService.createDigitalSignature(data, user_id)
    }

    @Delete("delete/:id")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("KEPALA_DESA", "RT")
    async deleteDigitalSignature(@Param('id', ParseIntPipe) id: number, @CurrentUser() user_id: number) {
        return this.digitalSignatureService.deleteDigitalSignature(user_id, id)
    }

    @Put("update/:id")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("KEPALA_DESA", "RT")
    async updateDigitalSignature(@Body() data: UpdateSignatureDto, @CurrentUser() user_id: number, @Param('id', ParseIntPipe) id: number) {
        return this.digitalSignatureService.updateDigitalSignature(data, user_id, id)
    }

}
