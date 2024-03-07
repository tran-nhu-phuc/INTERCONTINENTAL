import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...Interceptor');
    const now = Date.now();
    return next.handle().pipe(
      map((value) => {
        const { password, ...newData } = value;
        console.log(`After...Interceptor ${Date.now() - now}ms`);
        return newData;
      }),
    );
  }
}
