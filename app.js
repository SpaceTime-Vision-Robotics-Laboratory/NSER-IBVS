const copyCitationButton = document.getElementById("copy-citation-button");

async function copyToClipboard() {
  const text = document.querySelector(".citation").innerText;
  try {
    await navigator.clipboard.writeText(text);
    alert("Citation copied to clipboard!");
  } catch (err) {
    console.error("Failed to copy:", err);
  }
}

copyCitationButton.addEventListener("click", copyToClipboard);