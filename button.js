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
        const itemNameElement = document.getElementById('item_name');
        
        // Gán giá trị cho item_name
        itemNameElement.value = tenTaiLieu || "#";
        
        // Thêm hiệu ứng sáng cho item_name ngay lập tức
        itemNameElement.style.boxShadow = '0 0 15px 5px rgba(0, 255, 0, 1)';  // Sáng với màu xanh lá
        itemNameElement.style.border = '2px solid green';  // Thêm viền xanh
    
        // Sau khi nhập xong, tắt hiệu ứng sáng ngay lập tức (sau 1 giây)
        setTimeout(() => {
            itemNameElement.style.boxShadow = '';  // Loại bỏ hiệu ứng sáng
            itemNameElement.style.border = '';  // Loại bỏ đường viền
        }, 1000);  // Tắt hiệu ứng sáng sau 1 giây
    });
    
    // Nhập mô tả ngắn
    createButton('Nhập mô tả ngắn', () => {
        let moTaNgan = prompt('Nhập mô tả ngắn (tối đa 160 ký tự):');
        const shortDescElement = document.querySelector('textarea[name="item_shortdesc"]');
        
        if (moTaNgan && moTaNgan.length > 160) {
            alert(`Bạn đã nhập ${moTaNgan.length}/160 ký tự, vượt quá giới hạn 160 ký tự. Hệ thống sẽ tự động cắt bớt. Bạn hãy vào sửa lại cho chuẩn nhé`);
            moTaNgan = moTaNgan.substring(0, 160); // Cắt chuỗi còn 160 ký tự
        }
        
        shortDescElement.value = moTaNgan || "#";
        
        // Thêm hiệu ứng sáng cho item_shortdesc ngay lập tức
        shortDescElement.style.boxShadow = '0 0 15px 5px rgba(0, 255, 0, 1)';  // Sáng với màu xanh lá
        shortDescElement.style.border = '2px solid green';  // Thêm viền xanh
    
        // Sau khi nhập xong, tắt hiệu ứng sáng ngay lập tức (sau 1 giây)
        setTimeout(() => {
            shortDescElement.style.boxShadow = '';  // Loại bỏ hiệu ứng sáng
            shortDescElement.style.border = '';  // Loại bỏ đường viền
        }, 1000);  // Tắt hiệu ứng sáng sau 1 giây
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

    // Thêm hiệu ứng sáng cho textarea ngay khi mở modal
    editorTextarea.style.boxShadow = '0 0 15px 5px rgba(0, 255, 0, 1)';  // Sáng với màu xanh lá
    editorTextarea.style.border = '2px solid green';  // Thêm viền xanh

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

    // Sau khi CKEditor được khởi tạo, loại bỏ hiệu ứng sáng sau 1 giây
    setTimeout(() => {
        editorTextarea.style.boxShadow = '';  // Loại bỏ hiệu ứng sáng
        editorTextarea.style.border = '';  // Loại bỏ đường viền
    }, 1000);  // Tắt hiệu ứng sáng sau 1 giây
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
    
            // Thêm hiệu ứng sáng cho phần tử select sau khi người dùng chọn
            selectElement.style.boxShadow = '0 0 15px 5px rgba(0, 255, 0, 1)';  // Sáng với màu xanh lá
            selectElement.style.border = '2px solid green';  // Thêm viền xanh
    
            // Sau khi chọn, tắt hiệu ứng sáng ngay lập tức (sau 1 giây)
            setTimeout(() => {
                selectElement.style.boxShadow = '';  // Loại bỏ hiệu ứng sáng
                selectElement.style.border = '';  // Loại bỏ đường viền
            }, 1000);  // Tắt hiệu ứng sáng sau 1 giây
    
            document.body.removeChild(danhMucModal);
            console.log(`Bạn đã chọn danh mục: ${danhMucDropdown.options[danhMucDropdown.selectedIndex].text}`);
        });
    
        cancelButton.addEventListener('click', () => {
            document.body.removeChild(danhMucModal);
        });
    });
    

    createButton('Nhập số trang', () => {
        // Lấy tất cả các phần tử select có name bắt đầu với "attributes_"
        const soTrangSelectElements = document.querySelectorAll('select[name^="attributes_"]');
    
        // Yêu cầu người dùng nhập số trang
        const soTrang = prompt('Nhập số trang tài liệu (1, 2, 3,...):');
    
        soTrangSelectElements.forEach(soTrangSelectElement => {
            const soTrangOptions = Array.from(soTrangSelectElement.options);
            const selectedSoTrangOption = soTrangOptions.find(option => option.value === soTrang);
    
            if (selectedSoTrangOption) {
                // Nếu tìm thấy option hợp lệ, chọn nó
                soTrangSelectElement.value = selectedSoTrangOption.value;
                console.log(`Bạn đã chọn số trang: ${selectedSoTrangOption.value}`);
    
                // Làm sáng phần tử select sau khi chọn
                soTrangSelectElement.style.boxShadow = '0 0 15px 5px rgba(0, 255, 0, 1)';  // Sáng với màu xanh lá
                soTrangSelectElement.style.border = '2px solid green';  // Thêm viền xanh
    
                // Sau khi chọn xong, tắt hiệu ứng sáng sau 1 giây
                setTimeout(() => {
                    soTrangSelectElement.style.boxShadow = '';  // Loại bỏ hiệu ứng sáng
                    soTrangSelectElement.style.border = '';  // Loại bỏ đường viền
                }, 1000);  // Tắt hiệu ứng sáng sau 1 giây
            } else {
                // Nếu không tìm thấy option hợp lệ, báo lỗi
                console.error('Số trang không hợp lệ. Vui lòng chạy lại!');
            }
        });
    });
    
    
    
    // // Chọn ngôn ngữ (dropdown)
    // createButton('Chọn ngôn ngữ', () => {
    //     const selectElement = document.querySelector('select[name="attributes_49[]"]');
    //     const options = Array.from(selectElement.options);
    
    //     const ngonNguModal = document.createElement('div');
    //     ngonNguModal.style.position = 'fixed';
    //     ngonNguModal.style.top = '50%';
    //     ngonNguModal.style.left = '50%';
    //     ngonNguModal.style.transform = 'translate(-50%, -50%)';
    //     ngonNguModal.style.backgroundColor = '#fff';
    //     ngonNguModal.style.padding = '20px';
    //     ngonNguModal.style.border = '1px solid #ccc';
    //     ngonNguModal.style.borderRadius = '5px';
    //     ngonNguModal.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.2)';
    //     ngonNguModal.style.zIndex = '2000';
    
    //     const ngonNguDropdown = document.createElement('select');
    //     ngonNguDropdown.style.width = '100%';
    //     ngonNguDropdown.style.padding = '5px';
    //     ngonNguDropdown.style.marginBottom = '10px';
    
    //     options.forEach(option => {
    //         const opt = document.createElement('option');
    //         opt.value = option.value;
    //         opt.textContent = option.text;
    //         ngonNguDropdown.appendChild(opt);
    //     });
    
    //     const confirmButton = document.createElement('button');
    //     confirmButton.textContent = 'Xác nhận';
    //     confirmButton.style.padding = '5px 10px';
    //     confirmButton.style.backgroundColor = '#28a745';
    //     confirmButton.style.color = '#fff';
    //     confirmButton.style.border = 'none';
    //     confirmButton.style.borderRadius = '5px';
    //     confirmButton.style.cursor = 'pointer';
    
    //     const cancelButton = document.createElement('button');
    //     cancelButton.textContent = 'Hủy';
    //     cancelButton.style.padding = '5px 10px';
    //     cancelButton.style.backgroundColor = '#dc3545';
    //     cancelButton.style.color = '#fff';
    //     cancelButton.style.border = 'none';
    //     cancelButton.style.borderRadius = '5px';
    //     cancelButton.style.cursor = 'pointer';
    //     cancelButton.style.marginLeft = '10px';
    
    //     ngonNguModal.appendChild(ngonNguDropdown);
    //     ngonNguModal.appendChild(confirmButton);
    //     ngonNguModal.appendChild(cancelButton);
    //     document.body.appendChild(ngonNguModal);
    
    //     confirmButton.addEventListener('click', () => {
    //         selectElement.value = ngonNguDropdown.value;
    //         document.body.removeChild(ngonNguModal);
    //         console.log(`Bạn đã chọn ngôn ngữ: ${ngonNguDropdown.options[ngonNguDropdown.selectedIndex].text}`);
    //     });
    
    //     cancelButton.addEventListener('click', () => {
    //         document.body.removeChild(ngonNguModal);
    //     });
    // });
    
    // Nhập Tags
    createButton('Nhập Tags', () => {
        const tags = prompt('Nhập Tags (tối đa 15 từ khóa, cách nhau bằng dấu phẩy):');
        const tagsTextarea = document.querySelector('textarea[name="item_tags"]');
        
        // Gán giá trị cho textarea
        tagsTextarea.value = tags || "";
    
        // Làm sáng phần tử textarea sau khi người dùng nhập
        tagsTextarea.style.boxShadow = '0 0 15px 5px rgba(0, 255, 0, 1)';  // Sáng với màu xanh lá
        tagsTextarea.style.border = '2px solid green';  // Thêm viền xanh
    
        // Sau khi nhập xong, tắt hiệu ứng sáng sau 1 giây
        setTimeout(() => {
            tagsTextarea.style.boxShadow = '';  // Loại bỏ hiệu ứng sáng
            tagsTextarea.style.border = '';  // Loại bỏ đường viền
        }, 1000);  // Tắt hiệu ứng sáng sau 1 giây
    });
    
    
    // // Nhập từ khóa SEO
    // createButton('Nhập từ khóa SEO', () => {
    //     const tuKhoaSEO = prompt('Nhập từ khóa SEO (tối đa 160 ký tự):');
    //     document.querySelector('textarea[name="item_seo_keyword"]').value = tuKhoaSEO || "";
    // });
    
    // Nhập mô tả SEO
    // Nhập mô tả SEO
    // Nhập mô tả SEO
