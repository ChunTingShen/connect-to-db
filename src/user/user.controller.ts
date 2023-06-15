import { Body, Controller, Delete, Get, Inject, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.entity';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user-dto';

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService,
        @InjectModel(User.name) private readonly userModel: Model<User>

    ){}

    @Post()
    async createUser(@Body() userDto: CreateUserDto) {
        console.log(userDto.userId);
        return this.userService.create(userDto.userId, userDto.email, userDto.age);
    }

    @Get()
    async getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Get(':id')
    async getUserById(@Param('id') id: string){
        return this.userService.getUserById(id);

    }

    @Delete(':id')
    async deletUserById(@Param('id') id: string) {
        const deleteResult = await this.userService.deleteUser(id);
        if (deleteResult){
            return 'Deleted Success!'
        } else {
            return 'User not found'
        }

    }


}
