document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.product-item a').forEach(item => {
      item.addEventListener('click',function(){
        console.log("index, value"); // passes index + value back!

        const productId = this.getAttribute('');
      const accessToken = '';
      
        fetch(``, {
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