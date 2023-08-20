import {
  getFirestore,
  collection,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

const firestore = getFirestore();
const userId = sessionStorage.getItem("userID");

const userDetailsContainer = document.getElementById("user-details");

// Fetch user data from Firestore
const userDocRef = doc(collection(firestore, "users"), userId);
const userDocSnapshot = await getDoc(userDocRef);

const userData = userDocSnapshot.data();

const fieldMappings = [
  { id: "receptionist", label: "الموظف مسؤول :" },
  { id: "clientPhoneSecond", label: "هاتف مسؤول الحجز:" },
  { id: "userName", label: "اسم العميل:" },
  { id: "clientPhone", label: "رقم هاتف العميل:" },
  { id: "receptNumber", label: "رقم الايصال:" },
  { id: "reservDate", label: "تاريخ الحجز:" },
  { id: "tripName", label: "اسم الرحلة:" },
  { id: "hotel", label: "الفندق:" },
  { id: "clientSeats", label: "عدد الكراسى:" },
  { id: "roomSingle", label: "غرفة سنجل:" },
  { id: "roomDouble", label: "غرفة دبل:" },
  { id: "roomTrible", label: "غرفة تريبل:" },
  { id: "adultsNumber", label: "عدد البالغين:" },
  { id: "childrenUnder6", label: "تحت 6 سنوات:" },
  { id: "childrenAbove6", label: "فوق 6 سنوات وحتى 12:" },
  { id: "roomType", label: "نوع الغرفة:" },
  { id: "residence", label: "نوع الاقامة:" },
  { id: "stayDuration", label: "مدة الرحلة:" },
  { id: "periodFrom", label: "الفترة من:" },
  { id: "periodTo", label: "الفترة الى:" },
  { id: "personValue", label: "قيمة الفرد:" },
  { id: "totalAmount", label: "اجمالي الرحلة:" },
  { id: "paidAmount", label: "المبلغ المدفوع:" },
  { id: "remainingAmount", label: "المتبقى:" },
  { id: "notes", label: "ملاحظات:" },
];

// Update user details using fieldMappings
fieldMappings.forEach((field) => {
  const element = document.getElementById(field.id);
  if (element) {
    element.innerHTML = `
    <span class="w-50 d-block">${
      field.label
    }</span> <span class="w-50 d-block">${userData[field.id]}</span>`;
  }
});

// // Display user details
// userDetailsContainer.innerHTML += `
//         <h3>${userData.userName}</h3>
//         <p>Phone: ${userData.clientPhone}</p>
//         <p>Hotel: ${userData.hotel}</p>
//         <!-- Display other user details as needed -->
//       `;
