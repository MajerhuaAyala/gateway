import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NATS_SERVICE } from 'src/config/services';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  ) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await firstValueFrom(
        this.client.send('createUser', createUserDto)
      )
    } catch (error) {
      throw new RpcException(error)
    }
  }

  @Get()
  findAll() {
    return this.client.send('findAllUser', {})
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return 'findOne'
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return 'update user'
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return 'remove'
  }
}
