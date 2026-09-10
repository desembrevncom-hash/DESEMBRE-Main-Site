import { DEFAULT_BRANDING } from "@/config/branding";
import { Mail, Phone, MapPin, MessageCircle, Clock, Send } from "lucide-react";
import { useState } from "react";

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider">
          <Mail className="w-3.5 h-3.5 text-sky-600" />
          <span>Liên Hệ Với Chúng Tôi</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Kết Nối Cùng <br />
          <span className="text-sky-600">DESEMBRE VIETNAM</span>
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Đội ngũ chuyên viên tư vấn của DESEMBRE luôn sẵn sàng giải đáp thắc mắc về sản phẩm, chính sách phân phối và phác đồ điều trị cho cơ sở của bạn.
        </p>
      </section>

      <section className="grid lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div className="space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-900">Thông Tin Trực Tiếp</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-slate-900">Địa chỉ văn phòng:</strong>
                  <span className="text-slate-600">{DEFAULT_BRANDING.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-slate-900">Hotline tư vấn & hỗ trợ:</strong>
                  <span className="text-slate-600">{DEFAULT_BRANDING.hotline}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-slate-900">Email:</strong>
                  <span className="text-slate-600">{DEFAULT_BRANDING.email}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-slate-900">Giờ làm việc:</strong>
                  <span className="text-slate-600">Thứ 2 - Thứ 7: 8:30 - 17:30</span>
                </div>
              </div>
            </div>
          </div>

          {/* Zalo Button */}
          <div className="pt-6 border-t border-slate-100">
            <a
              href={`https://zalo.me/${DEFAULT_BRANDING.hotline.replace(/\s+/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm text-center"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Nhắn tin tư vấn trực tiếp qua Zalo</span>
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-100 shadow-sm">
          {submitted ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <Send className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Đã Gửi Thành Công!</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Cảm ơn bạn đã liên hệ. Đội ngũ chuyên viên của DESEMBRE sẽ liên lạc lại trong thời gian sớm nhất.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Gửi Yêu Cầu Tư Vấn</h3>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Họ và tên *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Nguyễn Văn A"
                  className="w-full p-3 bg-slate-50 rounded-xl text-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Số điện thoại *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="0988xxxxxx"
                  className="w-full p-3 bg-slate-50 rounded-xl text-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Tên Spa / Cơ sở thẩm mỹ (nếu có)
                </label>
                <input
                  type="text"
                  placeholder="An Nhiên Beauty Spa"
                  className="w-full p-3 bg-slate-50 rounded-xl text-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Nội dung cần hỗ trợ
                </label>
                <textarea
                  rows={4}
                  placeholder="Nhu cầu tìm hiểu bảng giá sỉ, chuyển giao phác đồ trị liệu..."
                  className="w-full p-3 bg-slate-50 rounded-xl text-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm py-3.5 rounded-xl transition-colors shadow-sm"
              >
                Gửi Thông Tin Cho DESEMBRE
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
