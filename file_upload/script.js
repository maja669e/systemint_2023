document.getElementById("myForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission
  
    var file = document.querySelector('input[type="file"]').files[0];
    var formData = new FormData();
    formData.append("myFile", file);
  
    // Send the FormData object to the server
    fetch("/upload", {
      method: "POST",
      body: formData
    })
      .then(response => response.text())
      .then(result => {
        console.log(result); // Handle the server response
      })
      .catch(error => {
        console.error(error); // Handle any errors
      });
  });
  