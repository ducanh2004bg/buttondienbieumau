// Lấy thẻ select cho phần tử item_thumbnail2
let selectElement1 = document.querySelector('#item_thumbnail2');
let options1 = selectElement1.options;
for (let option of options1) {
    if (option.value) {
        selectElement1.value = option.value;  // Gán giá trị của option vào select
        selectElement1.dispatchEvent(new Event('change'));  // Trigger sự kiện change
        break;
    }
}

// Lấy thẻ select cho phần tử item_preview2
let selectElement2 = document.querySelector('#item_preview2');
let options2 = selectElement2.options;
for (let option of options2) {
    if (option.value) {
        selectElement2.value = option.value;  // Gán giá trị của option vào select
        selectElement2.dispatchEvent(new Event('change'));  // Trigger sự kiện change
        break;
    }
}

// Lấy thẻ select cho phần tử video_preview_type2 và chọn giá trị 'pdf'
let selectElement3 = document.querySelector('#video_preview_type2');
let options3 = selectElement3.options;
for (let option of options3) {
    if (option.value === 'pdf') {
        selectElement3.value = option.value;  // Gán giá trị của option vào select
        selectElement3.dispatchEvent(new Event('change'));  // Trigger sự kiện change
        break;
    }
}

let selectElement4 = document.querySelector('#pdf_file2');
let options4 = selectElement4.options;
let selected = false;

// Kiểm tra và chọn "Ban_Xem_Truoc.pdf"
for (let option of options4) {
    if (option.value === "Ban_Xem_Truoc.pdf") {
        selectElement4.value = option.value;
        selectElement4.dispatchEvent(new Event('change'));
        selected = true;
        break;
    }
}

// Nếu chưa chọn được, kiểm tra và chọn "PDF.pdf"
if (!selected) {
    for (let option of options4) {
        if (option.value === "PDF.pdf") {
            selectElement4.value = option.value;
            selectElement4.dispatchEvent(new Event('change'));
            selected = true;
            break;
        }
    }
}

// Nếu không tìm thấy "Ban_Xem_Truoc.pdf" hoặc "PDF.pdf", chọn file có đuôi .pdf
if (!selected) {
    for (let option of options4) {
        if (option.value && option.value.endsWith('.pdf')) {
            selectElement4.value = option.value;
            selectElement4.dispatchEvent(new Event('change'));
            break;
        }
    }
}


// Lấy thẻ select cho phần tử file_type2 và chọn giá trị 'file'
let selectElement5 = document.querySelector('#file_type2');
let options5 = selectElement5.options;
for (let option of options5) {
    if (option.value === 'file') {
        selectElement5.value = option.value;  // Gán giá trị của option vào select
        selectElement5.dispatchEvent(new Event('change'));  // Trigger sự kiện change
        break;
    }
}

// Lấy thẻ select cho phần tử item_file2 và chọn giá trị có đuôi .doc, .docx hoặc .zip
let selectElement6 = document.querySelector('#item_file2');
let options6 = selectElement6.options;
for (let option of options6) {
    if (option.value && (option.value.endsWith('.doc') || option.value.endsWith('.docx') || option.value.endsWith('.zip'))) {
        selectElement6.value = option.value;  // Gán giá trị của option vào select
        selectElement6.dispatchEvent(new Event('change'));  // Trigger sự kiện change
        break;
    }
}
