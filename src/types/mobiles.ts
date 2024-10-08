import { RecentArticleDataType } from "./RecentArticle";


export interface MobileOpinionType {
    id: number;
    createdAt: string;
    updatedAt: string;
    name: string;
    email: string;
    comments: string;
    mobileId: string;
    articleId: string;
}
export interface MobileTagsType {
    id: number;
    createdAt: string;
    updatedAt: string;
    name: string;
}


export interface MobileArticleType {
    id: number;
    admin_detail: {
        email:string;
        name: string;
        role:string
    }
    createdAt: Date;
    updatedAt: Date;
    title: string;
    market_status: string;
    release_date: string;
    image: string[];
    display_image: string;
    is_daily_interest: string;
    is_by_fans: string;
    is_latest_device: string;
    top_background_color: string;
    total_fans: number;
    tags:{
        name: string;
    }[];
    selected_articles: RecentArticleDataType;
    key_specifications: {
        processor: string;
        display: string;
        rearCamera: string;
        frontCamera: string;
        ram_storage: string;
        battery: string;
        network: string;
        os: string;
        thickness: string;
        pixel: string;
        camera: string;
        ram_chipset: string;
        review: string

    };
    expert_view: {
        specific_final_score: { name: string, value: string | number }[],
        total_score: number;
        specific_score: {
            design: number | string;
            display: number | string;
            performance: number | string;
            camera: number | string;
            connectivity: number | string;
            features: number | string;
            battery: number | string;
            usability: number | string;
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
    content: any,
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

    is_daily_interest?: string;
    is_by_fans?: string;
    is_latest_device?: string;
    // image: string[];
    // display_image:string;
    tags: {
        name: string;
    }[];
    selected_articles: RecentArticleDataType | null;
    key_specifications: {
        processor: string;
        display: string;
        rearCamera: string;
        frontCamera: string;
        ram_storage: string;
        battery: string;
        network: string;
        os: string;
        thickness: string;
        pixel: string;
        camera: string;
        ram_chipset: string;
        review: string
    };
    expert_view: {
        total_score: number | string;
        specific_final_score: { name: string, value: string | number }[],
        specific_score: {
            design: number | string;
            display: number | string;
            performance: number | string;
            camera: number | string;
            connectivity: number | string;
            features: number | string;
            battery: number | string;
            usability: number | string;

            // battery: number | string;
            // display: number | string;
            // physicalSpecification: number | string;
            // memory: number | string;
            // mainCamera: number | string;
            // processor: number | string;
            // network: number | string;
            // selfieCamera: number | string;
            // connectivity: number | string;
            // features: number | string;
            // os: number | string;
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
    custom_specification_fields: {
        display_name: string;
        value: string;
    }[];
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