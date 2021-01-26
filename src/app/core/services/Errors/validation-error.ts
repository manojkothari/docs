import { Injectable, Inject } from '@angular/core';

@Injectable()
export class ValidationError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = 'ValidationError';
    }

}
