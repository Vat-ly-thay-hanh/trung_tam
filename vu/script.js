const WEB_APP_URL = "https://icy-frost-8241.hanhborn.workers.dev/";

const lopHoc = document.getElementById("lopHoc");
const formSection = document.getElementById("formSection");

const hoTen = document.getElementById("hoTen");
const sdtPhuHuynh = document.getElementById("sdtPhuHuynh");
const sdtHocSinh = document.getElementById("sdtHocSinh");
const lienHeHocSinh = document.getElementById("lienHeHocSinh");

const truongHoc = document.getElementById("truongHoc");

const submitBtn = document.getElementById("submitBtn");
const message = document.getElementById("message");

const scheduleImage = document.getElementById("scheduleImage");

const groupSection = document.getElementById("groupSection");
const groupTableContainer = document.getElementById("groupTableContainer");
const groupTitle = document.getElementById("groupTitle");

const lienHeHocSinhGroup = document.getElementById("lienHeHocSinhGroup");
const sdtHocSinhGroup = document.getElementById("sdtHocSinhGroup");

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

const CLASS_LIMITS = {
    Lop8: 20,
    Lop9: 10,
    Lop10A: 30,
    Lop10B: 30,
    Lop11A: 40,
    Lop11B: 30,
    Lop12A: 0,
    Lop12B: 0,
    Lop12C: 20
};
let classCounts = {};
let countsLoaded = false;

hoTen.addEventListener("input", validateForm);
sdtPhuHuynh.addEventListener("input", validateForm);
sdtHocSinh.addEventListener("input",validateForm);
lienHeHocSinh.addEventListener("input", validateForm);
truongHoc.addEventListener("change", validateForm);

async function loadCounts() {

    try {

        const response =
            await fetch(WEB_APP_URL);

        if (!response.ok) {
            throw new Error(
                `HTTP ${response.status}`
            );
        }

        const result =
            await response.json();

        if (result.success) {

            classCounts = result.counts || {};
            countsLoaded = true;

            // Nếu người dùng đã chọn lớp rồi
            if (lopHoc.value) {
                buildForm();
            }
        }

    } catch (err) {

        console.error(err);

        message.className = "error";
        message.textContent =
            "Không tải được dữ liệu lớp học.";
    }
}

window.addEventListener(
    "load",
    () => {

        lopHoc.addEventListener(
            "change",
            buildForm
        );

        loadCounts();
    }
);

