document.addEventListener('DOMContentLoaded', function() {
  const popup = document.getElementById('product-popup');
  const popupTitle = document.getElementById('popup-title');
  const popupProductImage = document.getElementById('popup-product-image');
  const popupDescription = document.getElementById('popup-description');
  const popupPrice = document.getElementById('popup-price');
  const addToCartButton = document.getElementById('add-to-cart');
  const sizeOptions = document.getElementById('size-options');
 
  
  const closeButton = document.querySelector('.popup .close');


  

  // Close Popup
  closeButton.onclick = function() {
    popup.classList.add('hidden');
  };

  window.onclick = function(event) {
    if (event.target === popup) {
      popup.classList.add('hidden');
    }
  };


  // Show Pupup
  function openPopup(product) {
    popupTitle.textContent = product.title;
    popupProductImage.innerHTML = '<img src="'+product.image['src']+'"/>';
    popupDescription.innerHTML = product.body_html;
    popupPrice.textContent = '$' + product.variants['0'].price;
    const variantID = product.variants['0'].id;
    // Extract option names and values
      const options = product.options;
      const optionsContainer = document.getElementById('options-container');
      // Clear existing content
        optionsContainer.innerHTML = '';
    
      options.forEach((option, index) => {

         
        
        // Create a container for each option
        const optionContainer = document.createElement('div');
        optionContainer.className = 'popup-variants ' + option.name.toLowerCase().replace(/\s+/g, '-') +'-var';

        // Create option name element with class and value
        const optionNameElement = document.createElement('div');
        optionNameElement.className = 'cp-label' ;
        optionNameElement.textContent = `${option.name}`;
        optionContainer.appendChild(optionNameElement);
 
         if (index === 0) {
          // Create a container for the first option
          const varCon = document.createElement('div');
          varCon.className = 'var-con';

          option.values.forEach(value => {
            const varBtn = document.createElement('button');
            varBtn.className = `var-btn var-${value.toLowerCase().replace(/\s+/g, '-')}`;
            varBtn.textContent = value;
            varCon.appendChild(varBtn);
          });

          optionContainer.appendChild(varCon);
        }
         else if (index === 1) {
          // Create a container for the second option
          const dropdownSize = document.createElement('div');
          dropdownSize.className = 'dropdown-size';

          const dbSizeButton = document.createElement('button');
          dbSizeButton.className = 'db-size';
           dbSizeButton.id = 'size-options';
          dbSizeButton.innerHTML = 'Choose your size' + "<img src='https://cdn.shopify.com/s/files/1/0578/3945/2222/files/sel-arrow.png?v=1718190028'/>" ;
          dropdownSize.appendChild(dbSizeButton);

          const dbOptions = document.createElement('ul');
          dbOptions.className = 'db-options';

          option.values.forEach(value => {
            const dbOptionItem = document.createElement('li');
            dbOptionItem.textContent = value;
            dbOptions.appendChild(dbOptionItem);
          });

           dropdownSize.appendChild(dbOptions);
          optionContainer.appendChild(dropdownSize);
        } 


        
        // Append the option container to the main container
        optionsContainer.appendChild(optionContainer);
      });

    addToCartButton.onclick = function() {
            addToCart(variantID);
    };

    popup.classList.remove('hidden');
  }

  function addToCart(variantId) {

    let formData = {
     'items': [{
      'id': variantId,
      'quantity': 1
      },{
      'id': 41062315163710,
      'quantity': 1
      }]
    };
    
    fetch('/cart/add.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      alert('Added to cart!');
      popup.classList.add('hidden');
    })
    .catch(error => {
      console.error('Error adding to cart:', error);
    });
  }

  document.querySelectorAll('.product-item a').forEach(item => {
    item.addEventListener('click', function() {
      const productId = this.getAttribute('data-product-id');
      const accessToken = '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';
      
      fetch(`https://satinder-ghai-test.myshopify.com/admin/api/2021-07/products/${productId}.json`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': accessToken
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
          }
          return response.json();
        })
        .then(data => {
          openPopup(data.product);
          console.log(data.product);
        })
        .catch(error => {
          console.error('Error fetching product:', error);
        });

    });
  });
});
