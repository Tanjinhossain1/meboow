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
        is_daily_interest: mobileArticle?.is_daily_interest ? mobileArticle?.is_daily_interest : "",
        is_by_fans: mobileArticle?.is_by_fans ? mobileArticle?.is_by_fans : "",
        is_latest_device: mobileArticle?.is_latest_device ? mobileArticle?.is_latest_device : "",
        key_specifications: mobileArticle?.key_specifications ? mobileArticle?.key_specifications : {
            processor: "",
            display: "",
            rearCamera: "",
            frontCamera: "",
            ram_storage: "",
            battery: "",
            network: "",
            os: "",
            pixel: "",
            camera: "",
            ram_chipset: "",
            review: "",
            thickness: "",
        },
        custom_specification_fields: [{
            display_name: "",
            value: "",
        }],
        expert_view: mobileArticle?.expert_view ? {
            total_score: mobileArticle.expert_view.total_score || "",
            specific_final_score: mobileArticle.expert_view.specific_final_score || [{ name: "", value: "" }],
            specific_score: {
                design: mobileArticle.expert_view.specific_score?.design || "",
                display: mobileArticle.expert_view.specific_score?.display || "",
                performance: mobileArticle.expert_view.specific_score?.performance || "",
                camera: mobileArticle.expert_view.specific_score?.camera || "",
                connectivity: mobileArticle.expert_view.specific_score?.connectivity || "",
                features: mobileArticle.expert_view.specific_score?.features || "",
                battery: mobileArticle.expert_view.specific_score?.battery || "",
                usability: mobileArticle.expert_view.specific_score?.usability || "",
            },
            article_urls: mobileArticle.expert_view.article_urls || "",
            cons: mobileArticle.expert_view.cons || [{ list: "" }],
            pros: mobileArticle.expert_view.pros || [{ list: "" }],
            verdict: mobileArticle.expert_view.verdict || "",
        } : {
            total_score: "",
            specific_final_score: [{ name: "", value: "" }],
            specific_score: {
                design: "",
                display: "",
                performance: "",
                camera: "",
                connectivity: "",
                features: "",
                battery: "",
                usability: "",
            },
            article_urls: "",
            cons: [{ list: "" }],
            pros: [{ list: "" }],
            verdict: "",
        },

        // expert_view: mobileArticle?.expert_view ? mobileArticle?.expert_view : {
        //     total_score: "",
        //     specific_final_score: [
        //         {
        //             name: "",
        //             value: "",
        //         },
        //     ],
        //     specific_score: {
        //         design: "",
        //         display: "",
        //         performance: "",
        //         camera: "",
        //         connectivity: "",
        //         features: "",
        //         battery: "",
        //         usability: "",

        //         // battery: "",
        //         // display: "",
        //         // physicalSpecification: "",
        //         // memory: "",
        //         // mainCamera: "",
        //         // processor: "",
        //         // network: "",
        //         // selfieCamera: "",
        //         // connectivity: "",
        //         // features: "",
        //         // os: "",
        //     },
        //     article_urls: "",
        //     cons: [{
        //         list: "",
        //     }],
        //     pros: [{
        //         list: "",
        //     }],
        //     verdict: "",

        // },
        prices: mobileArticle?.prices ? mobileArticle.prices : [{ gbs: "", start_from: "" }],
    }
}