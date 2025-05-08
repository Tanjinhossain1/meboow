import { MobileArticleType } from "./mobiles";

export interface RecentArticleDataType {
    id:string;
    selected_articles?: RecentArticleDataType;
    image: string;
    title: string;
    route: string;
    description: string;
    category: string;
    sub_categories:string;
    content:any;
    latestDevice: string,
    best_reviews: string,
    brands: string,
    updateAt: string;
    createdAt: string;
    view?:string;
    deviceName?:string;
    showInNews?:string;
    selected_mobile:MobileArticleType;
    admin_detail: {
        email:string;
        name: string;
    }
    pages:{
        page:number;
        title:string;
        content:any;
    }[];
    tags:{
        name:string;
    }[]
}
export interface VideoListUrlDataType {
    id:string;
    video: string;
    income: string;
    updateAt: string;
    createdAt: string;
}
export interface WithdrawRequestDataType {
    id:string;
    method: string;
    phoneNumber: string;
    email: string;
    amount: string;
    status: string;
    updateAt: string;
    createdAt: string;
}

export interface RecentArticleDataCreateType {
    title: string;
    selected_articles?: RecentArticleDataType;
    route: string;
    description: string;
    category: string;
    sub_categories:string;
    latestDevice: string,
    best_reviews: string,
    brands: string,
    deviceName?:string;
    showInNews?:string;
    selected_mobile:MobileArticleType | null;
    pages:{
        page:number;
        title:string;
        content:any;
    }[];
    tags:{
        name:string;
    }[]
}