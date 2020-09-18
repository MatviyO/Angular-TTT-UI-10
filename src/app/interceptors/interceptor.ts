import { Injectable, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
// import { TodoComponent } from '../pages/todo/components/todo';
import { Observable, throwError, pipe } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class Interceptor implements HttpInterceptor {
  // @ViewChild(TodoComponent) todoComp: TodoComponent;
  constructor(
    private router: Router,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
    .pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(['/login']);
          }
          return throwError(err);
        }
      }),
    );
  }
}
