import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.entity';



@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
    ){}

    async create(userid: string, useremail: string, userage: number): Promise<User>{
        const newUser = new this.userModel({
            userId: userid,
            email: useremail,
            age: userage,
            favoriteFoods: ['banana']
        });
        console.log(newUser);
        return newUser.save()
    }

    async getAllUsers(): Promise<User[]>{
        return this.userModel.find(); 
    }

    async getUserById(id: string):Promise<User> {
        return this.userModel.findOne({_id: id})
    }

    async deleteUser(id: string): Promise<boolean> {

        try {
            const result = await this.userModel.findByIdAndDelete(id);
            return result? true: false;

        } catch (error) {
            console.log("Error occurs: ", error)
            return false
        }

        // return this.userModel.findByIdAndDelete(id);
    }

    
}
