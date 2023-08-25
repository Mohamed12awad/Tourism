import {
  getFirestore,
  getDoc,
  doc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

const firestore = getFirestore();
const userId = sessionStorage.getItem("userID");

const submitEdit = document.getElementById("submitEdit");
const printSec = document.getElementById("printSec");

// Load existing user data and populate the remainingAmount field
const userDocRef = doc(firestore, "users", userId);
const userDocSnapshot = await getDoc(userDocRef);
const userData = userDocSnapshot.data();

const formFields = [
  { id: "receptionist", label: "الموظف مسؤول :" },
  { id: "client-phone-second", label: "هاتف مسؤول الحجز:" },
  { id: "user-name", label: "اسم العميل:" },
  { id: "client-phone", label: "رقم هاتف العميل:" },
  { id: "hotel", label: "اسم الرحلة:" },
  { id: "hotel", label: "الفندق:" },
  { id: "client-seats", label: "عدد الكراسى:" },
  { id: "room-single", label: "غرفة سنجل:" },
  { id: "room-double", label: "غرفة دبل:" },
  { id: "room-trible", label: "غرفة تريبل:" },
  { id: "adults-number", label: "عدد البالغين:" },
  { id: "children-under-6", label: "تحت 6 سنوات:" },
  { id: "children-above-6", label: "فوق 6 سنوات وحتى 12:" },
  { id: "roomType", label: "نوع الغرفة:" },
  { id: "residence", label: "نوع الاقامة:" },
  { id: "stayDuration", label: "مدة الرحلة:" },
  { id: "period-from", label: "الفترة من:" },
  { id: "period-to", label: "الفترة الى:" },
  { id: "personValue", label: "قيمة الفرد:" },
  { id: "totalAmount", label: "اجمالي الرحلة:" },
  { id: "paidAmount", label: "المبلغ المدفوع:" },
  { id: "balance", label: "الباقي:" },
  { id: "notes", label: "ملاحظات:" },
];

receptionistInput.value = userData.receptionist;
userNameInput.value = userData.userName;
clientPhoneInput.value = userData.clientPhone;
clientPhoneSecondInput.value = userData.clientPhoneSecond;
tripName.value = userData.tripName;
hotelInput.value = userData.hotel;
clientSeatsInput.value = userData.clientSeats;
roomSingleInput.value = userData.roomSingle;
roomDoubleInput.value = userData.roomDouble;
roomTribleInput.value = userData.roomTrible;
adultsNumberInput.value = userData.adultsNumber;
childrenUnder6Input.value = userData.childrenUnder6;
childrenAbove6Input.value = userData.childrenAbove6;
roomTypeInput.value = userData.roomType;
residenceInput.value = userData.residence;
stayDurationInput.value = userData.stayDuration;
periodFromInput.value = userData.periodFrom;
periodToInput.value = userData.periodTo;
personValueInput.value = userData.personValue;
totalAmountInput.value = userData.totalAmount;
paidAmountInput.value = userData.paidAmount;
remainingAmountInput.value = userData.remainingAmount;
notesInput.value = userData.notes;

myForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const updatedData = {
    receptionist: receptionistInput.value,
    userName: userNameInput.value,
    clientPhone: clientPhoneInput.value,
    clientPhoneSecond: clientPhoneSecondInput.value,
    tripName: tripName.value,
    hotel: hotelInput.value,
    clientSeats: clientSeatsInput.value,
    roomSingle: roomSingleInput.value,
    roomDouble: roomDoubleInput.value,
    roomTrible: roomTribleInput.value,
    adultsNumber: adultsNumberInput.value,
    childrenUnder6: childrenUnder6Input.value,
    childrenAbove6: childrenAbove6Input.value,
    roomType: roomTypeInput.value,
    residence: residenceInput.value,
    stayDuration: stayDurationInput.value,
    periodFrom: periodFromInput.value,
    periodTo: periodToInput.value,
    personValue: personValueInput.value,
    totalAmount: totalAmountInput.value,
    paidAmount: paidAmountInput.value,
    remainingAmount: remainingAmountInput.value,
    notes: notesInput.value,
  };

  const userDocRef = doc(firestore, "users", userId);
  await updateDoc(userDocRef, updatedData);
  // Generate and print the receipt
  printUserDataTable();
  window.location.href = "./profile.html";
});
editDuration();
// Function to generate receipt content using the template
