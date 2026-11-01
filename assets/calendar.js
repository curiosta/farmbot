/* FarmBot calendar: works out "on now" / past from the visitor's own date; filters; copy links. No libraries. */
(function () {
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  var d = new Date(), today = d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
  var MON = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"], DAY = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  function nextSat() { var x = new Date(d.getFullYear(), d.getMonth(), d.getDate()); x.setDate(x.getDate() + ((6 - x.getDay() + 7) % 7));
    return { iso: x.getFullYear() + "-" + pad(x.getMonth() + 1) + "-" + pad(x.getDate()), txt: DAY[x.getDay()] + " " + x.getDate() + " " + MON[x.getMonth()] + " " + x.getFullYear() }; }
  var sat = nextSat();
  function state(el) {
    if (el.getAttribute("data-every") === "sat") { el.setAttribute("data-start", sat.iso); el.setAttribute("data-end", sat.iso);
      var dd = el.querySelector(".d"); if (dd) dd.textContent = (el.tagName === "LI" ? "Every Saturday · next: " : "Every Saturday · next: ") + sat.txt; }
    var s = el.getAttribute("data-start"), e = el.getAttribute("data-end") || s;
    return e < today ? "ended" : (s <= today ? "now" : "up");
  }
  function mark(el, st) { el.setAttribute("data-state", st); var n = el.querySelector(".onnow"); if (n) n.hidden = st !== "now"; }
  // cards: past ones move to "Earlier this season"
  var earlier = document.getElementById("earlier"), ebox = earlier && earlier.querySelector(".evs");
  Array.prototype.forEach.call(document.querySelectorAll(".monthlist .ev[data-start]"), function (el) {
    var st = state(el); mark(el, st); if (st === "ended" && ebox) { ebox.appendChild(el); earlier.hidden = false; }
  });
  Array.prototype.forEach.call(document.querySelectorAll(".monthlist .month"), function (m) { if (!m.querySelector(".ev")) m.hidden = true; });
  // coming up: next five that have not ended
  var shown = 0;
  Array.prototype.forEach.call(document.querySelectorAll(".soon li"), function (li) {
    var st = state(li); mark(li, st); li.hidden = st === "ended" || shown >= 5; if (!li.hidden) shown++;
  });
  // season strip: today marker
  var s = document.querySelector(".season");
  if (s) { var a = Date.parse(s.getAttribute("data-from")), b = Date.parse(s.getAttribute("data-to")), t = Date.parse(today);
    var mk = s.querySelector(".snow"); if (mk && t >= a && t <= b) { mk.style.left = (100 * (t - a) / (b - a + 864e5)).toFixed(2) + "%"; mk.hidden = false; } }
  // filter chips
  var chips = document.querySelector(".chips");
  if (chips) { chips.hidden = false;
    chips.addEventListener("click", function (ev) { var b = ev.target.closest(".chip"); if (!b) return;
      b.setAttribute("aria-pressed", b.getAttribute("aria-pressed") === "true" ? "false" : "true");
      var on = {}; Array.prototype.forEach.call(chips.querySelectorAll(".chip"), function (c) { on[c.getAttribute("data-cat")] = c.getAttribute("aria-pressed") === "true"; });
      Array.prototype.forEach.call(document.querySelectorAll("#months .ev"), function (el) { el.classList.toggle("off", !on[el.getAttribute("data-cat")]); });
      Array.prototype.forEach.call(document.querySelectorAll(".monthlist .month"), function (m) {
        m.classList.toggle("off", !m.querySelector(".ev:not(.off)")); });
    }); }
  // copy feed links
  var status = document.getElementById("copy-status");
  Array.prototype.forEach.call(document.querySelectorAll("button.copy"), function (b) {
    b.addEventListener("click", function () { var u = b.getAttribute("data-url");
      function ok() { if (status) status.textContent = "Link copied. Paste it into your calendar app under 'Add calendar from URL'."; }
      function no() { if (status) status.textContent = "Could not copy. The link is: " + u; }
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(u).then(ok, no); else no(); });
  });
})();
