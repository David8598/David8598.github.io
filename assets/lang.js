// Shows the page in the language from the URL hash (#ru, #en, #es, #de) or the browser language.
// Without JavaScript every language stays visible, so crawlers and store reviewers always see the text.
(function () {
  var langs = ["ru", "en", "es", "de"];
  var labels = {
    privacy: { ru: "Политика конфиденциальности", en: "Privacy policy", es: "Política de privacidad", de: "Datenschutzerklärung" },
    terms: { ru: "Условия использования", en: "Terms of use", es: "Términos de uso", de: "Nutzungsbedingungen" }
  };
  function pick() {
    var h = location.hash.replace("#", "");
    if (langs.indexOf(h) >= 0) return h;
    var n = (navigator.language || "en").slice(0, 2).toLowerCase();
    return langs.indexOf(n) >= 0 ? n : "en";
  }
  function show(l) {
    document.querySelectorAll("[data-lang]").forEach(function (e) {
      e.hidden = e.getAttribute("data-lang") !== l;
    });
    document.querySelectorAll(".langs a").forEach(function (a) {
      a.classList.toggle("on", a.getAttribute("href") === "#" + l);
    });
    document.querySelectorAll("[data-l]").forEach(function (a) {
      var k = a.getAttribute("data-l");
      a.textContent = labels[k][l];
      a.setAttribute("href", k + ".html#" + l);
    });
    document.documentElement.lang = l;
  }
  window.addEventListener("hashchange", function () { show(pick()); });
  show(pick());
})();
