import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// import { JwtService } from '../services/jwt.service';

@Injectable()
export class HttpconfigInterceptor implements HttpInterceptor {

  constructor(
    // private jwtService: JwtService,
    private router: Router,
    private injector: Injector
  ) { }

  private get toastrService(): ToastrService {
    return this.injector.get(ToastrService);
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    // const token = this.jwtService.getToken();
    // if (token) {
    //   headersConfig['Authorization'] = `Bearer ${token}`;
    // }

    const req = request.clone({ setHeaders: headersConfig });

    return next.handle(request).pipe(
      retry(0),
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('event--->>>', event);
        }
        return event;
      }),
      // catchError((err: HttpErrorResponse) => {
      //   if (err.status === 401) {
      //     // refresh token
      //   } else if (err.status === 400) {
      //     this.toastrService.error(err.message);
      //   } else if (err.status === 500) {
      //     this.router.navigate(['error', err.status]);
      //   }
      //   else {
      //     return throwError(err);
      //   }
      // })
    );

  }

}
