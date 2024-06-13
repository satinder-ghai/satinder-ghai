document.addEventListener('DOMContentLoaded', function() {
  // Get references to the popup elements
  const popup = document.getElementById('product-popup');
  const popupTitle = document.getElementById('popup-title');
  const popupProductImage = document.getElementById('popup-product-image');
  const popupDescription = document.getElementById('popup-description');
  const popupPrice = document.getElementById('popup-price');
  const addToCartButton = document.getElementById('add-to-cart');
  const sizeOPtions = document.getElementById('size-options');
  const closeButton = document.querySelector('.popup .close');

  // Close the popup when the close button is clicked
  closeButton.onclick = function() {
    popup.classList.add('hidden');
  };

  // Close the popup when clicking outside of the popup content
  window.onclick = function(event) {
    if (event.target === popup) {
      popup.classList.add('hidden');
    }
  };

  // Function to open and populate the popup with product details
  function openPopup(product) {
    // Set the popup title, image, description, and price with the product data
    popupTitle.textContent = product.title;
    popupProductImage.innerHTML = '<img src="'+product.image['src']+'"/>';
    popupDescription.innerHTML = product.body_html;
    popupPrice.textContent = '$' + product.variants['0'].price;
    const variantID = product.variants['0'].id;

    // Extract and display product options
    const options = product.options;
    const optionsContainer = document.getElementById('options-container');
    // Clear any existing content in the options container
    optionsContainer.innerHTML = '';

    // Iterate over each option and create the necessary HTML elements
    options.forEach((option, index) => {
      // Create a container for each option
      const optionContainer = document.createElement('div');
      optionContainer.className = 'popup-variants ' + option.name.toLowerCase().replace(/\s+/g, '-') +'-var';

      // Create and append the option name element
      const optionNameElement = document.createElement('div');
      optionNameElement.className = 'cp-label';
      optionNameElement.textContent = `${option.name}`;
      optionContainer.appendChild(optionNameElement);

      if (index === 0) {
        // Create a container for the first option values (e.g., buttons)
        const varCon = document.createElement('div');
        varCon.className = 'var-con';

        // Create and append buttons for each option value
        option.values.forEach(value => {
          const varBtn = document.createElement('button');
          varBtn.className = `var-btn var-${value.toLowerCase().replace(/\s+/g, '-')}`;
          varBtn.textContent = value;
          varCon.appendChild(varBtn);
        });

        optionContainer.appendChild(varCon);
      } else if (index === 1) {
        // Create a dropdown for the second option (e.g., size)
        const dropdownSize = document.createElement('div');
        dropdownSize.className = 'custom-select-wrapper';

        // Create and append the dropdown button
        const dbSizeButton = document.createElement('div');
        dbSizeButton.className = 'custom-select';
        dbSizeButton.innerHTML = '<div class="custom-select-trigger"><span>Choose your size</span><span class="arrow"><img src="https://cdn.shopify.com/s/files/1/0578/3945/2222/files/down-arrow.svg?v=1717415682" alt="icon"></span></div>';
        dropdownSize.appendChild(dbSizeButton);

        // Create and append the dropdown options
        const dbOptions = document.createElement('div');
        dbOptions.className = 'custom-options';

        option.values.forEach(value => {
          const dbOptionItem = document.createElement('div');
          dbOptionItem.className = 'custom-option';
          dbOptionItem.textContent = value;
          dbOptionItem.setAttribute('data-value', 'option1');
          sizeOPtions.appendChild(dbOptionItem);
        });

        dbSizeButton.appendChild(dbOptions);
        optionContainer.appendChild(dropdownSize);
      }

      // Append the option container to the main options container
      optionsContainer.appendChild(optionContainer);
    });

    // Set the click event for the add to cart button
    addToCartButton.onclick = function() {
      addToCart(variantID);
    };

    // Show the popup
    popup.classList.remove('hidden');
  }

  // Function to add a product variant to the cart
  function addToCart(variantId) {
    // Create the form data with the product variant ID and quantity
    let formData = {
      'items': [{
        'id': variantId,
        'quantity': 1
      },{
        'id': 41062315163710,  // Additional item to add (if any)
        'quantity': 1
      }]
    };

    // Send a POST request to add the items to the cart
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

  // Add click event listeners to each product item link to fetch and display the product details
  document.querySelectorAll('.product-item a').forEach(item => {
    item.addEventListener('click', function() {
      const productId = this.getAttribute('data-product-id');
      const accessToken = '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'; // Shopify access token
      
      // Fetch the product details from the Shopify API
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
        openPopup(data.product); // Open the popup with the fetched product details
      })
      .catch(error => {
        console.error('Error fetching product:', error);
      });
    });
  });
});
