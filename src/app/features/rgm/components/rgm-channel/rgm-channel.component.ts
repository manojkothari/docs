import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { NotificationService } from 'src/app/core/services/notification.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { Channel, DdlChannelIsscom } from '../../models/channel.model';
import { RgmService } from '../../services/rgm.service';
import { retryWhen } from 'rxjs/operators';

@Component({
  selector: 'app-rgm-channel',
  templateUrl: './rgm-channel.component.html',
  styleUrls: ['./rgm-channel.component.scss']
})
export class RgmChannelComponent implements OnInit {

  constructor(
    private storage: StorageService,
    private rgmService: RgmService,
    private notifier: NotificationService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
  ) {
    this.GetChannelIsscom("Channel")
  }

  //Variable declaration.
  channelList: Channel[] = [];
  channelDetail: Channel;
  rgmChannelForm: FormGroup;
  bsModalRef: BsModalRef;
  addChannelFromModel: Channel;
  updateChannelFromModel: Channel;
  ddlChannelIsscomBind: DdlChannelIsscom[] = [];

  ngOnInit(): void {
    // Build channel form.
    this.rgmChannelForm = this.formBuilder.group({
      channelId: [0],
      channelName: [null, Validators.required],
      channelAbbreviation: [null, Validators.required],
      isscomReference: [null, Validators.required]
    });

    // Bind channels grid on page load.
    this.GetChannelList(2, 0, "");
  }


  //  Bind DropDown List
  GetChannelIsscom(isscomType: string) {
    return this.rgmService.getDdlChannelIsscom(isscomType)
      .subscribe((data) => {
        this.ddlChannelIsscomBind = data;

      })
  }
  //Get form controls
  get channelFormControls(): any {
    return this.rgmChannelForm.controls;
  }

  // Get channel list.
  GetChannelList(baselineId: number, channelId: number, channelAbbr: string): void {
    this.rgmService.getChannelList(baselineId, channelId, channelAbbr)
      .subscribe((data) => {
        this.channelList = data;
      });
  }

  //#region Delete channel.
  onClickDeleteChannelButton(channelId: number, userId: string): void {
    const confirmDialogRef = this.notifier.confirm('Are you sure you want to Delete?');
    confirmDialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.rgmService.deleteChannel(channelId, userId)
          .subscribe((status: boolean) => {
            if (status) {
              this.notifier.showSuccess('Channel deleted successfully.');
              this.GetChannelList(2, 0, "");
            } else {
              this.notifier.showError('Something went wrong, please try again!!');
            }
          });
      }
    });
  }
  //#endregion Delete channel.

  onSubmitAddChannelForm(): void {
    // Prepare channel form data to post.
    this.addChannelFromModel = {
      channelId: 0,
      baselineId: 2,
      channelName: this.rgmChannelForm.controls.channelName.value,
      channelAbbreviation: this.rgmChannelForm.controls.channelAbbreviation.value,
      isscomReference: this.rgmChannelForm.controls.isscomReference.value,
      userId: ''
    };

    this.rgmService.saveChannel(this.addChannelFromModel)
      .pipe(
        retryWhen(errors => errors.pipe(
          // define conditions for retrying with some of observable operators

        )),
      )
      .subscribe((status: boolean) => {
        if (status == true) {
          this.notifier.showSuccess('New Channel Added successfully!');
          this.rgmChannelForm.reset();
          this.GetChannelList(2, 0, '');
        } else {
          this.notifier.showError('Already exist');
        }
      });
  }

  editChannelRowItem(channelId: number): void {
    // Get channel detail.
    this.rgmService.getChannelById(channelId)
      .subscribe((data) => {
        this.channelDetail = data;
        // Update form control value
        this.rgmChannelForm.patchValue({
          channelId: this.channelDetail.channelId,
          channelName: this.channelDetail.channelName,
          channelAbbreviation: this.channelDetail.channelAbbreviation,
          isscomReference: this.channelDetail.isscomReference,
        });
      });

  }

  onSubmitUpdateChannelForm(): void {
    debugger;
    // Prepare channel form data to post.
    //alert( Number(sessionStorage.getItem("channelId")));

    this.updateChannelFromModel = {
      //channelId: this.rgmChannelForm.controls.channelId.value,
      channelId:Number(sessionStorage.getItem("channelId")),
      baselineId: 2,
      channelName: this.rgmChannelForm.controls.channelName.value,
      channelAbbreviation: this.rgmChannelForm.controls.channelAbbreviation.value,
      isscomReference: this.rgmChannelForm.controls.isscomReference.value,
      userId: '112' 
    };

    this.rgmService.updateChannel(this.updateChannelFromModel)
      .subscribe((status: boolean) => {
        if (status) {
          this.notifier.showSuccess('Channel updated successfully!');
          this.modalService.dismissAll();
          this.rgmChannelForm.reset();
          this.GetChannelList(2, 0, "");
          this.bsModalRef.hide();
        } else {
          this.notifier.showError('Something went wrong, please try again!!');
        }
      });
  }
  //#endregion Update channel.
  openUpdateModal(targetModal, channelId: number) {
   
    sessionStorage.setItem("channelId", String(channelId));

    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });

    this.editChannelRowItem(channelId);
    this.rgmChannelForm.patchValue({
      // id: this.CostIndirectHearderDetail.id,
      // costName: this.CostIndirectHearderDetail.costName,
    });
  }
}
