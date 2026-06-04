import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Phone, X, MessageCircle, Send, PhoneCall, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    method: 'whatsapp',
    consent: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    setIsSubmitting(true);
    
    // Here you would normally send the data to a backend API
    // which would then send the WhatsApp message to +7 964 003 00 81
    const text = `Новая заявка с сайта (Главная страница)\nИмя: ${formData.name}\nТелефон: ${formData.phone}\nСпособ связи: ${formData.method}`;
    
    try {
      // Send to our backend API which will handle the email message
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: text }),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.details || errorData.error || 'Failed to send message');
      }
      
      setIsSuccess(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setIsSuccess(false);
        setFormData({ name: '', phone: '', method: 'whatsapp', consent: false });
      }, 3000);
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitError(`Ошибка при отправке: ${error instanceof Error ? error.message : 'Пожалуйста, проверьте настройки почты или попробуйте позже.'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-white text-gray-900 font-sans">
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex flex-col bg-black overflow-hidden">
        {/* Background Image with Overlays */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            src="/1.jpg"
            alt="МТК АЗС Background"
            style={{ y, willChange: 'transform' }}
            className="w-full h-full object-cover object-[75%_center] md:object-center transform-gpu backface-hidden scale-110"
            fetchPriority="high"
            loading="eager"
            decoding="async"
          />
          {/* Dark overlays for readability and premium depth */}
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20"></div>
        </div>

        {/* Header (Glassmorphism) */}
        <motion.header
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-50 border-b border-white/10 backdrop-blur-md bg-black/20 transform-gpu will-change-transform"
        >
          <div className="w-full px-5 md:px-[50px] py-4 md:py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 bg-red-600 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.5)] animate-pulse"></div>
              <span className="text-xl md:text-2xl font-semibold tracking-widest uppercase text-white">МТК АЗС</span>
            </div>
            
            <nav className="hidden md:flex items-center gap-8 lg:gap-12 text-xs font-medium tracking-[0.2em] uppercase text-gray-300">
              <a href="#contacts" className="hover:text-white transition-colors">Контакты</a>
              <a href="#gas-station" className="hover:text-white transition-colors">Заправка</a>
              <a href="#wholesale" className="hover:text-white transition-colors">Оптовые поставки</a>
            </nav>

            <div className="flex items-center gap-4 md:gap-8">
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="relative z-10 w-full px-5 md:px-[50px] flex-1 flex flex-col justify-center pb-24 md:pb-32 pt-10">
          <div className="max-w-3xl">
            {/* Subtitle Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="inline-flex items-center gap-3 px-4 py-2 md:px-5 md:py-2.5 rounded-full border border-white/10 bg-black/40 backdrop-blur-sm mb-8 md:mb-10 shadow-sm transform-gpu will-change-[transform,opacity]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
              <span className="text-[10px] md:text-xs font-medium uppercase tracking-[0.15em] text-gray-300">
                Махачкалинская топливная компания
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="text-[2.5rem] leading-[1.1] md:text-5xl lg:text-[4rem] font-light tracking-tight mb-8 md:mb-10 text-white transform-gpu will-change-[transform,opacity]"
            >
              Оптово-розничная <br className="hidden sm:block" />
              <span className="text-[#D12020] font-normal">
                продажа топлива
              </span> МТК
            </motion.h1>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4 md:gap-5 transform-gpu will-change-[transform,opacity]"
            >
              <button 
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white text-[13px] font-normal tracking-wide rounded-full transition-all shadow-[0_0_20px_rgba(220,38,38,0.2)] hover:shadow-[0_0_30px_rgba(220,38,38,0.3)] active:scale-95 w-full sm:w-fit"
              >
                Узнать больше
              </button>
            </motion.div>
          </div>
        </main>
      </section>

      {/* --- SECOND SECTION --- */}
      <section id="gas-station" className="relative w-full bg-white py-16 md:py-24 lg:py-32 px-4 md:px-[50px] overflow-hidden">
        {/* Card Wrapper (Подложка) */}
        <motion.div 
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative w-full bg-[#f4f5f7] rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center gap-10 lg:gap-16 overflow-hidden border border-gray-200 shadow-xl shadow-gray-200/50"
        >
          
          {/* Subtle background glow inside the card */}
          <div className="hidden md:block absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/5 blur-[100px] rounded-full pointer-events-none"></div>

          {/* Text Content */}
          <div className="flex-1 w-full max-w-2xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="transform-gpu will-change-[transform,opacity]"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight mb-3 md:mb-4 text-gray-900">
                Заправка МТК
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl text-red-600 font-normal mb-8 md:mb-12">
                Нас ценят за качество
              </p>

              <ul className="space-y-4 md:space-y-6 mb-10 md:mb-14">
                {[
                  "6 АЗС в Республике Дагестан",
                  "Топливо высокого качества",
                  "Маркет с широким ассортиментом товаров"
                ].map((item, i) => (
                  <li 
                    key={i}
                    className="flex items-center gap-4 text-gray-700 text-base md:text-lg lg:text-xl font-light leading-snug"
                  >
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)] shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Link to="/gas-station" className="inline-block text-center px-8 py-3.5 bg-gray-900 hover:bg-black text-white text-[13px] font-normal tracking-wide rounded-full transition-all shadow-[0_4px_14px_0_rgb(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] active:scale-95 w-full sm:w-fit">
                Подробнее
              </Link>
            </motion.div>
          </div>

          {/* Image/Visual */}
          <div className="flex-1 w-full relative z-10 mt-4 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative rounded-[1.5rem] md:rounded-[2rem] overflow-hidden aspect-[4/3] lg:aspect-square max-h-[400px] md:max-h-[600px] w-full shadow-2xl shadow-gray-300/60 transform-gpu will-change-[transform,opacity]"
            >
              {/* Premium overlays for light theme */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-transparent z-10 mix-blend-overlay"></div>
              
              {/* Placeholder for the Jerrycan / Gas station image */}
              <motion.img 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                src="/MTKDJI.jpg" 
                alt="Качество топлива МТК" 
                className="w-full h-full object-cover transform-gpu rounded-[1.5rem] md:rounded-[2rem]"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* --- THIRD SECTION --- */}
      <section id="wholesale" className="relative w-full bg-white pb-16 md:pb-24 lg:pb-32 px-4 md:px-[50px] overflow-hidden">
        {/* Card Wrapper */}
        <motion.div 
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative w-full bg-[#f4f5f7] rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 lg:p-16 flex flex-col lg:flex-row-reverse items-center gap-10 lg:gap-16 overflow-hidden border border-gray-200 shadow-xl shadow-gray-200/50"
        >
          
          {/* Subtle background glow inside the card */}
          <div className="hidden md:block absolute top-0 left-0 w-[500px] h-[500px] bg-red-600/5 blur-[100px] rounded-full pointer-events-none"></div>

          {/* Text Content */}
          <div className="flex-1 w-full max-w-2xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="transform-gpu will-change-[transform,opacity]"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight mb-3 md:mb-4 text-gray-900">
                Оптовые поставки ГСМ
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl text-red-600 font-normal mb-8 md:mb-12">
                Поставки напрямую с крупнейших заводов-изготовителей
              </p>

              <ul className="space-y-4 md:space-y-6 mb-10 md:mb-14">
                {[
                  "Гарантия качества топлива",
                  "Соблюдение сроков доставки"
                ].map((item, i) => (
                  <li 
                    key={i}
                    className="flex items-center gap-4 text-gray-700 text-base md:text-lg lg:text-xl font-light leading-snug"
                  >
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)] shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Link to="/wholesale" className="inline-block text-center px-8 py-3.5 bg-gray-900 hover:bg-black text-white text-[13px] font-normal tracking-wide rounded-full transition-all shadow-[0_4px_14px_0_rgb(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] active:scale-95 w-full sm:w-fit">
                Подробнее
              </Link>
            </motion.div>
          </div>

          {/* Image/Visual */}
          <div className="flex-1 w-full relative z-10 mt-4 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative rounded-[1.5rem] md:rounded-[2rem] overflow-hidden aspect-[4/3] lg:aspect-square max-h-[400px] md:max-h-[600px] w-full shadow-2xl shadow-gray-300/60 transform-gpu will-change-[transform,opacity]"
            >
              {/* Premium overlays for light theme */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-transparent z-10 mix-blend-overlay"></div>
              
              {/* Placeholder for the Truck image */}
              <motion.img 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                src="/opt.png" 
                alt="Оптовые поставки ГСМ" 
                className="w-full h-full object-cover transform-gpu rounded-[1.5rem] md:rounded-[2rem]"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* --- FOURTH SECTION --- */}
      <section className="relative w-full bg-white pb-16 md:pb-24 lg:pb-32 px-4 md:px-[50px] overflow-hidden">
        {/* Card Wrapper */}
        <div className="relative w-full bg-[#f4f5f7] rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center gap-10 lg:gap-16 overflow-hidden border border-gray-200 shadow-xl shadow-gray-200/50">
          
          {/* Subtle background glow inside the card */}
          <div className="hidden md:block absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/5 blur-[100px] rounded-full pointer-events-none"></div>

          {/* Text Content */}
          <div className="flex-1 w-full max-w-2xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="transform-gpu will-change-[transform,opacity]"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-3 md:mb-4 text-red-600 uppercase">
                МТК
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-900 font-light mb-8 md:mb-12">
                Надежный партнер
              </p>

              <ul className="space-y-4 md:space-y-6 mb-10 md:mb-14">
                {[
                  "Поставки напрямую от производителей",
                  "Более 50 городов поставки",
                  "8 различных поставщиков"
                ].map((item, i) => (
                  <li 
                    key={i}
                    className="flex items-center gap-4 text-gray-700 text-base md:text-lg lg:text-xl font-light leading-snug"
                  >
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)] shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white text-[13px] font-normal tracking-wide rounded-full transition-all shadow-[0_0_20px_rgba(220,38,38,0.2)] hover:shadow-[0_0_30px_rgba(220,38,38,0.3)] active:scale-95 w-full sm:w-fit"
              >
                Связаться с нами
              </button>
            </motion.div>
          </div>

          {/* Image/Visual */}
          <div className="flex-1 w-full relative z-10 mt-4 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative rounded-[1.5rem] md:rounded-[2rem] overflow-hidden aspect-[4/3] lg:aspect-[4/3] max-h-[400px] md:max-h-[600px] w-full shadow-2xl shadow-gray-300/60 transform-gpu will-change-transform"
            >
              {/* Premium overlays for light theme */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-transparent z-10 mix-blend-overlay"></div>
              
              {/* Gas station canopy image */}
              <motion.img 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                src="/4.jpg" 
                alt="АЗС МТК" 
                className="w-full h-full object-cover transform-gpu rounded-[1.5rem] md:rounded-[2rem]"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- FOOTER / CONTACTS --- */}
      <footer id="contacts" className="relative w-full bg-[#D12020] overflow-hidden">
        {/* Subtle background glow inside the footer */}
        <div className="hidden md:block absolute top-0 left-0 w-[500px] h-[500px] bg-white/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="relative z-10 w-full px-5 md:px-[50px] py-12 md:py-16 lg:py-24 flex flex-col lg:flex-row items-stretch gap-10 lg:gap-16">
          
          {/* Text Content */}
          <div className="flex-1 w-full max-w-xl relative z-10 flex flex-col justify-between">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="transform-gpu will-change-[transform,opacity]"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight mb-10 md:mb-16 text-white">
                Контакты
              </h2>
              
              <div className="space-y-6 md:space-y-8 text-white/90 font-light text-base md:text-lg lg:text-xl">
                <div>
                  <h3 className="text-white font-medium mb-4">Главный офис</h3>
                  <div className="grid grid-cols-[100px_1fr] md:grid-cols-[120px_1fr] gap-2 md:gap-4 items-start">
                    <span className="text-white/70">Адрес:</span>
                    <span>г. Махачкала, проспект Имама Шамиля 17/1</span>
                  </div>
                </div>

                <div className="grid grid-cols-[100px_1fr] md:grid-cols-[120px_1fr] gap-2 md:gap-4 items-start">
                  <span className="text-white/70">Телефон:</span>
                  <a href="tel:+79882294919" className="hover:text-white transition-colors">+7 988 229 49 19</a>
                </div>

                <div className="grid grid-cols-[100px_1fr] md:grid-cols-[120px_1fr] gap-2 md:gap-4 items-start">
                  <span className="text-white/70">Почта:</span>
                  <a href="mailto:mtk22.55@yandex.ru" className="hover:text-white transition-colors">mtk22.55@yandex.ru</a>
                </div>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="mt-12 md:mt-16 transform-gpu will-change-[transform,opacity]"
            >
              <h3 className="text-white/90 font-light text-base md:text-lg mb-4">Социальные сети</h3>
              <div className="flex items-center gap-4 mb-8">
                <a href="https://wa.me/79882294919" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-[#D12020] transition-all duration-300" title="WhatsApp">
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
              <div className="flex flex-col space-y-2">
                <Link to="/privacy" className="text-xs text-white/60 hover:text-white transition-colors underline underline-offset-4">Политика конфиденциальности</Link>
                <p className="text-[10px] text-white/40 uppercase tracking-widest">
                  ИНН: 052001363683 | ОГРН: 321057100063603
                </p>
              </div>
            </motion.div>
          </div>

          {/* Map Visual */}
          <div className="flex-[1.2] w-full relative z-10 mt-12 lg:mt-0 block h-[400px] md:h-[450px] lg:h-[500px]">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative rounded-[1.5rem] md:rounded-[2rem] overflow-hidden w-full h-full shadow-2xl shadow-black/20 bg-white transform-gpu will-change-[transform,opacity]"
            >
              {/* Yandex Map Iframe */}
              <iframe 
                src="https://yandex.ru/map-widget/v1/?ll=47.483001,42.975630&z=17&pt=47.483001,42.975630,pm2rdm" 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                loading="lazy"
              ></iframe>
            </motion.div>
          </div>
        </div>
      </footer>

      {/* --- CONTACT MODAL --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[2rem] overflow-hidden shadow-2xl"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-8 md:p-10">
                {isSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-10"
                  >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                      <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-light tracking-tight text-gray-900 mb-2">Заявка отправлена!</h3>
                    <p className="text-gray-500 font-light">Спасибо за обращение. Мы свяжемся с вами в ближайшее время.</p>
                  </motion.div>
                ) : (
                  <>
                    <h3 className="text-2xl md:text-3xl font-light tracking-tight text-gray-900 mb-2">Оставить заявку</h3>
                    <p className="text-gray-500 font-light mb-8">Заполните форму, и мы свяжемся с вами в ближайшее время.</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-2 ml-1">Ваше имя</label>
                        <input 
                          required
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, '')})}
                          placeholder="Иван Иванов"
                          className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-2 ml-1">Номер телефона</label>
                        <input 
                          required
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value.replace(/[^\d+]/g, '')})}
                          placeholder="+7 (999) 000-00-00"
                          className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-4 ml-1">Способ связи</label>
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
                            { id: 'telegram', label: 'Telegram', icon: Send },
                            { id: 'call', label: 'Звонок', icon: PhoneCall }
                          ].map((item) => (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => setFormData({...formData, method: item.id})}
                              className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all ${
                                formData.method === item.id 
                                  ? 'bg-red-50 border-red-600 text-red-600' 
                                  : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'
                              }`}
                            >
                              <item.icon className="w-6 h-6 mb-2" />
                              <span className="text-[10px] font-medium uppercase tracking-wider">{item.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-start gap-3 mt-4">
                        <input 
                          type="checkbox" 
                          id="consent"
                          required
                          checked={formData.consent}
                          onChange={(e) => setFormData({...formData, consent: e.target.checked})}
                          className="mt-1 w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-600 cursor-pointer"
                        />
                        <label htmlFor="consent" className="text-[10px] text-gray-400 leading-relaxed cursor-pointer select-none">
                          Я даю согласие на обработку моих персональных данных в соответствии с <Link to="/privacy" className="underline hover:text-gray-500">политикой конфиденциальности</Link>
                        </label>
                      </div>

                      {submitError && (
                        <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm mt-4">
                          {submitError}
                        </div>
                      )}

                      <button 
                        type="submit"
                        disabled={!formData.consent || isSubmitting}
                        className="w-full py-5 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-medium tracking-wide rounded-2xl transition-all shadow-lg shadow-red-600/20 active:scale-[0.98] mt-4 flex justify-center items-center"
                      >
                        {isSubmitting ? (
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        ) : 'Отправить заявку'}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
