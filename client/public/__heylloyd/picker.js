(function(){
  if (window.__heylloydPickerInstalled) return;
  window.__heylloydPickerInstalled = true;

  var active = false;
  var currentTarget = null;
  var overlay = null;
  var label = null;

  // Phase F5.C — persistent "selected" overlay. Independent lifecycle
  // from the hover overlay above: lives across pick-mode toggles and
  // is only cleared by an explicit message from the parent (× on the
  // pill, or message-send) OR by the selected element being removed
  // from the DOM (HMR / dynamic re-render). Re-entering pick mode and
  // hovering does not disturb the lock — the two overlays are fully
  // independent.
  var selectedTarget = null;
  var selectedOverlay = null;
  var selectedLabel = null;
  var selectedTickHandle = null;

  function ensureOverlay() {
    if (overlay) return;
    overlay = document.createElement('div');
    overlay.setAttribute('data-heylloyd-pick-ignore', '');
    overlay.style.cssText = [
      'position:fixed',
      'pointer-events:none',
      'border:2px solid #3b82f6',
      'background:rgba(59,130,246,0.10)',
      'z-index:2147483646',
      'display:none',
      'box-sizing:border-box',
      'transition:all 60ms ease-out'
    ].join(';');
    label = document.createElement('div');
    label.setAttribute('data-heylloyd-pick-ignore', '');
    label.style.cssText = [
      'position:fixed',
      'pointer-events:none',
      'background:#3b82f6',
      'color:#ffffff',
      'font:600 11px/1 ui-sans-serif,system-ui,-apple-system,sans-serif',
      'padding:3px 6px',
      'border-radius:3px',
      'z-index:2147483647',
      'display:none',
      'white-space:nowrap'
    ].join(';');
    var attach = function(){
      if (!document.body) return false;
      document.body.appendChild(overlay);
      document.body.appendChild(label);
      return true;
    };
    if (!attach()) {
      document.addEventListener('DOMContentLoaded', attach, { once: true });
    }
  }

  function shouldIgnore(el) {
    var n = el;
    while (n) {
      if (n.nodeType === 1 && n.hasAttribute && n.hasAttribute('data-heylloyd-pick-ignore')) {
        return true;
      }
      n = n.parentElement;
    }
    return false;
  }

  function showOutline(el) {
    if (!overlay || !label) return;
    if (!el) {
      overlay.style.display = 'none';
      label.style.display = 'none';
      return;
    }
    var r = el.getBoundingClientRect();
    overlay.style.display = 'block';
    overlay.style.left = r.left + 'px';
    overlay.style.top = r.top + 'px';
    overlay.style.width = r.width + 'px';
    overlay.style.height = r.height + 'px';
    label.style.display = 'block';
    label.textContent = el.tagName ? el.tagName.toLowerCase() : '';
    label.style.left = r.left + 'px';
    label.style.top = Math.max(0, r.top - 18) + 'px';
  }

  function findLoc(el) {
    // Phase F5.A — walk up at most 5 ancestors looking for the
    // server-injected source location attribute. Bounded so a deep
    // unannotated tree cannot pay an unbounded traversal cost. Tolerates
    // any malformed value silently.
    var n = el;
    for (var i = 0; i < 5 && n; i++) {
      if (n.nodeType === 1 && n.getAttribute) {
        var v = n.getAttribute('data-heylloyd-loc');
        if (v) {
          // Format: "<file path possibly with colons>:<line>:<col>"
          var m = /^(.+):(\d+):(\d+)$/.exec(v);
          if (m) {
            var ln = parseInt(m[2], 10);
            var co = parseInt(m[3], 10);
            if (ln >= 1 && co >= 1) {
              return { file: m[1], line: ln, col: co };
            }
          }
        }
      }
      n = n.parentElement;
    }
    return null;
  }

  function describe(el) {
    var classes = [];
    if (el.classList && el.classList.length) {
      for (var i = 0; i < el.classList.length; i++) classes.push(el.classList[i]);
    }
    var text = (el.textContent || '').replace(/\s+/g, ' ').trim();
    if (text.length > 200) text = text.slice(0, 200) + '…';
    var html = '';
    try { html = el.outerHTML || ''; } catch (_) {}
    if (html.length > 1000) html = html.slice(0, 1000) + '…';
    var info = {
      tag: el.tagName ? el.tagName.toLowerCase() : '',
      id: el.id || null,
      classes: classes,
      text: text,
      outerHTML: html
    };
    var loc = findLoc(el);
    if (loc) info.loc = loc;
    return info;
  }

  // Phase F5.C — selected-overlay plumbing. Mirrors ensureOverlay/
  // showOutline but lives in its own pair of DOM nodes so it can sit
  // on top of (or independent from) the hover overlay without state
  // entanglement. z-index is one below the hover overlay so a fresh
  // hover on a different element clearly reads as "newer."
  function ensureSelectedOverlay() {
    if (selectedOverlay) return;
    selectedOverlay = document.createElement('div');
    selectedOverlay.setAttribute('data-heylloyd-pick-ignore', '');
    selectedOverlay.style.cssText = [
      'position:fixed',
      'pointer-events:none',
      'border:2px solid #3b82f6',
      'background:rgba(59,130,246,0.10)',
      'z-index:2147483645',
      'display:none',
      'box-sizing:border-box',
      'transition:all 60ms ease-out'
    ].join(';');
    selectedLabel = document.createElement('div');
    selectedLabel.setAttribute('data-heylloyd-pick-ignore', '');
    selectedLabel.style.cssText = [
      'position:fixed',
      'pointer-events:none',
      'background:#3b82f6',
      'color:#ffffff',
      'font:600 11px/1 ui-sans-serif,system-ui,-apple-system,sans-serif',
      'padding:3px 6px',
      'border-radius:3px',
      'z-index:2147483645',
      'display:none',
      'white-space:nowrap'
    ].join(';');
    var attach = function(){
      if (!document.body) return false;
      document.body.appendChild(selectedOverlay);
      document.body.appendChild(selectedLabel);
      return true;
    };
    if (!attach()) {
      document.addEventListener('DOMContentLoaded', attach, { once: true });
    }
  }

  function showSelected(el) {
    if (!selectedOverlay || !selectedLabel) return;
    if (!el) {
      selectedOverlay.style.display = 'none';
      selectedLabel.style.display = 'none';
      return;
    }
    var r = el.getBoundingClientRect();
    selectedOverlay.style.display = 'block';
    selectedOverlay.style.left = r.left + 'px';
    selectedOverlay.style.top = r.top + 'px';
    selectedOverlay.style.width = r.width + 'px';
    selectedOverlay.style.height = r.height + 'px';
    selectedLabel.style.display = 'block';
    selectedLabel.textContent = el.tagName ? el.tagName.toLowerCase() : '';
    selectedLabel.style.left = r.left + 'px';
    selectedLabel.style.top = Math.max(0, r.top - 18) + 'px';
  }

  function onSelectedScrollOrResize() {
    if (selectedTarget) showSelected(selectedTarget);
  }

  function selectedTick() {
    if (!selectedTarget) return;
    if (selectedTarget.isConnected === false) {
      // Element removed from DOM (HMR / dynamic re-render): clear
      // silently. Parent still has the chat-input pill — only the
      // visual highlight is lost, which the user can re-pick if they
      // want.
      clearSelection();
      return;
    }
    showSelected(selectedTarget);
  }

  function setSelection(el) {
    if (!el) return;
    ensureSelectedOverlay();
    var firstSelection = selectedTarget === null;
    selectedTarget = el;
    showSelected(el);
    if (firstSelection) {
      window.addEventListener('scroll', onSelectedScrollOrResize, true);
      window.addEventListener('resize', onSelectedScrollOrResize, true);
      // 250ms is plenty for layout-shift safety + isConnected polling;
      // scroll/resize already cover the common reposition cases.
      selectedTickHandle = setInterval(selectedTick, 250);
    }
  }

  function clearSelection() {
    if (selectedTarget === null) return;
    selectedTarget = null;
    if (selectedOverlay) selectedOverlay.style.display = 'none';
    if (selectedLabel) selectedLabel.style.display = 'none';
    window.removeEventListener('scroll', onSelectedScrollOrResize, true);
    window.removeEventListener('resize', onSelectedScrollOrResize, true);
    if (selectedTickHandle !== null) {
      clearInterval(selectedTickHandle);
      selectedTickHandle = null;
    }
  }

  function onMouseMove(e) {
    if (!active) return;
    var el = e.target;
    if (!el || shouldIgnore(el)) {
      currentTarget = null;
      showOutline(null);
      return;
    }
    if (el !== currentTarget) {
      currentTarget = el;
      showOutline(el);
    }
  }

  function onScrollOrResize() {
    if (active && currentTarget) showOutline(currentTarget);
  }

  // Phase F5.C followup — when the cursor leaves the iframe entirely,
  // mousemove stops firing inside this document and the hover overlay
  // would otherwise stay frozen on whatever was last under the cursor.
  // Listen on documentElement (which only fires when the cursor exits
  // the <html> element, not when crossing between child elements) and
  // clear the hover overlay only. The persistent selection overlay is
  // intentionally left alone — that's the whole point of F5.C. The
  // hover overlay reappears naturally on the next mousemove when the
  // cursor returns to the iframe.
  function onDocumentMouseLeave() {
    if (!active) return;
    currentTarget = null;
    showOutline(null);
  }

  function onClick(e) {
    if (!active) return;
    var el = e.target;
    if (!el || shouldIgnore(el)) return;
    e.preventDefault();
    e.stopPropagation();
    var info = describe(el);
    try {
      window.parent.postMessage({ type: 'heylloyd:pick:result', element: info }, '*');
    } catch (_) {}
    // Phase F5.C — keep pick mode active so the user can immediately
    // hover and click another element to swap selection. Lock the
    // persistent overlay onto the just-clicked element. The hover
    // overlay continues to follow the mouse independently. Pick mode
    // exits only via Escape, the picker-icon toggle, or the parent
    // sending heylloyd:pick:cancel (which fires on message-send).
    setSelection(el);
    // Hide the hover overlay until the user moves the mouse again, so
    // the click moment shows the selection visual cleanly without a
    // stacked-outline flash on the just-clicked element.
    currentTarget = null;
    showOutline(null);
  }

  function onKeyDown(e) {
    if (!active) return;
    if (e.key === 'Escape' || e.keyCode === 27) {
      e.preventDefault();
      try { window.parent.postMessage({ type: 'heylloyd:pick:cancelled' }, '*'); } catch (_) {}
      stop();
    }
  }

  function start() {
    if (active) return;
    ensureOverlay();
    active = true;
    try { document.documentElement.style.cursor = 'crosshair'; } catch (_) {}
    document.addEventListener('mousemove', onMouseMove, true);
    document.addEventListener('click', onClick, true);
    document.addEventListener('keydown', onKeyDown, true);
    window.addEventListener('scroll', onScrollOrResize, true);
    window.addEventListener('resize', onScrollOrResize, true);
    document.documentElement.addEventListener('mouseleave', onDocumentMouseLeave);
  }

  function stop() {
    active = false;
    currentTarget = null;
    try { document.documentElement.style.cursor = ''; } catch (_) {}
    if (overlay) overlay.style.display = 'none';
    if (label) label.style.display = 'none';
    document.removeEventListener('mousemove', onMouseMove, true);
    document.removeEventListener('click', onClick, true);
    document.removeEventListener('keydown', onKeyDown, true);
    window.removeEventListener('scroll', onScrollOrResize, true);
    window.removeEventListener('resize', onScrollOrResize, true);
    document.documentElement.removeEventListener('mouseleave', onDocumentMouseLeave);
  }

  window.addEventListener('message', function(e) {
    var data = e && e.data;
    if (!data || typeof data !== 'object') return;
    if (data.type === 'heylloyd:pick:start') start();
    else if (data.type === 'heylloyd:pick:cancel') stop();
    // Phase F5.C — explicit clear of the persistent selection overlay,
    // sent by the parent when the chat-input pill goes empty (× or
    // message-send). No-op when nothing is selected.
    else if (data.type === 'heylloyd:pick:clear-selection') clearSelection();
  });

  try { window.parent.postMessage({ type: 'heylloyd:picker:ready' }, '*'); } catch (_) {}

  // Tier S #3 — browser-console relay. Patches console.{log,info,warn,error,debug}
  // and installs window.onerror / unhandledrejection handlers, forwarding each
  // event as a postMessage to window.parent (the chat UI, on a different origin).
  // The parent batches and POSTs to /api/builder/projects/:id/browser-console/log
  // so Lloyd can read recent client-side errors via read_browser_console. Pure
  // observability — does not modify any console output the user sees, does not
  // suppress any error, and is double-install safe via the pre-existing
  // __heylloydPickerInstalled guard.
  try {
    var levels = ['log', 'info', 'warn', 'error', 'debug'];
    function fmtArg(a) {
      if (a === null) return 'null';
      if (a === undefined) return 'undefined';
      if (typeof a === 'string') return a;
      if (typeof a === 'number' || typeof a === 'boolean') return String(a);
      if (a instanceof Error) return (a.stack || a.message || String(a));
      try { return JSON.stringify(a); } catch (_) { return String(a); }
    }
    function relay(level, text, source) {
      try {
        window.parent.postMessage({
          type: 'heylloyd:console',
          entry: {
            level: level,
            text: String(text).slice(0, 4000),
            url: (location && location.href) ? location.href : null,
            source: source || null,
          },
        }, '*');
      } catch (_) {}
    }
    levels.forEach(function(level) {
      var orig = console[level];
      if (typeof orig !== 'function') return;
      console[level] = function() {
        try {
          var parts = [];
          for (var i = 0; i < arguments.length; i++) parts.push(fmtArg(arguments[i]));
          relay(level, parts.join(' '), null);
        } catch (_) {}
        try { return orig.apply(console, arguments); } catch (_) {}
      };
    });
    window.addEventListener('error', function(ev) {
      var src = (ev.filename ? (ev.filename + ':' + (ev.lineno || 0) + ':' + (ev.colno || 0)) : null);
      var msg = (ev.error && ev.error.stack) ? ev.error.stack : (ev.message || 'Unknown error');
      relay('exception', msg, src);
    });
    window.addEventListener('unhandledrejection', function(ev) {
      var r = ev.reason;
      var msg = (r && r.stack) ? r.stack : (r && r.message) ? r.message : fmtArg(r);
      relay('rejection', 'Unhandled promise rejection: ' + msg, null);
    });
  } catch (_) {}

  // ──────────────────────────────────────────────────────────────────────
  // Cross-origin navigation reporter — restores the URL-bar reflection
  // that broke when Phase F-direct made the iframe cross-origin. Parent
  // can no longer read contentWindow.location, so we postMessage the
  // current path on every navigation: initial load, popstate (back/fwd
  // inside the iframe), and history.pushState/replaceState (SPA routers).
  // Always allowed cross-origin. Idempotent — guarded by an install flag.
  // ──────────────────────────────────────────────────────────────────────
  try {
    if (!window.__heylloydNavEmitterInstalled) {
      window.__heylloydNavEmitterInstalled = true;
      var sendNav = function() {
        try {
          window.parent.postMessage({
            type: 'heylloyd:nav',
            path: (location.pathname || '') + (location.search || '') + (location.hash || ''),
          }, '*');
        } catch (_) {}
      };
      // Initial load.
      sendNav();
      // Browser-driven back/forward inside the iframe's app.
      window.addEventListener('popstate', sendNav);
      // SPA routers (React Router, Next, Vue Router, etc).
      try {
        var origPush = history.pushState;
        var origReplace = history.replaceState;
        history.pushState = function() {
          var r = origPush.apply(this, arguments);
          sendNav();
          return r;
        };
        history.replaceState = function() {
          var r = origReplace.apply(this, arguments);
          sendNav();
          return r;
        };
      } catch (_) {}
    }
  } catch (_) {}
})();
