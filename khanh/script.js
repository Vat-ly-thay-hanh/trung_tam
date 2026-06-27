const WEB_APP_URL =
"https://snowy-waterfall-9300.hanhborn.workers.dev/";

const lopHoc =
document.getElementById("lopHoc");

const formSection =
document.getElementById("formSection");

const fullMessage =
document.getElementById("fullMessage");

const hoTen =
document.getElementById("hoTen");

const sdtPhuHuynh =
document.getElementById("sdtPhuHuynh");

const lienHeHocSinh =
document.getElementById("lienHeHocSinh");

const truongHoc =
document.getElementById("truongHoc");

const submitBtn =
document.getElementById("submitBtn");

const message =
document.getElementById("message");

const scheduleImage =
document.getElementById("scheduleImage");

const groupSection =
document.getElementById("groupSection");

const THPT = [
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

sdtPhuHuynh.addEventListener(
"input",
validateForm
);

lienHeHocSinh.addEventListener(
"input",
validateForm
);

truongHoc.addEventListener(
"change",
validateForm
);

function buildForm() {

const lop = lopHoc.value;

fullMessage.style.display =
    "none";

fullMessage.innerHTML = "";

formSection.style.display =
    "none";

groupSection.style.display =
    "none";

submitBtn.disabled = true;

message.innerHTML = "";

if (!lop)
    return;

if (
    lop === "8" ||
    lop === "9" ||
    lop === "11" ||
    lop === "12"
) {

    fullMessage.style.display =
        "block";

    fullMessage.innerHTML =
        "Lớp đã đầy.";

    return;
}

formSection.style.display =
    "block";

groupSection.style.display =
    "block";

loadSchools(THPT);

scheduleImage.src =
    "images/lich10.jpg";

document
    .querySelectorAll(
        'input[name="nhomHoc"]'
    )
    .forEach(radio => {

        radio.checked = false;

        radio.addEventListener(
            "change",
            validateForm
        );
    });

validateForm();

}

function loadSchools(list) {

truongHoc.innerHTML =
    '<option value="">-- Chọn trường --</option>';

list.forEach(item => {

    const option =
        document.createElement(
            "option"
        );

    option.value = item;
    option.textContent = item;

    truongHoc.appendChild(
        option
    );
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

function validPhone(phone) {

return /^0\d{9}$|^0\d{10}$/.test(
    phone.trim()
);

}

function validateForm() {

let ok = true;

if (lopHoc.value !== "10")
    ok = false;

if (!validName())
    ok = false;

if (
    !validPhone(
        sdtPhuHuynh.value
    )
)
    ok = false;

if (
    !validPhone(
        lienHeHocSinh.value
    )
)
    ok = false;

if (!truongHoc.value)
    ok = false;

const nhomHoc =
    document.querySelector(
        'input[name="nhomHoc"]:checked'
    );

if (!nhomHoc)
    ok = false;

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

const nhomHoc =
    document.querySelector(
        'input[name="nhomHoc"]:checked'
    );

const data = {

    lop: lopHoc.value,

    hoTen:
        hoTen.value.trim(),

    sdtPhuHuynh:
        sdtPhuHuynh.value.trim(),

    lienHeHocSinh:
        lienHeHocSinh.value.trim(),

    truongHoc:
        truongHoc.value,

    nhomHoc:
        nhomHoc
            ? nhomHoc.value
            : ""
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

                body: JSON.stringify(
                    data
                )
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
                Đã đăng ký thành công!
            </h2>

            <p style="
                font-size:20px;
                line-height:1.8;
                color:#0f4c81;
            ">
                Hãy nhắn tin cho thầy Khanh qua
                <br><br>
                <b>FB: Từ Văn Khanh</b>
                <br><br>
                hoặc Zalo:
                <br>
                <b>0967005293</b>
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