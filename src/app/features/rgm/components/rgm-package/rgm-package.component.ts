import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { NotificationService } from 'src/app/core/services/notification.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { Packagemodel, Packmodel } from '../../models/package.model';
import { RgmService } from '../../services/rgm.service';


@Component({
  selector: 'app-rgm-package',
  templateUrl: './rgm-package.component.html',
  styleUrls: ['./rgm-package.component.scss']
})
export class RgmPackageComponent implements OnInit {

  GatPackList: Packmodel[] = [];
  addPackageFromModel: Packagemodel;
  rgmPackageForm: FormGroup;
  
  constructor(
    private storage: StorageService,
    private rgmService: RgmService,
    private notifier: NotificationService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {

    this.rgmPackageForm = this.formBuilder.group({
      packNanme: [null, Validators.required],     
      packUnit: [null, Validators.required],
      packCases: [null, Validators.required],
      packProduct: [null, Validators.required],
    });
    this.getPack(2, 0);    
  }

  get assetsFormControls(): any {   
    return this.rgmPackageForm.controls;
  }


  
  getPack(baseLineId: number, packId: number): void {
    this.rgmService.GetPackList(baseLineId, packId)
      .subscribe((res) => {
        this.GatPackList = res;
        console.log(res);
      });
  }

  

  onSubmitAddPackageForm(): void {
    debugger;
    this.addPackageFromModel = {
      baseLineId: 2,
      packName: this.rgmPackageForm.controls.packNanme.value,
      packNanme: this.rgmPackageForm.controls.packNanme.value,
      packUnit: this.rgmPackageForm.controls.packUnit.value,
      packProduct: this.rgmPackageForm.controls.packProduct.value,
      packCases: this.rgmPackageForm.controls.packCases.value,
      isscomReference: '',
      userId: 'ameet',
      packId:0,
    };
    this.rgmService.savePack(this.addPackageFromModel)
      .subscribe((status: boolean) => {
        if (status) {
          this.notifier.showSuccess('New Package Added successfully!');
          this.rgmPackageForm.reset();
          this.getPack(2, 0);
        } else {
          this.notifier.showError('Something went wrong, please try again!!');
        }
      });
  }

  UpdateForm(): void {
    debugger;
    this.addPackageFromModel = {
      baseLineId: 2,
      packNanme: this.rgmPackageForm.controls.packNanme.value,
      packName: this.rgmPackageForm.controls.packNanme.value,
      packUnit: this.rgmPackageForm.controls.packUnit.value,
      packProduct: this.rgmPackageForm.controls.packProduct.value,
      packCases: this.rgmPackageForm.controls.packCases.value,
      isscomReference: '',
      userId: 'ameet',
      packId: Number(sessionStorage.getItem("PackId")),
    };
    this.rgmService.savePack(this.addPackageFromModel)
      .subscribe((status: boolean) => {
        if (status) {
          this.notifier.showSuccess('New Package Update successfully!');
          this.rgmPackageForm.reset();
          this.getPack(2, 0);
        } else {
          this.notifier.showError('Something went wrong, please try again!!');
        }
      });
      
  }

  openUpdateModal(targetModal, packId: number) {

    sessionStorage.setItem("PackId", String(packId));
    
       this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });
    this.editRowItem(packId);     
    this.rgmPackageForm.patchValue({
       });
  }

  openAddModal(targetModal) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });
    this.rgmPackageForm.reset();
  }

  editRowItem(packId: number): void {

    // Get Indirect Cost Header detail.
    this.rgmService.getPackDetailsById(0,packId)   
      .subscribe((data) => {
        this.addPackageFromModel = data[0];
        // Update form control value      
        this.rgmPackageForm.patchValue({           
          packNanme: this.addPackageFromModel.packName,
          packUnit: this.addPackageFromModel.packUnit,
          packProduct: this.addPackageFromModel.packProduct,
          packCases: this.addPackageFromModel.packCases,
         
        });  
      });   
      
  }



  onClickDeletePack(packId: number): void {
    //alert(packId);
    const confirmDialogRef = this.notifier.confirm('Are you sure you want to Delete?');
    confirmDialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.rgmService.deletePack(packId, 'ameet')
          .subscribe((status: boolean) => {
            if (status) {
              this.notifier.showSuccess('Package deleted successfully.');
              this.getPack(2, 0);
            } else {
              this.notifier.showError('Something went wrong, please try again!!');
            }
          });
      }
    });
  }

}
