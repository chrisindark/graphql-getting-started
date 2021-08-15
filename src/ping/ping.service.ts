import { Injectable } from "@nestjs/common";

@Injectable()
export class PingService {
  constructor() {}

  ping(): any {
    return {
      message: "pong",
    };
  }
}
