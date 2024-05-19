function deleteAcc(userId) {
  if (confirm("Are you sure you want to delete your account?")) {
    fetch(`/delete_user/${userId}`, {
      method: 'DELETE'

  })
  .then(response => {
    if (response.ok) {
      window.location.href = '/'; // Redirect to homepage
    }
    else {
      alert("Cannot delete user")
    }
  })
  .catch(error => console.error('Error:', error));
}

}



