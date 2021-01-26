import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-dialog',
  template: `
  <h1 mat-dialog-title class="mat-dialog-title" *ngIf="title">
  {{title}}
</h1>

<div mat-dialog-content class="mat-dialog-content">
  <p>{{message}}</p>
</div>

<div mat-dialog-actions class="mat-dialog-actions">
  <button mat-raised-button color="primary" (click)="onConfirm()" class="mat-focus-indicator mat-raised-button mat-button-base mat-primary">Yes</button>
  <button mat-button (click)="onDismiss()" class="mat-focus-indicator mat-raised-button mat-button-base">No</button>
</div>`,
  styles: ['.mat-dialog-actions .mat-button-base { margin: 8px 8px 8px 0;}']
})
export class ConfirmDialogComponent {

  title: string;
  message: string;

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    // Update view with given values
    this.title = data.title;
    this.message = data.message;
  }

  onConfirm(): void {
    // Close the dialog, return true
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }

}
