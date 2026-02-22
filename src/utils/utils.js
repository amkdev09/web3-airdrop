/**
 * Copy text to clipboard. Works on desktop and mobile (iOS/Android).
 * Prefers Clipboard API; falls back to execCommand with a temporary input for older/mobile browsers.
 * setCopied(true) is called on success; optional alert shown if all methods fail.
 * @returns {Promise<boolean>} true if copy succeeded
 */
export const copyToClipboard = async (text, setCopied) => {
  if (!text) return false;
  const textToCopy = String(text);

  const applyCopiedState = () => {
    if (typeof setCopied === "function") {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // 1) Prefer Clipboard API (works in secure context including mobile when triggered by user gesture)
  if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
    try {
      await navigator.clipboard.writeText(textToCopy);
      applyCopiedState();
      return true;
    } catch (err) {
      console.warn("Clipboard API failed:", err);
    }
  }

  // 2) Fallback: temporary input (more reliable on mobile than textarea in some cases)
  try {
    const input = document.createElement("input");
    input.value = textToCopy;
    input.setAttribute("readonly", "");
    input.style.position = "fixed";
    input.style.left = "-9999px";
    input.style.top = "0";
    input.style.width = "2em";
    input.style.height = "2em";
    input.style.padding = "0";
    input.style.border = "none";
    input.style.outline = "none";
    input.style.boxShadow = "none";
    input.style.background = "transparent";
    input.style.fontSize = "16px";
    input.style.opacity = "0";
    input.style.pointerEvents = "none";
    document.body.appendChild(input);
    input.focus();
    input.select();
    input.setSelectionRange(0, textToCopy.length);
    const ok = document.execCommand("copy");
    document.body.removeChild(input);
    if (ok) {
      applyCopiedState();
      return true;
    }
  } catch (e) {
    console.warn("Input fallback copy failed:", e);
  }

  // 3) Textarea fallback (some Android/iOS variants work better with textarea)
  try {
    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    textArea.setAttribute("readonly", "");
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.top = "0";
    textArea.style.fontSize = "16px";
    textArea.style.opacity = "0";
    textArea.style.width = "2em";
    textArea.style.height = "2em";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    textArea.setSelectionRange(0, textToCopy.length);
    const ok = document.execCommand("copy");
    document.body.removeChild(textArea);
    if (ok) {
      applyCopiedState();
      return true;
    }
  } catch (e) {
    console.warn("Textarea fallback copy failed:", e);
  }

  // 4) Last resort: show text so user can manually copy
  if (typeof window !== "undefined" && window.alert) {
    window.alert(`Copy this link:\n\n${textToCopy}`);
  }
  return false;
};

export const disableZoomInspect = () => {
  if (import.meta.env.VITE_ENVIRONMENT !== "production") return;
  document.addEventListener("contextmenu", (e) => e.preventDefault());
  document.addEventListener(
    "keydown",
    (e) => {
      // Block keyboard zoom
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === "=" || e.key === "+" || e.key === "-" || e.key === "0")
      ) {
        e.preventDefault();
        return;
      }
      // Block devtools shortcuts
      // if (
      //   e.key === "F12" ||
      //   (e.ctrlKey && e.shiftKey && e.key === "I") ||
      //   (e.ctrlKey && e.shiftKey && e.key === "J") ||
      //   (e.ctrlKey && e.shiftKey && e.key === "C") ||
      //   (e.ctrlKey && e.key === "U") ||
      //   (e.metaKey && e.altKey && e.key === "i") ||
      //   (e.metaKey && e.altKey && e.key === "j")
      // ) {
      //   e.preventDefault();
      // }
    },
    { passive: false }
  );
  // Block Ctrl/Cmd + scroll zoom
  document.addEventListener("wheel", (e) => e.ctrlKey && e.preventDefault(), {
    passive: false,
  });
}