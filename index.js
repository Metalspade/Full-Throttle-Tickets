// Event class
class Event {
  constructor(name, date, time, location, category, tickets, imageSrc) {
    this.name = name;
    this.date = new Date(date);
    this.time = time;
    this.location = location;
    this.category = category;
    this.tickets = tickets;
    this.imageSrc = imageSrc;
  }

  render() {
    // Create a div element with the class 'event-card'
    const eventCard = document.createElement("div");
    eventCard.className = "event-card";

    const imageElement = document.createElement("img");
    imageElement.src = this.imageSrc;
    eventCard.appendChild(imageElement);

    const nameElement = document.createElement("h2");
    nameElement.textContent = this.name;
    eventCard.appendChild(nameElement);

    // Create a paragraph element for the date and set its text content
    // format date using `this.date.toDateString()`

    const dateElement = document.createElement("p");
    dateElement.textContent = `Date: ${this.date.toDateString()}`;
    eventCard.appendChild(dateElement);

    const timeElement = document.createElement("p");
    timeElement.textContent = `Time: ${this.time}`;
    eventCard.appendChild(timeElement);

    const locationElement = document.createElement("p");
    locationElement.textContent = `Location: ${this.location}`;
    eventCard.appendChild(locationElement);

     const ticketsElement = document.createElement("p");
    ticketsElement.textContent = `Tickets availabe: ${this.tickets}`;
    eventCard.appendChild(ticketsElement);

    const priceElement = document.createElement("p");
    priceElement.textContent = `Price:R${this.price}`;
    eventCard.appendChild(priceElement);

    const buttonElement = document.createElement("button");
    buttonElement.textContent = "Book Now";

    // Check if the event has already passed
    const currentDate = new Date();
    if (this.date < currentDate) {
      buttonElement.disabled = true; // Disable the button if the event has passed
      buttonElement.textContent = "Passed"; // Update the button text
    }

    // Add event listener to the button
    buttonElement.addEventListener("click", () => {
      // Store the event details in localStorage
      localStorage.setItem("selectedTicket", JSON.stringify(this));
      // Redirect to the ticket.html page
      window.location.href = "ticket.html";
      // Handle button click event here
      console.log("Button clicked!");
    });

    // Add the button to the event card
    eventCard.appendChild(buttonElement);

    // Return the event card element
    return eventCard;
  }
}

class Ticket extends Event {
  constructor(name, date, time, location, category, tickets, imageSrc, price) {
    super(name, date, time, location, category, tickets, imageSrc);
    this.price = price;
  }
}

// Create some events instances
const events = [
  new Ticket(
    "Gremlin Rally Ticket",
    "2023-09-15",
    "11:00:00",
    "Ganze kraal resort West Coast",
    "Paid",
    2000,
    "https://bikerpages.co.za/wp-content/uploads/2022/11/GhostRidersGremlinRally_15Sept2023.jpg",
    350
  ),
  new Ticket(
    "Dragon Rally Ticket",
    "2023-07-27",
    "07:30:00",
    "Tugela Mouth resort KZN",
    "Paid",
    500,
    "https://bikerpages.co.za/wp-content/uploads/2023/02/DragonRally_27July2023.jpg",
    350
  ),
  new Ticket(
    "Gemsbok Rally Ticket",
    "2023-07-28",
    "12:00:00",
    "Upington",
    "Paid",
    2000,
    "https://bikerpages.co.za/wp-content/uploads/2023/01/GemsbokRally_july_2023.jpg",
    400
  ),
  new Ticket(
    "Bundu Rally Ticket",
    "2023-07-29",
    "09:30:00",
    "Star Raceway Klerksdorp",
    "Paid",
    300,
    "https://bikerpages.co.za/wp-content/uploads/2023/06/BunduRally_28July2023.jpg",
    100
  ),
  new Ticket(
    "Buffalo Rally Ticket",
    "2023-10-27",
    "19:00:00",
    "ATKV Resort Hartenbos",
    "Paid",
    1800,
    "https://bikerpages.co.za/wp-content/uploads/2022/11/BuffaloMosselbay_27Oct2023.jpg",
    550
  ),
  new Ticket(
    "Poison Rally Ticket",
    "2023-12-01",
    "7:00:00",
    "Rustenburg Kloof NW",
    "Paid",
    1000,
    "https://bikerpages.co.za/wp-content/uploads/2022/12/PoisonRally2023.jpg",
    395
  ),
  new Ticket(
    "Toyrun Ticket",
    "2023-11-26",
    "07:30:00",
    "Fynnland Combined Sports Club",
    "free",
    1500,
    "https://toyrun.org.za/images/2020/12/08/trlogo.png",
    0
  ),
  new Ticket(
    "Look twice3 save a Life Ticket",
    "2023-07-29",
    "09:00:00",
    "Gold Reef City Arena Randburg",
    "free",
    1800,
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThSqGQtiqq3aJgB-QfBOPIcMNQkYDDEsZfQJo6Xa4fEQ&s",
    0
  ),
  new Ticket(
    "CMA Prayer Run Ticket",
    "2023-07-16",
    "07:00:00",
    "Bikers Church kimberley",
    "free",
    400,
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDUd5AsYb3PdUkiVCYz3S_pPvr7nqgmHBmiQ&usqp=CAU",
    0
  ),
];

// Function to render the events
function renderEvents(eventsToRender, categoryFilter = "paid", dateFilter = "all") {
  const eventListElement = document.getElementById("event-list");
  eventListElement.innerHTML = "";

  // Sort the events by date in ascending order
  eventsToRender.sort((a, b) => a.date.getTime() - b.date.getTime());

  const currentDate = new Date();

  eventsToRender.forEach((event) => {
    // Apply category filter if it is not set to 'all'
    if (categoryFilter === "all" || event.category === categoryFilter) {
      // Apply date filter based on user selection
      if (dateFilter === "all" && event.date >= currentDate) {
        const eventCard = event.render();
        eventListElement.appendChild(eventCard);
      } else if (dateFilter === "upcoming" && event.date >= currentDate) {
        const eventCard = event.render();
        eventListElement.appendChild(eventCard);
      } else if (dateFilter === "passed" && event.date < currentDate) {
        const eventCard = event.render();
        eventListElement.appendChild(eventCard);
      }
    }
  });
}


// Function to handle search event
function handleSearch() {
  const searchInput = document.getElementById("search-input");
  const searchTerm = searchInput.value.toLowerCase();

  const categoryFilter = document.getElementById("category-filter").value;
  const dateFilter = document.getElementById("date-filter").value;

  const filteredEvents = events.filter((event) => {
    const eventName = event.name.toLowerCase();
    return eventName.includes(searchTerm);
  });

  renderEvents(filteredEvents, categoryFilter, dateFilter);
}

// Event listener for search input
const searchInput = document.getElementById("search-input");
searchInput.addEventListener("input", handleSearch);

// Event listener for category filter
const categoryFilter = document.getElementById("category-filter");
categoryFilter.addEventListener("change", handleSearch);

// Event listener for date filter
const dateFilter = document.getElementById("date-filter");
dateFilter.addEventListener("change", handleSearch);

// Call the handleSearch function initially to display all events
handleSearch();

// Call the renderEvents function to display the events initially
renderEvents(events);
