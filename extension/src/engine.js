// PUBLIK extension engine.
// Generic, portal-agnostic helpers for filling a web form. Adapters declare
// WHAT to fill (selectors + values); the engine knows HOW to fill it so that
// React/Vue-controlled inputs register the change.
//
// Every fill returns a result so the content script can report which fields
// succeeded and which the portal changed out from under us.

(function () {
  const PUBLIK = (window.__PUBLIK__ = window.__PUBLIK__ || {});

  function setNativeValue(el, value) {
    // Bypass React's value tracker so onChange fires.
    const proto = Object.getPrototypeOf(el);
    const desc = Object.getOwnPropertyDescriptor(proto, "value");
    if (desc && desc.set) desc.set.call(el, value);
    else el.value = value;
  }

  function fillInput(selector, value) {
    if (value === null || value === undefined || value === "") {
      return { selector, status: "skipped" };
    }
    const el = document.querySelector(selector);
    if (!el) return { selector, status: "not_found" };
    setNativeValue(el, String(value));
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
    return { selector, status: "filled" };
  }

  function fillSelect(selector, value) {
    if (value === null || value === undefined || value === "") {
      return { selector, status: "skipped" };
    }
    const el = document.querySelector(selector);
    if (!el) return { selector, status: "not_found" };
    const wanted = String(value).toLowerCase();
    const option = Array.from(el.options).find(
      (o) =>
        o.value.toLowerCase() === wanted ||
        o.textContent.trim().toLowerCase() === wanted,
    );
    if (!option) return { selector, status: "no_option", value };
    el.value = option.value;
    el.dispatchEvent(new Event("change", { bubbles: true }));
    return { selector, status: "filled" };
  }

  function check(selector, shouldCheck) {
    const el = document.querySelector(selector);
    if (!el) return { selector, status: "not_found" };
    if (el.checked !== !!shouldCheck) el.click();
    return { selector, status: "filled" };
  }

  // Runs a list of { kind, selector, value } steps, collecting results.
  function fillForm(steps) {
    return steps.map((step) => {
      switch (step.kind) {
        case "input":
          return fillInput(step.selector, step.value);
        case "select":
          return fillSelect(step.selector, step.value);
        case "check":
          return check(step.selector, step.value);
        default:
          return { selector: step.selector, status: "unknown_kind" };
      }
    });
  }

  PUBLIK.engine = { fillInput, fillSelect, check, fillForm };
})();
