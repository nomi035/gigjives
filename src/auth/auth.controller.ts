import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { authSwaggerSchema } from './auth.swagger-schema';

@Controller('auth')
@ApiTags('auth')
@ApiBearerAuth()
export class AuthController {


  constructor(private readonly authService: AuthService) {}
  @ApiBody(authSwaggerSchema.loginBody)
  @Post('login')
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.login(createAuthDto);
  }
}
