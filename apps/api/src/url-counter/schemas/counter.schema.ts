import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument } from "mongoose";

// It's necessary to have a separate counter collection because
// it allows us to generate unique sequential IDs for our short URLs
// even that some URLs may expire and get deleted later (which would
// mess everything up if we counted the existing URLs).
@Schema()
export class Counter {
    @Prop({ required: true, unique: true })
    _id: string;

    @Prop({ required: true, default: 100000000 })
    count: number;
}

export const CounterSchema = SchemaFactory.createForClass(Counter);

export type CounterDocument = HydratedDocument<Counter>;