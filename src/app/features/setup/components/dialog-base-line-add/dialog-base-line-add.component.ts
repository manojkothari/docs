import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseLine } from 'src/app/features/setup/models/base-line';
import { SetupService } from 'src/app/features/setup/services/setup.service';

@Component({
  selector: 'app-dialog-base-line-add',
  templateUrl: './dialog-base-line-add.component.html',
  styleUrls: ['./dialog-base-line-add.component.scss']
})
export class DialogBaseLineAddComponent implements OnInit {
  baseLineAddForm: FormGroup;
  tenantList: any;

  constructor(private service: SetupService, @Inject(MAT_DIALOG_DATA) public data: BaseLine) {
    this.service.getAllTenants(1, 0).subscribe((res) => {
      console.log(res);
      this.tenantList = res;
    });

    console.log("Popup Data: ");
    console.log(data);    
    this.baseLineAddForm = this.getFormData(data);
  }

  ngOnInit(): void {
  }

  validateBaseLineName(name:string) {
    this.service.isBaselineNameExists(name).subscribe(
      (val) => {
        console.log("Name already exists",
          val);
      },
      response => {
        console.log("POST call in error", response);
      },
      () => {
        console.log("The POST observable is now completed.");
      });
  }
  OnBaseLineAdd() {
    console.log(this.baseLineAddForm?.value);

    this.service.postBaseLineSave(this.baseLineAddForm?.value)
      .subscribe(
        (val) => {
          console.log("POST call successful value returned in body",
            val);
        },
        response => {
          console.log("POST call in error", response);
        },
        () => {
          console.log("The POST observable is now completed.");
        });
  }

  private getFormData(data: any) {
    if (data == null) data = new BaseLine();
    let user = this.service.getUserInformation();
    let formG = new FormGroup({
      baselineId: new FormControl(data.baselineId),
      baselineName: new FormControl(data.baselineName),
      baselineYear: new FormControl(data.baselineYear),
      tenantId: new FormControl(data.tenantId),
      currency: new FormControl(data.currency),
      access: new FormControl(data.accessPrivatePublicControlled),
      precision: new FormControl(data.precision),
      userId: new FormControl(user.userId),
      createdBy: new FormControl(user.createdBy),
      status: new FormControl((data.status == undefined) ? false : data.status),
    });
    return formG;
  }
}
