function save()
{
	const currentPassword = $('#currentPassword').val();
	const newPassword = $('#newPassword').val();
	const confirmPassword = $('#confirmPassword').val();

	console.log(newPassword == confirmPassword);
	if (newPassword != confirmPassword)
	{
		alert('New passwords don\'t match. Try again');
	}
	else
	{
		const body = {currentPassword: currentPassword, newPassword: newPassword}
		$.ajax({
      url: '/api/accounts/edit/',
      type: 'PATCH',
      dataType : 'json', // this URL returns data in JSON format
      data: body,
      beforeSend: (xhr) => {   //Include the bearer token in header
        xhr.setRequestHeader("Authorization", 'Bearer '+window.localStorage.getItem("token"));
      },
      success: (data) => {
        console.log('edited', data);
        window.localStorage.setItem("token", data.token);
      },
      error: (xhr, textStatus, error) => 
      {
        console.log(xhr.statusText+': '+JSON.stringify(xhr.responseJSON.error));
      }
    });

	}
}