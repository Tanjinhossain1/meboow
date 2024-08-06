import { MobileArticleDefaultFormType, MobileArticleType } from "@/types/mobiles";


export type FieldType = {
    key: string;
    value: string[];
};


export const RhfDefaultInitialValues = (mobileArticle?: MobileArticleType): MobileArticleDefaultFormType => {
    console.log('mobileArticle?.expert_view  ', mobileArticle)
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
        custom_specification_fields: [{
            display_name: "",
            value: "",
        }],
        expert_view: mobileArticle?.expert_view ? mobileArticle?.expert_view : {
            total_score: "",
            specific_final_score: [
                {
                    name: "",
                    value: "",
                },
            ],
            specific_score: {
                battery: "",
                display: "",
                physicalSpecification: "",
                memory: "",
                mainCamera: "",
                processor: "",
                network: "",
                selfieCamera: "",
                connectivity: "",
                features: "",
                os: "",
            },
            article_urls: "",
            cons: [{
                list: "",
            }],
            pros: [{
                list: "",
            }],
            verdict: "",

        },
        prices: mobileArticle?.prices ? mobileArticle.prices : [{ gbs: "", start_from: "" }],
    }
}