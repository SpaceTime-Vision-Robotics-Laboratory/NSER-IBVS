const copyCitationButton = document.getElementById("copy-citation-button");

function fallbackCopyToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;

  textArea.style.cssText =
    "position:fixed;top:0;left:0;width:2em;height:2em;padding:0;border:none;outline:none;box-shadow:none;background:transparent;";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand("copy");
    showCopyFeedback(successful);
  } finally {
    document.body.removeChild(textArea);
  }
}

function showCopyFeedback(success) {
  const button = document.getElementById("copy-citation-button");

  if (!button) return;

  const originalText = button.textContent;

  if (success) {
    button.textContent = "Copied!";
    button.style.backgroundColor = "#28a745";
  } else {
    button.textContent = "Failed to copy";
    button.style.backgroundColor = "#dc3545";
  }

  setTimeout(() => {
    button.textContent = originalText;
    button.style.backgroundColor = "";
  }, 2000);
}

async function copyToClipboard() {
  const citationElement = document.querySelector(".citation");

  if (!citationElement) {
    console.error("Citation element not found");
    return;
  }

  const citationText = citationElement.textContent;

  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(citationText);
      showCopyFeedback(true);
    } else {
      fallbackCopyToClipboard(citationText);
    }
  } catch (err) {
    console.error("Failed to copy citation:", err);
    try {
      fallbackCopyToClipboard(citationText);
    } catch (fallbackErr) {
      showCopyFeedback(false);
    }
  }
}

copyCitationButton.addEventListener("click", copyToClipboard);
