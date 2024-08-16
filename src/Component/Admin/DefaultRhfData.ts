import { RecentArticleDataCreateType, RecentArticleDataType } from "@/types/RecentArticle";


export type FieldType = {
    key: string;
    value: string[];
};


export const RhfDefaultInitialValues = (mobileArticle?: RecentArticleDataType): RecentArticleDataCreateType => {
    console.log('mobileArticle?.expert_view  ', mobileArticle)
    return {
        title: "",
        category: "",
        description: "",
        latestDevice: "",
        best_reviews: "",
        brands: "",
        deviceName: "",
        showInNews: "",
        selected_mobile: null,
      }
}