import { Sparkles, ShieldCheck, Heart, Award, CheckCircle2 } from "lucide-react";
import { DEFAULT_BRANDING } from "@/config/branding";

export function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero Intro */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-sky-600" />
          <span>Về Chúng Tôi</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Câu Chuyện Thương Hiệu <br />
          <span className="text-sky-600">DESEMBRE VIETNAM</span>
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Tiên phong trong lĩnh vực dược mỹ phẩm sinh học ứng dụng công nghệ tế bào gốc thực vật, DESEMBRE mang sứ mệnh phục hồi và nâng tầm vẻ đẹp làn da Á Đông chuẩn y khoa.
        </p>
      </section>

      {/* Brand Heritage */}
      <section className="grid md:grid-cols-2 gap-12 items-center bg-white p-8 sm:p-12 rounded-3xl border border-slate-100 shadow-sm">
        <div className="space-y-6">
          <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
            Nguồn gốc & Công nghệ
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug">
            Kế Thừa Tinh Hoa Khoa Học Da Liễu Hàn Quốc
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Được nghiên cứu và phát triển bởi tập đoàn Hyunjin C&T Hàn Quốc, DESEMBRE kết hợp hài hòa giữa y học cổ truyền phương Đông và công nghệ sinh học hiện đại. 
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            Với công thức thuần khiết, loại bỏ các hóa chất độc hại, các dòng sản phẩm của DESEMBRE được thiết kế chuyên biệt để hỗ trợ các liệu trình chuyên sâu tại Spa, Clinic và Thẩm mỹ viện.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-2xl font-black text-sky-600 block">15+</span>
              <span className="text-xs font-semibold text-slate-600">Năm nghiên cứu & phát triển</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-2xl font-black text-sky-600 block">3.000+</span>
              <span className="text-xs font-semibold text-slate-600">Cơ sở Spa & Clinic đối tác</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-sky-900 to-slate-900 text-white p-8 sm:p-10 rounded-2xl space-y-6">
          <h3 className="text-xl font-bold text-sky-300">4 Cam Kết Cốt Lõi</h3>
          <ul className="space-y-4 text-xs sm:text-sm">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white">An Toàn Tuyệt Đối:</strong>
                <span className="text-slate-300">Không cồn, không paraben, không chất tạo màu nhân tạo, an toàn cho cả làn da nhạy cảm nhất.</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white">Hiệu Quả Lâm Sàng:</strong>
                <span className="text-slate-300">Được kiểm nghiệm lâm sàng nghiêm ngặt tại các viện nghiên cứu da liễu Hàn Quốc.</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white">Công Nghệ Độc Quyền:</strong>
                <span className="text-slate-300">Liệu pháp Vàng 24K Luxury Gold, Trị liệu Oxy Peel Bubble và Hệ thống Tinh chất Cô đặc Ampoule.</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white">Đồng Hành Chuyên Môn:</strong>
                <span className="text-slate-300">Hỗ trợ chuyển giao phác đồ điều trị bài bản thông qua Desembre Academy.</span>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
