try {    // Tạo container chứa các button và thêm vào góc phải dưới cùng màn hình
const buttonContainer = document.createElement('div');
buttonContainer.style.position = 'fixed';
buttonContainer.style.bottom = '10px';
buttonContainer.style.right = '20px';
buttonContainer.style.backgroundColor = '#232f3e';
buttonContainer.style.padding = '5px';
buttonContainer.style.border = '1px solid #ccc';
buttonContainer.style.borderRadius = '5px';
buttonContainer.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
buttonContainer.style.zIndex = '1000';
document.body.appendChild(buttonContainer);

let buttonCount = 0; // Đếm số lượng button

const createButton = (label, onClick) => {
    const button = document.createElement('button');
    button.textContent = label;
    button.style.margin = '5px';
    button.style.padding = '2.5px 5px';
    button.style.border = '1px solid #f13e44';
    button.style.cursor = 'pointer';
    button.style.backgroundColor = '#f13e44';
    button.style.color = '#fff';
    button.style.borderRadius = '5px';
    button.style.fontSize = '14px';

    // Thêm sự kiện bấm vào button
    button.addEventListener('click', () => {
        onClick();
        // Thay đổi giao diện button sau khi bấm
        button.style.backgroundColor = '#28a745'; // Màu xanh lá
        button.style.color = '#fff'; // Chữ trắng
        button.style.border = '1px solid #28a745';

        // Thêm hiệu ứng nhấp nháy nhẹ để nhấn mạnh rằng nó đã được bấm
        button.style.boxShadow = '0 0 10px rgba(40, 167, 69, 0.8)';
        setTimeout(() => {
            button.style.boxShadow = 'none'; // Tắt hiệu ứng sau 500ms
        }, 500);

        console.log(`${label} đã được bấm.`);
    });

    // Thêm button vào container
    buttonContainer.appendChild(button);
    buttonCount++; // Tăng số lượng button đã tạo

    // Sau mỗi 5 button, thêm thẻ xuống hàng
    if (buttonCount % 5 === 0) {
        const lineBreak = document.createElement('br'); // Tạo thẻ xuống dòng
        buttonContainer.appendChild(lineBreak); // Thêm thẻ vào container
    }
};



// Nhập tên tài liệu
createButton('Nhập tên tài liệu', () => {
    const tenTaiLieu = prompt('Nhập tên tài liệu:');
    document.getElementById('item_name').value = tenTaiLieu || "#";
});

// Nhập mô tả ngắn
createButton('Nhập mô tả ngắn', () => {
    let moTaNgan = prompt('Nhập mô tả ngắn (tối đa 160 ký tự):');
    
    if (moTaNgan && moTaNgan.length > 160) {
        alert(`Bạn đã nhập ${moTaNgan.length} ký tự, vượt quá giới hạn 160 ký tự. Hệ thống sẽ tự động cắt bớt.`);
        moTaNgan = moTaNgan.substring(0, 160); // Cắt chuỗi còn 160 ký tự
    }
    
    document.querySelector('textarea[name="item_shortdesc"]').value = moTaNgan || "#";
});



createButton('Nhập mô tả dài', () => {
    // Tạo modal container
    const modalContainer = document.createElement('div');
    modalContainer.style.position = 'fixed';
    modalContainer.style.top = '0';
    modalContainer.style.left = '0';
    modalContainer.style.width = '100%';
    modalContainer.style.height = '100%';
    modalContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    modalContainer.style.display = 'flex';
    modalContainer.style.justifyContent = 'center';
    modalContainer.style.alignItems = 'center';
    modalContainer.style.zIndex = '2000';

    // Tạo modal content
    const modalContent = document.createElement('div');
    modalContent.style.width = '60%';
    modalContent.style.backgroundColor = '#fff';
    modalContent.style.padding = '20px';
    modalContent.style.borderRadius = '10px';
    modalContent.style.boxShadow = '0 0 15px rgba(0, 0, 0, 0.3)';
    modalContent.style.textAlign = 'center';
    modalContent.style.position = 'relative';

    // Tạo nút đóng
    const closeButton = document.createElement('button');
    closeButton.textContent = 'X';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '10px';
    closeButton.style.backgroundColor = '#dc3545';
    closeButton.style.color = '#fff';
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '50%';
    closeButton.style.width = '30px';
    closeButton.style.height = '30px';
    closeButton.style.cursor = 'pointer';

    // Thêm sự kiện cho nút đóng
    closeButton.addEventListener('click', () => {
        document.body.removeChild(modalContainer);
    });

    // Tạo textarea để CKEditor sử dụng
    const editorTextarea = document.createElement('textarea');
    editorTextarea.id = 'ckeditor-modal';
    editorTextarea.style.width = '100%';
    editorTextarea.style.height = '300px';

    // Tạo nút lưu
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Lưu';
    saveButton.style.padding = '10px 200px';
    saveButton.style.backgroundColor = '#28a745';
    saveButton.style.color = '#fff';
    saveButton.style.border = 'none';
    saveButton.style.borderRadius = '5px';
    saveButton.style.cursor = 'pointer';
    saveButton.style.marginTop = '20px';

    // Thêm sự kiện cho nút lưu
    saveButton.addEventListener('click', () => {
        const editorData = CKEDITOR.instances['ckeditor-modal'].getData();
        if (CKEDITOR.instances['summary-ckeditor']) {
            CKEDITOR.instances['summary-ckeditor'].setData(editorData);
        } else {
            console.error("CKEditor chính không được khởi tạo!");
        }
        document.body.removeChild(modalContainer);
    });

    // Gắn các phần tử vào modal content
    modalContent.appendChild(closeButton);
    modalContent.appendChild(editorTextarea);
    modalContent.appendChild(saveButton);

    // Gắn modal content vào modal container
    modalContainer.appendChild(modalContent);

    // Thêm modal container vào body
    document.body.appendChild(modalContainer);

    // Khởi tạo CKEditor với hỗ trợ HTML
    CKEDITOR.replace('ckeditor-modal', {
        toolbar: [
            { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript'] },
            { name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent'] },
            { name: 'links', items: ['Link', 'Unlink'] },
            { name: 'insert', items: ['Image', 'Table', 'HorizontalRule'] },
            { name: 'styles', items: ['Format', 'Font', 'FontSize'] },
            { name: 'colors', items: ['TextColor', 'BGColor'] },
            { name: 'tools', items: ['Maximize', 'Source'] }  // Thêm nút Source để chỉnh sửa HTML
        ],
        height: 200,
        extraPlugins: 'sourcearea',  // Cho phép sửa HTML trực tiếp
        removePlugins: 'elementspath',  // Loại bỏ phần tử bên ngoài để không làm rối trang
    });
});


// Chọn danh mục (dropdown)
createButton('Chọn danh mục', () => {
    const selectElement = document.querySelector('#item_category');
    const options = Array.from(selectElement.options);

    const danhMucModal = document.createElement('div');
    danhMucModal.style.position = 'fixed';
    danhMucModal.style.top = '50%';
    danhMucModal.style.left = '50%';
    danhMucModal.style.transform = 'translate(-50%, -50%)';
    danhMucModal.style.backgroundColor = '#fff';
    danhMucModal.style.padding = '20px';
    danhMucModal.style.border = '1px solid #ccc';
    danhMucModal.style.borderRadius = '5px';
    danhMucModal.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.2)';
    danhMucModal.style.zIndex = '2000';

    const danhMucDropdown = document.createElement('select');
    danhMucDropdown.style.width = '100%';
    danhMucDropdown.style.padding = '5px';
    danhMucDropdown.style.marginBottom = '10px';

    options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option.value;
        opt.textContent = option.text;
        danhMucDropdown.appendChild(opt);
    });

    const confirmButton = document.createElement('button');
    confirmButton.textContent = 'Xác nhận';
    confirmButton.style.padding = '5px 10px';
    confirmButton.style.backgroundColor = '#28a745';
    confirmButton.style.color = '#fff';
    confirmButton.style.border = 'none';
    confirmButton.style.borderRadius = '5px';
    confirmButton.style.cursor = 'pointer';

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Hủy';
    cancelButton.style.padding = '5px 10px';
    cancelButton.style.backgroundColor = '#dc3545';
    cancelButton.style.color = '#fff';
    cancelButton.style.border = 'none';
    cancelButton.style.borderRadius = '5px';
    cancelButton.style.cursor = 'pointer';
    cancelButton.style.marginLeft = '10px';

    danhMucModal.appendChild(danhMucDropdown);
    danhMucModal.appendChild(confirmButton);
    danhMucModal.appendChild(cancelButton);
    document.body.appendChild(danhMucModal);

    confirmButton.addEventListener('click', () => {
        selectElement.value = danhMucDropdown.value;
        document.body.removeChild(danhMucModal);
        console.log(`Bạn đã chọn danh mục: ${danhMucDropdown.options[danhMucDropdown.selectedIndex].text}`);
    });

    cancelButton.addEventListener('click', () => {
        document.body.removeChild(danhMucModal);
    });
});

