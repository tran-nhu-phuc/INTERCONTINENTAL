import { Exclude, Transform } from 'class-transformer';

export class UserResponse {
  message: string;

  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @Exclude()
  password: string;

  data: any;
}
