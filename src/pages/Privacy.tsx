import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-[#F5F5F0] pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link 
          to="/" 
          className="inline-flex items-center text-[#5A5A40] hover:opacity-70 transition-opacity mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
          Вернуться на главную
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-black/5"
        >
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-[#5A5A40]/10 rounded-xl flex items-center justify-center mr-4">
              <Shield className="w-6 h-6 text-[#5A5A40]" />
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-medium text-[#1A1A1A]">
              Политика конфиденциальности
            </h1>
          </div>

          <div className="prose prose-slate max-w-none text-[#1A1A1A]/70 space-y-6 font-sans">
            <section>
              <h2 className="text-xl font-medium text-[#1A1A1A] mb-3">1. Общие положения</h2>
              <p>
                Настоящая политика обработки персональных данных составлена в соответствии с требованиями Федерального закона от 27.07.2006. №152-ФЗ «О персональных данных» и определяет порядок обработки персональных данных и меры по обеспечению безопасности персональных данных, предпринимаемые <strong>[НАИМЕНОВАНИЕ ОРГАНИЗАЦИИ / ФИО ИП]</strong> (далее — Оператор).
              </p>
              <p>
                1.1. Оператор ставит своей важнейшей целью и условием осуществления своей деятельности соблюдение прав и свобод человека и гражданина при обработке его персональных данных, в том числе защиты прав на неприкосновенность частной жизни, личную и семейную тайну.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-[#1A1A1A] mb-3">2. Основные понятия</h2>
              <p>
                Оператор — <strong>[НАИМЕНОВАНИЕ ОРГАНИЗАЦИИ / ФИО ИП]</strong>, расположенный по адресу: <strong>[АДРЕС МЕСТА НАХОЖДЕНИЯ]</strong>.
              </p>
              <p>
                ИНН: 052001363683<br/>
                ОГРН: 321057100063603
              </p>
              <p>
                Персональные данные — любая информация, относящаяся к прямо или косвенно определенному или определяемому физическому лицу (субъекту персональных данных).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-[#1A1A1A] mb-3">3. Какие данные мы собираем</h2>
              <p>Мы можем собирать следующие данные:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Фамилия, имя, отчество;</li>
                <li>Номер телефона;</li>
                <li>Адрес электронной почты;</li>
                <li>Данные об использовании сайта (файлы cookie, IP-адрес).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-medium text-[#1A1A1A] mb-3">4. Цели обработки данных</h2>
              <p>
                Цель обработки персональных данных Пользователя — информирование Пользователя посредством отправки электронных писем; предоставление доступа Пользователю к сервисам, информации и/или материалам, содержащимся на веб-сайте; уточнение деталей заказа.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-[#1A1A1A] mb-3">5. Правовые основания</h2>
              <p>
                Оператор обрабатывает персональные данные Пользователя только в случае их заполнения и/или отправки Пользователем самостоятельно через специальные формы, расположенные на сайте.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-[#1A1A1A] mb-3">6. Заключительные положения</h2>
              <p>
                Пользователь может получить любые разъяснения по интересующим вопросам, касающимся обработки его персональных данных, обратившись к Оператору через формы обратной связи на сайте.
              </p>
              <p>
                Настоящий документ будет отражать любые изменения политики обработки персональных данных Оператором. Политика действует бессрочно до замены ее новой версией.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;
