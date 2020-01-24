import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './controllers/user/user.controller';
import { UserService } from './services/user/user.service';
import { UserRepository } from './repositories/user-repository/user-repository';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { secretKey, JwtStrategy } from './services/auth/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './domain/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/admin',
    {
      useNewUrlParser: true, 
      useUnifiedTopology: true
    }),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
    ]),
    JwtModule.register({
      secret: secretKey, signOptions: {
        expiresIn: '1m',
      },
    })
  ],
  controllers: [AppController, UserController, AuthController],
  providers: [AppService, UserService, UserRepository, AuthService, JwtStrategy],
})
export class AppModule { }
