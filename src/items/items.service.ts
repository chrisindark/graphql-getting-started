import { Injectable } from "@nestjs/common";

import { ItemType, ItemInput } from "./dto/items.dto";
import { Item } from "./interfaces/items.interface";

@Injectable()
export class ItemsService {
    constructor() {}

    async create(createItemDto: ItemInput): Promise<ItemType> {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return { id: 1, title: "", price: 0, description: "" };
    }

    async findAll(): Promise<ItemType[]> {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return [{ id: 1, title: "", price: 0, description: "" }];
    }

    async findOne(id: string): Promise<ItemType> {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return { id: 1, title: "", price: 0, description: "" };
    }

    async delete(id: string): Promise<any> {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return { id: 1, title: "", price: 0, description: "" };
    }

    async update(id: string, item: Item): Promise<ItemType> {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return { id: 1, title: "", price: 0, description: "" };
    }
}
