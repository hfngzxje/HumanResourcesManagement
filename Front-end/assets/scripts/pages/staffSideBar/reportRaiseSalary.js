const apiTable = "https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/DanhSachLenLuong/getAllStatus2";
const apiTableBaoCao = "https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/DanhSachLenLuong/getAllStatus1And3";


const table = document.querySelectorAll('base-table')
var idNhomLuong = null
var maDetail = null
var idRow = null
var TableColumns = [
    {
        label: 'ID',
        key: 'id',
    },
    {
        label: 'Mã nhân viên',
        key: 'manv',
    },
    {
        label: 'Tên nhân viên',
        key: 'tenNv',
    },
    {
        label: 'Mã hợp đồng',
        key: 'mahopdong',
    },
    {
        label: 'Phòng',
        key: 'phong',
    },
    {
        label: 'Chức danh',
        key: 'chucdanh',
    },
    {
        label: 'Trạng thái',
        key: 'trangthai',
        formatGiaTri: (value) => {
            let result = { text: 'Đang chờ', color: 'blue' };
            return result;
        }
    },
    {
        label: 'Hành động',
        key: 'action',
        actions: [
            {
                type: 'plain', icon: 'bx bx-detail', label: 'Thao tác', onClick: (row) => {
                    isPopupEdit = true
                    console.log('row click ', row)
                    idRow = row.id
                    fetchSalaryRecent(row.manv)
                    fetchSalaryUp(row.manv)
                    showPopup("showPopUp")
                }
            }
        ]
    }
]
var TableColumnsBaoCao = [
    {
        label: 'Mã nhân viên',
        key: 'manv',
    },
    {
        label: 'Tên nhân viên',
        key: 'tenNv',
    },
    {
        label: 'Mã hợp đồng',
        key: 'mahopdong',
    },
    {
        label: 'Phòng',
        key: 'phong',
    },
    {
        label: 'Chức danh',
        key: 'chucdanh',
    },
    {
        label: 'Trạng thái',
        key: 'trangthai',
        formatGiaTri: (value) => {
            let result = { text: 'Đã phê duyệt', color: 'green' };
            if (value === 3) {
                result.text = 'Đã hủy';
                result.color = 'red';
            }
            else if (value === 2) {
                result.text = 'Đang chờ';
                result.color = 'blue'
            }
            return result;
        }

    }
]

async function handleSearch() {
    try {
        const formValue = getFormValues("report_form");
        const tableReport = document.getElementById("tableReport1");

        const params = {
            phongId: formValue.phongId || "",
            chucDanhId: formValue.chucDanhId || ""
        };
        await tableReport.handleCallFetchData(params);

    } catch (error) {
        console.error("Error in handleSearch:", error);
    }
}
function phongBanChange() {
    const phongban = document.querySelector('#phongban select')
    phongban.addEventListener("change", (event) => {
        handleSearch()
    });
}
function chucDanhChange() {
    const phongban = document.querySelector('#chucdanh select')
    phongban.addEventListener("change", (event) => {
        handleSearch()
    });
}

//   ---------------------------------------------------------------------------------------
async function handleAccept() {
    await showConfirm("Phê duyệt lên lương nhân viên ?")
    setLoading(true)
    const payload = {
        id: idRow,
        trangThai: 1
    };
    const url1 = 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/DanhSachLenLuong/pheDuyetQuyetDinhLenLuong?id=' + idRow
    const url2 = '&trangThai=1'
    const urlData = url1 + url2
    setTimeout(() => {
        $.ajax({
            url: urlData,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(payload),
            success: function (data) {
                showSuccess('Phê duyệt thành công!');
                table.forEach(table => {
                    if (table.handleCallFetchData) {
                        table.handleCallFetchData();
                    }
                });
                closePopup()
            },
            error: (err) => {
                console.log('err ', err);
                try {
                    if (!err.responseJSON) {
                        showError(err.responseText)
                        return
                    }
                    const errObj = err.responseJSON.errors
                    const firtErrKey = Object.keys(errObj)[0]
                    const message = errObj[firtErrKey][0]
                    showError(message)
                } catch (error) {
                    showError("Phê duyệt thất bại!")
                }
            },
            complete: () => {
                setLoading(false)
            }
        });
    }, 1000);
}

