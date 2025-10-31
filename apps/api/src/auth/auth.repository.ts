import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import { Model } from "mongoose";
import { UserEntity } from "./entities/user.entity";

@Injectable()
export class AuthRepository {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async findById(id: string): Promise<UserDocument | null> {
        return this.userModel.findById(id).exec();
    }

    async findByEmail(email: string): Promise<UserDocument | null> {
        return this.userModel.findOne({ email }).exec();
    }

    async createUser(user: UserEntity): Promise<UserDocument> {
        const newUser = new this.userModel(user);
        return newUser.save();
    }
}