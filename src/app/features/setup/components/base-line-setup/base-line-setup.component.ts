import { Component, OnInit } from '@angular/core';
import { SetupService } from 'src/app/features/setup/services/setup.service';
import { AddBaseLine, BaseLine } from 'src/app/features/setup/models/base-line';
import { MatDialog } from '@angular/material/dialog';
import { DialogBaseLineAddComponent } from 'src/app/features/setup/components/dialog-base-line-add/dialog-base-line-add.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/core/services/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-base-line-setup',
  templateUrl: './base-line-setup.component.html',
  styleUrls: ['./base-line-setup.component.scss']
})
export class BaseLineSetupComponent implements OnInit {
  public baseLines: BaseLine[] ;

  addBaseLineFromModel: AddBaseLine;
  baseLineForm: FormGroup;

  constructor(private service: SetupService, public dialog: MatDialog, private notifier: NotificationService,private formBuilder: FormBuilder,private modalService: NgbModal,)
  {    }

  
  ngOnInit(): void {
    this.GetBaseLine();

    this.baseLineForm = this.formBuilder.group({
      // brandId: [0],
      // baselineName: [null, Validators.required],
      // packProduct: [null, Validators.required],
      // baselineYear: [null, Validators.required],
      // tenantId: [null, Validators.required],
      // currency: [null, Validators.required],
      // ACCESS: [null, Validators.required],
      // PRECISION: [null, Validators.required],
      // abbreviation: [null, Validators.required],
      // accessPrivatePublicControlled: [null, Validators.required],
      // precision: [null, Validators.required],
      // //packProduct: [null, Validators.required],
    });
  }


  get assetsFormControls(): any {   
    return this.baseLineForm.controls;
  }
  
  GetBaseLine(): void {   
  this.service.getAllUserBaselines(1, 0).subscribe((res) => {
    this.baseLines = res;
    console.log(this.baseLines);
  });
 
}

  onSubmitAddBaseLineForm(): void {   
    debugger;
 this.addBaseLineFromModel = {       
  baselineId: 0,
  userId: 1,
  tenantId:Number(this.baseLineForm.controls.tenantId.value),
  baselineName: this.baseLineForm.controls.baselineName.value,
  baselineYear: Number(this.baseLineForm.controls.baselineYear.value),
  baseLineAbbr: "Amit",
  createdBy: "ameet",
  accessPrivatePublicControlled: "public",
  currency: this.baseLineForm.controls.currency.value,
  precision: 2,
  status: true,
  
   };
    this.service.postBaseLineSave(this.addBaseLineFromModel)    
      .subscribe(() => {
        if (status) {
          this.notifier.showSuccess('New Package Added successfully!');
         // this.rgmPackageForm.reset();
         
        } else {
          this.notifier.showError('Something went wrong, please try again!!');
        }
      });
  }

  openAddModal(targetModal) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });
    this.baseLineForm .reset();
  }

  openUpdateModal(targetModal, baselineId: number) {
    alert(baselineId);
    this.modalService.open(targetModal, {
   centered: true,
   backdrop: 'static'
 });
 this.editRowItem(baselineId);  
 this.baseLineForm.patchValue({
    });
}

editRowItem(baselineId: number): void {
  // Get Indirect Cost Header detail.
  this.service.getAllUserBaselines(0,baselineId) 
    .subscribe((data) => {
      this.addBaseLineFromModel = data[0];
      // Update form control value      
      this.baseLineForm.patchValue({           
        baselineName: this.addBaseLineFromModel.baselineName,
        precision: this.addBaseLineFromModel.precision,
        baselineYear: this.addBaseLineFromModel.baselineYear,
             
      });  
    });      
}





  openDialog(baseLineIndex: number) {
    //alert(baseLineIndex);
    const dialogRef = this.dialog.open(DialogBaseLineAddComponent, {
      height: '400px',
      width: '700px',
      data: (this.baseLines != null) ? this.baseLines[baseLineIndex] : new BaseLine()
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.ngOnInit();
    });
  }

  removeBaseLine(id: any): void {
    if (confirm("Are you sure you want to delete the Baseline?")) {
      this.service.removeBaseLine(id).subscribe(
        (val) => {
          console.log("Delete call Status Value: ",
            val);
          this.ngOnInit();
        },
        response => {
          console.log("POST call in error", response);
        },
        () => {
          console.log("The POST observable is now completed.");
        });
    }
  }
}
