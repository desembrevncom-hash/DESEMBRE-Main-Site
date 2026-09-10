import { DEFAULT_BRANDING } from "@/config/branding";
import { Sparkles, HeartHandshake, ExternalLink, Percent, BookOpen, Truck, ShieldCheck } from "lucide-react";

export function PartnerPage() {
  const benefits = [
    {
      icon: <Percent className="w-6 h-6 text-sky-600" />,
      title: "Chính Sách Chiết Khấu Ưu Đãi",
      desc: "Mức chiết khấu sỉ hấp dẫn trực tiếp từ nhà phân phối chính hãng cho Spa, Clinic và Thẩm mỹ viện.",
    },
    {
      icon: <BookOpen className="w-6 h-6 text-emerald-600" />,
      title: "Chuyển Giao Phác Đồ Độc Quyền",
      desc: "Đào tạo kỹ thuật viên và chuyển giao trọn bộ tài liệu phác đồ điều trị miễn phí qua Desembre Academy.",
    },
    {
      icon: <Truck className="w-6 h-6 text-purple-600" />,
      title: "Cổng Đặt Hàng Thông Minh (Hub)",
      desc: "Tạo đơn hàng, xuất file báo giá PDF tự động và theo dõi tiến độ vận chuyển tức thời 24/7.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-amber-600" />,
      title: "Bảo Hộ & Pháp Lý Đầy Đủ",
      desc: "100% sản phẩm có đầy đủ công bố mỹ phẩm của Bộ Y Tế, tem phụ tiếng Việt và hóa đơn VAT.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider">
          <HeartHandshake className="w-3.5 h-3.5 text-sky-600" />
          <span>Dành Cho Spa & Đại Lý</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Hợp Tác Phát Triển Cùng <br />
          <span className="text-sky-600">DESEMBRE VIETNAM</span>
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Gia nhập mạng lưới hơn 3.000+ Spa và cơ sở làm đẹp hàng đầu để nâng cao uy tín chuyên môn và tối ưu doanh thu bền vững.
        </p>
      </section>

      {/* Benefits Grid */}
      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((b, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center">
              {b.icon}
            </div>
            <h3 className="font-bold text-base text-slate-900">{b.title}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">{b.desc}</p>
          </div>
        ))}
      </section>

      {/* CTA Portal Banner */}
      <section className="bg-gradient-to-br from-slate-900 to-sky-950 text-white rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-6 shadow-xl">
        <h2 className="text-2xl sm:text-3xl font-extrabold">
          Truy Cập Cổng Quản Lý Đối Tác DESEMBRE
        </h2>
        <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          Đăng nhập vào DESEMBRE Partner Hub để tra cứu giá sỉ, tạo báo giá chuyên nghiệp và đặt hàng nhanh chóng.
        </p>
        <div className="pt-2">
          <a
            href={DEFAULT_BRANDING.partner_hub_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-white font-bold text-sm px-8 py-4 rounded-xl shadow-lg shadow-sky-500/30 transition-all hover:scale-105"
          >
            <span>Đăng nhập Partner Hub</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
