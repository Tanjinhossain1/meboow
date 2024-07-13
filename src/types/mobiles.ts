

export interface MobileArticleType {
    id:number;
    createdAt:string;
    updatedAt: string;
    title: string;
    market_status: string;
    release_date: string;
    image: string;
    key_specifications: {
        processor: string;
        display: string;
        rearCamera: string;
        frontCamera: string;
        ram_storage: string;
        battery: string;
        network: string;
        os: string;
    };
    
    brands: string;
    physicalSpecification: any[],
    network: any[],
    display: any[],
    processor: any[],
    memory: any[],
    mainCamera: any[],
    selfieCamera: any[],
    os: any[],
    connectivity: any[],
    features: any[],
    battery: any[],
    details: any[],
}