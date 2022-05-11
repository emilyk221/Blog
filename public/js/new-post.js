function newPostFormHandler(event) {
  event.preventDefault();

  const response = await fetch("/api/posts/new", {
    method: "get"
  });

  if (response.ok) {
    document.location.replace("/new-post");
  }
  else {
    alert(response.statusText);
  }
}

document.querySelector("#new-post").addEventListener("click", newPostFormHandler)