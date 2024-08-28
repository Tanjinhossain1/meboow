import { GlossaryCreateType, GlossaryType,  } from "@/types/network-bands";

export const RhfDefaultInitialValues = (networkDetail?: GlossaryType): GlossaryCreateType => {
    console.log('mobileArticle?.expert_view  ', networkDetail)
    return {
        display_name: networkDetail?.display_name ? networkDetail?.display_name : "",
        content: networkDetail?.content ? networkDetail?.content : "",
        route: networkDetail?.route ? networkDetail?.route : "",
    }
}