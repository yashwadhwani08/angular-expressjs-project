# Class-Based HTTP Interceptors in Angular

Besides defining HTTP interceptors as functions (the modern, recommended way), you can also define HTTP interceptors via classes.

## Example: Logging Interceptor as a Class

The `loggingInterceptor` (more modern function-based interceptor) can be defined using a class-based approach:

```typescript
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
class LoggingInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<unknown>, handler: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Request URL: ' + req.url);
        return handler.handle(req);
    }
}
```

## Providing Class-Based Interceptors

An interceptor defined as a class must be provided differently than function-based interceptors.

### Function-Based Provision

```typescript
providers: [
    provideHttpClient(
        withInterceptors([loggingInterceptor]),
    )
],
```

### Class-Based Provision

Use `withInterceptorsFromDi()` and set up a custom provider:

```typescript
providers: [
    provideHttpClient(
        withInterceptorsFromDi()
    ),
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true }
]
```

## Summary

- Function-based interceptors are recommended, but class-based interceptors are still supported.
- Class-based interceptors require a different provider setup using `withInterceptorsFromDi()` and the `HTTP_INTERCEPTORS` token.
