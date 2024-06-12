document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.product-item a').forEach(item => {
      item.addEventListener('click',function(){
        console.log("index, value"); // passes index + value back!

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
            console.log(data.product);
          })
          .catch(error => {
            console.error('Error fetching product:', error);
          });
        
      });
    });
});