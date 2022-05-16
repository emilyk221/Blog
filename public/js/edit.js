async function editFormHandler(event) {
  event.preventDefault();

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const title = document.querySelector("input[name='post-title']").value.trim();
  const content = document.querySelector("textarea[name='post-content']").value.trim();

  const response = await fetch("/api/posts/" + id, {
    method: "PUT",
    body: JSON.stringify({
      title: title,
      content: content
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (response.ok) {
    document.location.replace("/dashboard/");
  }
  else {
    alert(response.statusText);
  }
}

async function deleteButtonHandler(event) {
  event.preventDefault();

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const response = await fetch("/api/posts/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (response.ok) {
    document.location.replace("/dashboard/");
  }
  else {
    alert(response.statusText);
  }
}

document.querySelector(".edit-post-form").addEventListener("submit", editFormHandler);
document.querySelector(".delete-post-btn").addEventListener("click", deleteButtonHandler);