import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  query,
  orderBy,
  getDocs,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyBIM1QBIUT3DA3VJHIm7gCBEBKN8s53cZA",
  authDomain: "tourism-13.firebaseapp.com",
  projectId: "tourism-13",
  storageBucket: "tourism-13.appspot.com",
  messagingSenderId: "889757960308",
  appId: "1:889757960308:web:bee2178077f264326ee921",
  measurementId: "G-9FVN8MDVPE",
});

// Initialize Firebase
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

const querySnapshot = await getDocs(
  query(collection(db, "users"), orderBy("reservDate", "desc"))
);
const snapSize = querySnapshot.size;
// console.log(snapSize);

// const submitBtn = document.querySelector("#submit");

if (myForm) {
  myForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = {
      receptNumber: (snapSize + 1).toString(),
      reservDate: new Date(),
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
    let val = Object.keys(formData);
    // console.log(first);
    let isEmpty = false;

    for (const fieldValue of val) {
      let vall = String(formData[fieldValue]).trim();
      if (fieldValue === "notes") {
        continue; // Skip the "notes" field
      } else if (!vall) {
        isEmpty = true;
        console.log(`Field "${fieldValue}" is empty.`);
        break;
      }
      // console.log(`${fieldValue}="${formData[fieldValue]}" `);
    }
    if (!isEmpty) {
      // alert("All fields are filled.");

      try {
        const docRef = await addDoc(collection(db, "users"), formData);

        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      printUserDataTable();
      location.href = "./";
    }
  });
}
// --------------  reading data from firebase ----------------
