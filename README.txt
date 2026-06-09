Galle Gate.lk Website - Dynamic Hero Slider Version

Hero images change automatically every 5 seconds.

To add your own hero images:
1. Open the assets folder.
2. Add your images with these names:
   hero-1.png
   hero-2.png
   hero-3.png
   hero-4.png
   hero-5.png

You can use your own names and PNG/JPG/WEBP format, but then update index.html:
style="background-image:url('assets/your-image-name.png')"

To change slider speed:
Open slider.js and change:
setInterval(changeSlide, 5000);
5000 = 5 seconds.

Edit packages:
Open packages-data.js.