async function handleReject() {
    await showConfirm("Từ chối lên lương nhân viên ?")
    setLoading(true)
    const payload = {
        id: idRow,
        trangThai: 3
    };
    const url1 = 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/DanhSachLenLuong/pheDuyetQuyetDinhLenLuong?id=' + idRow
    const url2 = '&trangThai=3'
    const urlData = url1 + url2
    setTimeout(() => {
        $.ajax({
            url: urlData,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(payload),
            success: function (data) {
                showSuccess('Từ chối thành công!');
                table.forEach(table => {
                    if (table.handleCallFetchData) {
                        table.handleCallFetchData();
                    }
                });
                closePopup()
            },
            error: (err) => {
                console.log('err ', err);
                try {
                    if (!err.responseJSON) {
                        showError(err.responseText)
                        return
                    }
                    const errObj = err.responseJSON.errors
                    const firtErrKey = Object.keys(errObj)[0]
                    const message = errObj[firtErrKey][0]
                    showError(message)
                } catch (error) {
                    showError("Phê duyệt thất bại!")
                }
            },
            complete: () => {
                setLoading(false)
            }
        });
    }, 1000);
}

function closePopup() {
    var modal = document.getElementById("showPopUp");
    modal.style.display = "none"
}
// ---------- Fetch lương hiện tại---------


async function fetchSalaryRecent(ma) {
    setLoading(true);
    maDetail = ma;
    try {
        const response = await $.ajax({
            url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/HoSoLuong/getAllLuongByMaNV/' + ma,
            method: 'GET',
            contentType: 'application/json',
        });

        // Lọc dữ liệu để chỉ lấy những hồ sơ có trạng thái === 1
        const filteredData = response.filter(item => item.trangthai === 1);

        if (Array.isArray(filteredData) && filteredData.length > 0) {
            const lastItem = filteredData[filteredData.length - 1];
            setFormValue('editSalaryUp', lastItem);
            idNhomLuong = lastItem.nhomluong;
            document.querySelector('#tongLuongPop input').value = formatCurrency(lastItem.tongluong);
            document.querySelector('#phuCapPop input').value = formatCurrency(lastItem.phucaptrachnhiem);
            document.querySelector('#phuCapKhacPop input').value = formatCurrency(lastItem.phucapkhac);
            document.querySelector('#tongLuongNangLuong input').value = formatCurrency(lastItem.tongluong);
            await getDuLieuNhomLuong('#luongCoBanPop input');
            await getNgachCongChuc('#ngachCongChucPop input');
        } else {
            console.log("Không có dữ liệu trả về hoặc không có hồ sơ nào với trạng thái === 1");
        }
    } catch (err) {
        console.log('fetchSalary err :: ', err);
    } finally {
        setLoading(false);
    }
}

async function fetchSalaryUp(ma) {
    setLoading(true);
    maDetail = ma;
    try {
        const response = await $.ajax({
            url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/HoSoLuong/getAllLuongByMaNV/' + ma,
            method: 'GET',
            contentType: 'application/json',
        });

        // Lọc dữ liệu để chỉ lấy những hồ sơ có trạng thái === 1
        const filteredData = response.filter(item => item.trangthai === 2);

        if (Array.isArray(filteredData) && filteredData.length > 0) {
            const lastItem = filteredData[filteredData.length - 1];
            setFormValue('salaryRecord_form', lastItem);
            idNhomLuong = lastItem.nhomluong;
            document.querySelector('#tongLuongPop input').value = formatCurrency(lastItem.tongluong);
            document.querySelector('#phuCapPop input').value = formatCurrency(lastItem.phucaptrachnhiem);
            document.querySelector('#phuCapKhacPop input').value = formatCurrency(lastItem.phucapkhac);
            await getDuLieuNhomLuong('#luongCoBanNangLuong input');
            await getNgachCongChuc('#ngachCongChucNangLuong input');
        } else {
            console.log("Không có dữ liệu trả về hoặc không có hồ sơ nào mới tạo nâng lương với trạng thái === 2");
        }
    } catch (err) {
        console.log('fetchSalary err :: ', err);
    } finally {
        setLoading(false);
    }
}

