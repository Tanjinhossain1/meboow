

export interface MobileArticleType {
    id: number;
    createdAt: string;
    updatedAt: string;
    title: string;
    market_status: string;
    release_date: string;
    image: string[];
    display_image: string;
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
    expert_view: {
        total_score: number;
        specific_score: {
            battery: number;
            display: number;
            physicalSpecification: number;
            memory: number;
            mainCamera: number;
            processor: number;
            network: number;
            selfieCamera: number;
            connectivity: number;
            features: number;
            os: number;
        },
        pros: [
            {
                list: string,
            }
        ],
        cons: [
            {
                list: string,
            }
        ],
        verdict: string,
        article_urls: string
    },
    brands: string;
    physicalSpecification: any,
    network: any,
    display: any,
    processor: any,
    memory: any,
    mainCamera: any,
    selfieCamera: any,
    os: any,
    connectivity: any,
    features: any,
    battery: any,
    details: any,
    prices: {
        start_from: string;
        gbs: string;
    }[],
}
export interface MobileArticleDefaultFormType {
    title: string;
    market_status: string;
    release_date: string;
    // image: string[];
    // display_image:string;
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
    expert_view: {
        total_score: number | string;
        specific_score: {
            battery: number | string;
            display: number | string;
            physicalSpecification: number | string;
            memory: number | string;
            mainCamera: number | string;
            processor: number | string;
            network: number | string;
            selfieCamera: number | string;
            connectivity: number | string;
            features: number | string;
            os: number | string;
        },
        pros:
        {
            list: string,
        }[]
        ,
        cons:
        {
            list: string,
        }[]
        ,
        verdict: string,
        article_urls: string
    },
    brands: string;
    // physicalSpecification: any[],
    // network: any[],
    // display: any[],
    // processor: any[],
    // memory: any[],
    // mainCamera: any[],
    // selfieCamera: any[],
    // os: any[],
    // connectivity: any[],
    // features: any[],
    // battery: any[],
    // details: any[],
    prices: {
        start_from: string;
        gbs: string;
    }[],
}