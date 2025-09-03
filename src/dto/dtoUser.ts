import { IsEmail, IsNotEmpty, IsNumber, IsString, Length, Max, MaxLength, Min } from "class-validator";

export class SaveUserDetailsDto {
 
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    firstName : string

    @IsString()
    @IsNotEmpty()
    lastName : string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Length(10)
    phone

    @IsNumber()
    @IsNotEmpty()
    @Max(120)
    @Min(10)
    age: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(4)
    countryCode

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    dateOfBirth
    
    @IsString()
    @IsNotEmpty()
    @MaxLength(10)
    postalCode
    
    @IsString()
    @IsNotEmpty()
    @MaxLength(80)
    addressLine1
    
    @IsString()
    @IsNotEmpty()
    @MaxLength(80)
    addressLine2
    
    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    country
    
    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    state
    
    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    city

}

export interface GetUserDetailsDto {
    userId: string;
}