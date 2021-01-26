import { BaseLine } from 'src/app/features/setup/models/base-line';

export class Global {

}

export class TypeBaseineSimulation {
    type: number;
    typeId: number;
    tenantId: number;
    userEmail: string;
    userName: string;
    name: string;
    year: number;
    baseline: BaseLine | null;
    currency: string;
    precision: number;
}
