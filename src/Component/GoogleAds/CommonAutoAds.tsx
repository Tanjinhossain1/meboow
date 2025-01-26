'use client'
import { useEffect } from "react";

const CommonAutoAds = ({adSlot,adFormat}:{adSlot:string,adFormat?:string}) => {
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
      <ins
        className="adsbygoogle"
        style={{ display: "block",width: "100%", height: "100%", minHeight: "100px" }}
        data-ad-client="ca-pub-3862320695724690"
        data-ad-slot={adSlot}
        data-ad-format={adFormat ? adFormat : "auto"}
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default CommonAutoAds;
