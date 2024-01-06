// 성공시 던져주는 상태코드
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const Info = {
  statusCode: 200,
  message: 'success',
};

// 성공시 던져주는 msg 형식
export type Response<T> = typeof Info & {
  data: T;
};

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<Text, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(map((data) => Object.assign({}, Info, { data })));
  }
}
