var dssv = [];
var LOCALSTORAGE_DSSV = "dssvLocalStorage";
// Hàm Kiểm Tra Mã SV
function kiemTraMaSV(newSV, arrSV) {
  var maNewSV = newSV.ma;
  for (var index = 0; index < arrSV.length; index++) {
    var currentSV = arrSV[index];
    if (currentSV.ma == maNewSV) {
      return false;
    }
  }
  return true;
}

// Hàm Render
function renderTableSV(dssv) {
  var contentHTML = "";
  for (let index = 0; index < dssv.length; index++) {
    const sv = dssv[index];
    contentHTML += `
    <tr>
    <td>${sv.ma}</td>
    <td>${sv.ten}</td>
    <td>${sv.email}</td>
    <td>${sv.ngaySinh}</td>
    <td>${sv.khoaHoc}</td>
    <td>${sv.tinhDTB()}</td>
    <td>
    <button class="btn btn-success" onclick="suaSV('${sv.ma}')">Sửa</button>
    <button class="btn btn-danger" onclick="xoaSV('${sv.ma}')">Xóa</button>
</td>
  </tr>`;
  }
  document.getElementById("tbodySinhVien").innerHTML = contentHTML;
}

function luuLocalStorage(arr) {
  var dssvJson = JSON.stringify(arr);
  localStorage.setItem(LOCALSTORAGE_DSSV, dssvJson);
}

// Hàm Lấy THong Tin
function layThongTinSv() {
  var maSvValue = document.getElementById("txtMaSV").value;
  var tenSvValue = document.getElementById("txtTenSV").value;
  var emailSvValue = document.getElementById("txtEmail").value;
  var matKhauSvValue = document.getElementById("txtPass").value;
  var ngaySinhSvValue = document.getElementById("txtNgaySinh").value;
  var khoaHocSvValue = document.getElementById("khSV").value;
  var diemToanValue = document.getElementById("txtDiemToan").value * 1;
  var diemLyValue = document.getElementById("txtDiemLy").value * 1;
  var diemHoaValue = document.getElementById("txtDiemHoa").value * 1;

  var sinhVien = new SinhVien(
    maSvValue,
    tenSvValue,
    emailSvValue,
    matKhauSvValue,
    ngaySinhSvValue,
    khoaHocSvValue,
    diemToanValue,
    diemLyValue,
    diemHoaValue
  );
  return sinhVien;
}

// Hàm Thêm Sinh Viên
function themSV() {
  var sinhVien = layThongTinSv();
  var checkMaSV = kiemTraMaSV(sinhVien, dssv);
  // checkMaSV && dssv.push(sinhVien);
  if (checkMaSV) {
    dssv.push(sinhVien);
    luuLocalStorage(dssv);
  }
  renderTableSV(dssv);
}

// Hàm Tìm Vị Trí
function timViTri(maSV, arr) {
  var viTri = -1;
  for (var index = 0; index < arr.length; index++) {
    const sv = arr[index];
    if (sv.ma.toString() === maSV.toString()) {
      viTri = index;
    }
  }
  return viTri;
}

// Hàm Sửa SV
function suaSV(maSV) {
  var viTri = timViTri(maSV, dssv);
  if (viTri !== -1) {
    console.log(dssv[viTri]);
    var currentSv = dssv[viTri];
    document.getElementById("txtMaSV").value = currentSv.ma;
    document.getElementById("txtMaSV").disabled = true;
    document.getElementById("txtTenSV").value = currentSv.ten;
    document.getElementById("txtEmail").value = currentSv.email;
    document.getElementById("txtPass").value = currentSv.matKhau;
    document.getElementById("txtNgaySinh").value = currentSv.ngaySinh;
    document.getElementById("khSV").value = currentSv.khoaHoc;
    document.getElementById("txtDiemToan").value = currentSv.toan;
    document.getElementById("txtDiemLy").value = currentSv.ly;
    document.getElementById("txtDiemHoa").value = currentSv.hoa;
  }
}

// Hàm Cập Nhật SV
function capNhatSV() {
  var sinhVien = layThongTinSv();
  var viTri = timViTri(sinhVien.ma, dssv);
  if (viTri !== -1) {
    dssv[viTri] = sinhVien;
    renderTableSV(dssv);
    luuLocalStorage(dssv);
  }
}

// Hàm Xóa SV
function xoaSV(maSV) {
  var viTri = timViTri(maSV, dssv);
  if (viTri !== -1) {
    dssv.splice(viTri, 1);
    renderTableSV(dssv);
    luuLocalStorage(dssv);
  }
}

var dssvJson = localStorage.getItem(LOCALSTORAGE_DSSV);

var newDssv = JSON.parse(dssvJson);

if (newDssv) {
  var dssv = newDssv.map(function (item) {
    return new SinhVien(
      item.ma,
      item.ten,
      item.email,
      item.matKhau,
      item.ngaySinh,
      item.khoaHoc,
      item.toan,
      item.ly,
      item.hoa
    );
  });
  renderTableSV(dssv);
}
