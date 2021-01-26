import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../notification.service';
import { ValidationError } from './validation-error';

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {
  constructor(private injector: Injector) { }

  handleError(error: Error | HttpErrorResponse) {
    const notifier = this.injector.get(NotificationService);

    let message: string;
    let stackTrace: string;
    if (error instanceof ValidationError) {
      message = this.getClientErrorMessage(error);
      notifier.showError(message);
    } else if (error instanceof HttpErrorResponse) {
      // Server error
      if (error.status === 0 || error.status === 404 || error.status === 500) {
        message = this.getServerErrorMessage(error);
        throw error;
      } else if (
        typeof error.error === 'object' &&
        error.error !== null &&
        error.status === 400
      ) {
        if (
          typeof error.error.errors === 'object' &&
          error.error.errors !== null
        ) {
          const strMessage = [];
          for (const key in error.error.errors) {
            // strMessage.push(error.error.errors[key]);
          }
          message = strMessage.join('<br>');
          notifier.showError(message);
        } else {
          const strMessage = [];
          for (const key in error.error) {
            // strMessage.push(error.error[key]);
          }
          message = strMessage.join('<br>');
          notifier.showError(message);
        }
      } else {
        message = this.getServerErrorMessage(error);
        // notifier.showError(message);
        // console.log(message + stackTrace);
        // console.error(error);
        throw error;
      }
    } else {
      // Client Error
      // message = this.getClientErrorMessage(error);
      // //notifier.showError(message);
      // console.log(message + stackTrace);
      // console.error(error);
      throw error;
    }
    // console.log(message + stackTrace);
    // console.error(error);
  }

  private getClientErrorMessage(error: Error): string {
    return error.message ? error.message : error.toString();
  }

  private getServerErrorMessage(error: HttpErrorResponse): string {
    return navigator.onLine ? error.message : 'No Internet Connection';
  }
}
