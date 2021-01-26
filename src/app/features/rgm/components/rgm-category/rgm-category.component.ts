import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { NotificationService } from 'src/app/core/services/notification.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { Category, UpdateCategory } from '../../models/category.model';
import { RgmService } from '../../services/rgm.service';

@Component({
  selector: 'app-rgm-category',
  templateUrl: './rgm-category.component.html',
  styleUrls: ['./rgm-category.component.scss']
})
export class RgmCategoryComponent implements OnInit {

  constructor(
    private storage: StorageService,
    private rgmService: RgmService,
    private notifier: NotificationService,
    private formBuilder: FormBuilder,
    private modalService: BsModalService
  ) { }

  // Variable declaration.
  categoryList: Category[] = [];
  categoryDetail: Category;
  rgmCategoryForm: FormGroup;
  bsModalRef: BsModalRef;
  addCategoryFromModel: Category;
  updateCategoryFromModel: UpdateCategory;

  // years
  isscomYears: any = [
    { text: 2018, value: 2018 },
    { text: 2019, value: 2019 },
    { text: 2020, value: 2020 },
    { text: 2021, value: 2021 },
    { text: 2022, value: 2022 },
    { text: 2023, value: 2023 },
    { text: 2024, value: 2024 }
  ];

  ngOnInit(): void {

    // Build Category form.
    this.rgmCategoryForm = this.formBuilder.group({
      brandId: [0],
      brandName: [null, Validators.required],
      brandAbbr: [null, Validators.required],
      isscom: ['0', [Validators.required, Validators.min(1)]],
    });

    // Bind category grid on page load.
    this.getBrandCategoryList(this.storage.baseLineId);
  }

  // Get form controls
  get categoryFormControls(): any {
    return this.rgmCategoryForm.controls;
  }

  // Get category list.
  getBrandCategoryList(baseLineId: number): any {
    this.rgmService.getCategoryList(baseLineId)
      .subscribe((res) => {
        this.categoryList = res;
      });
  }

  //#region Delete category.
  onClickDeleteBrandCatButton(brandId: number): void {
    const confirmDialogRef = this.notifier.confirm('Are you sure you want to Delete?');
    confirmDialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.rgmService.deleteBrandCategory(brandId)
          .subscribe((status: boolean) => {
            if (status) {
              this.notifier.showSuccess('Brand category deleted successfully.');
              this.getBrandCategoryList(this.storage.baseLineId);
            } else {
              this.notifier.showError('Something went wrong, please try again!!');
            }
          });
      }
    });
  }
  //#endregion Delete category.

  //#region Add category.
  // tslint:disable-next-line: typedef
  openDialogOnAddCategory(templateRef: TemplateRef<any>) {
    const config = {
      keyboard: false,
      ignoreBackdropClick: true,
      animated: true,
      class: 'modal-sm'
    };
    this.bsModalRef = this.modalService.show(templateRef, config);
    this.bsModalRef.onHide.subscribe(() => {
      this.rgmCategoryForm.reset();
    });
  }

  onSubmitAddCategoryForm(): void {
    // Prepare category form data to post.
    this.addCategoryFromModel = {
      brandId: 0,
      baseLineId: this.storage.baseLineId,
      brandName: this.rgmCategoryForm.controls.brandName.value,
      brandAbbr:this.rgmCategoryForm.controls.brandAbbr.value,
      isScomReference: ''
    };

    this.rgmService.saveCategory(this.addCategoryFromModel)
      .subscribe((status: boolean) => {
        if (status) {
          this.notifier.showSuccess('New Category Added successfully!');
          this.rgmCategoryForm.reset();
          this.getBrandCategoryList(this.storage.baseLineId);
        } else {
          this.notifier.showError('Something went wrong, please try again!!');
        }
      });
  }
  //#endregion Add category.

  //#region Update category.
  // tslint:disable-next-line: typedef
  openBsModalOnEditCategory(templateRef: TemplateRef<any>, brandId: number) {
    const config = {
      keyboard: false,
      ignoreBackdropClick: true,
      animated: true,
      class: 'modal-sm'
    };
    this.bsModalRef = this.modalService.show(templateRef, config);
    this.editCategoryRowItem(brandId);
  }

  editCategoryRowItem(brandId: number): void {
    // Get category detail.
    this.rgmService.getBrandCategoryById(brandId)
      .subscribe((data) => {
        this.categoryDetail = data;
        // Update form control value
        this.rgmCategoryForm.patchValue({
          brandId: this.categoryDetail.brandId,
          brandName: this.categoryDetail.brandName
        });
      });
  }

  onSubmitUpdateCategoryForm(): void {
    // Prepare category form data to post.
    this.updateCategoryFromModel = {
      brandId: this.rgmCategoryForm.controls.brandId.value,
      brandName: this.rgmCategoryForm.controls.brandName.value,
    };

    this.rgmService.updateCategory(this.updateCategoryFromModel)
      .subscribe((status: boolean) => {
        if (status) {
          this.notifier.showSuccess('Category updated successfully!');
          this.rgmCategoryForm.reset();
          this.getBrandCategoryList(this.storage.baseLineId);
          this.bsModalRef.hide();
        } else {
          this.notifier.showError('Something went wrong, please try again!!');
        }
      });
  }
  //#endregion Update category.

}