// Nhập số trang
createButton('Nhập số trang', () => {
    const soTrangSelectElement = document.querySelector('select[name="attributes_40[]"]');
    const soTrang = prompt('Nhập số trang tài liệu (1, 2, 3,...):');
    const soTrangOptions = Array.from(soTrangSelectElement.options);
    const selectedSoTrangOption = soTrangOptions.find(option => option.value === soTrang);

    if (selectedSoTrangOption) {
        soTrangSelectElement.value = selectedSoTrangOption.value;
        console.log(`Bạn đã chọn số trang: ${selectedSoTrangOption.value}`);
    } else {
        console.error('Số trang không hợp lệ. Vui lòng chạy lại!');
    }
});

// Chọn ngôn ngữ (dropdown)
createButton('Chọn ngôn ngữ', () => {
    const selectElement = document.querySelector('select[name="attributes_49[]"]');
    const options = Array.from(selectElement.options);

    const ngonNguModal = document.createElement('div');
    ngonNguModal.style.position = 'fixed';
    ngonNguModal.style.top = '50%';
    ngonNguModal.style.left = '50%';
    ngonNguModal.style.transform = 'translate(-50%, -50%)';
    ngonNguModal.style.backgroundColor = '#fff';
    ngonNguModal.style.padding = '20px';
    ngonNguModal.style.border = '1px solid #ccc';
    ngonNguModal.style.borderRadius = '5px';
    ngonNguModal.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.2)';
    ngonNguModal.style.zIndex = '2000';

    const ngonNguDropdown = document.createElement('select');
    ngonNguDropdown.style.width = '100%';
    ngonNguDropdown.style.padding = '5px';
    ngonNguDropdown.style.marginBottom = '10px';

    options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option.value;
        opt.textContent = option.text;
        ngonNguDropdown.appendChild(opt);
    });

    const confirmButton = document.createElement('button');
    confirmButton.textContent = 'Xác nhận';
    confirmButton.style.padding = '5px 10px';
    confirmButton.style.backgroundColor = '#28a745';
    confirmButton.style.color = '#fff';
    confirmButton.style.border = 'none';
    confirmButton.style.borderRadius = '5px';
    confirmButton.style.cursor = 'pointer';

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Hủy';
    cancelButton.style.padding = '5px 10px';
    cancelButton.style.backgroundColor = '#dc3545';
    cancelButton.style.color = '#fff';
    cancelButton.style.border = 'none';
    cancelButton.style.borderRadius = '5px';
    cancelButton.style.cursor = 'pointer';
    cancelButton.style.marginLeft = '10px';

    ngonNguModal.appendChild(ngonNguDropdown);
    ngonNguModal.appendChild(confirmButton);
    ngonNguModal.appendChild(cancelButton);
    document.body.appendChild(ngonNguModal);

    confirmButton.addEventListener('click', () => {
        selectElement.value = ngonNguDropdown.value;
        document.body.removeChild(ngonNguModal);
        console.log(`Bạn đã chọn ngôn ngữ: ${ngonNguDropdown.options[ngonNguDropdown.selectedIndex].text}`);
    });

    cancelButton.addEventListener('click', () => {
        document.body.removeChild(ngonNguModal);
    });
});

