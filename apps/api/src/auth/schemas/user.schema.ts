import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as bcrypt from "bcrypt";
import { AuthUtils } from "../auth.utils";
import { Document, HydratedDocument } from "mongoose";

@Schema({ timestamps: true })
export class User extends Document {
    @Prop({ required: true, unique: true, lowercase: true })
    email: string;

    @Prop({ required: true })
    password: string;
}

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const hashedPassword = await bcrypt.hash(this.password, AuthUtils.getBcryptSaltRounds());
        this.password = hashedPassword;
    }
    next();
});