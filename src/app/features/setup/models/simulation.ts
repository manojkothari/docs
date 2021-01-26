export class Simulation {
  public simulationId: number | undefined;
  public baselineId: number | undefined; 
  public userId: number | undefined;
  public tenantId: number | undefined;
  public simulationName: string | undefined;
  public baselineName: string | undefined;
  public simulationYear: number | undefined;
  public createdOn: Date | undefined;
  public createdBy: string | undefined;
  public lastUpdatedBy: string | undefined;
  public lastUpdatedOn: Date | undefined;
  public comments: string | undefined;
  public isActive: boolean | undefined;
}

export class SimulationCopy {  
  public id: number | undefined;
  public idType: string | undefined;  
  public userId: number | undefined;
  public tenantId: number | undefined;
  public simulationName: string | undefined;
  public createdHBy: string | undefined;
}