// Nhập Tags
createButton('Nhập Tags', () => {
    const tags = prompt('Nhập Tags (tối đa 15 từ khóa, cách nhau bằng dấu phẩy):');
    document.querySelector('textarea[name="item_tags"]').value = tags || "";
});

// Nhập từ khóa SEO
createButton('Nhập từ khóa SEO', () => {
    const tuKhoaSEO = prompt('Nhập từ khóa SEO (tối đa 160 ký tự):');
    document.querySelector('textarea[name="item_seo_keyword"]').value = tuKhoaSEO || "";
});

// Nhập mô tả SEO
// Nhập mô tả SEO
createButton('Nhập mô tả SEO', () => {
    let moTaSEO = prompt('Nhập mô tả SEO Meta (tối đa 160 ký tự):');
    if (moTaSEO) {
        if (moTaSEO.length > 160) {
            alert(`Bạn đã nhập ${moTaSEO.length} ký tự. Hệ thống sẽ tự động giữ lại 160 ký tự đầu tiên.`);
            moTaSEO = moTaSEO.substring(0, 160); // Cắt chuỗi còn 160 ký tự
        }
        document.querySelector('textarea[name="item_seo_desc"]').value = moTaSEO;
    } else {
        document.querySelector('textarea[name="item_seo_desc"]').value = ""; // Nếu không nhập gì
    }
});


