import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NotificationService } from 'src/app/core/services/notification.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { RgmService } from '../../services/rgm.service';
import { HttpErrorResponse } from '@angular/common/http';
import { OutletListByChannel, SaveOutletRowItem } from '../../models/outlet.model';

@Component({
  selector: 'app-outlet',
  templateUrl: './outlet.component.html',
  styleUrls: ['./outlet.component.scss']
})
export class OutletComponent implements OnInit {

  constructor(
    private storage: StorageService,
    private rgmService: RgmService,
    private notifier: NotificationService,
  ) { }

  // //#region "Class Fields"
  // gridRowData: OutletListByChannel[];
  // isFullScreen = false;
  // isCheckedAll = false;
  // isEditableMode = false;
  // gridOptions: GridOptions;
  // frameworkComponents;
  // gridApi: GridApi;
  // gridColumnApi;
  // columnDefs: any[];
  // autoGroupColumnDef: { minWidth: number; pinned: string; };
  // rowGroupPanelShow: string;
  // statusBar;

  // rowData: any;

  // sumFields = [
  //   'outletCount',
  // ];

  // //#endregion
  // @ViewChild('agGrid') agGrid: AgGridAngular;

  ngOnInit(): void {

    // // Get outlet list by channel.
    // this.createColumnsDefinition();
    // this.bindGridData();

    // //#region "Grid options"
    // this.autoGroupColumnDef = { minWidth: 200, pinned: 'left' };
    // this.rowGroupPanelShow = 'always';
    // this.statusBar = {
    //   statusPanels: [
    //     {
    //       statusPanel: 'agTotalAndFilteredRowCountComponent',
    //       align: 'left',
    //     },
    //     {
    //       statusPanel: 'agTotalRowCountComponent',
    //       align: 'center',
    //     },
    //     { statusPanel: 'agFilteredRowCountComponent' },
    //     { statusPanel: 'agSelectedRowCountComponent' },
    //     { statusPanel: 'agAggregationComponent' },
    //   ],
    // };
    // this.frameworkComponents = {
    //   checkboxRenderer: CheckboxRendererComponent,
    // };

    // this.gridOptions = {
    //   defaultColDef: {
    //     resizable: true,
    //     sortable: true,
    //     // onCellValueChanged: this.onCellValueChanged.bind(this),
    //   },
    //   onFirstDataRendered: (params) => {
    //     setTimeout(() => {
    //       const pinnedBottomCols = this.getEmptyColumsObj();
    //       this.gridApi.setPinnedBottomRowData([pinnedBottomCols]);
    //       this.calculatePinnedBottomData(this.sumFields);
    //     }, 3000);
    //   },
    //   animateRows: true,
    //   enableRangeSelection: true,
    //   // rowData: this.gridRowData,
    //   onRowValueChanged: this.onRowValueChanged.bind(this),
    //   frameworkComponents: this.frameworkComponents,
    //   getRowStyle: this.getRowStyle,
    //   editType: 'fullRow',
    //   rowSelection: 'multiple',
    //   suppressRowClickSelection: true,
    //   allowContextMenuWithControlKey: true,
    //   getContextMenuItems: this.getContextMenuItems.bind(this),
    //   components: {
    //     loadingCellRenderer: (params) => {
    //       if (params.value !== undefined && params.value !== '') {
    //         return params.value;
    //       } else {
    //         return '<img src="assets/images/loading_sm.gif">';
    //       }
    //     },
    //   },
    //   enableCellChangeFlash: true,
    //   autoGroupColumnDef: this.autoGroupColumnDef,
    //   suppressDragLeaveHidesColumns: true,
    //   suppressMakeColumnVisibleAfterUnGroup: true,
    //   rowGroupPanelShow: this.rowGroupPanelShow,
    //   groupIncludeFooter: true,
    //   groupSelectsChildren: true,
    //   // enableFillHandle: true,
    // };
    //#endregion

  }

  // private bindGridData(): void {
  //   this.rgmService.getOutletListByChannel(this.storage.baseLineId, 1, 1)
  //     .subscribe((res) => {
  //       this.gridRowData = res;
  //       this.gridApi.setRowData(this.gridRowData);
  //     });
  // }

  // //#region 'Column defnition'
  // private createColumnsDefinition(): any {
  //   this.columnDefs = [
  //     {
  //       headerName: 'S No',
  //       colId: 'sNo',
  //       pinned: 'left',
  //       filter: 'agNumberColumnFilter',
  //       valueGetter: (params) => {
  //         if (params.node.isRowPinned()) { return ''; }
  //         else { return params.node.rowIndex + 1; }
  //       },
  //       headerCheckboxSelection: true,
  //       checkboxSelection: true,
  //       sortable: true,
  //       width: 200,
  //       // hide: true,
  //     },
  //     {
  //       headerName: 'Channel Name',
  //       field: 'channelName',
  //       pinned: 'left',
  //       filter: 'agTextColumnFilter',
  //       width: 'auto',
  //     },
  //     {
  //       headerName: 'Year (2015)',
  //       field: 'outletCount',
  //       editable: true,
  //       filter: 'agNumberColumnFilter',
  //       cellClassRules: {
  //         'text-danger': 'x < 0',
  //       },
  //       valueFormatter: this.numericFormatter,
  //       // onCellValueChanged: this.validateAdjustableAmount.bind(this),
  //       valueSetter: this.valueSetter,
  //       width: 'auto',
  //       aggFunc: 'sum',
  //       enableValue: true,
  //     },

