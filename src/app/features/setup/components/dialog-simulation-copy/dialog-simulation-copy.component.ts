import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SetupService } from 'src/app/features/setup/services/setup.service';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeModule,MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

@Component({
  selector: 'app-dialog-simulation-copy',
  templateUrl: './dialog-simulation-copy.component.html',
  styleUrls: ['./dialog-simulation-copy.component.scss']
})
export class DialogSimulationCopyComponent implements OnInit {

  simulationForm: FormGroup;
  constructor(private service: SetupService) {

    ////for tree
    this.dataSource.data = TREE_DATA;

    //for create/edit
    this.simulationForm = new FormGroup({
      simulationName: new FormControl(''),
      id: new FormControl(''),
      idType: new FormControl(''),
    });

    
  }

  ngOnInit(): void {
  }
  OnSimulationAdd() {
    this.service.postSimulationCopy(this.simulationForm?.value)
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



  private _transformer = (node: BaselineNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

interface BaselineNode {
  name: string;
  children?: BaselineNode[];
}

const TREE_DATA: BaselineNode[] =
  [
    {
      name: 'Baseline_1',
      children: [
        { name: 'Simulation_1' },
        { name: 'Simulation_2' },
        { name: 'Simulation_3' },
      ]
    },
    {
      name: 'Baseline_2',
      children:
        [
          { name: 'Simulation_4' },
          { name: 'Simulation_5' },
          { name: 'Simulation_6' },
        ]
    },
    {
      name: 'Baseline_3',
      children: [
        { name: 'Simulation_7' },
        { name: 'Simulation_8' },
      ]
    },
  ];
