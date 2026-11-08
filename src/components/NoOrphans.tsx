"use client";

import { useEffect } from "react";

const NBSP = String.fromCharCode(160);
const SELECTOR = "h1, h2, h3, .font-display, blockquote";

// Join the last two words of a headline with a non-breaking space, so a single
// word can never sit alone on the last line. Lines that already break well
// keep exactly the breaks they had.
function unorphan(root: ParentNode) {
  root.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => {
    if (el.dataset.unorphaned) return;
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    let last: Text | null = null;
    while (walker.nextNode()) {
      const node = walker.currentNode as Text;
      if (node.textContent?.trim()) last = node;
    }
    const text = last?.textContent;
    if (!last || !text) return;
    const trimmed = text.trimEnd();
    const i = trimmed.lastIndexOf(" ");
    // Only when there are at least three words in the element.
    if (i > 0 && el.textContent!.trim().split(/\s+/).length > 2) {
      last.textContent =
        trimmed.slice(0, i) +
        NBSP +
        trimmed.slice(i + 1) +
        text.slice(trimmed.length);
    }
    el.dataset.unorphaned = "";
  });
}

export function NoOrphans() {
  useEffect(() => {
    unorphan(document);
    // Catch content added later, such as after a client-side navigation.
    const mo = new MutationObserver((records) => {
      for (const r of records)
        r.addedNodes.forEach((n) => {
          if (n instanceof HTMLElement) {
            if (!n.matches(SELECTOR)) unorphan(n);
            else if (n.parentElement) unorphan(n.parentElement);
          }
        });
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => mo.disconnect();
  }, []);
  return null;
}
