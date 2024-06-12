document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.product-item').forEach(item => {
      item.addEventListener('click',function(){
        console.log("index, value"); // passes index + value back!
      });
    });
});