document.getElementById("uploadForm").onsubmit = async function (e) {
    e.preventDefault();
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/upload", {
        method: "POST",
        body: formData,
      });

      // Ensure the response is ok and not empty
      if (!response.ok) {
        console.error("Network response was not ok", response.statusText);
        return;
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };