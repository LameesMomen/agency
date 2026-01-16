const partnerGalleries = {
  partner1: [
    "assets/images/partners/bondok/partner1-1.jpg",
    "assets/images/partners/bondok/partner1-2.jpg",
    "assets/images/partners/bondok/partner1-3.jpg",
    "assets/images/partners/bondok/partner1-4.jpg",
    "assets/images/partners/bondok/partner1-5.jpg",
    "assets/images/partners/bondok/partner1-6.jpg",
    "assets/images/partners/bondok/partner1-7.jpg",
    "assets/images/partners/bondok/partner1-8.jpg",
    "assets/images/partners/bondok/partner1-9.jpg",
  ],
  partner2: [
    "assets/images/partners/belly/partner2-1.jpg",
    "assets/images/partners/belly/partner2-2.jpg",
    "assets/images/partners/belly/partner2-3.jpg",
    "assets/images/partners/belly/partner2-4.jpg",
    "assets/images/partners/belly/partner2-5.jpg",
    "assets/images/partners/belly/partner2-6.jpg",
    "assets/images/partners/belly/partner2-7.jpg",
    "assets/images/partners/belly/partner2-8.jpg",
    "assets/images/partners/belly/partner2-9.jpg",
    "assets/images/partners/belly/partner2-10.jpg",
  ],
  partner3: [
    "assets/images/partners/gad/partner3-1.jpg",
    "assets/images/partners/gad/partner3-2.jpg",
    "assets/images/partners/gad/partner3-3.jpg",
    "assets/images/partners/gad/partner3-4.jpg",
    "assets/images/partners/gad/partner3-5.jpg",
    "assets/images/partners/gad/partner3-6.jpg",
    "assets/images/partners/gad/partner3-7.jpg",
    "assets/images/partners/gad/partner3-8.jpg",
    "assets/images/partners/gad/partner3-9.jpg",
    "assets/images/partners/gad/partner3-10.jpg",
  ],
  partner4: [
    "assets/images/partners/party/partner4-1.jpg",
    "assets/images/partners/party/partner4-2.jpg",
    "assets/images/partners/party/partner4-3.jpg",
    "assets/images/partners/party/partner4-5.jpg",
    "assets/images/partners/party/partner4-6.jpg",
    "assets/images/partners/party/partner4-7.jpg",
  ],
  partner5: [
    "assets/images/partners/abo-amar/partner5-1.jpg",
    "assets/images/partners/abo-amar/partner5-2.jpg",
    "assets/images/partners/abo-amar/partner5-3.jpg",
    "assets/images/partners/abo-amar/partner5-5.jpg",
    "assets/images/partners/abo-amar/partner5-6.jpg",
    "assets/images/partners/abo-amar/partner5-7.jpg",
  ],
  partner6: [
    "assets/images/partners/turkish/partner6-1.jpg",
    "assets/images/partners/turkish/partner6-2.jpg",
    "assets/images/partners/turkish/partner6-3.jpg",
    "assets/images/partners/turkish/partner6-4.jpg",
    "assets/images/partners/turkish/partner6-5.jpg",
    "assets/images/partners/turkish/partner6-6.jpg",
    "assets/images/partners/turkish/partner6-7.jpg",
  ],
  partner7: [
    "assets/images/partners/lemozen/partner7-1.jpg",
    "assets/images/partners/lemozen/partner7-2.jpg",
    "assets/images/partners/lemozen/partner7-3.jpg",
    "assets/images/partners/lemozen/partner7-4.jpg",
    "assets/images/partners/lemozen/partner7-5.jpg",
    "assets/images/partners/lemozen/partner7-6.jpg",
    "assets/images/partners/lemozen/partner7-7.jpg",
  ],
  partner8: [
    "assets/images/partners/master/partner8-1.jpg",
    "assets/images/partners/master/partner8-2.jpg",
    "assets/images/partners/master/partner8-3.jpg",
    "assets/images/partners/master/partner8-4.jpg",
    "assets/images/partners/master/partner8-5.jpg",
    "assets/images/partners/master/partner8-6.jpg",
    "assets/images/partners/master/partner8-7.jpg",
    "assets/images/partners/master/partner8-8.jpg",
    "assets/images/partners/master/partner8-9.jpg",
    "assets/images/partners/master/partner8-10.jpg",
  ],
  partner9: [
    "assets/images/partners/hadr-mout/partner9-1.jpg",
    "assets/images/partners/hadr-mout/partner9-2.jpg",
    "assets/images/partners/hadr-mout/partner9-3.jpg",
    "assets/images/partners/hadr-mout/partner9-4.jpg",
    "assets/images/partners/hadr-mout/partner9-5.jpg",
    "assets/images/partners/hadr-mout/partner9-6.jpg",
    "assets/images/partners/hadr-mout/partner9-7.jpg",
  ],
  partner10: [
    "assets/images/partners/sraya/partner10-1.jpg",
    "assets/images/partners/sraya/partner10-2.jpg",
    "assets/images/partners/sraya/partner10-3.jpg",
    "assets/images/partners/sraya/partner10-4.jpg",
    "assets/images/partners/sraya/partner10-5.jpg",
    "assets/images/partners/sraya/partner10-6.jpg",
    "assets/images/partners/sraya/partner10-7.jpg",
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