// Nhập giá tiền
createButton('Nhập giá tiền', () => {
    const regularPriceInput = document.querySelector('#regular_price');
    const extendedPriceInput = document.querySelector('#extended_price');

    const regularPrice = prompt('Nhập giá tiền cho giấy phép thông thường (6 tháng hỗ trợ) (VNĐ):');
    if (regularPrice && !isNaN(regularPrice) && Number(regularPrice) > 0) {
        regularPriceInput.value = regularPrice;

        const extendedPrice = Number(regularPrice) * 2;
        extendedPriceInput.value = extendedPrice;

        console.log(`Giấy phép thông thường (6 tháng): ${regularPrice} VNĐ`);
        console.log(`Giấy phép mở rộng (1 năm): ${extendedPrice} VNĐ`);
    } else {
        alert('Vui lòng nhập một giá trị hợp lệ lớn hơn 0!');
    }
});



// Thiết lập ngôn ngữ mặc định (Tiếng Việt)
document.querySelector('select[name="attributes_49[]"]').value = "Tiếng Việt"; // Ngôn ngữ mặc định là Tiếng Việt
// Thiết lập giá trị mặc định khác (không cần nhập)
// document.querySelector('select[name="attributes_37[]"]').value = "DOCX"; // Định dạng tài liệu là DOCX
// Chọn tất cả các option có giá trị là "DOCX" và đánh dấu là selected
document.querySelectorAll('select[name="attributes_31[]"] option[value="DOCX"]').forEach(option => {
    option.selected = true;
  });
  
// document.querySelector('select[name="seller_money_back"]').value = "1"; // Chính sách hoàn tiền Yes
const selectElement = document.querySelector('select[name="seller_money_back"]');
selectElement.value = "1";
document.querySelector('input[name="seller_money_back_days"]').value = "4"; // Số ngày hoàn tiền
document.querySelector('textarea[name="seller_refund_term"]').value = "Tài liệu không đạt tiêu chuẩn chất lượng hoặc không đúng với mô tả sẽ được hoàn tiền trong vòng 4 ngày."; // Điều kiện hoàn tiền
document.querySelector('select[name="item_flash_request"]').value = "1"; // Áp dụng giảm giá chớp nhoáng Yes
document.querySelector('select[name="free_download"]').value = "0"; // Áp dụng tải miễn phí No
document.querySelector('select[name="future_update"]').value = "1"; // Cập nhật mới Yes
document.querySelector('select[name="item_support"]').value = "1"; // Hỗ trợ tài liệu Yes
document.querySelector('select[name="item_allow_seo"]').value = "1"; // Cho phép SEO Yes
document.querySelector('textarea[name="item_seo_desc"]').value = "Với những kiến thức và kỹ năng đã được trình bày trong tài liệu này, người đọc sẽ có nền tảng vững chắc để tiếp cận và phát triển các ứng dụng phần mềm hiệu quả";
document.querySelector('textarea[name="item_seo_keyword"]').value = "None";

