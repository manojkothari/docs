import { Injectable, NgZone } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog.component';
import { AlertDialogComponent } from 'src/app/shared/components/alert-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private zone: NgZone,
    private toastrService: ToastrService,
    private dialog: MatDialog
  ) { }

  showSuccess(message: string): void {
    // Had an issue with the snackbar being ran outside of angular's zone.
    this.zone.run(() => {
      // this.snackBar.open(message);
      this.toastrService.success(message);
    });
  }

  showError(message: string): void {
    this.zone.run(() => {
      // The second parameter is the text in the button.
      // In the third, we send in the css class for the snack bar.
      // this.snackBar.open(message, 'X', {
      //   panelClass: ['error'],
      //   verticalPosition: 'top'
      // });
      this.toastrService.error(message);
    });
  }

  alert(message: string): void {
    this.dialog.open(AlertDialogComponent, {
      data: {
        title: '',
        message,
      },
    });
  }

  confirm(message: string): any {
    return this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: '',
        message,
      },
    });
  }

}
