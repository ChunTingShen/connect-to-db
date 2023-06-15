export class CreateUserDto {
    userId: string;
    email: string;
    age: number;
    favoriteFoods?: string[];
}