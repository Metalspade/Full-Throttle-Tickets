window.addEventListener("DOMContentLoaded", function () {
  // Retrieve query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const name = urlParams.get("name");
  const email = urlParams.get("email");
  const numTickets = urlParams.get("numTickets");

  // Retrieve the event details from localStorage
  const selectedTicket = JSON.parse(localStorage.getItem("selectedTicket"));

  // Get the element where you want to display the event details
  const eventDetailsElement = document.getElementById("event-details");

  // Create HTML markup for event details with two columns
  const markup = `
        <h6>${selectedTicket.name}</h6>
      <p>Date: ${new Date(selectedTicket.date).toLocaleDateString()}</p>
       <p>Time: ${selectedTicket.time}</p>
      <p>Location: ${selectedTicket.location}</p>
           <p>Category: ${selectedTicket.category}</p>

  `;

  // Update the event details element with the generated markup
  eventDetailsElement.innerHTML = markup;

  // Populate ticket details
  document.querySelector(".ticket-name").textContent = name;
  document.querySelector(".ticket-email").textContent = email;
  document.querySelector(".ticket-number").textContent = numTickets;

  // Clear local storage
  localStorage.clear();
});

function closeModal() {
  // Handle the close modal action
}

document
  .getElementById("backToEvents")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form submission

    // Redirect to the success page
    window.location.href = "events.html";
  });
