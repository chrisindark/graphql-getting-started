import { ObjectType, InputType, Field, Int, ID } from "@nestjs/graphql";

@ObjectType()
export class ItemType {
    @Field(() => ID)
    readonly id?: number;

    @Field()
    readonly title: string;

    @Field(() => Int)
    readonly price: number;

    @Field()
    readonly description: string;
}

// import { InputType, Field, Int } from "@nestjs/graphql";

@InputType()
export class ItemInput {
    @Field()
    readonly title: string;

    @Field(() => Int)
    readonly price: number;

    @Field()
    readonly description: string;
}
