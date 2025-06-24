document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.lines').forEach(function(lines) {
      lines.addEventListener('click', function() {
          document.querySelector('.navLink').classList.toggle('show');
      });
  });

  // Get the modal
  var modal = document.getElementById("imageModal");

  // Get the image and insert it inside the modal - use its "alt" text as a caption
  var imgs = document.querySelectorAll('.container img');
  var modalImg = document.getElementById("modalImage");
  var captionText = document.getElementById("captionText");

  imgs.forEach(function(img) {
    img.onclick = function(){
      modal.style.display = "block";
      modalImg.src = this.src;
      // The imageText (image name) is in the alt attribute.
      // The username needs to be passed from the EJS template, e.g., via a data attribute.
      // For now, I'll assume a data-username attribute is added to the img tag in feed.ejs.
      captionText.innerHTML = "<b>Image Name:</b> " + this.alt + "<br><b>Posted by:</b> " + this.dataset.username;
    }
  });

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close-button")[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  };

  // Close the modal when clicking outside the image
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
});