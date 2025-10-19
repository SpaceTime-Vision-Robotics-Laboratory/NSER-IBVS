const videoIframe = document.getElementById("video-iframe");
const copyCitationButton = document.getElementById("copy-citation-button");

function restartVideo(frameToRestart) {
  frameToRestart.src += "?t=1"; // Adding a timestamp to force a reload
  setTimeout(function () {
    frameToRestart.src = frameToRestart.src.replace("?t=1", ""); // Remove the timestamp after a short delay
  }, 200);
}

function copyToClipboard() {
    const tempTextArea = document.createElement("textarea");
    tempTextArea.value = document.querySelector(".citation").innerText;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    tempTextArea.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.body.removeChild(tempTextArea);
    alert("Citation copied to clipboard!");
}

document.addEventListener("DOMContentLoaded", function () {
  if (videoIframe.contentWindow) {
    videoIframe.contentWindow.addEventListener("message", function (event) {
      if (event.data === "ended") {
        console.log("CARNATI!");
        restartVideo(videoIframe);
      }
    });
  }
});

copyCitationButton.addEventListener("click", copyToClipboard);