function buildForm() {

    if (!countsLoaded) {

    message.className = "loading";
    message.textContent =
        "Đang tải dữ liệu lớp học...";

    return;
    }

    const lop = lopHoc.value;

    if (!lop) {

        formSection.style.display = "none";
        message.style.display = "None"
        submitBtn.disabled = true;

        return;
    }

    formSection.style.display = "block";
    message.style.display = "block"

    message.innerHTML = "";

    groupTableContainer.innerHTML = "";
    groupSection.style.display = "none";

    if (lop === "8") {

        const sheetName = "Lop8"
        const current = classCounts[sheetName] || 0;
        const limit = CLASS_LIMITS[sheetName];
        
        if (current >= limit) {

            formSection.style.display = "none";

            message.className = "error";
            message.innerHTML =
                `Lớp đã đầy.`;

            submitBtn.disabled = true;

            return;
        }    

        formSection.style.display = "block";
        submitBtn.disabled = false;
    
        lienHeHocSinh.value = "";
        sdtHocSinh.value = "";

        lienHeHocSinhGroup.style.display = "none";
        sdtHocSinhGroup.style.display = "none"

        loadSchools(THCS);

        scheduleImage.src = "images/lop8.jpg";

        message.className = "success";
        message.textContent =
            `Lớp còn ${limit - current} chỗ`;
        
    }


    if (lop === "9") {

        const sheetName = "Lop9"
        const current = classCounts[sheetName] || 0;
        const limit = CLASS_LIMITS[sheetName];
        
        if (current >= limit) {

            formSection.style.display = "none";

            message.className = "error";
            message.innerHTML =
                `Lớp đã đầy.`;

            submitBtn.disabled = true;

            return;
        }    

        formSection.style.display = "block";
        submitBtn.disabled = false;
    
        lienHeHocSinh.value = "";
        sdtHocSinh.value = "";

        lienHeHocSinhGroup.style.display = "none";
        sdtHocSinhGroup.style.display = "none"

        loadSchools(THCS);

        scheduleImage.src = "images/lop9.jpg";

        message.className = "success";
        message.textContent =
            `Lớp còn ${limit - current} chỗ`;
        
    }

    if (lop === "10") {

        lienHeHocSinhGroup.style.display = "block";
        sdtHocSinhGroup.style.display = "block";

        loadSchools(THPT);

        scheduleImage.src = "images/lop10.jpg";

        groupTitle.textContent = "Chọn nhóm học";
        createClassCards([
            "10A",
            "10B"
        ]);
        
    }

    if (lop === "11") {

        lienHeHocSinhGroup.style.display = "block";
        sdtHocSinhGroup.style.display = "block";

        loadSchools(THPT);

        scheduleImage.src = "images/lop11.jpg";
        groupTitle.textContent = "Chọn nhóm học";
        createClassCards([
            "11A",
            "11B"
        ]);
    }

    if (lop === "12") {

        lienHeHocSinhGroup.style.display = "block";
        sdtHocSinhGroup.style.display = "block";

        loadSchools(THPT);

        scheduleImage.src = "images/lop12.jpg";

        groupTitle.textContent = "Chọn nhóm học";
        createClassCards([
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

function createGroupTable_3(groups) {
    // Hàm tạo bảng chọn chéo lớp có 3 buổi

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

function createGroupTable_2(groups) {
    // Hàm tạo bảng chéo nhóm có 2 buổi

    groupSection.style.display = "block";

    let html = "";

    html += '<table class="group-table">';

    html += '<tr>';
    html += '<th>Buổi</th>';

    groups.forEach(group => {
        html += `<th>${group}</th>`;
    });

    html += '</tr>';

    for (let i = 1; i <= 2; i++) {

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

function createClassCards(groups) {

    groupSection.style.display = "block";
    groupTableContainer.innerHTML = "";

    const wrapper = document.createElement("div");
    wrapper.className = "class-selection";

    const sheetMap = {

        "10A": "Lop10A",
        "10B": "Lop10B",

        "11A": "Lop11A",
        "11B": "Lop11B",

        "12A": "Lop12A",
        "12B": "Lop12B",
        "12C": "Lop12C"
    };

    groups.forEach(group => {

        const sheetName =
            sheetMap[group];

        const current =
            classCounts[sheetName] || 0;

        const limit =
            CLASS_LIMITS[sheetName];

        const full =
            current >= limit;

        const label = document.createElement("label");
        label.className = "class-card";

        label.innerHTML = `
            <div class="class-info">

                <div class="class-title">
                    ${group}
                </div>

                ${
                    full
                    ? '<div class="full">Lớp đã đầy</div>'
                    : `<div>Còn ${limit - current} chỗ</div>`
                }

            </div>

            <input
                type="radio"
                name="nhomHoc"
                value="${group}"
                ${full ? "disabled" : ""}
            >
        `;

        wrapper.appendChild(label);
    });

    groupTableContainer.appendChild(wrapper);

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

    if (lopHoc.value !== "9" && lopHoc.value !== "8" ) {

        if (
            sdtHocSinh.value.trim() === "" &&
            lienHeHocSinh.value.trim() === ""
        ) {
            ok = false;
        }
    }

/*
// Kiểm tra xem đã chọn đủ số buổi của lớp 11 hoặc 10 chưa, nếu đã đủ => bật sáng nút đăng kí
    if (
        lopHoc.value === "11" ||
        lopHoc.value === "10"
    ) {

        for (let i = 1; i <= 3; i++) {

            const selected =
                document.querySelector(
                    `input[name="buoi${i}"]:checked`
                );

            if (!selected)
                ok = false;
        }
    }
*/

    if (lopHoc.value === "12" ||
        lopHoc.value === "11" ||
        lopHoc.value === "10") {

        const selected =
            document.querySelector(
                'input[name="nhomHoc"]:checked'
            );

        if (!selected)
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

    message.className = "loading";

    message.innerHTML =
        "Đang gửi đăng ký...";

    const data = {

        lop: lopHoc.value,

        hoTen:
            hoTen.value.trim(),

        sdtPhuHuynh:
            sdtPhuHuynh.value.trim(),

        sdtHocSinh:
            (lopHoc.value === "9" ||
            lopHoc.value === "8")

                ?""
                : sdtHocSinh.value.trim(),

        lienHeHocSinh:
            (lopHoc.value === "9" ||
            lopHoc.value === "8")

                ? ""
                : lienHeHocSinh.value.trim(),

        truongHoc:
            truongHoc.value,

        nhom:
            getSelected("nhomHoc"),
/*
        buoi1:
            lopHoc.value === "12"
            ? getSelected("nhomHoc")
            : getSelected("buoi1"),

        buoi2:
            lopHoc.value === "12"
            ? ""
            : getSelected("buoi2"),

        buoi3:
            lopHoc.value === "12"
            ? ""
            : getSelected("buoi3"),
*/
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
                    Hãy nhắn tin cho thầy Nguyễn Văn Vũ
                    <br><br>
                    Zalo:
                    <b>0368884752</b>
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

    return item
        ? item.value
        : "";
}