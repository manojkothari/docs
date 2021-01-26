import { Component, OnInit } from '@angular/core';
import { RgmService } from 'src/app/features/rgm/services/rgm.service';
import { UpStream, UpStreamMatrix, UpStreamSave } from 'src/app/features/rgm/models/up-stream';
import { SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { DropDownEntity } from 'src/app/core/models/drop-down-entity';
import { StorageService } from 'src/app/core/services/storage.service';
import { ActivatedRoute } from '@angular/router';
import { DropDownService } from 'src/app/core/services/drop-down.service';
import { TypeBaseineSimulation } from 'src/app/core/models/global.model';

@Component({
  selector: 'app-up-stream',
  templateUrl: './up-stream.component.html',
  styleUrls: ['./up-stream.component.scss']
})

export class UpStreamComponent implements OnInit {
  brandList: DropDownEntity[];
  packList: DropDownEntity[];
  upStreamData: UpStreamMatrix[];

  statuses: SelectItem[];

  simulationList: DropDownEntity[];
  channelList: DropDownEntity[];
  selectedChannelId: number;
  rowSum: UpStreamMatrix;
  selectedChannelName = '';
  selectedType: TypeBaseineSimulation;
  type: number;
  constructor(private reportservice: RgmService,
              private ddService: DropDownService,
              private session: StorageService,
              private route: ActivatedRoute) { }
  routingParam: any = 'volume';
  ngOnInit(): void {
    this.selectedType = this.session.SelectedType;
    const routeParams = this.route.snapshot.paramMap;
    this.routingParam = routeParams.get('upStreamType');
    if (this.session.baseLineId > 0) {
      this.ddService.getChannelsByBaseline(this.session.baseLineId).subscribe((res) => {
        this.channelList = res;
        this.ddService.getBrandsByBaseline(this.session.baseLineId).subscribe((res1) => {
          this.brandList = res1;
          this.ddService.getPacksByBaseline(this.session.baseLineId).subscribe((res2) => {
            this.packList = res2;
            this.selectedChannelId = Number(this.channelList[0].id);
            this.selectedChannelName = this.channelList[0].name;
            this.getReportData(this.selectedChannelId, this.routingParam);
          });
        });
      });
    }
  }
  changeChannel(evt): void {
    this.selectedChannelId = evt.target.value;
    this.selectedChannelName = evt.target.options[evt.target.options.selectedIndex].text;
    this.getReportData(Number(this.selectedChannelId), this.routingParam);
  }
  submitForm(): void {

    if (!confirm('Do you want to Save this table')) { return; }
    let arr: UpStreamSave[];
    arr = [];
    this.upStreamData.forEach(element => {
      const pack = this.packList.find((pk) => pk.name === element.Attrib);

      // tslint:disable-next-line: prefer-const
      for (let brand of this.brandList) {
        const upstr = {
          packId: Number(pack?.id),
          brandId: Number(brand.id),
          value: element[brand.name],
          type: this.selectedType.type,
          typeId: this.selectedType.typeId,
          valueType: this.routingParam,
          channelId: this.selectedChannelId,
          userId: 1
        };
        arr.push(upstr);
      }

    });
    this.reportservice.saveUpStream(arr).subscribe(
      (val) => {
        alert('Data Saved Successfully');
      },
      response => {
        console.log('POST call in error', response);
        alert('Some Error has occured');
      });
    // console.log(JSON.stringify(arr));
  }

  getReportData(channelId: number, valueType: string): void {
    const typeId = this.session.SelectedType.typeId;
    this.getData(this.session.SelectedType.type, typeId, channelId, valueType);
  }



  getData(type: number, typeId: number, channelId: number, valueType: string): void {
    this.reportservice.getUpStream(type, typeId, channelId, valueType).subscribe((res) => {
      const upStreamList = res;
      this.upStreamData = [];
      this.rowSum = new UpStreamMatrix();
      for (let xIndx = 0; xIndx < this.packList.length; xIndx++) {
        this.upStreamData[xIndx] = new UpStreamMatrix();
        this.upStreamData[xIndx].Attrib = this.packList[xIndx].name;
        this.upStreamData[xIndx].Columntotal = 0;
        for (const brand of this.brandList) {
          const obj = upStreamList.find((ups) => ups.Pack === this.packList[xIndx].name && ups.Brand === brand.name);
          this.upStreamData[xIndx][brand.name] = obj?.Value;
          this.upStreamData[xIndx].Columntotal = this.upStreamData[xIndx].Columntotal + Number(obj?.Value);
          if (this.rowSum[brand.name] === undefined) {
            this.rowSum[brand.name] = Number(obj?.Value);
          }
          else {
            this.rowSum[brand.name] = this.rowSum[brand.name] + Number(obj?.Value);
          }
        }
      }
      this.rowSum.Columntotal = 0;
      this.brandList.forEach(element => {
        this.rowSum.Columntotal = this.rowSum.Columntotal + this.rowSum[element.name];
      });
    });
  }


  dataOnBlur(rowI, colVal): void {
    this.upStreamData[rowI].Columntotal = 0;
    this.brandList.forEach(element => {
      this.upStreamData[rowI].Columntotal = this.upStreamData[rowI].Columntotal + this.upStreamData[rowI][element.name];
    });

    this.rowSum[colVal] = 0;
    this.upStreamData.forEach(element => {
      this.rowSum[colVal] = this.rowSum[colVal] + element[colVal];
    });
    this.rowSum.Columntotal = 0;
    this.brandList.forEach(element => {
      this.rowSum.Columntotal = this.rowSum.Columntotal + this.rowSum[element.name];
    });
  }
}
