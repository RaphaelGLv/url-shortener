import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Counter } from "./schemas/counter.schema";
import { Model } from "mongoose";

@Injectable()
export class CounterRepository {
    constructor(@InjectModel(Counter.name) private counterModel: Model<Counter>) {}

    async incrementUrlCounter(): Promise<Counter> {
        return this.counterModel.findOneAndUpdate(
            { _id: 'url_counter' },
            { $inc: { count: 1 } },
            { new: true, upsert: true }
        ).exec();
    }

    async getUrlCounter(): Promise<Counter | null> {
        return this.counterModel.findById('url_counter').exec();
    }
}