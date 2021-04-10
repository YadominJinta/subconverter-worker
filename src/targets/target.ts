export interface SubNode {
    type: string
    tag: string,
    host: string,
    port: number,
    method: string,
    password: string
}

export class Target {
    constructor() {

    }

    static parse(text: string): any {
        return []
    }

    static stringfy(value: any): string {
        return ""
    }
}


