import { Body, Controller, Post } from "@nestjs/common";
import { AdminService } from "./admin.service";

@Controller("admin")
export class AdminController {

    constructor(private readonly adminService: AdminService) { }

    @Post("kepala_desa/account")
    async createKepalaDesaAccount(
        @Body() data: any
    ) {
        return this.adminService.createKepalaDesaAccount(data)
    }

    @Post("rw/account")
    async createRtAccount(
        @Body() data: any
    ) {
        return this.adminService.createRtAccount(data)
    }

    @Post("rt/account")
    async createRwAccount(
        @Body() data: any
    ) {
        return this.adminService.createRwAccount(data)
    }

}