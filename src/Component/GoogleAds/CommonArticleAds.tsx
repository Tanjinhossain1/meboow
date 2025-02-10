'use client'
import { useEffect } from "react";

const CommonArticleAutoAds = () => {
useEffect(() => {
    const timeout = setTimeout(() => {
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    }, 10); // Delay to ensure the element has a size

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3862320695724690"
        crossOrigin="anonymous"
      ></script>
      <ins className="adsbygoogle"
     style={{ display: "block"}}
    //  style={{ display: "block",width: "100%", height: "100%", minHeight: "100px" }}
     data-ad-layout="in-article"
     data-ad-format="fluid"
     data-ad-client="ca-pub-3862320695724690"
     data-ad-slot="2210344919"></ins>
    </div>
  );
};

export default CommonArticleAutoAds;