console.log('Mã JavaScript đã được chạy thành công và các giá trị mặc định đã được thiết lập!');
(function() {
    // Tạo phần tử div cho watermark
    const watermark = document.createElement('div');
    
    // Đặt nội dung của watermark
    watermark.textContent = 'KHỞI TẠO BUTTON THÀNH CÔNG';  // Nội dung watermark
    
    // Thêm CSS cho watermark
    watermark.style.position = 'fixed';  // Đảm bảo watermark luôn nằm trên trang
    watermark.style.top = '50%';
    watermark.style.left = '50%';
    watermark.style.transform = 'translate(-50%, -50%)';  // Căn giữa
    watermark.style.fontSize = '30px'; // Cỡ chữ
    watermark.style.color = 'rgba(0, 0, 0, 0.1)';  // Màu sắc watermark (mờ dần)
    watermark.style.pointerEvents = 'none';  // Không cho phép watermark tương tác
    watermark.style.userSelect = 'none';  // Không cho phép chọn văn bản trong watermark
    watermark.style.zIndex = '9999';  // Đặt watermark trên cùng
    watermark.style.opacity = '1';  // Đảm bảo watermark ban đầu có độ mờ 100%

    // Thêm watermark vào body của trang
    document.body.appendChild(watermark);

    // In ra thông báo trong console
    console.log('KHỞI TẠO BUTTON THÀNH CÔNG');
    
    // Làm watermark mờ dần sau 3 giây
    setTimeout(() => {
        watermark.style.transition = 'opacity 2s';  // Đặt hiệu ứng mờ dần trong 2 giây
        watermark.style.opacity = '0';  // Đặt opacity thành 0, làm watermark mờ dần
    }, 3000);  // Chờ 3 giây trước khi bắt đầu mờ dần
})();
}
catch(error) {

    const watermark = document.createElement('div');
    
    // Đặt nội dung của watermark
    watermark.textContent = 'thằng ấn độ lại sửa code ròi, hiện tại code chưa update, nên phần định dạng, số trang, ngôn ngữ, đều không hoạt động được nhé';  // Nội dung watermark
    
    // Thêm CSS cho watermark
    watermark.style.position = 'fixed';  // Đảm bảo watermark luôn nằm trên trang
    watermark.style.top = '50%';
    watermark.style.left = '50%';
    watermark.style.transform = 'translate(-50%, -50%)';  // Căn giữa
    watermark.style.fontSize = '30px'; // Cỡ chữ
    watermark.style.color = 'rgba(0, 0, 0, 0.1)';  // Màu sắc watermark (mờ dần)
    watermark.style.pointerEvents = 'none';  // Không cho phép watermark tương tác
    watermark.style.userSelect = 'none';  // Không cho phép chọn văn bản trong watermark
    watermark.style.zIndex = '9999';  // Đặt watermark trên cùng
    watermark.style.opacity = '1';  // Đảm bảo watermark ban đầu có độ mờ 100%

    // Thêm watermark vào body của trang
    document.body.appendChild(watermark);

    // In ra thông báo trong console
    console.log('Code chạy tHẤT BẠI');
    
    // Làm watermark mờ dần sau 3 giây
    setTimeout(() => {
        watermark.style.transition = 'opacity 2s';  // Đặt hiệu ứng mờ dần trong 2 giây
        watermark.style.opacity = '0';  // Đặt opacity thành 0, làm watermark mờ dần
    }, 13000);  // Chờ 3 giây trước khi bắt đầu mờ dần }
}

