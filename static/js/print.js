const formFields = [
  { id: "receptionist", label: "الموظف المسئول:" },
  { id: "user-name", label: "اسم العميل:" },
  { id: "client-phone", label: "رقم هاتف العميل:" },
  { id: "client-phone-second", label: "رقم الموبايل:" },
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
const outputRow = document.getElementById("output-row");

function printUserDataTable() {
  const userDataTable = document.getElementById("userDataTable");
  const popupWin = window.open("", "_blank", "width=600,height=600");
  popupWin.document.open();

  outputRow.innerHTML = "";

  // Loop through the form fields and create output divs
  formFields.forEach((field) => {
    const inputElement = document.getElementById(field.id);
    const outputDiv = document.createElement("li");
    outputDiv.classList.add(
      "col-6",
      "output-div",
      "d-flex",
      "justify-content-between",
      "border-bottom"
    );

    const strongElement = document.createElement("strong");
    strongElement.textContent = field.label;

    const spanElement = document.createElement("span");
    spanElement.textContent = inputElement.value;

    outputDiv.appendChild(strongElement);
    outputDiv.appendChild(spanElement);

    outputRow.appendChild(outputDiv);
  });
  popupWin.document.write(`
      <html>
        <head>
        <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>فاتورة - ${userNameInput.value}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Josefin+Sans&display=swap"
          rel="stylesheet"
        />
        <link href="./static/css/bootstrap.min.css" rel="stylesheet" />
        <link rel="stylesheet" href="./static/css/style.css" />
      </head>
        <body>
        <nav class="navbar">
        <div class="container d-flex flex-row-reverse">
          <a title="Main" href="#" class="logo navbar-brand">
            <img src="./static/imgs/logo1.png" height="80" width="80" alt="" />
          </a>
          <a class="navbar-brand fs-2">شركة سحاب للسياحة</a>
        </div>
      </nav>
          ${userDataTable.innerHTML}
  
          <section class="details d-print-block">
          <div class="container">
            <h2>شــــــــروط الحجـــز :</h2>
            <ul class="list-group">
              <li class="list-group-item py-1">
                يقر العميل بأنه قد قام بمراجعة البيانات وان جميع البيانات المذكورة
                صحيحة.
              </li>
              <li class="list-group-item py-1">
                يقر العميل بأن عدد الأفراد المذكور في طلب الحجز هو العدد الفعلي وفي
                حالة دخول اكثر من هذا العدد يتم محاسبتهم نقدا قبل التسكين.
              </li>
              <li class="list-group-item py-1">
                يقر العميل بإلتزامه بالمواعيد المحددة للتسكين والمغادرة، والتعليمات
                الخاصة من الفندق وذلك دون ادنى مسئولية من الشركة.
              </li>
              <li class="list-group-item py-1">
                يرجى العلم بأن في حالة حجز غرفة ثلاثية يتم استلام غرفة مزدوجة وبعد
                ميعاد التسكين يتم اضافة سرير.
              </li>
              <li class="list-group-item py-1">
                يقر العميل بأن هذا الحجز غير قابل للإلغاء او رد قيمة المبلغ المدفوع
                وذلك قبل ميعاد السفر بأسبوعين.
              </li>
              <li class="list-group-item py-1">
                في حالة إلغاء الحجز يتم خصم قيمة ليلة من اجمالي اقامة الفندق وذلك
                بحد اقصى اسبوعين عن ميعاد السفر.
              </li>
              <li class="list-group-item py-1">
                في حالة حجز العميل بالأنتقالات تلتزم الشركة بتوصيل العميل الي مكان
                الحجز دون ادنى مسئولية علي الشركة.
              </li>
              <li class="list-group-item py-1">
                الشركة غير مسئولة عن اي اعطال او تأخيرات خارجه عن ارادتها او اي
                مفقودات او تلفيات وهي مسئولية العميل.
              </li>
              <li class="list-group-item py-1">
                في حالة عدم امكانية الشركة اتمام الحجز لأي سبب خارجه عن ارادتها تكون
                ملزمه برد المبلغ المدفوع او تغيير الحجز.
              </li>
              <li class="list-group-item py-1">
                يرجى العلم بأن اذا زادت اسعار السولار سيتم زيادة السعر.
              </li>
              <li class="list-group-item py-1">
                الشركة غير مسئولة عن المتعلقات الشخصية للعميل.
              </li>
              <li class="list-group-item py-1">
                يقر العميل بأنه قد قرأ جميع الشروط السابقة والموافقة قبل التوقيع على
                طلب الحجز.
              </li>
            </ul>
          </div>
        </section>
        </body>
      </html>
    `);
  popupWin.document.close();
  popupWin.print();
}
