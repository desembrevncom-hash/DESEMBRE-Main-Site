import { Sparkles, BookOpen, Layers, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function KnowledgePage() {
  const routines = [
    {
      title: "Quy Trình Làm Sạch Chuẩn Spa (Deep Cleansing)",
      desc: "Làm sạch sâu từng lỗ chân lông mà không làm tổn thương hàng rào ẩm tự nhiên.",
      steps: [
        "Bước 1: Tẩy trang dịu nhẹ với Derma Science Water Cleanser",
        "Bước 2: Sữa rửa mặt dịu nhẹ Milk Essential Cleanser",
        "Bước 3: Tẩy tế bào chết enzyme sinh học Enzyme Powder Cleanser",
        "Bước 4: Cân bằng pH da với Derma Science Hydro Toner",
      ],
      tag: "Làm sạch & Cân bằng",
    },
    {
      title: "Phác Đồ Cấp Ẩm & Tái Tạo Chuyên Sâu (Hydro Therapy)",
      desc: "Cấp nước đa tầng, phục hồi làn da khô căng, kích ứng sau xâm lấn hoặc peel.",
      steps: [
        "Bước 1: Làm sạch da dịu nhẹ",
        "Bước 2: Thoa Tinh chất cô đặc Hydro Concentrate",
        "Bước 3: Điện di Tinh chất Ampoule Hyaluron Water Drop",
        "Bước 4: Đắp Mặt nạ thạch dẻo Modeling Mask",
        "Bước 5: Khóa ẩm với Hydro Science Pure 24h Care Cream",
      ],
      tag: "Cấp ẩm & Phục hồi",
    },
    {
      title: "Liệu Pháp Trẻ Hóa & Nâng Cơ Luxury Gold Therapy",
      desc: "Ứng dụng vàng 24K 99.99% giúp đào thải độc tố chì, kích thích tăng sinh collagen.",
      steps: [
        "Bước 1: Làm sạch và chuẩn bị da với Derma Science",
        "Bước 2: Massage dẫn xuất lá vàng 24K Luxury Gold Foil",
        "Bước 3: Đắp mặt nạ bột vàng Luxury Gold Modeling Mask",
        "Bước 4: Dưỡng ẩm bảo vệ chuyên sâu",
      ],
      tag: "Liệu trình cao cấp",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5 text-sky-600" />
          <span>Kiến Thức Da Liễu & Trị Liệu</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Cẩm Nang Chăm Sóc Da <br />
          <span className="text-sky-600">Chuẩn Chuyên Nghiệp</span>
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Tổng hợp các quy trình chăm sóc da chuẩn y khoa và phác đồ điều trị độc quyền từ chuyên gia da liễu DESEMBRE Hàn Quốc.
        </p>
      </section>

      {/* Routine Cards */}
      <section className="grid md:grid-cols-3 gap-8">
        {routines.map((r, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 flex flex-col justify-between hover:shadow-lg transition-shadow"
          >
            <div className="space-y-4">
              <span className="inline-block text-[11px] font-bold text-sky-600 bg-sky-50 px-3 py-1 rounded-full">
                {r.tag}
              </span>
              <h3 className="text-lg font-bold text-slate-900 leading-snug">{r.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{r.desc}</p>

              <div className="space-y-2 pt-3 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-900 block">Các bước thực hiện:</span>
                <ul className="space-y-2 text-xs text-slate-600">
                  {r.steps.map((st, sIdx) => (
                    <li key={sIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{st}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100">
              <Link
                to="/san-pham"
                className="inline-flex items-center gap-1 text-xs font-bold text-sky-600 hover:text-sky-700"
              >
                <span>Xem sản phẩm liên quan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
