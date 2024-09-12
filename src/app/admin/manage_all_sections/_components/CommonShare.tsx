import { MobileArticleType } from "@/types/mobiles";
import { RecentArticleDataType } from "@/types/RecentArticle";

export const commonShareFunc = async (
  url: string,
  articles: MobileArticleType | RecentArticleDataType,
  platform: "Facebook" | "Twitter" | "Whatsapp" | "Linkedin" | "Pinterest" | "Tumblr"
) => {
  let shareUrl = "";
  switch (platform) {
    case "Facebook":
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`;
      break;
    case "Whatsapp":
      shareUrl = `https://wa.me/?text=${encodeURIComponent(url)}`;
      break;
    case "Linkedin":
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`;
      break;
    case "Pinterest":
      shareUrl = `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(
        url
      )}&name=kasjdfkjd;lfkjsdkl;fj;d`;
      break;
    case "Twitter":
      shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(articles?.title)}
      `;
      break;
    case "Tumblr":
      shareUrl = `https://www.tumblr.com/share/link?url=${encodeURIComponent(
        url
      )}&name=${encodeURIComponent(articles?.title)}${
        (articles as RecentArticleDataType)?.description
          ? `&description=${encodeURIComponent(
              (articles as RecentArticleDataType)?.description
            )}`
          : ""
      }`;
      break;

    // Add cases for other platforms (e.g., Twitter, LinkedIn) here
    default:
      break;
  }
  if (shareUrl) {
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  }
};
