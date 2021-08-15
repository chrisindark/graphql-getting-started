import { TypeOrmModule } from "@nestjs/typeorm";
import { Module, forwardRef } from "@nestjs/common";

import { CustomerModule } from "./../customer/customer.module";
import { InvoiceModel } from "./invoice.model";
import { InvoiceService } from "./invoice.service";
import { InvoiceResolver } from "./invoice.resolver";

@Module({
  imports: [
    TypeOrmModule.forFeature([InvoiceModel]),
    forwardRef(() => CustomerModule)
  ],
  providers: [InvoiceService, InvoiceResolver],
  exports: [InvoiceService]
})
export class InvoiceModule {}
