import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { BaseAPIDocument } from './config/swagger.documents';
import { SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService = app.get(ConfigService);
  // options 모두 다 설정 가능
  // options 설정된 도메인만 접속이 가능
  // 추후에 프론트엔드 서버 도메인 설정해주면 됨
  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  // response serialization
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalInterceptors(new TransformInterceptor());

  const config = new BaseAPIDocument().initializeOptions();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api-docs', app, document);

  const port = configService.get('SERVICE_PORT') || 3000;

  await app.listen(port);
}
bootstrap();
