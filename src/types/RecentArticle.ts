import { MobileArticleType } from "./mobiles";

export interface RecentArticleDataType {
    id:string;
    image: string;
    title: string;
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
}
 