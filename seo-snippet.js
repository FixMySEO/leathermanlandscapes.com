// Single-file SEO snippet (CONFIG + META_DATA + LD_DATA + runtime)

(function () {
  "use strict";


  const CONFIG = {
    baseUrlFallback: "https://www.leathermanlandscapes.com",
    googleSiteVerification: ""
  };

  // === DATA (from your previous meta-tags.js) ===
  const META_DATA = {"meta_tags_list":[{"page_url":"https://www.leathermanlandscapes.com/","title_tag":"Washington DC landscaping photos | Leatherman Landscapes","meta_description":"Leatherman Landscapes showcases Washington DC landscaping and landscape photography across the Northeastern and Southeastern US, available as fine art prints."},{"page_url":"https://www.leathermanlandscapes.com/northeastern-us","title_tag":"Northeastern US landscapes | Leatherman Landscapes","meta_description":"Explore Northeastern US scenes with Maine landscaping and Pennsylvania landscaping photography by Leatherman Landscapes, available as premium photo prints."},{"page_url":"https://www.leathermanlandscapes.com/southeastern-us","title_tag":"Southeastern US landscapes | Leatherman Landscapes","meta_description":"Discover Southeastern US scenery, from South Carolina gardens to Virginia landscapes and Tennessee landscape design, with photography by Leatherman Landscapes."},{"page_url":"https://www.leathermanlandscapes.com/southwestern-us","title_tag":"Southwestern US landscapes | Leatherman Landscapes","meta_description":"Fine art photography of Southwestern US desert and canyon landscapes by Leatherman Landscapes, available as prints in a range of sizes and media."},{"page_url":"https://www.leathermanlandscapes.com/western-us","title_tag":"Western US landscape photography | Leatherman Landscapes","meta_description":"Western US landscape photography by Leatherman Landscapes, featuring dramatic mountains, coasts and deserts available as high quality art prints."},{"page_url":"https://www.leathermanlandscapes.com/midwestern-us","title_tag":"Midwestern US landscapes | Leatherman Landscapes","meta_description":"Midwestern US landscape photography by Leatherman Landscapes, capturing prairies and plains available as fine art prints on paper, metal or canvas."},{"page_url":"https://www.leathermanlandscapes.com/other-countries","title_tag":"International landscape photography | Leatherman Landscapes","meta_description":"International landscape photography by Leatherman Landscapes, featuring scenes from Australia, New Zealand, Croatia, Peru and more."},{"page_url":"https://www.leathermanlandscapes.com/about","title_tag":"Landscape photographer in Washington DC | Leatherman Landscapes","meta_description":"Learn about Washington DC landscape photographer Mark Leatherman of Leatherman Landscapes, capturing the silent poetry of land, sea and sky."},{"page_url":"https://www.leathermanlandscapes.com/purchases","title_tag":"Buy landscape photo prints | Leatherman Landscapes","meta_description":"Purchase fine art landscape photo prints from Leatherman Landscapes. Order high resolution prints on paper, aluminum, acrylic or canvas, framed or unframed."}],"keywords":["Leatherman Landscapes","landscaping services","Northeastern US","Southeastern US","Maine landscaping","Virginia landscapes","South Carolina gardens","Pennsylvania landscaping","Tennessee landscape design","Washington DC landscaping"]};

  // === DATA (from your previous LD.js) ===
  const LD_DATA = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.leathermanlandscapes.com/#localbusiness",
  "name": "Leatherman Landscapes",
  "image": [
    "https://static.wixstatic.com/media/e37c33_cbbf231d00df4bd0b37cf110d3b18e06~mv2_d_4940_3298_s_4_2.jpg/v1/fill/w_288,h_192,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/e37c33_cbbf231d00df4bd0b37cf110d3b18e06~mv2_d_4940_3298_s_4_2.jpg",
    "https://static.wixstatic.com/media/e37c33_f0e0165ae7cd4f57b39a8edc90f17ae5%7Emv2.jpg/v1/fit/w_2500,h_1330,al_c/e37c33_f0e0165ae7cd4f57b39a8edc90f17ae5%7Emv2.jpg"
  ],
  "url": "https://www.leathermanlandscapes.com/",
  "description": "Leatherman Landscapes showcases landscape photography by Mark Leatherman and offers high-quality prints in a variety of sizes and media from his gallery collections.",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "5525 Nevada Ave NW",
    "addressLocality": "Washington",
    "addressRegion": "DC",
    "postalCode": "20015",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 38.964,
    "longitude": -77.097
  },
  "telephone": "+1-240-271-3015",
  "email": "mailto:leatherm@yahoo.com",
  "founder": {
    "@type": "Person",
    "name": "Mark Leatherman"
  },
  "foundingDate": "2023",
  "sameAs": [],
  "makesOffer": [
    {
      "@type": "Offer",
      "url": "https://www.leathermanlandscapes.com/purchases",
      "description": "High-quality landscape photography prints available in a variety of sizes and media, including framed prints, aluminum, acrylic, and stretched canvas.",
      "itemOffered": {
        "@type": "Service",
        "name": "Landscape Photography Prints",
        "serviceType": "Fine art landscape photography prints",
        "areaServed": {
          "@type": "AdministrativeArea",
          "name": "United States"
        },
        "provider": {
          "@id": "https://www.leathermanlandscapes.com/#localbusiness"
        }
      }
    }
  ]
};

  /* ===== Helpers ===== */
  function clamp(str, max) {
    if (typeof str !== "string") str = String(str ?? "");
    return str.length <= max ? str : str.slice(0, Math.max(0, max - 1)) + "…";
  }

  function stripTrailingSlash(p) {
    if (!p) return "/";
    return p.length > 1 && p.endsWith("/") ? p.slice(0, -1) : p;
  }

  function normalizePathFromUrl(url) {
    try {
      const u = new URL(url);
      return stripTrailingSlash(u.pathname || "/");
    } catch {
      const m = String(url || "").match(/^https?:\/\/[^/]+(\/[^?#]*)?/i);
      return stripTrailingSlash((m && m[1]) || "/");
    }
  }

  function removeLangPrefix(pathname) {
    const m = String(pathname || "/").match(
      /^\/([a-z]{2}(?:-[A-Z]{2})?)(?=\/|$)(.*)$/
    );
    if (!m) return pathname || "/";
    const rest = stripTrailingSlash(m[2] || "/");
    return rest || "/";
  }

  function currentPagePath() {
    const path = window.location.pathname || "/";
    return stripTrailingSlash(path || "/");
  }

  function currentKeyCandidates() {
    const path = currentPagePath();
    const origin = (window.location.origin || "").replace(/\/$/, "");
    const full = origin + path;

    if (path === "/") {
      return [full, "/"];
    }

    const noLang = removeLangPrefix(path);
    return [full, path, stripTrailingSlash(path), noLang, stripTrailingSlash(noLang)];
  }

  function buildIndex(metaJson) {
    const list = (metaJson && metaJson.meta_tags_list) || [];
    const index = {};
    for (const item of list) {
      const path = normalizePathFromUrl(item.page_url);
      let origin = "";
      try {
        origin = new URL(item.page_url).origin;
      } catch {
        origin = "";
      }
      const full = origin ? origin.replace(/\/$/, "") + path : "";

      const entry = {
        title: item.title_tag || "",
        description: item.meta_description || "",
      };

      index[path] = entry;
      index[stripTrailingSlash(path)] = entry;
      if (full) index[full] = entry;
    }
    return index;
  }

  function _stripQuotes(s) {
    return String(s ?? "")
      .replace(/["'“”‘’„«»]/g, "")
      .replace(/\s+/g, " ")
      .replace(/^[\s\-–—·,;:]+|[\s\-–—·,;:]+$/g, "")
      .trim();
  }

  function normalizeKeywordsList(input, opts) {
    const { maxKeywords = 20 } = opts || {};
    if (input == null) return [];
    let items = Array.isArray(input)
      ? input.slice()
      : typeof input === "string"
      ? input.split(",")
      : [];
    const seen = new Set();
    return items
      .map(_stripQuotes)
      .filter((s) => s && s.length >= 2)
      .filter((s) => {
        const k = s.toLowerCase();
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
      })
      .slice(0, maxKeywords);
  }

  function normalizeKeywords(input, opts) {
    const { maxKeywords = 20, maxLength = 280 } = opts || {};
    const list = normalizeKeywordsList(input, { maxKeywords });
    const content = list.join(", ");
    return content.length > maxLength ? content.slice(0, maxLength) : content;
  }

  function applyAltFallbacks(keywordsPool) {
    if (!Array.isArray(keywordsPool) || keywordsPool.length === 0) return;
    try {
      const images = Array.from(document.querySelectorAll("img"));
      let i = 0;
      images.forEach((img) => {
        const curAlt = (img.getAttribute("alt") || "").trim().toLowerCase();
        const shouldReplace =
          !curAlt ||
          curAlt.endsWith(".jpg") ||
          curAlt.endsWith(".png") ||
          curAlt === "image" ||
          curAlt === "img";
        if (shouldReplace) {
          img.setAttribute("alt", keywordsPool[i % keywordsPool.length]);
          i++;
        }
      });
    } catch {
      /* ignore */
    }
  }

  function optimizeImages() {
    try {
      const images = Array.from(document.querySelectorAll("img"));
      if ("IntersectionObserver" in window) {
        const io = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target;
              io.unobserve(img);
              // hook for tracking / lazy work if needed
            }
          });
        });
        images.forEach((img, index) => {
          if (index > 0) io.observe(img);
        });
      }
    } catch (err) {
      console.error("Image optimization error:", err);
    }
  }

  function upsertMeta(nameOrProperty, content, useProperty) {
    const selector = useProperty
      ? `meta[property="${nameOrProperty}"]`
      : `meta[name="${nameOrProperty}"]`;
    let el = document.head.querySelector(selector);
    if (!el) {
      el = document.createElement("meta");
      if (useProperty) el.setAttribute("property", nameOrProperty);
      else el.setAttribute("name", nameOrProperty);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  }

  function upsertLink(rel, href) {
    let link = document.head.querySelector(`link[rel="${rel}"]`);
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", rel);
      document.head.appendChild(link);
    }
    link.setAttribute("href", href);
  }

  function injectJsonLd(ldObject) {
    if (!ldObject) return;
    try {
      const existing = Array.from(
        document.head.querySelectorAll('script[type="application/ld+json"]')
      );
      existing.forEach((el) => {
        el.parentNode.removeChild(el);
      });

      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(ldObject);
      document.head.appendChild(script);
    } catch (err) {
      console.error("Error injecting JSON-LD:", err);
    }
  }

  function applyJsonLd() {
    injectJsonLd(LD_DATA);
  }

  function applySeoFromJson() {
    try {
      const metaJson = META_DATA;
      const index = buildIndex(metaJson);

      const path = currentPagePath();
      const isHome = path === "/";

      const fallbackBase =
        (CONFIG && CONFIG.baseUrlFallback) ? CONFIG.baseUrlFallback : "";
      const baseUrl = (window.location.origin || fallbackBase).replace(/\/$/, "");
      const canonicalUrl = baseUrl + path;

      const keys = currentKeyCandidates();
      let entry = null;
      for (const k of keys) {
        if (index[k]) {
          entry = index[k];
          break;
        }
      }

      if (!entry) {
        return normalizeKeywordsList(metaJson.keywords, { maxKeywords: 25 });
      }

      const title = clamp(entry.title, 60);
      const desc = clamp(entry.description, 185);

      document.title = title;

      const metaList = [
        { type: "name", key: "description", content: desc },
        { type: "property", key: "og:url", content: canonicalUrl },
        { type: "name", key: "resource-hints", content: "preload" },
        { type: "name", key: "format-detection", content: "telephone=yes" },
        { type: "name", key: "mobile-web-app-capable", content: "yes" },
        { type: "name", key: "apple-mobile-web-app-capable", content: "yes" },
      ];

      // opcjonalnie dodaj google-site-verification, jeśli jest w CONFIG
      if (CONFIG && CONFIG.googleSiteVerification) {
        metaList.push({
          type: "name",
          key: "google-site-verification",
          content: CONFIG.googleSiteVerification
        });
      }

      if (isHome && metaJson && metaJson.keywords) {
        const kwContent = normalizeKeywords(metaJson.keywords, {
          maxKeywords: 25,
          maxLength: 512,
        });
        if (kwContent) {
          metaList.push({ type: "name", key: "keywords", content: kwContent });
        }
      }

      metaList.forEach((m) => {
        upsertMeta(m.key, m.content, m.type === "property");
      });

      upsertLink("canonical", canonicalUrl);

      return normalizeKeywordsList(metaJson.keywords, { maxKeywords: 25 });
    } catch (err) {
      console.error("Error meta settings:", err);
      return [];
    }
  }

  function initSnippetSEO() {
    const keywordsPool = applySeoFromJson();
    const path = currentPagePath();
    if (path === "/") {
      applyJsonLd();
    }
    optimizeImages();
    applyAltFallbacks(keywordsPool);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSnippetSEO);
  } else {
    initSnippetSEO();
  }
})();
