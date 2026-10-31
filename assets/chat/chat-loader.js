/*
 * FarmBot chat loader: adds the "Ask FarmBot" OpenRouter chat widget to the page.
 * Included once per page: <script src="/assets/chat/chat-loader.js" defer></script>
 * Runs only in the visitor's browser: no backend, no keys here. The visitor connects their OWN OpenRouter account (PKCE);
 * the key stays in their tab. Default model: free models only. Hugging Face / Chrome providers OFF.
 */
(function () {
  "use strict";
  if (window.__siteChat) return;           // never load twice
  window.__siteChat = true;

  var me = document.currentScript;
  var base = "/assets/chat/";
  try { var u = new URL(me.src, location.href); base = u.href.slice(0, u.href.lastIndexOf("/") + 1); } catch (e) {}
  var indexUrl = "/site-index.json";
  try { indexUrl = new URL("../../site-index.json", base).pathname; } catch (e) {}
  var path = location.pathname.replace(/index\.html$/, "");

  var suggestions;
  if (/\/plots\/[^/]+\/$/.test(path)) {
    suggestions = ["What does the latest satellite reading say about this plot?", "What do NDVI and the weak zones mean here?", "When is this crop likely ready to harvest?", "How reliable is this estimate?"];
  } else if (/\/pest-alerts\/$/.test(path)) {
    suggestions = ["Which pests should we watch for right now?", "What rule is each alert based on?", "Are these alerts validated for Koraput?", "What should we check in the field?"];
  } else if (/\/weather-water\/$/.test(path)) {
    suggestions = ["What does the rain outlook mean for the crop?", "Which weather numbers are modelled, not measured?", "How much water does paddy need this month?"];
  } else {
    suggestions = ["What does this site track, in plain words?", "How do you read a plot from satellite images?", "Where does the data come from?", "Can this help plan the rabi crop?"];
  }

  var persona = [
    "You are FarmBot's helper on farmbot.curiosta.com, a site that follows two paddy plots in Nilabadi (Bandhugaon, Koraput, Odisha) with free satellite and weather data.",
    "Explain the site's numbers in plain words for farmers and family members: crop growth from satellite images, weak zones, harvest timing, weather and water. Ground every answer in this site's pages and cite the pages you used as Markdown links. If the site does not cover something, say so briefly and label any general farming knowledge as general.",
    "Be honest about limits: satellite readings and modelled weather (NASA POWER, Open-Meteo) and soil data (SoilGrids) are estimates, experimental results are experimental, and pest rules from elsewhere are not validated for Koraput. Never invent yields, prices, dates or readings.",
    "For pesticides, fertiliser doses, loans or subsidies, give general guidance only and tell the visitor to confirm with the local Krishi Vigyan Kendra or agriculture officer. Never share or guess owner names, survey or khasra numbers or exact locations beyond what the page shows.",
    "Reply in the visitor's language: English by default, Odia if they write in Odia. Keep answers short and practical. Politely decline unrelated requests."
  ].join(" ");

  function load() {
    var sc = document.createElement("script");
    sc.src = base + "widget.js";
    sc.async = true;
    sc.setAttribute("data-site-name", "FarmBot");
    sc.setAttribute("data-default-model", "openrouter/free");
    sc.setAttribute("data-context-selector", "main, body");
    sc.setAttribute("data-exclude", "nav, .nav, .lang, footer, .no-index");
    sc.setAttribute("data-index", indexUrl);
    sc.setAttribute("data-page-cap", "8000");
    sc.setAttribute("data-fab-label", "💬 Ask FarmBot");
    sc.setAttribute("data-persona", persona);
    sc.setAttribute("data-suggestions", JSON.stringify(suggestions));
    sc.setAttribute("data-greeting", "Hi! Ask me what the satellite and weather numbers on this site mean for the two paddy plots. I'll link the pages I use. You can write in English or Odia.");
    document.body.appendChild(sc);
  }

  // An OpenRouter sign-in return (?code=…&state=…) must be handled straight away; otherwise wait for idle
  // so the chat never competes with the page itself.
  if (/[?&](code|error|state|btw_debug)=/.test(location.search)) load();
  else if ("requestIdleCallback" in window) window.requestIdleCallback(load, { timeout: 2500 });
  else setTimeout(load, 800);
})();
