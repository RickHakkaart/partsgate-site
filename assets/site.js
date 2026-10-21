// Progressive enhancement only: every page works without this file (all client panels are visible, the .md twin is a link).
(function () {
  document.documentElement.classList.add("js")
  function flash(btn, text) { var old = btn.textContent; btn.textContent = text; setTimeout(function () { btn.textContent = old }, 1600) }
  function copy(text, btn, done) {
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(function () { flash(btn, done) }, function () { flash(btn, "Copy failed, select the text") })
    else flash(btn, "Copy failed, select the text")
  }
  // Theme toggle: dark is the default, prefers-color-scheme: light follows the OS, this overrides both and is remembered (storage may be blocked: then it lasts for the page).
  var root = document.documentElement
  function current() { var t = root.getAttribute("data-theme"); if (t) return t; return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark" }
  function paint(btn) { var next = current() === "dark" ? "light" : "dark"; btn.textContent = next === "light" ? "Light theme" : "Dark theme"; btn.setAttribute("aria-label", "Switch to the " + next + " theme") }
  document.querySelectorAll("[data-theme-toggle]").forEach(function (b) {
    paint(b)
    b.addEventListener("click", function () {
      var next = current() === "dark" ? "light" : "dark"
      root.setAttribute("data-theme", next)
      try { localStorage.setItem("pg-theme", next) } catch (e) {}
      paint(b)
    })
  })
  document.querySelectorAll("[data-copy-target]").forEach(function (b) {
    b.addEventListener("click", function () { copy(document.getElementById(b.getAttribute("data-copy-target")).textContent.trim(), b, "Copied") })
  })
  document.querySelectorAll("[data-copy-page]").forEach(function (b) {
    b.addEventListener("click", function () {
      fetch(b.getAttribute("data-copy-page")).then(function (r) { return r.text() }).then(function (t) { copy(t, b, "Copied as Markdown") }, function () { flash(b, "Could not fetch the Markdown") })
    })
  })
  document.querySelectorAll("[data-picker]").forEach(function (root) {
    var tabs = root.querySelectorAll("[role=tab]"), panels = root.querySelectorAll("[role=tabpanel]")
    function select(i) { tabs.forEach(function (t, j) { t.setAttribute("aria-selected", j === i ? "true" : "false"); t.tabIndex = j === i ? 0 : -1 }); panels.forEach(function (p, j) { p.hidden = j !== i }) }
    tabs.forEach(function (t, i) {
      t.addEventListener("click", function () { select(i) })
      t.addEventListener("keydown", function (e) { if (e.key === "ArrowRight" || e.key === "ArrowLeft") { var n = (i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length; select(n); tabs[n].focus() } })
    })
    select(0)
  })
})()
