document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.product-item a').forEach(item => {
      item.addEventListener('click',function(){
        console.log("index, value"); // passes index + value back!
      });
    });
});