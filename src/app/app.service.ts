import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getInfo(): any {
    return {
      name: "graphql-getting-started",
    };
  }
}
