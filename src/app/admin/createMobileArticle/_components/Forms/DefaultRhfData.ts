import { MobileArticleDefaultFormType, MobileArticleType } from "@/types/mobiles";


export type FieldType = {
    key: string;
    value: string[];
};


export const RhfDefaultInitialValues = (mobileArticle?: MobileArticleType):MobileArticleDefaultFormType => {
    return {
        title: mobileArticle?.title ? mobileArticle?.title : "",
        market_status: mobileArticle?.market_status ? mobileArticle?.market_status : "",
        release_date: mobileArticle?.release_date ? mobileArticle?.release_date : "",
        brands: mobileArticle?.brands ? mobileArticle?.brands : "",
        key_specifications: mobileArticle?.key_specifications ? mobileArticle?.key_specifications : {
            processor: "",
            display: "",
            rearCamera: "",
            frontCamera: "",
            ram_storage: "",
            battery: "",
            network: "",
            os: "",
        },
        prices: mobileArticle?.prices ? mobileArticle.prices : [{ gbs: "", start_from: "" }],
    }
}