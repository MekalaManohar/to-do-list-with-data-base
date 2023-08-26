updateStatus = id => {
  fetch("/status/" + id, { method: "GET" })
    .then(response => response.json())
    .then(data => {
      const checked = document.getElementsByClassName("checked-" + id);
      for (let element of checked) {
        if (data.status === "Pending") {
          element.style["text-decoration"] = "none";
        } else {
          element.style["text-decoration"] = "line-through";
        }
      }
    });
};
