import { DocumentBuilder } from '@nestjs/swagger';

export class BaseAPIDocument {
  public builder = new DocumentBuilder();
  public initializeOptions() {
    return this.builder
      .setTitle('Jisu Ecommerce API')
      .setDescription('Jisu Ecommerce Description')
      .setVersion('1.0')
      .build();
  }
}
