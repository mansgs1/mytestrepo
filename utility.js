function Validate(){

        var empty = false;
        $('input.required').each(function() {
            if ($(this).val() == '') {
                empty = true;
            }
        });

        if (empty) {
            $('#btn_save').attr('disabled', 'disabled');
        } else {
            $('#btn_save').removeAttr('disabled');
        }

  }
$(document).on('click','#btn_save', function() {
    $('#preloader').css({
      'top':0,
      'width': '100%',
      'height': '100%'
    });
      $(window).preloader({
           delay: 2500
       });
	   
	   $('#ntfySpan').css('display','block');
	   
    }); 
	
	$(document).on('click','#cancel_btn', function() {
      
	   
	   $('#ntfySpan').css('display','none');
	   
    }); 