  //   ];
  // }
  // //#endregion 'Column defnition'

  // private getContextMenuItems(params): any {
  //   const result = [
  //     {
  //       name: this.isFullScreen ? 'Exit Full Screen' : 'Full Screen',
  //       action: this.fullScreen.bind(this, params),
  //       icon: this.isFullScreen
  //         ? '<i class="material-icons" style="font-size: 16px;">fullscreen_exit</i>'
  //         : '<i class="material-icons" style="font-size: 16px;">fullscreen</i>',
  //     },
  //     'separator',
  //     'autoSizeAll',
  //     'resetColumns',
  //     'separator',
  //     'copy',
  //     'copyWithHeaders',
  //     'separator',
  //     'export',
  //   ];
  //   return result;
  // }

  // private fullScreen(params): void {
  //   const target = document.getElementById('fullScreen') as HTMLElement;
  //   if (screenfull && screenfull.isEnabled) {
  //     screenfull.toggle(target);
  //   }
  // }

  // private numericFormatter(params): number {
  //   const num = Number(params.value);
  //   if (isNaN(num)) {
  //     return params.value;
  //   } else {
  //     return Number(params.value);
  //   }
  // }

  // private valueSetter(params): any {
  //   if (params.data[params.colDef.field] !== params.newValue) {
  //     params.data[params.colDef.field] = isNaN(Number(params.newValue))
  //       ? 0
  //       : Number(params.newValue);
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  // private getEmptyColumsObj(): any {
  //   const resultsult = {};
  //   this.gridColumnApi.getAllGridColumns().forEach((item) => {
  //     resultsult[item.colId] = null;
  //   });
  //   return resultsult;
  // }

  // private calculatePinnedBottomData(cols: any[]): void {
  //   const pinnedBottomRowNode = this.gridApi.getPinnedBottomRow(0);
  //   cols.forEach((element) => {
  //     let fieldVal = 0;
  //     this.gridApi.forEachNode((rowNode: RowNode) => {
  //       if (rowNode.data) {
  //         if (rowNode.data[element]) {
  //           fieldVal = fieldVal + Number(rowNode.data[element] ?? 0);
  //         }
  //       }
  //     });
  //     pinnedBottomRowNode.setDataValue(
  //       element,
  //       fieldVal
  //     );
  //   });
  // }

  // // TODO: need to change for delete row
  // private onRowValueChanged(params): void {
  //   const node: RowNode = params.node;
  //   if (node.isRowPinned() && node.rowPinned === 'top') {
  //     if (this.gridApi.getSelectedNodes().length <= 0) {
  //       this.notifier.alert('Please select at least one row to Delete.');
  //     }
  //   } else if (!node.isRowPinned()) {
  //     this.calculatePinnedBottomData(this.sumFields);
  //   }
  // }

  // //#region "Grid Events"
  // onGridReady(params): void {
  //   this.gridApi = params.api;
  //   this.gridColumnApi = params.columnApi;
  // }

  // private getRowStyle(params): any {
  //   if (params.node.rowPinned) {
  //     return { 'font-weight': 'bold' };
  //   }
  //   return '';
  // }
  // //#endregion "Grid Events"

  // //#region 'Save Data'
  // saveOutletGridData(): void {
  //   const saveOutletRowItems: SaveOutletRowItem[] = [];
  //   this.gridApi.forEachNode((node) => {
  //     const item: OutletListByChannel = node.data;
  //     const saveOutletRowItem: SaveOutletRowItem = {
  //       baseLineTypeOrSimulationType: item.baseLineTypeOrSimulationType,
  //       typeId: item.typeId,
  //       outletId: item.outletId,
  //       outletCount: item.outletCount,
  //       channelId: item.channelId,
  //     };
  //     saveOutletRowItems.push(saveOutletRowItem);
  //   });

  //   this.rgmService.saveOutletByChannel(saveOutletRowItems)
  //     .subscribe((result) => {
  //       if (result === 'Success') {
  //         this.notifier.showSuccess(`Data Saved Successfully.`);
  //         // Rebind ag-grid.
  //         this.bindGridData();
  //       } else {
  //         this.notifier.showError('Something went wrong, please try again!!');
  //       }
  //     }, (error: HttpErrorResponse) => {
  //       this.notifier.showError('An error accured during the saving Data, please try again!!');
  //     });
  // }
  // //#endregion 'Save Data'

  // resetOutletGridData(): void {
  //   // TODO: need to check how can refresh grid without hitting Server DB.
  //   // this.gridApi.refreshCells(params);
  //   this.bindGridData();
  // }

}
