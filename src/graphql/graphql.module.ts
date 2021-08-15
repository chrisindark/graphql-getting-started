import { Module, Global } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";

@Global()
@Module({
    imports: [
        GraphQLModule.forRoot({
            autoSchemaFile: "schema.gql"
        })
    ],
    providers: [],
    exports: []
})
export class GraphModule {}
