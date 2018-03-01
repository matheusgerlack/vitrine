var slideIndex = 1;

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
  var i,
  slides = document.getElementsByClassName("slide"),
  prev = document.getElementsByClassName("prev")[0],
  next = document.getElementsByClassName("next")[0]

  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}

  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none"; 


      // tests if is last or first slide group
      if (slideIndex == 1){
        prev.style.display = "none";
      }else{
        prev.style.display = "block";
      }

      
      if(slideIndex == (slides.length - 2)){
        next.style.display = "none";
      }else{
        next.style.display = "block";
      }

  }

  slides[slideIndex-1].style.display = "inline-block"; 
  slides[slideIndex].style.display = "inline-block"; 
  slides[slideIndex+1].style.display = "inline-block";

    
}

