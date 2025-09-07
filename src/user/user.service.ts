import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client/extension';
import { GetUserDetailsDto, SaveUserDetailsDto } from 'src/dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService){}

    async saveUserDetails(dto : SaveUserDetailsDto){
        try {
            const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                countryCode: dto.countryCode,
                phone: dto.phone,
                firstName: dto.firstName,
                lastName: dto.lastName,
                age: dto.age,
                dateOfBirth: new Date(dto.dateOfBirth) ,
                city: dto.city,
                state: dto.state,
                country: dto.country,
                postalCode: dto.postalCode,
                addressLine1: dto.addressLine1,
                addressLine2: dto.addressLine2,
            }
        });

        console.log("User created: ", user);
        return { message : "User details saved successfully",
            email: user.email,  status: 200};

            
        } catch (error) {
            console.error("Error saving user details: ", error);
            return { message : "Error saving user details", status: 500};
        }
    }

    async getUserDetails(dto : GetUserDetailsDto){
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    email : dto.email
                }
            });
            return { message : "User details fetched successfully", 
                data : user, 
                status: 200
            };
            
        } catch (error) {
            console.error("Error fetching user details: ", error);
            return { message : "Error fetching user details", status: 500}
        }
    }
}
