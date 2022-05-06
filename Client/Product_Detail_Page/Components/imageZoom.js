imageZoom () {
  var img, lens, result, cx, cy;
  img = document.getElementById("CentralPhoto1");
  result = document.getElementById("image-zoom");
  lens = document.createElement("DIV");
  lens.setAttribute("class", 'img-zoom-lens');

  img.parentElement.insertBefore(lens, img);

  cx = result.offsetWidth / lens.offsetWidth;
  cy = result.offsetHeight / lens.offsetHeight;

  result.style.backgroundImage = "url('" + img.src + "')";
  result.style.backgroundSize - (img.width * cx) + "px " + (image.height * cy) + "px";

  lens.addEventListener("mouseOver", moveLens);
  img.addEventListener("mouseMove", moveLens);
  lens.addEventListener("touchmove", moveLens);
  img.addEventListener("touchmove", moveLens);

  function moveLens (e) {
    var pos = getCurserPos(e);
    var x = pos.x - (lens.offsetWidth / 2);
    var y = pos.y - (lens.offsetHeight / 2);

    if (x > img.width - lens.offsetWidth) x = img.width - lens.offsetWidth;
    if (x < 0) x = 0;
    if (y > img.height - lens.offsetHeight) y = img.height - lens.offsetHeight;
    if (y < 0) y = 0;

    lens.style.left = x + "px";
    lens.style.top = y + "px";
    result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
  }
  function getCurserPos (e) {
    var e = e || window.event;
    a = img.getBoundingClientRect();
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    console.log(e)
    return {x: x, y: y}
  }
}