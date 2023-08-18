const form = document.getElementById("myForm");
const formData = new FormData(form);
const receptNumberInput = document.getElementById("recept-number");
const reservDateInput = document.getElementById("reserv-date");
const receptionistInput = document.getElementById("receptionist");
const userNameInput = document.getElementById("user-name");
const clientPhoneInput = document.getElementById("client-phone");
const clientPhoneSecondInput = document.getElementById("client-phone-second");
const hotelInput = document.getElementById("hotel");
const clientSeatsInput = document.getElementById("client-seats");
const roomSingleInput = document.getElementById("room-single");
const roomDoubleInput = document.getElementById("room-double");
const roomTribleInput = document.getElementById("room-trible");
const adultsNumberInput = document.getElementById("adults-number");
const childrenUnder6Input = document.getElementById("children-under-6");
const childrenAbove6Input = document.getElementById("children-above-6");
const roomTypeInput = document.getElementById("roomType");
const residenceInput = document.getElementById("residence");
const stayDurationInput = document.getElementById("stayDuration");
const periodFromInput = document.getElementById("period-from");
const periodToInput = document.getElementById("period-to");
const personValueInput = document.getElementById("personValue");
const totalAmountInput = document.getElementById("totalAmount");
const paidAmountInput = document.getElementById("paidAmount");
const remainingAmountInput = document.getElementById("balance");
const notesInput = document.getElementById("notes");
const submitBtn = document.getElementById("submit");

//

stayDurationInput.addEventListener("input", () => {
  const stayDurationNights = document.getElementById("stayDurationNights");
  stayDurationNights.innerText = Number(stayDurationInput.value) + 1;
});

function preventNegative(e) {
  const input = e.target;
  const inputValue = parseFloat(input.value);

  if (inputValue < 0) {
    input.value = 0; // Set the value to 0 if it's negative
  }
}
