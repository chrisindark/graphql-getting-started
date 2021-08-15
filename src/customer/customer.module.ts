import { TypeOrmModule } from "@nestjs/typeorm";
import { Module, forwardRef } from "@nestjs/common";

import { CustomerModel } from "./customer.model";
import { CustomerResolver } from "./customer.resolver";
import { CustomerService } from "./customer.service";
import { InvoiceModule } from "./../invoice/invoice.module";

@Module({
  imports: [
    forwardRef(() => InvoiceModule),
    TypeOrmModule.forFeature([CustomerModel])
  ],
  providers: [CustomerService, CustomerResolver],
  exports: [CustomerService]
})
export class CustomerModule {}
