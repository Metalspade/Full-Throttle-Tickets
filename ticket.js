// Retrieve the event details from localStorage
const selectedTicket = JSON.parse(localStorage.getItem("selectedTicket"));

// Get the element where you want to display the event details
const eventDetails = document.getElementById("event-details");

// Create HTML markup for event details with two columns
const markup = `
  <div class="col-lg-6 col-md-6 col-12">
    <h6>${selectedTicket.name}</h6>
    <p>Date: ${new Date(selectedTicket.date).toLocaleDateString()}</p>
    <p>Price: R${selectedTicket.price}</p>
  </div>
  <div class="col-lg-6 col-md-6 col-12">
    <p>Location: ${selectedTicket.location}</p>
    <p>Time: ${selectedTicket.time}</p>
    <p>Category: ${selectedTicket.category}</p>
  </div>
`;

// Update the event details element with the generated markup
eventDetails.innerHTML = markup;

const priceInput = document.querySelector(".form-control[name='TicketForm']");
if (priceInput) {
  priceInput.value = `R${selectedTicket.price}`;
}

const quantityInput = document.getElementById("ticket-form-number");
const totalPriceInput = document.getElementById("total-amount");

// Add an event listener to the quantity input field
quantityInput.addEventListener("input", calculateTotal);

// Function to calculate the total based on the quantity input
function calculateTotal() {
  const price = parseFloat(selectedTicket.price);
  const quantity = parseInt(quantityInput.value);
  const total = price * quantity;

  // Update the total price input field
  if (!isNaN(total)) {
    totalPriceInput.value = `R${total.toFixed(2)}`;
  } else {
    totalPriceInput.value = "";
  }
}

// Success message
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("buyTicket-button").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    let name = document.getElementById("ticket-form-name").value;
    let email = document.getElementById("ticket-form-email").value;
    let numTickets = document.getElementById("ticket-form-number").value;

    // Store form values in local storage
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("numTickets", numTickets);

    // Generate the query parameters
    let queryParams = `?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&numTickets=${encodeURIComponent(numTickets)}`;

    // Redirect to the success page with query parameters
    window.location.href = `success.html${queryParams}`;
  });
});
