$(document).ready(function(){
  var opts = {
    autoStartSlideshow: true,
    slideshowDelay: 5000,
    cacheMode: Code.PhotoSwipe.Cache.Mode.normal,
    slideTimingFunction: "ease-in-out",
    loop: true
  };
  gallery = $("#image-list a").photoSwipe(opts);
  $('#image-list a:first').trigger('click');
});

// Set up the socket
var socket = io.connect('/')

socket.on('connect', function() {
  console.log('connected evt');
});

// Everytime a new image is saved, notify and update the PhotoSwipe view.
socket.on('generated_thumb', function(url_thumb, url_gen) {
  console.log('generated evt: ' + url_gen);
  console.log('generated_thumb evt: ' + url_thumb);

  // A generated thumb means I need to add it to the slideshow.
  var a = $('<a/>')
    .attr('href', url_gen)
    .append(
      $('<img />').attr('src', url_thumb).attr('alt', '')
    ).appendTo('ul#image-list');

  var src = gallery.settings.getImageSource(a[0]);
  var caption = gallery.settings.getImageCaption(a[0]);
  var metaData = gallery.settings.getImageMetaData(a[0]);

  gallery.cache.images.push(new Code.PhotoSwipe.Image.ImageClass(a, src, caption, metaData))

});
