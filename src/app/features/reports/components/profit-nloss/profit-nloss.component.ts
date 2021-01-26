import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/features/reports/services/report.service';
import { DropDownService } from 'src/app/core/services/drop-down.service';
import { DropDownEntity } from 'src/app/core/models/drop-down-entity';
import { ProfitLoss, ProfitNLoss } from 'src/app/features/reports/models/profit-loss';
import { element } from 'protractor';
import { StorageService } from 'src/app/core/services/storage.service';
@Component({
  selector: 'app-profit-nloss',
  templateUrl: './profit-nloss.component.html',
  styleUrls: ['./profit-nloss.component.scss']
})
export class ProfitNLossComponent implements OnInit {
  simulationList: DropDownEntity[];
  channelList: DropDownEntity[];
  pnlList: ProfitLoss[];
  pnlGrid: ProfitNLoss[];
  headerList: any[];
  pnlData: any[][];
  constructor(private reportservice: ReportService, private session: StorageService, private ddService: DropDownService) { }

  ngOnInit(): void {
    const baselineId = this.session.SelectedType.typeId;
    if (baselineId === 0) { return; }
    this.ddService.getSimulationsByBaseline(baselineId).subscribe((res) => {
      this.simulationList = res;
      console.log(res);
    });

    this.ddService.getChannelsByBaseline(baselineId).subscribe((res) => {
      this.channelList = res;
      console.log(res);
    });
  }

  getReportData(): void {

    let perCase = false;
    this.reportservice.getPNLReportData(2, 1, 1).subscribe((res) => {
      this.pnlGrid = res;
      console.log(res);
      let curRno = 1;
      this.pnlData = [];

      this.headerList = [];

      this.headerList[0] = 'Elements';
      this.pnlGrid.forEach(elmt => {
        if (perCase) {
          curRno = 3 * elmt.RNO - 2;
        }
        else {
          curRno = 2 * elmt.RNO - 1;
        }
        if (this.pnlData[elmt.SNO - 1] === undefined) {
          this.pnlData[elmt.SNO - 1] = [];
          this.pnlData[elmt.SNO - 1][0] = elmt.ValueType;
        }
        if (this.headerList[curRno] === undefined || this.headerList[curRno] === '') {
          this.headerList[curRno] = elmt.Year;
          // tslint:disable-next-line: triple-equals
          if (elmt.TypeBaseLineSimulation != 1) {
            this.headerList[curRno + 1] = 'Chg. %';
          }
          if (perCase) {
            this.headerList[curRno + 2] = 'Per Case';
          }
        }
        this.pnlData[elmt.SNO - 1][curRno] = elmt.Value;
        // tslint:disable-next-line: triple-equals
        if (elmt.TypeBaseLineSimulation != 1) {
          this.pnlData[elmt.SNO - 1][curRno + 1] = elmt.ChangePercent;
        }
        if (perCase) {
          this.pnlData[elmt.SNO - 1][curRno + 2] = elmt.PerCase;
        }
      });
      console.log('Header: ', this.headerList);
      console.log('Data: ', this.pnlData);
    });
  }
}
