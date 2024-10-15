import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { IUser } from '../interfaces/user.interface';
import HttpStatus from 'http-status-codes';
import {IUserResponse} from '../interfaces/user.response.interface'
import { use } from 'chai';

class UserService {

  //get all users
  public getAllUsers = async (): Promise<IUser[]> => {
    const data = await User.find();
    return data;
  };

  //create new user
  public newUser = async (userDetails: { role: string; firstname: string; lastname: string; email: string; password: string }): Promise<IUserResponse> => {
    const email = userDetails.email.toLowerCase()
  
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return {
        code: HttpStatus.CONFLICT,
        data: null, 
        message: "User already exists"
      };
    }
  
    const salt = await bcrypt.genSalt(10);
    let r = userDetails.password.toLowerCase();
    const hashedpassword = await bcrypt.hash(r,salt);
    

    const newUser = new User({
      firstName: userDetails.firstname,
      lastName: userDetails.lastname,
      email: email,
      password: hashedpassword,
      role: userDetails.role || 'user', 
    });
  
    
    
    
    const savedUser = await newUser.save();
  
    return {
      code: HttpStatus.CREATED,
      data: {
        firstname:savedUser.firstName,
        lastname:savedUser.lastName,
        email:savedUser.email,
        role:savedUser.role,
        // password:savedUser.password
      }, 
      message: "User created successfully"
    };
  };

  public async loginUser(userdetails: {email:string; password:string}) {
    const email = userdetails.email.toLowerCase();
  
  const user = await User.findOne({
    email: { $regex: new RegExp(`^${email}$`, 'i') }, 
  });
    if(!user)
    {
      return{
        code : HttpStatus.NOT_FOUND,
        data : [],
        message : "user not found"
      }
    }

    const passwordMatches = await bcrypt.compare(userdetails.password, user.password);

    if (!passwordMatches) {
      return {
        code: HttpStatus.UNAUTHORIZED,
        data: [],
        message: "Invalid password"
      }
    }

    

    const token = jwt.sign(
      {email:user.email, id:user._id,role: user.role,},
      process.env.JWT_SECRET,
      { expiresIn: '1h'}
    );
    
  
    return{
      code : HttpStatus.OK,
      data : {
        firstname:user.firstName,
        eml:user.lastName,
        role:user.role,
        token
      },
      message:"User authentication successfully"
    }
  }



  
  public updateUser = async (_id: string, body: IUser): Promise<IUser> => {
    const data = await User.findByIdAndUpdate(
      {
        _id
      },
      body,
      {
        new: true
      }
    );
    return data;
  };

  //delete a user
  public deleteUser = async (_id: string): Promise<string> => {
    await User.findByIdAndDelete(_id);
    return '';
  };

  //get a single user
  public getUser = async (_id: string): Promise<IUser> => {
    const data = await User.findById(_id);
    return data;
  };
  
}

export default UserService;
