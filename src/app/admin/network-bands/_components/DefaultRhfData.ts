import { NetworkBandsCreateType, NetworkBandsType } from "@/types/network-bands";

export const RhfDefaultInitialValues = (networkDetail?: NetworkBandsType): NetworkBandsCreateType => {
    console.log('mobileArticle?.expert_view  ', networkDetail)
    return {
        country: networkDetail?.country ? networkDetail?.country : "",
        content: networkDetail?.content ? networkDetail?.content : "",
    }
}