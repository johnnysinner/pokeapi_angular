
    export interface Result {
        name: string;
        url: string;
    }

    export class AllTypes {
        count: number;
        next?: any;
        previous?: any;
        results: Result[];
    }