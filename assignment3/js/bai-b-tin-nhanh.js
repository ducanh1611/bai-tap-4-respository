/* BÀI B — VIẾT CODE: Lọc tin và đăng tin nhanh (news.html)
   Viết code theo đặc tả.
   Không sửa news.html, không sửa css; chỉ viết JavaScript trong file này. */

// ---------- ĐÃ CHO SẴN (không sửa) ----------
// Chặn việc gửi form tìm kiếm khi nhấn Enter, để trang không bị tải lại.
document.querySelector("#searchbar form").addEventListener("submit", (e) => e.preventDefault());

// ---------- PHẦN BẠN VIẾT ----------

// F1. Bộ đếm "Đang hiển thị x/y tin" trong #bo-dem.

// F2 + F3. Lọc tin khi gõ vào #o-tim-kiem (sự kiện keyup) và thông báo #khong-thay.

// F4. Nút "Read more >>" / "Thu gọn <<" — MỘT trình lắng nghe đặt trên #list.

// F5. Nút #nut-dang: kiểm tra dữ liệu, tạo <li> mới, chèn vào đầu #list.


const oTim = document.querySelector("#o-tim-kiem");
const listTin = document.querySelector("#list");
const boDem = document.querySelector("#bo-dem");
const khongThay = document.querySelector("#khong-thay");
const oTieuDe = document.querySelector("#tin-tieu-de");
const oNoiDung = document.querySelector("#tin-noi-dung");
const nutDang = document.querySelector("#nut-dang");
const baoLoi = document.querySelector("#bao-loi");

function capNhatTin() {
	const tuKhoa = oTim.value;
	const cacTin = Array.from(listTin.querySelectorAll("li"));
	let soHien = 0;
	for (const tin of cacTin) {
		const tieuDe = tin.querySelector("h3")?.textContent || "";
		const noiDung = tin.querySelector("p")?.textContent || "";
		const khop = (tieuDe + " " + noiDung).toLowerCase().includes(tuKhoa.toLowerCase());
		tin.classList.toggle("an", !khop);
		if (khop) soHien++;
	}
	boDem.textContent = `Đang hiển thị ${soHien}/${cacTin.length} tin`;
	if (soHien === 0) {
		khongThay.textContent = `Không tìm thấy tin nào cho "${tuKhoa}"`;
		khongThay.classList.remove("an");
	} else {
		khongThay.classList.add("an");
	}
}

oTim.addEventListener("keyup", capNhatTin);

listTin.addEventListener("click", (e) => {
	const nut = e.target.closest(".more");
	if (!nut || !listTin.contains(nut)) return;
	e.preventDefault();
	const tin = nut.closest("li");
	const p = tin.querySelector("p");
	if (!p) return;
	const mo = p.classList.toggle("day-du");
	nut.textContent = mo ? "Thu gọn <<" : "Read more >>";
});

nutDang.addEventListener("click", () => {
	const tieuDe = oTieuDe.value;
	const noiDung = oNoiDung.value;
	if (tieuDe.trim() === "" || noiDung.trim() === "") {
		baoLoi.textContent = "Vui lòng nhập đủ tiêu đề và nội dung.";
		return;
	}
	const tin = document.createElement("li");
	const ngay = document.createElement("span");
	ngay.className = "time";
	ngay.textContent = homNay();
	const h3 = document.createElement("h3");
	h3.textContent = tieuDe;
	const p = document.createElement("p");
	p.textContent = noiDung;
	const nut = document.createElement("button");
	nut.type = "button";
	nut.className = "more";
	nut.textContent = "Read more >>";
	tin.append(ngay, h3, p, nut);
	listTin.prepend(tin);
	oTieuDe.value = "";
	oNoiDung.value = "";
	baoLoi.textContent = "";
	capNhatTin();
});

capNhatTin();
