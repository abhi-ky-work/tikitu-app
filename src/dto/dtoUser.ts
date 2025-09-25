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
    dateOfBirth :string;
    
    @IsString()
    @IsNotEmpty()
    @MaxLength(10)
    postalCode : string
    
    @IsString()
    @IsNotEmpty()
    @MaxLength(80)
    addressLine1 : string
    
    @IsString()
    @IsNotEmpty()
    @MaxLength(80)
    addressLine2 : string
    
    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    country : string
    
    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    state : string

    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    city : string

}

export class GetUserDetailsDto {

    @IsEmail()
    @IsNotEmpty()   
    email : string;

}