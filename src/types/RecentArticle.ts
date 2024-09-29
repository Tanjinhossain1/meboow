import { MobileArticleType } from "./mobiles";

export interface RecentArticleDataType {
    id:string;
    image: string;
    title: string;
    route: string;
    description: string;
    category: string;
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

export interface RecentArticleDataCreateType {
    title: string;
    route: string;
    description: string;
    category: string;
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