import { Module, Global } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { DbService } from "./db.service";

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        console.info("Using db - ", configService.get("database.writeHost"));

        return {
          type: "mysql",
          name: "writeConnection",
          host: configService.get("database.writeHost"),
          port: configService.get("database.port"),
          username: configService.get("database.username"),
          password: configService.get("database.password"),
          entities: [],
          synchronize: false,
          extra: {
            connectionLimit: 100,
            multipleStatements: true,
          },
          multipleStatements: true,
          database: configService.get("database.db"),
        };
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        console.info("Using db - ", configService.get("database.readHost"));

        return {
          type: "mysql",
          name: "readConnection",
          host: configService.get("database.readHost"),
          port: configService.get("database.port"),
          username: configService.get("database.readUsername"),
          password: configService.get("database.readPassword"),
          entities: [],
          synchronize: false,
          extra: {
            connectionLimit: 100,
            multipleStatements: true,
          },
          multipleStatements: true,
          database: configService.get("database.db"),
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [DbService],
  exports: [DbService],
})
export class DbModule {}
