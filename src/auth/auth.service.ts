import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  // async validateUser(username:string, password: string):Promise<any>{
  //     const user = await this.userService.findOne(username);
  //     if(!user || (user && !compare(password, user.password)))
  //     return null;
  //     return await this.userService.findUser(user.id);
  // }
}
