const WEB_APP_URL =
"https://round-wood-a485.hanhborn.workers.dev/";

const lopHoc =
document.getElementById("lopHoc");

const formSection =
document.getElementById("formSection");

const hoTen =
document.getElementById("hoTen");

const lienHeHocSinh =
document.getElementById("lienHeHocSinh");

const studentPhoneGroup =
document.getElementById("studentPhoneGroup");

const sdtPhuHuynh =
document.getElementById("sdtPhuHuynh");

const truongHoc =
document.getElementById("truongHoc");

const submitBtn =
document.getElementById("submitBtn");

const message =
document.getElementById("message");

const scheduleImage =
document.getElementById("scheduleImage");

const THCS_THPT = [
"THCS Nguyễn Du",
"THCS Nguyễn Huệ",
"THCS Trần Phú",
"THCS Lý Tự Trọng",
"THCS Trưng Vương",
"THCS Tôn Đức Thắng",
"THCS Nguyễn Viết Xuân",
"THCS Nguyễn Văn Cừ",
"THCS Phạm Hồng Thái",
"THCS Quang Trung",
"THPT chuyên Hùng Vương",
"THPT Phan Bội Châu",
"THPT Pleiku",
"THPT Lê Lợi",
"THPT Hoàng Hoa Thám",
"THPT Nguyễn Chí Thanh",
"Trường khác"
];

lopHoc.addEventListener(
"change",
buildForm
);

hoTen.addEventListener(
"input",
validateForm
);

lienHeHocSinh.addEventListener(
"input",
validateForm
);

sdtPhuHuynh.addEventListener(
"input",
validateForm
);

truongHoc.addEventListener(
"change",
validateForm
);

function buildForm() {

const lop = lopHoc.value;

if (!lop) {

    formSection.style.display =
        "none";

    submitBtn.disabled = true;

    return;
}

formSection.style.display =
    "block";

message.innerHTML = "";

loadSchools(
    THCS_THPT
);

scheduleImage.src =
    `images/lop${lop}.jpg`;

if (lop === "9") {

    studentPhoneGroup.style.display =
        "none";

    lienHeHocSinh.value = "";
}
else {

    studentPhoneGroup.style.display =
        "block";
}

validateForm();


}

function loadSchools(list) {


truongHoc.innerHTML =
    '<option value="">-- Chọn trường --</option>';

list.forEach(item => {

    const option =
        document.createElement("option");

    option.value = item;
    option.textContent = item;

    truongHoc.appendChild(option);
});


}

function validName() {


const words =
    hoTen.value
        .trim()
        .replace(/\s+/g, " ")
        .split(" ");

return words.length >= 2;


}

function validParentPhone() {

return /^0\d{9}$|^0\d{10}$/.test(
    sdtPhuHuynh.value.trim()
);


}

function validStudentPhone() {


return /^0\d{9}$|^0\d{10}$/.test(
    lienHeHocSinh.value.trim()
);


}

function validateForm() {


let ok = true;

if (!lopHoc.value)
    ok = false;

if (!validName())
    ok = false;

if (!validParentPhone())
    ok = false;

if (!truongHoc.value)
    ok = false;

if (
    ["10", "11", "12"].includes(
        lopHoc.value
    )
) {
    if (!validStudentPhone())
        ok = false;
}

submitBtn.disabled = !ok;

}

submitBtn.addEventListener(
"click",
submitForm
);

async function submitForm() {

submitBtn.disabled = true;

message.className =
    "loading";

message.innerHTML =
    "Đang gửi đăng ký...";

const data = {

    lop:
        lopHoc.value,

    hoTen:
        hoTen.value.trim(),

    lienHeHocSinh:
        lienHeHocSinh.value.trim(),

    sdtPhuHuynh:
        sdtPhuHuynh.value.trim(),

    truongHoc:
        truongHoc.value
};

try {

    const response =
        await fetch(
            WEB_APP_URL,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body:
                    JSON.stringify(data)
            }
        );

    const result =
        await response.json();

    if (result.success) {

        document.querySelector(
            ".card"
        ).innerHTML = `
            <div style="
                text-align:center;
                padding:40px 20px;
            ">
                <h2 style="
                    color:#0f4c81;
                    margin-bottom:25px;
                ">
                    Đăng ký thành công!
                </h2>

                <p style="
                    font-size:20px;
                    line-height:1.8;
                    color:#0f4c81;
                ">
                    Hãy nhắn tin cho cô Hân thông qua
                    <b>FB: Từ Nhật Hà Linh</b>
                    <br><br>
                    hoặc zalo:
                    <b>0392365563</b>
                </p>
            </div>
        `;
    }
    else {

        message.className =
            "error";

        message.innerHTML =
            result.message ||
            "Không ghi được dữ liệu.";

        validateForm();
    }
}
catch (err) {

    console.error(err);

    message.className =
        "error";

    message.innerHTML =
        "Không gửi được dữ liệu. Vui lòng thử lại.";

    validateForm();
}

}