var idNgachCongChuc = null
async function getDuLieuNhomLuong(idData) {
    try {
        const response = await $.ajax({
            url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/DanhMucNhomLuong/' + idNhomLuong,
            method: 'GET',
            contentType: 'application/json',
        });
        document.querySelector(idData).value = formatCurrency(response.luongcoban)
        idNgachCongChuc = response.ngachcongchuc
    } catch (error) {
        console.log("Error", "ajaj")
    }
}
async function getNgachCongChuc(idData) {
    try {
        const response = await $.ajax({
            url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/NhanVien/getNgachCongChucById/' + idNgachCongChuc,
            method: 'GET',
            contentType: 'application/json',
        });
        document.querySelector(idData).value = response.ten
    } catch (error) {
        console.log("Error", "ajaj")
    }
}
function showPopup(formId) {
    var modal = document.getElementById(formId);
    modal.style.display = "block";
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            clearFormValues("showPopUp");
            clearFormValues("salaryRecord_form");
        }
    }
}
function clearFormValues(formId) {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll('input, textarea,select');
    inputs.forEach(input => {
        if (input.type === 'checkbox') {
            input.checked = false;
        }
        else if (input.tagName.toLowerCase() === 'select') {
            input.selectedIndex = 0; // Reset select về item đầu tiên
        } else {
            input.value = '';
        }
    });
}
function buildApiUrl() {
    return apiTable;
}
function buildApiUrlBaoCao() {
    return apiTableBaoCao
}
function formatCurrency(val) {
    // Kiểm tra nếu giá trị là một số hợp lệ
    if (val != null && !isNaN(val)) {
        // Chuyển đổi giá trị thành số nếu nó không phải là số
        const num = Number(val);
        // Định dạng số thành chuỗi tiền tệ
        return num.toLocaleString("it-IT", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        });
    }
    // Nếu giá trị không hợp lệ, trả về một chuỗi rỗng hoặc giá trị gốc tùy ý
    return "";
}

async function handleExportExcel() {
    const formValue = getFormValues("report_form");
    const params = new FormData();
    params.append('phongban', formValue.phongban || '');
    params.append('MaNV', formValue.chucdanh || '');
  
    try {
      const response = await fetch('https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/DanhSachLenLuong/ExportQuyetDinhNhanVienLenLuongToExcel', {
        method: 'POST',
        body: params,
        headers: {
          'accept': '*/*',
        }
      });
  
      if (response.ok) {
        const blob = await response.blob();
        createDownloadLinkExcel(blob);
      } else {
        console.error('Export failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  function createDownloadLinkExcel(blob) {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'BaoCao_QuyetDinhLenLuong.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
  // _________________________________________________________________________________________________
  
  // ____________________________________________PDF____________________________________________________
  async function handleExportPDF() {
    const formValue = getFormValues("report_form");
    const params = new FormData();
    params.append('phongban', formValue.phongban || '');
    params.append('MaNV', formValue.chucdanh || '');
  
    try {
      const response = await fetch('https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/DanhSachLenLuong/ExportQuyetDinhNhanVienLenLuongToPdf', {
        method: 'POST',
        body: params,
        headers: {
          'accept': '*/*',
        }
      });
  
      if (response.ok) {
        const blob = await response.blob();
        createDownloadLinkPDF(blob);
      } else {
        console.error('Export failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  function createDownloadLinkPDF(blob) {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'BaoCao_QuyetDinhLenLuong.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }


function renderActionByStatus() {
    const actionEl = document.getElementById("report_form_action");
    const buildButton = (id, label, type, icon) => {
        const btnEl = document.createElement("base-button");
        btnEl.setAttribute('id', id)
        btnEl.setAttribute("label", label);
        btnEl.setAttribute("type", type);
        btnEl.setAttribute("icon", icon);
        return btnEl;
    };
    const pdfBtn = buildButton("PDFId", "PDF", "red", "bx bx-file-blank");
    const excelBtn = buildButton("ExcelId", "Excel", "", "bx bx-spreadsheet");

    excelBtn.addEventListener("click", () => {
      handleExportExcel();
    });

    pdfBtn.addEventListener("click", () => {
      handleExportPDF();
    });
    actionEl.append(pdfBtn, excelBtn);
}
document.addEventListener("DOMContentLoaded", () => {
    renderActionByStatus()
    phongBanChange()
    chucDanhChange()
});