
    export interface Trigger {
        name: string;
        url: string;
    }

    export interface Trigger2 {
        name: string;
        url: string;
    }

    export interface Species {
        name: string;
        url: string;
    }

    export interface EvolvesTo2 {
        evolves_to: any[];
        is_baby: boolean;
        species: Species;
    }

    export interface Species2 {
        name: string;
        url: string;
    }

    export interface EvolvesTo {
        evolves_to: EvolvesTo2[];
        is_baby: boolean;
        species: Species2;
    }

    export interface Species3 {
        name: string;
        url: string;
    }

    export class Chain {
// tslint:disable-next-line: variable-name
        evolution_details: any[];
// tslint:disable-next-line: variable-name
        evolves_to: EvolvesTo[];
// tslint:disable-next-line: variable-name
        is_baby: boolean;
        species: Species3;
        name: string;
    }
