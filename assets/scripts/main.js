var getjsonp = (function(){
  var that = {};

  that.send = function(src, options) {
    var callback_name = options.callbackName || 'callback',
      on_success = options.onSuccess || function(){},
      on_timeout = options.onTimeout || function(){},
      timeout = options.timeout || 10; // sec

    var timeout_trigger = window.setTimeout(function(){
      window[callback_name] = function(){};
      on_timeout();
    }, timeout * 1000);

    window[callback_name] = function(data){
      window.clearTimeout(timeout_trigger);
      on_success(data);
    }

    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = src;

    document.getElementsByTagName('head')[0].appendChild(script);
  }

  return that;
})();

getjsonp.send('http://roberval.chaordicsystems.com/challenge/challenge.json?callback=X', {
    callbackName: 'X',
    onSuccess: function(data){

          // prepare and assign data to be displayed in the app
          var reference;
          var recommendation = [];
          recommendation = data.data.recommendation;
          reference = data.data.reference.item;

          // reference li
          var liReference = document.getElementById("references").childNodes[1];

          // reccomendation li 
          var liRecommendation = document.getElementById("recommendations");
            
          // build DOM structure and set values
          function setValues(path, type){

              var newElement, domElement, newProduct , newAnchor, length, id; 

              // if is not object, set length to be used in loop to 1
              if (!type.length){
                length = 1;
                id = 'references';
              } else{
                length = type.length;
                id = 'recommendations';
              }

              // create and organize elements and set its values
              for (i = 0; i < length; i++) { 

                // PRODUCT LI

                  // create
                  newProduct = document.createElement("li");

                  if(id == 'recommendations'){
                    newProduct.setAttribute("class", "product" + " " + "recommendation" + " " + [i]);
                  } else if(id == 'references'){
                    newProduct.setAttribute("class", "product" + " " + "reference" + " " + [i]);
                  }
                            // append
                    domElement = document.getElementById(id);
                    domElement.appendChild(newProduct);

              // ANCHOR

                  // create
                  newAnchor = document.createElement("a");
                  newAnchor.setAttribute("href", "" );

                    // append
                    newProduct.appendChild(newAnchor);    

                    // set href
                    if ( id == 'references'){
                      newAnchor.attributes[0].value = type.detailUrl;
                    } else{
                      newAnchor.attributes[0].value = type[i].detailUrl;
                    } 

              // IMAGE    

                  // create span
                  newElement = document.createElement("span");
                  newElement.setAttribute("class", "image");

                    // create img
                    newChildElement = document.createElement("img");
                    newChildElement.setAttribute("src", "");

                    // set src
                    if ( id == 'references'){
                      newChildElement.attributes[0].value = type.imageName;
                    } else{
                      newChildElement.attributes[0].value = type[i].imageName;
                    }     

                      // append to span
                      newElement.appendChild(newChildElement);

                  // append span to product li
                  newAnchor.appendChild(newElement);

                // DESCRIPTION

                  // create 
                  newElement = document.createElement("span");
                  newElement.setAttribute("class", "description");

                  
                  // set description
                  if ( id == 'references'){
                    var n = type.name;
                    var excerpt = n.substring(0, 70);
                    excerpt = excerpt.concat('...');
                    newElement.innerHTML = excerpt;
                  } else{
                    var n = type[i].name;
                    var excerpt = n.substring(0, 70);
                    excerpt = excerpt.concat('...');
                    newElement.innerHTML = excerpt;
                  }

                  // append span to product li
                  newAnchor.appendChild(newElement);

                // PRICE

                  // create parent
                  newElement = document.createElement("span");
                  newElement.setAttribute("class", "price");

                    // create span class regular
                    newChildElement = document.createElement("span");
                    newChildElement.setAttribute("class", "regular");

                    // set regular price
                    if ( id == 'references'){
                      var p = type.oldPrice;

                      if(p){
                        var label = 'De: ';
                        p = label.concat(p);
                        newChildElement.innerHTML = p;
                      }
                    } else{
                      var p = type[i].oldPrice;
                      
                      if(p){
                        var label = 'De: ';
                        p = label.concat(p);
                        newChildElement.innerHTML = p;
                      }
                    }

                      // append to price
                      newElement.appendChild(newChildElement);

                    // create span class sale
                    newChildElement = document.createElement("span");
                    newChildElement.setAttribute("class", "sale");

                    // set sale price
                    if ( id == 'references'){
                      var p = type.price;
                      var label = 'Por: ';
                      p = label.concat(p);
                      newChildElement.innerHTML = p;
                    } else{
                      var p = type[i].price;
                      var label = 'Por: ';
                      p = label.concat(p);
                      newChildElement.innerHTML = p;
                    }

                      // append to price
                      newElement.appendChild(newChildElement);

                    // create span class installment
                    newChildElement = document.createElement("span");
                    newChildElement.setAttribute("class", "installment");

                    // set installment
                    if ( id == 'references'){
                      var p = type.productInfo.paymentConditions;
                      p = p.replace(".", ",");
                      var label = ' <span>sem juros</span>';
                      p = p.concat(label);
                      newChildElement.innerHTML = p;
                    } else{
                      var p = type[i].productInfo.paymentConditions;
                      p = p.replace(".", ",");
                      var label = ' <span>sem juros</span>';
                      p = p.concat(label);
                      newChildElement.innerHTML = p;
                    }


                      // append to price
                      newElement.appendChild(newChildElement);

                    // append span to product li
                    newAnchor.appendChild(newElement);
                    
              } // end for  

          }

          setValues(liRecommendation, recommendation);
          setValues(liReference, reference);


          // slider 

          [].slice.bind(document.getElementsByClassName("recommendation"))().forEach(function(element){
            element.classList.add("slide", "fade");
          });

          showSlides(slideIndex);

          // end slider

    },
    onTimeout: function(){
        console.log('timeout!');
    },
    timeout: 5
});