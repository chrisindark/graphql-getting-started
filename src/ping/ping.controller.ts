import { Controller, Get } from "@nestjs/common";

import { PingService } from "./ping.service";

@Controller("api/v1")
export class PingController {
  constructor(private readonly pingService: PingService) {}

  @Get("ping")
  ping(): any {
    return this.pingService.ping();
  }
}
