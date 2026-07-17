export interface IGearPayload {
        name: string;
        description: string; 
        image: string;
        pricePerDay:number;
        quantity:number;
        available:number;
        status?: 'AVAILABLE' | 'OUT_OF_STOCK' | 'MAINTENANCE';
        categoryId:string;
        
    };


export interface IUpdateGearPayload {
        name?: string;
        description?: string; 
        image?: string;
        pricePerDay?:number;
        quantity?:number;
        available?:number;
        status?: 'AVAILABLE' | 'OUT_OF_STOCK' | 'MAINTENANCE';
        categoryId?:string;
        
    };