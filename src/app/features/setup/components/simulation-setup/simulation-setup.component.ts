import { Component, OnInit } from '@angular/core';
import { SetupService } from 'src/app/features/setup/services/setup.service';
import { Simulation } from 'src/app/features/setup/models/simulation';
import { MatDialog } from '@angular/material/dialog';
import { DialogSimulationCopyComponent } from 'src/app/features/setup/components/dialog-simulation-copy/dialog-simulation-copy.component';

@Component({
  selector: 'app-simulation-setup',
  templateUrl: './simulation-setup.component.html',
  styleUrls: ['./simulation-setup.component.scss']
})
export class SimulationSetupComponent implements OnInit {
  public simulations: Simulation[] | undefined;
  dateFormat: string | undefined;
  constructor(private service: SetupService, public dialog: MatDialog) { }

  ngOnInit(): void {

    let user = this.service.getUserInformation();
    this.dateFormat = user.dateFormat;
    this.service.getAllUserSimulations(1, 0).subscribe((res) => {
      this.simulations = res;
      console.log(this.simulations);
    });
  }

  openDialog(simulationIndex: number) {
    const dialogRef = this.dialog.open(DialogSimulationCopyComponent, {
      height: '400px',
      width: '900px',
      data: (this.simulations != null) ? this.simulations[simulationIndex] : new Simulation()
    });
    ////setTimeout(() => { dialogRef.close() },1000);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.ngOnInit();
    });
  }

  removeSimulation(id: any): void {
  }
}
