const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");

const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

var tickerPrice = +movieSelect.value;

// Call init functions ...
populateUI();

// Set intial count and value
updateSelectedCount();

// Get data from local storage and populate UI
function populateUI() {
  ss = localStorage.getItem("selectedSeats");
  const selectedSeats = JSON.parse(ss);
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const movie = JSON.parse(localStorage.getItem("selectedMovie"));
  movieSelect.selectedIndex = movie;

  updateSelectedCount();
}

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const allSeats = [...seats];

  const seatsIndex = [...selectedSeats].map((i) => allSeats.indexOf(i));
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  tickerPrice = +movieSelect.value;
  sts = selectedSeats.length;
  ttl = sts * tickerPrice;
  count.innerText = sts;
  total.innerText = ttl;
}

// Movie change event
movieSelect.addEventListener("change", (e) => {
  tickerPrice = +e.target.value;
  console.log(JSON.stringify(e.target.selectedIndex));
  localStorage.setItem("selectedMovie", JSON.stringify(e.target.selectedIndex));
  updateSelectedCount();
});

// Seat click evwnt
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");

    updateSelectedCount();
  }
});
