import {
    HttpException,
    Injectable,
    OnApplicationShutdown
} from "@nestjs/common";
import { getConnection, Connection } from "typeorm";
import { PinoLogger, InjectPinoLogger } from "nestjs-pino";

@Injectable()
export class DbService implements OnApplicationShutdown {
    constructor(
        @InjectPinoLogger(DbService.name) private readonly logger: PinoLogger
    ) {}

    private getWriteClient(): Connection {
        return getConnection("writeConnection");
    }

    private getReadClient(): Connection {
        return getConnection("readConnection");
    }

    async read(query, queryParams = []): Promise<any> {
        let response = null;
        try {
            response = await this.getReadClient().query(query, queryParams);
        } catch (e) {
            this.logger.error(`error in read db: ${e}`);
            throw new HttpException("Internal Server Error", 500);
        }
        return response;
    }

    async write(query, queryParams = []): Promise<any> {
        let response = null;
        try {
            response = await this.getWriteClient().query(query, queryParams);
        } catch (e) {
            this.logger.error(`error in write db: ${e}`);
            throw new HttpException("Internal Server Error", 500);
        }
        return response;
    }

    async select(query, queryParams = []): Promise<any> {
        let response = null;
        try {
            response = await this.getReadClient().query(query, queryParams);
        } catch (e) {
            this.logger.error(`error in read db: ${e}`);
        }

        if (!response || !response.length) {
            try {
                response = await this.getWriteClient().query(
                    query,
                    queryParams
                );
            } catch (e) {
                this.logger.error(`error in write db: ${e}`);
                throw new HttpException("Internal Server Error", 500);
            }
        }

        return response;
    }

    async onApplicationShutdown(signal: string) {
        this.logger.error("closing db connections...");
        let writeConnection = this.getWriteClient();
        let readConnection = this.getReadClient();
        if (writeConnection.isConnected) {
            await writeConnection.close();
        }

        if (readConnection.isConnected) {
            await readConnection.close();
        }
        return Promise.resolve();
    }
}
