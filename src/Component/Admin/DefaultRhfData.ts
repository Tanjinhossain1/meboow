import { RecentArticleDataCreateType, RecentArticleDataType } from "@/types/RecentArticle";


export type FieldType = {
    key: string;
    value: string[];
};


export const RhfDefaultInitialValues = (mobileArticle?: RecentArticleDataType): RecentArticleDataCreateType => {
    console.log('mobileArticle?.expert_view  ', mobileArticle)
    return {
        title: mobileArticle?.title ? mobileArticle?.title : "",
        category: mobileArticle?.category ? mobileArticle?.category : "",
        description: mobileArticle?.description ? mobileArticle?.description : "",
        latestDevice: mobileArticle?.latestDevice ? mobileArticle?.latestDevice : "",
        best_reviews: mobileArticle?.best_reviews ? mobileArticle?.best_reviews : "",
        brands: mobileArticle?.brands ? mobileArticle?.brands : "",
        deviceName: mobileArticle?.deviceName ? mobileArticle?.deviceName : "",
        showInNews: mobileArticle?.showInNews ? mobileArticle?.showInNews : "",
        selected_mobile: mobileArticle?.selected_mobile ? mobileArticle?.selected_mobile : null,
        pages: mobileArticle?.pages ? mobileArticle?.pages : [
            { page: 1, title: "", content: null } // Initial object
        ]
    }
}