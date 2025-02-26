import { BadRequestException, NotFoundException } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";

if(error.code ==  400)
  throw new RpcException(new BadRequestException('parametro no encotrado'));
if(error.code ==  404)
  throw new RpcException(new NotFoundException('parametro no encotrado'));
if(error.code ==  500)
  throw new RpcException(new NotFoundException('parametro no encotrado'));
  