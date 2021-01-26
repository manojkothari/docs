export class BaseLine {

  public baselineId: number;
  public userId: number | undefined;
  public tenantId: number | undefined
  public baselineName: string | undefined;
  public tenantName: string | undefined;
  public baselineYear: number | undefined;
  public createdBy: string | undefined;
  public createdOn: string | undefined;
  public lastUpdatedBy: string | undefined;
  public lastUpdatedOn: string | undefined;
  public accessPrivatePublicControlled: string | undefined;
  public currency: string | undefined;
  public precision: number | undefined;
  public status: boolean | undefined;
  public abbreviation: string | undefined;
  public access: string | undefined;
  

  //constroctor(
    //_BaselineId: number,
    //_UserId: number,
    //_TenantId: number,
    //_BaselineName: string,
    //_BaselineYear: number,
    //_CreatedBy: string,
    //_CreatedOn: Date,
    //_LastUpdatedBy: string,
    //_LastUpdatedOn: Date,
    //_AccessPrivatePublicControlled: string,
    //_Currency: string,
    //_Status: boolean,
  //) {
    //this.BaselineId = _BaselineId;
 // }
}


export class AddBaseLine {

  public baselineId: number;
  public userId: number | undefined;
  public tenantId: number | undefined
  public baselineName: string | undefined;
  //public tenantName: string | undefined;
  public baselineYear: number | undefined;
  public baseLineAbbr: string | undefined;
  public createdBy: string | undefined;
  //public createdOn: string | undefined;
  //public lastUpdatedBy: string | undefined;
  //public lastUpdatedOn: string | undefined;
  public accessPrivatePublicControlled: string ;
  public currency: string | undefined;
  public precision: number | undefined;
  public status: boolean | undefined;
  //public abbreviation: string | undefined;
  //public access: string | undefined;

 
}