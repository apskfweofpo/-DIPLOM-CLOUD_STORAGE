import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MetaList } from './types/meta.enum';
import { ResponseCustomType } from './types/response.type';

@Injectable()
export class ResponseFormatInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const reqMethod = Object.keys(context.switchToHttp().getRequest().route.methods)[0];

    return next.handle().pipe(
      map((data) => {
        const responseData = data ? data : {};
        const response: ResponseCustomType = Array.isArray(data)
          ? {
              data: { content: responseData },
              meta: MetaList[`${reqMethod}`],
            }
          : { data: responseData, meta: MetaList[`${reqMethod}`] };

        return response;
      })
    );
  }
}
