const partnerGalleries = {
  partner1: [
    "assets/images/partners/bondok/partner1-1.webp",
    "assets/images/partners/bondok/partner1-2.webp",
    "assets/images/partners/bondok/partner1-3.webp",
    "assets/images/partners/bondok/partner1-4.webp",
    "assets/images/partners/bondok/partner1-5.webp",
    "assets/images/partners/bondok/partner1-6.webp",
    "assets/images/partners/bondok/partner1-7.webp",
    "assets/images/partners/bondok/partner1-8.webp",
    "assets/images/partners/bondok/partner1-9.webp",
  ],
  partner2: [
    "assets/images/partners/belly/partner2-1.webp",
    "assets/images/partners/belly/partner2-2.webp",
    "assets/images/partners/belly/partner2-3.webp",
    "assets/images/partners/belly/partner2-4.webp",
    "assets/images/partners/belly/partner2-5.webp",
    "assets/images/partners/belly/partner2-6.webp",
    "assets/images/partners/belly/partner2-7.webp",
    "assets/images/partners/belly/partner2-8.webp",
    "assets/images/partners/belly/partner2-9.webp",
    "assets/images/partners/belly/partner2-10.webp",
  ],
  partner3: [
    "assets/images/partners/gad/partner3-1.webp",
    "assets/images/partners/gad/partner3-2.webp",
    "assets/images/partners/gad/partner3-3.webp",
    "assets/images/partners/gad/partner3-4.webp",
    "assets/images/partners/gad/partner3-5.webp",
    "assets/images/partners/gad/partner3-6.webp",
    "assets/images/partners/gad/partner3-7.webp",
    "assets/images/partners/gad/partner3-8.webp",
    "assets/images/partners/gad/partner3-9.webp",
    "assets/images/partners/gad/partner3-10.webp",
  ],
  partner4: [
    "assets/images/partners/party/partner4-1.webp",
    "assets/images/partners/party/partner4-2.webp",
    "assets/images/partners/party/partner4-3.webp",
    "assets/images/partners/party/partner4-5.webp",
    "assets/images/partners/party/partner4-6.webp",
    "assets/images/partners/party/partner4-7.webp",
  ],
  partner5: [
    "assets/images/partners/abo-amar/partner5-1.webp",
    "assets/images/partners/abo-amar/partner5-2.webp",
    "assets/images/partners/abo-amar/partner5-3.webp",
    "assets/images/partners/abo-amar/partner5-5.webp",
    "assets/images/partners/abo-amar/partner5-6.webp",
    "assets/images/partners/abo-amar/partner5-7.webp",
  ],
  partner6: [
    "assets/images/partners/turkish/partner6-1.webp",
    "assets/images/partners/turkish/partner6-2.webp",
    "assets/images/partners/turkish/partner6-3.webp",
    "assets/images/partners/turkish/partner6-4.webp",
    "assets/images/partners/turkish/partner6-5.webp",
    "assets/images/partners/turkish/partner6-6.webp",
    "assets/images/partners/turkish/partner6-7.webp",
  ],
  partner7: [
    "assets/images/partners/lemozen/partner7-1.webp",
    "assets/images/partners/lemozen/partner7-2.webp",
    "assets/images/partners/lemozen/partner7-3.webp",
    "assets/images/partners/lemozen/partner7-4.webp",
    "assets/images/partners/lemozen/partner7-5.webp",
    "assets/images/partners/lemozen/partner7-6.webp",
    "assets/images/partners/lemozen/partner7-7.webp",
  ],
  partner8: [
    "assets/images/partners/master/partner8-1.webp",
    "assets/images/partners/master/partner8-2.webp",
    "assets/images/partners/master/partner8-3.webp",
    "assets/images/partners/master/partner8-4.webp",
    "assets/images/partners/master/partner8-5.webp",
    "assets/images/partners/master/partner8-6.webp",
    "assets/images/partners/master/partner8-7.webp",
    "assets/images/partners/master/partner8-8.webp",
    "assets/images/partners/master/partner8-9.webp",
    "assets/images/partners/master/partner8-10.webp",
  ],
  partner9: [
    "assets/images/partners/hadr-mout/partner9-1.webp",
    "assets/images/partners/hadr-mout/partner9-2.webp",
    "assets/images/partners/hadr-mout/partner9-3.webp",
    "assets/images/partners/hadr-mout/partner9-4.webp",
    "assets/images/partners/hadr-mout/partner9-5.webp",
    "assets/images/partners/hadr-mout/partner9-6.webp",
    "assets/images/partners/hadr-mout/partner9-7.webp",
  ],
  partner10: [
    "assets/images/partners/sraya/partner10-1.webp",
    "assets/images/partners/sraya/partner10-2.webp",
    "assets/images/partners/sraya/partner10-3.webp",
    "assets/images/partners/sraya/partner10-4.webp",
    "assets/images/partners/sraya/partner10-5.webp",
    "assets/images/partners/sraya/partner10-6.webp",
    "assets/images/partners/sraya/partner10-7.webp",
  ],
};

let currentGallery = [];
let currentIndex = 0;

function openGallery(partner, index) {
  currentGallery = partnerGalleries[partner];
  currentIndex = index;
  updateImage();
  $("#galleryModal").modal("show");
}

function updateImage() {
  document.getElementById("galleryImage").src = currentGallery[currentIndex];
}

function nextImage() {
  currentIndex = (currentIndex + 1) % currentGallery.length;
  updateImage();
}

function prevImage() {
  currentIndex =
    (currentIndex - 1 + currentGallery.length) % currentGallery.length;
  updateImage();
}

document.querySelectorAll(".partner-img").forEach((img) => {
  img.addEventListener("click", () => {
    openGallery(img.dataset.partner, parseInt(img.dataset.index));
  });
});
