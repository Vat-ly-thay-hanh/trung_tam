const WEB_APP_URL = "https://mute-credit-dac6.hanhborn.workers.dev/";

const lopHoc = document.getElementById("lopHoc");
const formSection = document.getElementById("formSection");

const hoTen = document.getElementById("hoTen");
const sdtPhuHuynh = document.getElementById("sdtPhuHuynh");
const lienHeHocSinh = document.getElementById("lienHeHocSinh");

const truongHoc = document.getElementById("truongHoc");

const submitBtn = document.getElementById("submitBtn");
const message = document.getElementById("message");

const scheduleImage = document.getElementById("scheduleImage");

const groupSection = document.getElementById("groupSection");
const groupTableContainer = document.getElementById("groupTableContainer");

const lienHeHocSinhGroup =
document.getElementById("lienHeHocSinhGroup");

const THCS = [
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
    "Trường khác"
];

const THPT = [
    "THPT chuyên Hùng Vương",
    "THPT Phan Bội Châu",
    "THPT Pleiku",
    "THPT Lê Lợi",
    "THPT Hoàng Hoa Thám",
    "THPT Nguyễn Chí Thanh",
    "Trường khác"
];

lopHoc.addEventListener("change", buildForm);

hoTen.addEventListener("input", validateForm);
sdtPhuHuynh.addEventListener("input", validateForm);
lienHeHocSinh.addEventListener("input", validateForm);
truongHoc.addEventListener("change", validateForm);

function buildForm() {

    const lop = lopHoc.value;

    if (!lop) {
        formSection.style.display = "none";
        submitBtn.disabled = true;
        return;
    }

    formSection.style.display = "block";

    message.innerHTML = "";

    groupTableContainer.innerHTML = "";

    groupSection.style.display = "none";

    if (lop === "9") {

        lienHeHocSinh.value = "";

        lienHeHocSinhGroup.style.display = "none";

        loadSchools(THCS);

        scheduleImage.src = "images/lich9.jpg";
    }

    if (lop === "10") {

        lienHeHocSinhGroup.style.display = "block";

        loadSchools(THPT);

        scheduleImage.src = "images/lich10.jpg";

        createGroupTable([
            "10A",
            "10B",
            "10C"
        ]);
    }

    if (lop === "11") {

        lienHeHocSinhGroup.style.display = "block";

        loadSchools(THPT);

        scheduleImage.src = "images/lich11.jpg";

        createGroupTable([
            "11A",
            "11B"
        ]);
    }

    if (lop === "12") {

        lienHeHocSinhGroup.style.display = "block";

        loadSchools(THPT);

        scheduleImage.src = "images/lich12.jpg";

        createGroupTable([
            "12A",
            "12B",
            "12C"
        ]);
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

function createGroupTable(groups) {

    groupSection.style.display = "block";

    let html = "";

    html += '<table class="group-table">';

    html += '<tr>';
    html += '<th>Buổi</th>';

    groups.forEach(group => {
        html += `<th>${group}</th>`;
    });

    html += '</tr>';

    for (let i = 1; i <= 3; i++) {

        html += '<tr>';

        html += `<td><strong>Buổi ${i}</strong></td>`;

        groups.forEach(group => {

            html += `
            <td>
                <input
                    type="radio"
                    name="buoi${i}"
                    value="${group}">
            </td>
            `;
        });

        html += '</tr>';
    }

    html += '</table>';

    groupTableContainer.innerHTML = html;

    document
        .querySelectorAll('input[type="radio"]')
        .forEach(radio => {
            radio.addEventListener(
                "change",
                validateForm
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

function validParentPhone() {

    return /^0\d{9}$|^0\d{10}$/.test(
        sdtPhuHuynh.value.trim()
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

    if (lopHoc.value !== "9") {

        if (
            lienHeHocSinh.value.trim() === ""
        ) {
            ok = false;
        }

        for (let i = 1; i <= 3; i++) {

            const selected =
                document.querySelector(
                    `input[name="buoi${i}"]:checked`
                );

            if (!selected)
                ok = false;
        }
    }

    submitBtn.disabled = !ok;
}

submitBtn.addEventListener(
    "click",
    submitForm
);

async function submitForm() {

    submitBtn.disabled = true;

    message.className = "loading";

    message.innerHTML =
        "Đang gửi đăng ký...";

    const data = {

        lop: lopHoc.value,

        hoTen: hoTen.value.trim(),

        sdtPhuHuynh:
            sdtPhuHuynh.value.trim(),

        lienHeHocSinh:
            lopHoc.value === "9"
                ? ""
                : lienHeHocSinh.value.trim(),

        truongHoc:
            truongHoc.value,

        buoi1:
            getSelected("buoi1"),

        buoi2:
            getSelected("buoi2"),

        buoi3:
            getSelected("buoi3")
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

                    body: JSON.stringify(data)
                }
            );

        const result =
            await response.json();

        if (result.success) {

            document.querySelector(".card").innerHTML = `
            <div style="
                text-align:center;
                padding:40px 20px;
            ">
                <h2 style="
                    color:#0f4c81;
                    margin-bottom:25px;
                ">
                    Đã đăng kí thành công!
                </h2>

                <p style="
                    font-size:20px;
                    line-height:1.8;
                    color:#0f4c81;
                ">
                    Hãy nhắn tin cho thầy Hạnh thông qua
                    <b>FB: Đỗ Xuân Hạnh</b>
                    <br><br>
                    hoặc zalo:
                    <b>0989739841</b>
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

function getSelected(name) {

    const item =
        document.querySelector(
            `input[name="${name}"]:checked`
        );

    return item ? item.value : "";
}