createButton('Nhập mô tả SEO', () => {
    let moTaSEO = prompt('Nhập mô tả SEO Meta (tối đa 160 ký tự):');
    const seoDescTextarea = document.querySelector('textarea[name="item_seo_desc"]');

    if (moTaSEO) {
        if (moTaSEO.length > 160) {
            alert(`Bạn đã nhập ${moTaSEO.length}/160 ký tự. Hệ thống sẽ tự động giữ lại 160 ký tự đầu tiên. Bạn hãy vào cắt những ký tự thừa đi nhé!`);
            moTaSEO = moTaSEO.substring(0, 160); // Cắt chuỗi còn 160 ký tự
        }
        seoDescTextarea.value = moTaSEO;
    } else {
        seoDescTextarea.value = ""; // Nếu không nhập gì
    }

    // Làm sáng phần tử textarea sau khi nhập mô tả SEO
    seoDescTextarea.style.boxShadow = '0 0 15px 5px rgba(0, 255, 0, 1)';  // Sáng với màu xanh lá
    seoDescTextarea.style.border = '2px solid green';  // Thêm viền xanh

    // Sau khi nhập xong, tắt hiệu ứng sáng sau 1 giây
    setTimeout(() => {
        seoDescTextarea.style.boxShadow = '';  // Loại bỏ hiệu ứng sáng
        seoDescTextarea.style.border = '';  // Loại bỏ đường viền
    }, 1000);  // Tắt hiệu ứng sáng sau 1 giây
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

        // Làm sáng phần tử input sau khi nhập giá tiền
        regularPriceInput.style.boxShadow = '0 0 15px 5px rgba(0, 255, 0, 1)';  // Sáng với màu xanh lá
        regularPriceInput.style.border = '2px solid green';  // Thêm viền xanh

        // Sau khi nhập xong, tắt hiệu ứng sáng sau 1 giây
        setTimeout(() => {
            regularPriceInput.style.boxShadow = '';  // Loại bỏ hiệu ứng sáng
            regularPriceInput.style.border = '';  // Loại bỏ đường viền
        }, 1000);  // Tắt hiệu ứng sáng sau 1 giây
    } else {
        alert('Vui lòng nhập một giá trị hợp lệ lớn hơn 0!');
    }
});

    
    createButton('TỰ ĐỘNG SELECT FILE (UP FILE TRƯỚC)', () => {
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
    
        // Lấy thẻ select cho phần tử pdf_file2 và chọn giá trị có đuôi .pdf
        let selectElement4 = document.querySelector('#pdf_file2');
        let options4 = selectElement4.options;
        for (let option of options4) {
            if (option.value && option.value.endsWith('.pdf')) {
                selectElement4.value = option.value;  // Gán giá trị của option vào select
                selectElement4.dispatchEvent(new Event('change'));  // Trigger sự kiện change
                break;
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
    
        let selectElement6 = document.querySelector('#item_file2');
        let options6 = selectElement6.options;
        let isValidFileSelected = false;  // Biến để kiểm tra nếu file hợp lệ được chọn
        
        // Duyệt qua các option trong select
        for (let option of options6) {
            if (option.value && (option.value.endsWith('.doc') || option.value.endsWith('.docx') || option.value.endsWith('.zip'))) {
                selectElement6.value = option.value;  // Gán giá trị của option vào select
                selectElement6.dispatchEvent(new Event('change'));  // Trigger sự kiện change
                isValidFileSelected = true;  // Đánh dấu là đã chọn file hợp lệ
                break;
            }
        }
        
        // Nếu không có file hợp lệ nào được chọn, hiển thị thông báo watermark và làm sáng phần tử #item_file2
        if (!isValidFileSelected) {
            // Tạo một phần tử thông báo
            let watermark = document.createElement('div');
            watermark.textContent = 'FILE BẢN CHÍNH CỦA BẠN KO PHẢI .DOC , .DOCX, .ZIP, TÔI NGHĨ ĐÓ LÀ FILE PDF, BẠN HÃY CHỌN ĐÚNG FILE PDF BẢN CHÍNH Ở MỤC "CHỌN TÀI LIỆU"';
            watermark.style.position = 'fixed';
            watermark.style.top = '50%';
            watermark.style.left = '50%';
            watermark.style.transform = 'translate(-50%, -50%)';
            watermark.style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
            watermark.style.color = '#fff';
            watermark.style.fontSize = '16px';
            watermark.style.padding = '20px';
            watermark.style.borderRadius = '5px';
            watermark.style.zIndex = '9999';
        
            // Thêm watermark vào body
            document.body.appendChild(watermark);
        
            // Làm sáng phần tử #item_file2 (tạo hiệu ứng)
            selectElement6.style.boxShadow = '0 0 15px 5px rgb(30, 255, 0)';  // Hiệu ứng sáng lên
            selectElement6.style.border = '2px solid red';  // Thêm đường viền đỏ
        
            // Mờ dần watermark sau 10 giây
            setTimeout(() => {
                watermark.style.transition = 'opacity 3s';  // Thêm hiệu ứng mờ dần
                watermark.style.opacity = '0';
                
                // Sau khi hiệu ứng mờ dần xong, loại bỏ watermark
                setTimeout(() => {
                    watermark.remove();
        
                    // Đưa #item_file2 về trạng thái ban đầu (hủy sáng)
                    selectElement6.style.boxShadow = '';  // Loại bỏ hiệu ứng sáng
                    selectElement6.style.border = '';  // Loại bỏ đường viền
                }, 3000);  // Chờ 3 giây sau khi mờ dần xong
            }, 10000);  // Mờ dần sau 10 giây
        }
        
    });
    
    
    // Thiết lập ngôn ngữ mặc định (Tiếng Việt)
    // document.querySelector('select[name="attributes_53[]"]').value = "Tiếng Việt"; // Ngôn ngữ mặc định là Tiếng Việt
    // Chọn tất cả các select có name chứa 'attributes_' và thay đổi giá trị của chúng
    document.querySelectorAll('select[name^="attributes_"]').forEach(function(selectElement) {
        selectElement.value = "Tiếng Việt"; // Đặt giá trị mặc định là "Tiếng Việt"
    });

    // document.querySelectorAll('select[name="attributes_35[]"] option[value="DOCX"]').forEach(option => {
    //     option.selected = true;
    //   });
    document.querySelectorAll('select[name^="attributes_"] option[value="DOCX"]').forEach(option => {
        option.selected = true;
      });
      
      
    // document.querySelector('select[name="seller_money_back"]').value = "1"; // Chính sách hoàn tiền Yes
    const selectElement = document.querySelector('select[name="seller_money_back"]');
    selectElement.value = "1";
    document.querySelector('input[name="seller_money_back_days"]').value = "4"; // Số ngày hoàn tiền
    document.querySelector('textarea[name="seller_refund_term"]').value = "Tài liệu không đạt tiêu chuẩn chất lượng hoặc không đúng với mô tả sẽ được hoàn tiền trong vòng 4 ngày."; // Điều kiện hoàn tiền
    document.querySelector('select[name="item_flash_request"]').value = "1"; // Áp dụng giảm giá chớp nhoáng Yes
    document.querySelector('textarea[name="item_tags"]').value = "ĐOẠN NÀY BẠN LẤY 8TAGS TRONG CHATGPT RA";
    document.querySelector('select[name="free_download"]').value = "0"; // Áp dụng tải miễn phí No
    document.querySelector('select[name="future_update"]').value = "1"; // Cập nhật mới Yes
    document.querySelector('select[name="item_support"]').value = "1"; // Hỗ trợ tài liệu Yes
    document.querySelector('select[name="item_allow_seo"]').value = "1"; // Cho phép SEO Yes
    document.querySelector('textarea[name="item_seo_desc"]').value = "ĐOẠN NÀY LẤY PHẦN KẾT LUẬN Ở CHATGPT";
    document.querySelector('textarea[name="item_seo_keyword"]').value = "None";
    
    console.log('Mã JavaScript đã được chạy thành công và các giá trị mặc định đã được thiết lập!');
    
    (function() {
        // Tạo phần tử div cho watermark
        const watermark = document.createElement('div');
        
        // Đặt nội dung của watermark
        watermark.textContent = 'KHỞI TẠO BUTTON THÀNH CÔNG (update 1:30 [AM] 13/12/2024) ducanhwork26';  // Nội dung watermark
        
        // Thêm CSS cho watermark
        watermark.style.position = 'fixed';  // Đảm bảo watermark luôn nằm trên trang
        watermark.style.top = '50%';
        watermark.style.left = '50%';
        watermark.style.transform = 'translate(-50%, -50%)';  // Căn giữa
        watermark.style.fontSize = '30px'; // Cỡ chữ
        watermark.style.color = 'rgb(0, 255, 60)';  // Màu sắc watermark (mờ dần)
        watermark.style.pointerEvents = 'none';  // Không cho phép watermark tương tác
        watermark.style.userSelect = 'none';  // Không cho phép chọn văn bản trong watermark
        watermark.style.zIndex = '9999';  // Đặt watermark trên cùng
        watermark.style.opacity = '1';  // Đảm bảo watermark ban đầu có độ mờ 100%
    
        // Thêm watermark vào body của trang
        document.body.appendChild(watermark);
    
        // In ra thông báo trong console
        console.log('KHỞI TẠO ');
        
        // Làm watermark mờ dần sau 3 giây
        setTimeout(() => {
            watermark.style.transition = 'opacity 2s';  // Đặt hiệu ứng mờ dần trong 2 giây
            watermark.style.opacity = '0';  // Đặt opacity thành 0, làm watermark mờ dần
        }, 3000);  // Chờ 3 giây trước khi bắt đầu mờ dần
    })();
    }
    catch(error) {
        (function() {
            // Tạo phần tử div cho watermark
            const watermark = document.createElement('div');
            
            // Đặt nội dung của watermark
            watermark.textContent = 'KHỞI TẠO BUTTON THẤT BẠI';  // Nội dung watermark
            
            // Thêm CSS cho watermark
            watermark.style.position = 'fixed';  // Đảm bảo watermark luôn nằm trên trang
            watermark.style.top = '50%';
            watermark.style.left = '50%';
            watermark.style.transform = 'translate(-50%, -50%)';  // Căn giữa
            watermark.style.fontSize = '30px'; // Cỡ chữ
            watermark.style.color = 'rgb(255, 0, 0)';  // Màu sắc watermark (mờ dần)
            watermark.style.pointerEvents = 'none';  // Không cho phép watermark tương tác
            watermark.style.userSelect = 'none';  // Không cho phép chọn văn bản trong watermark
            watermark.style.zIndex = '9999';  // Đặt watermark trên cùng
            watermark.style.opacity = '1';  // Đảm bảo watermark ban đầu có độ mờ 100%
        
            // Thêm watermark vào body của trang
            document.body.appendChild(watermark);
        
            // In ra thông báo trong console
            console.log('KHỞI TẠO ');
            
            // Làm watermark mờ dần sau 3 giây
            setTimeout(() => {
                watermark.style.transition = 'opacity 2s';  // Đặt hiệu ứng mờ dần trong 2 giây
                watermark.style.opacity = '0';  // Đặt opacity thành 0, làm watermark mờ dần
            }, 3000);  // Chờ 3 giây trước khi bắt đầu mờ dần
        })();
    }
