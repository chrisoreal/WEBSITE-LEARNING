var $jq = jQuery.noConflict();

$jq(document).ready(function(){
  $jq("#file-input").on('change', function(event){
    // Preview the image
    let reader = new FileReader();
    reader.onload = function(e) {
      // Display image preview
      $jq("#preview").attr('src', e.target.result).show();
    }
    reader.readAsDataURL(event.target.files[0]);
  });
  
  $jq('#upload-form').on('submit', function(event){
    event.preventDefault();
    
    let formData = new FormData(this);


    // Show the spinner
    $jq('#spinner').show();

    $jq.ajax({
      url: '/upload',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function(response){
        console.log(response);
      },
      error: function(error){
        console.error(error);
      }
    }

    
    // Simulating an AJAX call
    ,setTimeout(function(){
      // Hide the spinner
      $jq('#spinner').hide();
      
      // Show the thank you message
      alert("Thank you for submitting your details, junk haulers will be reaching out to you soon.");
      
      // Show the password modal
      $jq('#passwordModal').modal('show');

      $jq('#account-form').on('submit', function(event) {
        event.preventDefault();
        
        const password = $jq('#user-password').val();
        const confirmPassword = $jq('#user-password-confirm').val();
      
        if (password !== confirmPassword) {
          alert('Passwords do not match!');
          return;
        }
      
        // Make an AJAX call to create an account with the password
        console.log('Creating account with password:', password);
      
        // Hide the modal after successful creation
        $jq('#passwordModal').modal('hide');
      });

      // Any other AJAX success code
    }, 2000));
    
  });
});
