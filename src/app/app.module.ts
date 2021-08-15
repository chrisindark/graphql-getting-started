import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { LoggerModule } from "nestjs-pino";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import configuration from "../config/configuration";
import { PingModule } from "src/ping/ping.module";
import { DbModule } from "src/db/db.module";
import { GraphModule } from "src/graphql/graphql.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath:
                process.env.NODE_ENV === "production"
                    ? ".production.env"
                    : ".development.env",
            load: [configuration]
        }),
        LoggerModule.forRoot({
            level: process.env.NODE_ENV !== "production" ? "debug" : "info",
            prettyPrint: true
        }),
        DbModule,
        PingModule,
        GraphModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
