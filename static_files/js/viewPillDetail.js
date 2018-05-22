function deleteMedicine (medicine_id) 
{    
  $.ajax({
    url: '/api/medicine/delete/'+medicine_id,
    type: 'DELETE',
    dataType : 'json', // this URL returns data in JSON format
    beforeSend: (xhr) => {   //Include the bearer token in header
      xhr.setRequestHeader("Authorization", 'Bearer '+window.localStorage.getItem("token"));
    },
    success: (data) => {
      alert('medicine deleted');
      post('/home');
    },
    error: (xhr, textStatus, error) => 
    {
      console.log(xhr.statusText+': '+xhr.responseJSON.error);
    }
  });
}// end of delete profile