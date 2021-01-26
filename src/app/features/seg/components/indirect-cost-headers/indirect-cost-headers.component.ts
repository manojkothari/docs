import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NotificationService } from 'src/app/core/services/notification.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { AddHeader, DdlBindHeaderName, Header, UpdateIndirecCosttHeader } from '../../models/header.model';
import { IndirectCostHeaderService } from '../../services/indirect-cost-header.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { retryWhen } from 'rxjs/operators';
@Component({
  selector: 'app-indirect-cost-headers',
  templateUrl: './indirect-cost-headers.component.html',
  styleUrls: ['./indirect-cost-headers.component.scss']
})
export class IndirectCostHeadersComponent implements OnInit {

  //Variable Declaration
  indirectcostHeaderDdlForm: FormGroup;
  CostIndirectHearderDetail: Header;
  ddlIndirectCostHeaderBind: DdlBindHeaderName[] = [];
  dddlAssetsFromModel: DdlBindHeaderName;
  indirectCostHeaderList: Header[] = [];
  assetsForm: FormGroup;
  addassetsFromModel: AddHeader;
  bsModalRef: BsModalRef;
  updateIndirectCostHeaderFromModel: UpdateIndirecCosttHeader;

  constructor(
    private formBuilder: FormBuilder,
    private indirectCostHeaderService: IndirectCostHeaderService,
    private notifier: NotificationService,
    private modalService: NgbModal,
    private storage: StorageService,

  ) {
    // call the method on initial load of page to bind dropdown   
    this.GetCostHeader("Cost Header")
  }

  ngOnInit(): void {
    this.indirectcostHeaderDdlForm = this.formBuilder.group({
      id: [3]
    })

    this.assetsForm = this.formBuilder.group({
      costName: [null, Validators.required],
      id: [0]
    });
    // call the method on initial load of gride to bind   
    this.GetIndirectCostHeaders(2, 1, this.indirectcostHeaderDdlForm.controls.id.value)
    this.assetsForm.reset();
  }
  //  Bind DropDown List
  GetCostHeader(typeName: string) {
    return this.indirectCostHeaderService.getDdlIndirectCostHeaderNameList(typeName)
      .subscribe((data) => {
        this.ddlIndirectCostHeaderBind = data;
      })
  }
  // Bind Cost Indirect Header grid on page load.
  GetIndirectCostHeaders(typeBaseLineSimulation: number, typeId: number, headerId: number) {
    return this.indirectCostHeaderService.getIndirectCostHeaderList(typeBaseLineSimulation, typeId, headerId)
      .subscribe((data) => {
        this.indirectCostHeaderList = data;
      })
  }

  // Get form controls
  get assetsFormControls(): any {
    return this.assetsForm.controls;
  }

  //#region Add Indirect Cost Header.
  onSubmitAddAssetsForm(): void {
    // Prepare assets form data to post.
    this.addassetsFromModel = {
      typeId: 1,
      typeBaseLineSimulation: 2,
      headerId: this.indirectcostHeaderDdlForm.controls.id.value,
      userId: 1,
      costName: this.assetsForm.controls.costName.value,

      //userId: this.storage.userId
    };

    this.indirectCostHeaderService.saveIndirectCostHeader(this.addassetsFromModel)
      .subscribe((status: boolean) => {
        if (status) {
          this.notifier.showSuccess('New Cost Indirect Header Added successfully!');
          this.assetsForm.reset();
          this.modalService.dismissAll();
          this.GetIndirectCostHeaders(2, 1, this.indirectcostHeaderDdlForm.controls.id.value)
        } else {
          this.notifier.showError('Something went wrong, please try again!!');
        }
      });
  }

  //#region Delete IndectCost Header.
  onClickDeleteIndirectCostHeaderButton(id: number): void {
    const confirmDialogRef = this.notifier.confirm('Are you sure you want to Delete?');
    confirmDialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.indirectCostHeaderService.deleteIndirectCostHeader(id)
          .subscribe((status: boolean) => {
            if (status) {
              this.notifier.showSuccess('Cost Indirect Header deleted successfully.');
              this.GetIndirectCostHeaders(2, 1, this.indirectcostHeaderDdlForm.controls.id.value)
            } else {
              this.notifier.showError('Something went wrong, please try again!!');
            }
          });
      }
    });
  }
  //#endregion Delete IndectCost Header.

  editCostIndectHeaderRowItem(id: number): void {
    // Get Indirect Cost Header detail.
    this.indirectCostHeaderService.getIndirectCostHeaderById(id)
      .subscribe((data) => {
        this.CostIndirectHearderDetail = data;
        // Update form control value      
        this.assetsForm.patchValue({
          id: this.CostIndirectHearderDetail.id,
          costName: this.CostIndirectHearderDetail.costName,
        });
      });
  }

  onSubmitUpdateCostIndirectHeaderForm(): void {
    // Prepare Cost Indirect Header form data to post.
    this.updateIndirectCostHeaderFromModel = {
      typeId: 1,
      typeBaseLineSimulation: 2,
      headerId: this.indirectcostHeaderDdlForm.controls.id.value,
      userId: 0,
      id: this.assetsForm.controls.id.value,
      costName: this.assetsForm.controls.costName.value,
    };
    this.indirectCostHeaderService.updateIndirectCostHeader(this.updateIndirectCostHeaderFromModel)
      .pipe(
        retryWhen(errors => errors.pipe(
          // define conditions for retrying with some of observable operators
        )),
      )
      .subscribe((status: boolean) => {
        if (status = true) {
          this.notifier.showSuccess('Cost Inderect header updated successfully!');
          this.modalService.dismissAll();
          this.assetsForm.reset();
          this.GetIndirectCostHeaders(2, 1, this.indirectcostHeaderDdlForm.controls.id.value)
          this.bsModalRef.hide();
        } else {
          this.notifier.showError('Alrady exist');
        }
      });
  }

  openUpdateModal(targetModal, id: number) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });

    this.editCostIndectHeaderRowItem(id);
    this.assetsForm.patchValue({
      // id: this.CostIndirectHearderDetail.id,
      // costName: this.CostIndirectHearderDetail.costName,
    });
  }

  openAddUpdateModal(targetModal) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });
    this.assetsForm.reset();
  }


  selectChange() {
    this.dddlAssetsFromModel = {
      name: "",
      id: this.indirectcostHeaderDdlForm.controls.id.value
    };
    this.GetIndirectCostHeaders(2, 1, this.dddlAssetsFromModel.id)

  }
}
