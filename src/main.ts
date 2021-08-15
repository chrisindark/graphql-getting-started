import { NestFactory } from "@nestjs/core";
import { PinoLogger } from "nestjs-pino";
import { ValidationPipe } from "@nestjs/common";

import { AppModule } from "./app/app.module";
import { AllExceptionsFilter } from "./exceptions/all-exceptions.filter";

declare const module: any;

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    const logger = await app.resolve<PinoLogger>(PinoLogger);
    app.useGlobalFilters(new AllExceptionsFilter(logger));
    app.useGlobalPipes(new ValidationPipe());
    app.enableShutdownHooks(["SIGINT", "SIGTERM"]);
    app.enableCors();
    const port = app.get("ConfigService").get("server.port");
    console.log("Listening on port - ", port);
    await app.listen(port);

    if (module.hot) {
      module.hot.accept();
      module.hot.dispose(() => app.close());
    }
  } catch (e) {
    console.log(e);
  }
}
bootstrap();
