import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Coffee, Wifi, Droplet, ShieldCheck, MapPin, Clock, Moon, X, MessageCircle, Send, PhoneCall, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function GasStation() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    contactMethod: 'WhatsApp',
    consent: false
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    setIsSubmitting(true);
    
    const text = `Новая заявка с сайта (Страница АЗС)\nИмя: ${formData.name}\nТелефон: ${formData.phone}\nСпособ связи: ${formData.contactMethod}`;
    
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
        setFormData({ name: '', phone: '', contactMethod: 'WhatsApp', consent: false });
      }, 3000);
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitError(`Ошибка при отправке: ${error instanceof Error ? error.message : 'Пожалуйста, проверьте настройки почты или попробуйте позже.'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-white text-black font-sans">
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex flex-col bg-black">
        {/* Background Image with Premium Overlays */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            src="/11.jpg"
            alt="АЗС МТК Premium"
            style={{ y }}
            className="w-full h-full object-cover object-[75%_center] md:object-center transform-gpu backface-hidden scale-110"
            fetchPriority="high"
            loading="eager"
            decoding="async"
          />
          {/* Dark overlays for readability and premium depth */}
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20"></div>
        </div>

        {/* Header (Glassmorphism matched with Home.tsx but dark) */}
        <motion.header
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-50 border-b border-white/10 backdrop-blur-md bg-black/20 transform-gpu will-change-transform"
        >
          <div className="w-full px-5 md:px-[50px] py-4 md:py-6 flex items-center justify-between">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
            >
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-black/40 backdrop-blur-md group-hover:bg-white/10 transition-all">
                <ArrowLeft className="w-4 h-4" />
              </div>
              <span className="text-xs tracking-[0.2em] uppercase font-medium hidden sm:block">На главную</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-6 lg:gap-8 text-[10px] font-medium tracking-[0.2em] uppercase text-gray-400">
              <a href="#service" className="hover:text-white transition-colors">Сервис</a>
              <a href="#products" className="hover:text-white transition-colors">Услуги</a>
              <a href="#amenities" className="hover:text-white transition-colors">Удобства</a>
              <a href="#gallery" className="hover:text-white transition-colors">Галерея</a>
              <a href="#locations" className="hover:text-white transition-colors">Местоположение</a>
              <a href="#contacts" className="hover:text-white transition-colors">Контакты</a>
            </nav>

            <div className="flex items-center gap-4 md:gap-8">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-600 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.8)]"></div>
                <span className="text-lg md:text-xl font-semibold tracking-widest uppercase text-white">МТК АЗС</span>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="relative z-10 w-full px-5 md:px-[50px] flex-1 flex flex-col justify-center pb-20 pt-10">
          <div className="max-w-4xl">
            {/* Premium Label */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="flex items-center gap-4 mb-8 transform-gpu will-change-[transform,opacity]"
            >
              <div className="h-[1px] w-12 bg-red-600"></div>
              <span className="text-[10px] md:text-xs font-medium uppercase tracking-[0.3em] text-red-600">
                Флагманская станция
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-medium leading-[1.1] tracking-tight mb-8 text-white transform-gpu will-change-[transform,opacity]"
            >
              Сеть заправочных <br />
              станций МТК
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="text-lg md:text-xl text-gray-300 font-light max-w-2xl leading-relaxed mb-12 transform-gpu will-change-[transform,opacity]"
            >
              Качественное топливо - это ключевой элемент эффективной работы двигателя и долгосрочного сохранения автомобиля
            </motion.p>

            {/* Button */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              className="transform-gpu will-change-[transform,opacity]"
            >
              <button 
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white text-[15px] font-medium rounded-full transition-all active:scale-95 shadow-[0_4px_14px_0_rgba(220,38,38,0.2)] hover:shadow-[0_6px_20px_rgba(220,38,38,0.3)]"
              >
                Узнать больше
              </button>
            </motion.div>
          </div>
        </main>
      </section>

      {/* Contact Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-5">
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
              className="relative w-full max-w-lg bg-zinc-900 border border-white/10 p-8 md:p-12 shadow-2xl"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="mb-8">
                {isSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-10"
                  >
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                      <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 uppercase tracking-wider">Заявка отправлена!</h2>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Спасибо за обращение. Мы свяжемся с вами в ближайшее время.
                    </p>
                  </motion.div>
                ) : (
                  <>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 uppercase tracking-wider">Оставить заявку</h2>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Заполните форму ниже, и наш менеджер свяжется с вами в ближайшее время для консультации.
                    </p>
                  </>
                )}
              </div>

              {!isSuccess && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2 font-medium">Ваше имя</label>
                    <input 
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, '')})}
                      className="w-full bg-white/5 border border-white/10 px-4 py-4 text-white focus:outline-none focus:border-red-600 transition-colors"
                      placeholder="Иван Иванов"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2 font-medium">Номер телефона</label>
                    <input 
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value.replace(/[^\d+]/g, '')})}
                    className="w-full bg-white/5 border border-white/10 px-4 py-4 text-white focus:outline-none focus:border-red-600 transition-colors"
                    placeholder="+7 (999) 000-00-00"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2 font-medium">Где удобней связаться?</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'WhatsApp', icon: MessageCircle },
                      { id: 'Telegram', icon: Send },
                      { id: 'Звонок', icon: PhoneCall }
                    ].map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setFormData({...formData, contactMethod: method.id})}
                        className={`flex flex-col items-center justify-center gap-2 py-4 border transition-all ${
                          formData.contactMethod === method.id 
                            ? 'bg-red-600 border-red-600 text-white' 
                            : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'
                        }`}
                      >
                        <method.icon className="w-5 h-5" />
                        <span className="text-[8px] uppercase tracking-widest font-bold">{method.id}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-start gap-3 mt-4">
                  <input 
                    type="checkbox" 
                    id="consent-gas"
                    required
                    checked={formData.consent}
                    onChange={(e) => setFormData({...formData, consent: e.target.checked})}
                    className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-red-600 focus:ring-red-600 cursor-pointer"
                  />
                  <label htmlFor="consent-gas" className="text-[10px] text-gray-500 leading-relaxed cursor-pointer select-none">
                    Я даю согласие на обработку моих персональных данных в соответствии с <Link to="/privacy" className="underline hover:text-white">политикой конфиденциальности</Link>
                  </label>
                </div>

                {submitError && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm mt-4">
                    {submitError}
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={!formData.consent || isSubmitting}
                  className="w-full py-5 bg-white text-black font-bold text-xs uppercase tracking-[0.3em] hover:bg-red-600 hover:text-white disabled:bg-zinc-800 disabled:text-gray-600 disabled:cursor-not-allowed transition-all mt-4 flex justify-center items-center"
                >
                  {isSubmitting ? (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : 'Отправить заявку'}
                </button>
              </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- DETAILS SECTION --- */}
      <section id="service" className="relative py-20 md:py-32 px-5 md:px-[50px] bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            
            {/* Image Side */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative aspect-[4/5] md:aspect-square rounded-3xl overflow-hidden transform-gpu will-change-[transform,opacity] shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-red-900/10 to-transparent z-10 mix-blend-overlay"></div>
              <motion.img 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                src="/4.jpg" 
                alt="Сервис МТК" 
                className="w-full h-full object-cover transform-gpu rounded-3xl"
                loading="lazy"
                decoding="async"
              />
              
              {/* Floating Badge */}
              <div className="absolute bottom-8 left-8 z-20 p-6 rounded-2xl bg-white/80 backdrop-blur-md border border-black/5 shadow-xl">
                <div className="text-4xl font-light text-black mb-1">24/7</div>
                <div className="text-xs uppercase tracking-widest text-red-600">Режим работы</div>
              </div>
            </motion.div>

            {/* Text Side */}
            <div className="flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="transform-gpu will-change-[transform,opacity]"
              >
                <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-6 text-black">
                  Премиальный сервис <br />
                  <span className="text-gray-400">в каждой детали</span>
                </h2>
                
                <p className="text-gray-600 text-base md:text-lg font-light leading-relaxed mb-10">
                  Мы создали пространство, где заправка автомобиля становится приятным отдыхом. От высококачественного топлива до ароматного кофе — мы заботимся о вашем комфорте в пути.
                </p>

                <div className="space-y-8">
                  {[
                    {
                      title: "Топливо от ведущих НПЗ",
                      desc: "Прямые поставки гарантируют отсутствие примесей и соответствие заявленному октановому числу."
                    },
                    {
                      title: "Современное оборудование",
                      desc: "Высокоточные ТРК обеспечивают точный налив и высокую скорость заправки вашего автомобиля."
                    },
                    {
                      title: "Программа лояльности",
                      desc: "Копите баллы с каждой заправки и оплачивайте ими топливо или товары в нашем маркете."
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-5">
                      <div className="w-12 h-12 rounded-full border border-black/5 flex items-center justify-center shrink-0 bg-gray-50">
                        <span className="text-red-600 font-light">0{idx + 1}</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-black mb-2">{item.title}</h4>
                        <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section id="products" className="relative py-20 md:py-32 px-5 md:px-[50px] bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-12 md:mb-16 transform-gpu will-change-[transform,opacity]"
          >
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-black mb-4">Услуги</h2>
            <div className="h-[1px] w-24 bg-red-600"></div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Fuel Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.01 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="group relative overflow-hidden rounded-[2.5rem] md:rounded-[3rem] bg-gray-50 border border-black/5 hover:border-red-600/30 shadow-xl transform-gpu will-change-[transform,opacity]"
            >
              {/* Subtle Texture Overlay */}
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
              
              <div className="relative z-10 p-8 md:p-12 flex flex-col gap-8 h-full">
                <div className="flex-1 pl-[10px]">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 rounded-2xl bg-red-600/5 border border-red-600/10 flex items-center justify-center group-hover:bg-red-600/10 transition-colors duration-500">
                      <Droplet className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="px-5 py-2 rounded-full border border-black/5 bg-white shadow-sm">
                      <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-gray-500 group-hover:text-black transition-colors">Заправка топливом</span>
                    </div>
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-light text-black mb-10 tracking-tight leading-tight">
                    Высококачественное <br />
                    <span className="text-red-600 font-medium">топливо</span>
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-8 md:gap-12">
                    {['100', '95', '92', 'ДТ евро'].map((fuel, i) => (
                      <div key={i} className="flex items-center gap-5 group/item">
                        <div className="w-2 h-2 rounded-full bg-red-600 group-hover/item:scale-150 transition-transform shadow-[0_0_15px_rgba(220,38,38,0.3)]"></div>
                        <span className="text-2xl md:text-3xl font-light text-gray-600 group-hover/item:text-black transition-colors tracking-tighter">{fuel}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hover Accent Line */}
              <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-red-600 transition-all duration-700 group-hover:w-full pointer-events-none"></div>
            </motion.div>

            {/* Coffee Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.01 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="group relative overflow-hidden rounded-[2.5rem] md:rounded-[3rem] bg-gray-50 border border-black/5 hover:border-red-600/30 shadow-xl transform-gpu will-change-[transform,opacity]"
            >
              {/* Subtle Texture Overlay */}
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
              
              <div className="relative z-10 p-8 md:p-12 flex flex-col gap-8 h-full">
                <div className="flex-1 pl-[10px]">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 rounded-2xl bg-red-600/5 border border-red-600/10 flex items-center justify-center group-hover:bg-red-600/10 transition-colors duration-500">
                      <Coffee className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="px-5 py-2 rounded-full border border-black/5 bg-white shadow-sm">
                      <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-gray-500 group-hover:text-black transition-colors">Магазин и кофе</span>
                    </div>
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-light text-black mb-10 tracking-tight leading-tight">
                    Ароматный кофе <br />
                    <span className="text-red-600 font-medium">премиум класса</span>
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-8 md:gap-12">
                    {['Американо', 'Капучино', 'Эспрессо', 'Латте'].map((coffee, i) => (
                      <div key={i} className="flex items-center gap-5 group/item">
                        <div className="w-2 h-2 rounded-full bg-red-600 group-hover/item:scale-150 transition-transform shadow-[0_0_15px_rgba(220,38,38,0.3)]"></div>
                        <span className="text-2xl md:text-3xl font-light text-gray-600 group-hover/item:text-black transition-colors tracking-tighter">{coffee}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hover Accent Line */}
              <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-red-600 transition-all duration-700 group-hover:w-full pointer-events-none"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- AMENITIES SECTION --- */}
      <section id="amenities" className="relative py-20 md:py-32 px-5 md:px-[50px] bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-12 md:mb-16 transform-gpu will-change-[transform,opacity]"
          >
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-black mb-4">Удобства для клиентов</h2>
            <div className="h-[1px] w-24 bg-red-600"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-br from-red-600 to-red-800 p-6 md:p-16 shadow-[0_20px_50px_rgba(220,38,38,0.2)] transform-gpu will-change-[transform,opacity]"
          >
            {/* Subtle Texture Overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-16">
                <h3 className="text-2xl md:text-3xl font-medium text-white mb-2">У нас есть все, для вашего удобства</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {[
                  {
                    num: "01",
                    title: "Кафе или зона отдыха",
                    desc: "На нашей заправке вы найдете уютное кафе и зону отдыха, где вы сможете расслабиться и насладиться приятной атмосферой во время вашей поездки",
                    icon: Coffee
                  },
                  {
                    num: "02",
                    title: "Бесплатный Wi-Fi",
                    desc: "Мы понимаем, насколько важно оставаться на связи в любое время, поэтому мы предлагаем бесплатный Wi-Fi для всех наших клиентов",
                    icon: Wifi
                  },
                  {
                    num: "03",
                    title: "Молельная комната",
                    desc: "Водители и пассажиры могут совершать свои молитвы без необходимости искать подходящее место или отклоняться от маршрута.",
                    icon: Moon
                  }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    whileHover={{ y: -5 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ 
                      duration: 1, 
                      delay: 0.1 + idx * 0.1, 
                      ease: "easeOut" 
                    }}
                    className="group relative p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-colors duration-500"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-500">
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-sm font-medium text-white/40 tracking-widest">{item.num}</span>
                    </div>
                    <h4 className="text-xl font-medium text-white mb-4">{item.title}</h4>
                    <p className="text-white/70 text-sm leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- GALLERY SECTION --- */}
      <section id="gallery" className="relative py-20 md:py-32 px-5 md:px-[50px] bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8 }}
            className="mb-12 md:mb-16 will-change-transform"
          >
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-black mb-4">Сеть АЗС</h2>
            <div className="h-[1px] w-24 bg-red-600"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
            {/* Top Left Large Horizontal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8 }}
              className="md:col-span-8 h-[250px] md:h-[450px] rounded-2xl md:rounded-3xl overflow-hidden group relative shadow-xl will-change-transform"
            >
              <motion.img 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                src="/1.jpg" 
                alt="АЗС МТК Вид сверху" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 rounded-2xl md:rounded-3xl"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
            </motion.div>

            {/* Right Tall Vertical */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="md:col-span-4 md:row-span-2 h-[350px] md:h-auto rounded-2xl md:rounded-3xl overflow-hidden group relative shadow-xl will-change-transform"
            >
              <motion.img 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                src="/11.jpg" 
                alt="АЗС МТК Город" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 rounded-2xl md:rounded-3xl"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
            </motion.div>

            {/* Bottom Left Small */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="md:col-span-4 h-[200px] md:h-[350px] rounded-2xl md:rounded-3xl overflow-hidden group relative shadow-xl will-change-transform"
            >
              <img 
                src="/4.jpg" 
                alt="АЗС МТК Детали" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 rounded-2xl md:rounded-3xl"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
            </motion.div>

            {/* Bottom Middle Small */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="md:col-span-4 h-[200px] md:h-[350px] rounded-2xl md:rounded-3xl overflow-hidden group relative shadow-xl will-change-transform"
            >
              <img 
                src="/1.jpg" 
                alt="АЗС МТК Ночь" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 rounded-2xl md:rounded-3xl"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- LOCATIONS SECTION --- */}
      <section id="locations" className="relative py-20 md:py-32 px-5 md:px-[50px] bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8 }}
            className="mb-12 md:mb-16 will-change-transform"
          >
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-black mb-4">Местоположение</h2>
            <div className="h-[1px] w-24 bg-red-600"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                address: "г.Махачкала пр-т Шамиля 17/1",
                hours: "Круглосуточно",
                img: "/1.jpg"
              },
              {
                address: "г.Махачкала Амет-хана Султана 22",
                hours: "Круглосуточно",
                img: "/11.jpg"
              },
              {
                address: "Семендер, Казбекова 296",
                hours: "Круглосуточно",
                img: "/semender.jpg"
              },
              {
                address: "Каммаева",
                hours: "Круглосуточно",
                img: "/1.jpg"
              }
            ].map((loc, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: idx * 0.1, 
                  ease: [0.21, 0.47, 0.32, 0.98] 
                }}
                className="group relative overflow-hidden rounded-3xl bg-white border border-black/5 hover:border-red-600/50 transition-colors duration-500 shadow-lg will-change-transform"
              >
                {/* Image Container */}
                <div className="relative h-56 md:h-64 overflow-hidden">
                  <motion.img 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    src={loc.img} 
                    alt={loc.address}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 rounded-t-3xl"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                {/* Content */}
                <div className="p-8 relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 rounded-full bg-red-600/5 flex items-center justify-center shrink-0 border border-red-600/10 transition-colors group-hover:bg-red-600/10">
                      <MapPin className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-black group-hover:text-red-600 transition-colors duration-300 leading-tight">{loc.address}</h3>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-gray-500">
                    <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center shrink-0 border border-black/5 transition-colors group-hover:bg-black/10">
                      <Clock className="w-5 h-5" />
                    </div>
                    <span className="text-xs tracking-[0.2em] uppercase font-medium">{loc.hours}</span>
                  </div>
                </div>

                {/* Hover Accent Line */}
                <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-red-600 transition-all duration-500 group-hover:w-full pointer-events-none"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* --- FOOTER / CONTACTS --- */}
      <footer id="contacts" className="relative w-full bg-[#D12020] overflow-hidden">
        {/* Subtle background glow inside the footer */}
        <div className="hidden md:block absolute top-0 left-0 w-[500px] h-[500px] bg-white/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="relative z-10 w-full px-5 md:px-[50px] py-20 md:py-32 flex flex-col lg:flex-row items-stretch gap-10 lg:gap-16">
          
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
                  <h3 className="text-white font-medium mb-4 uppercase tracking-wider text-sm">Наши адреса:</h3>
                  <div className="space-y-2">
                    <p>г. Махачкала пр-т Шамиля 17/1</p>
                    <p>г. Махачкала Каммаева 22/2</p>
                    <p>г. Махачкала Амет-хана Султана 22</p>
                    <p>Семендер, Казбекова 296</p>
                  </div>
                </div>

                <div className="grid grid-cols-[100px_1fr] md:grid-cols-[120px_1fr] gap-2 md:gap-4 items-start pb-4">
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
    </div>
  );
}
