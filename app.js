const copyCitationButton = document.getElementById("copy-citation-button");
const citationCode = document.getElementById("language-bibtex");
const scrollTopButton = document.getElementById("scroll-top-button");

const lightbox = document.getElementById("image-lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const captionText = document.getElementById("lightbox-caption");
const closeButton = document.getElementsByClassName("lightbox-close")[0];
const contentImages = document.querySelectorAll(".section img");

let isDragging = false;
let startX, startY, scrollLeft, scrollTop;
let hasMoved = false;

window.onscroll = function () {
  toggleScrollButton();
};

function toggleScrollButton() {
  if (
    document.body.scrollTop > 300 ||
    document.documentElement.scrollTop > 300
  ) {
    scrollTopButton.style.display = "block";
  } else {
    scrollTopButton.style.display = "none";
  }
}

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

function showCopyFeedback(success, button) {
  if (!button) {
    return;
  }

  const originalText = button.textContent;

  let classToRemove = "";
  if (success) {
    button.textContent = "Copied!";
    classToRemove = "copy-success";
    button.classList.add(classToRemove);
  } else {
    button.textContent = "Failed to copy";
    classToRemove = "copy-fail";
    button.classList.add(classToRemove);
  }

  setTimeout(() => {
    button.textContent = originalText;
    button.classList.remove(classToRemove);
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
      showCopyFeedback(true, copyCitationButton);
    } else {
      fallbackCopyToClipboard(citationText);
    }
  } catch (err) {
    console.error("Failed to copy citation:", err);
    try {
      fallbackCopyToClipboard(citationText);
    } catch (fallbackErr) {
      showCopyFeedback(false, copyCitationButton);
    }
  }
}

function closeLightbox() {
  lightbox.style.display = "none";
  lightboxImg.classList.remove("zoomed");
}

citationCode.innerHTML = citationCode.textContent
  // Entry type like @InProceedings
  .replace(/(@\w+)/g, '<span class="bibtex-type">$1</span>')
  // Citation key (first thing after {)
  .replace(/(@\w+<\/span>)\{(\w+)/, '$1{<span class="bibtex-key">$2</span>')
  // Field names (preserve spaces before =)
  .replace(/^(\s+)(\w+)(\s*=)/gm, '$1<span class="bibtex-field">$2</span>$3')
  // Values in braces
  .replace(/= \{([^}]+)\}/g, '= {<span class="bibtex-value">$1</span>}');

copyCitationButton.addEventListener("click", copyToClipboard);
closeButton.addEventListener("click", closeLightbox);

scrollTopButton.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
contentImages.forEach((img) => {
  img.addEventListener("click", function () {
    lightbox.style.display = "block";
    lightboxImg.src = this.src;
    captionText.innerHTML = this.alt || this.title || "";
    lightboxImg.classList.remove("zoomed");
  });
});
lightbox.onclick = function (event) {
  if (hasMoved) {
    return;
  }
  if (event.target === lightbox) {
    closeLightbox();
  }
};
lightboxImg.onclick = function (event) {
  event.stopPropagation();
  if (hasMoved) {
    return;
  }
  this.classList.toggle("zoomed");
};

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && lightbox.style.display === "block") {
    closeLightbox();
  }
});

lightbox.addEventListener("mousedown", (e) => {
  if (!lightboxImg.classList.contains("zoomed")) {
    return;
  }

  isDragging = true;
  hasMoved = false;
  lightbox.classList.add("grabbing");

  startX = e.pageX - lightbox.offsetLeft;
  startY = e.pageY - lightbox.offsetTop;
  scrollLeft = lightbox.scrollLeft;
  scrollTop = lightbox.scrollTop;

  e.preventDefault();
});

lightbox.addEventListener("mousemove", (e) => {
  if (!isDragging) {
    return;
  }
  e.preventDefault();

  const x = e.pageX - lightbox.offsetLeft;
  const y = e.pageY - lightbox.offsetTop;

  const walkX = x - startX;
  const walkY = y - startY;

  if (Math.abs(walkX) > 5 || Math.abs(walkY) > 5) {
    hasMoved = true;
  }

  lightbox.scrollLeft = scrollLeft - walkX;
  lightbox.scrollTop = scrollTop - walkY;
});

const stopDragging = () => {
  isDragging = false;
  lightbox.classList.remove("grabbing");
};
lightbox.addEventListener("mouseup", stopDragging);
lightbox.addEventListener("mouseleave", stopDragging);
