import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const PORTRAIT = 'https://cdn.poehali.dev/projects/70500ac7-4205-40a6-a8ca-f68d5c5b9512/bucket/9ca257fb-2b00-494c-99a6-38a357e8c394.JPEG';

const nav = [
  { id: 'home', label: 'Главная' },
  { id: 'about', label: 'Обо мне' },
  { id: 'services', label: 'Услуги' },
  { id: 'prices', label: 'Цены' },
  { id: 'blog', label: 'Влог' },
  { id: 'contacts', label: 'Контакты' },
];

const services = [
  { icon: 'BrainCircuit', title: 'Тревога и страхи', text: 'КПТ-работа с тревожными мыслями, паническими атаками и навязчивыми состояниями.' },
  { icon: 'CloudRain', title: 'Депрессия и апатия', text: 'Помогаю вернуть интерес к жизни через работу с негативными убеждениями и поведенческую активацию.' },
  { icon: 'Sparkles', title: 'Самооценка и перфекционизм', text: 'Выявляем установки, которые мешают принять себя, и формируем более здоровый внутренний диалог.' },
  { icon: 'HeartHandshake', title: 'Стресс и выгорание', text: 'Учимся распознавать триггеры, перестраивать реакции и восстанавливать ресурс.' },
  { icon: 'Compass', title: 'Личностный путь', text: 'Мягкое сопровождение в поиске себя — своих ценностей, желаний и направления, в котором хочется идти.' },
  { icon: 'Wind', title: 'Работа с тревогой', text: 'В гештальт-подходе тревога — это энергия, которой не нашлось выхода. Вместе мы ищем, что за ней стоит.' },
  { icon: 'Moon', title: 'Состояния ничтожности', text: 'Бережная работа с ощущением пустоты, стыда и «меня нет» — возвращение к себе через контакт и принятие.' },
  { icon: 'DoorOpen', title: 'Личные границы', text: 'Учимся чувствовать и обозначать границы без вины и агрессии — из места внутренней устойчивости.' },
];

const prices = [
  { title: 'Первая встреча', price: '2 500 ₽', note: '60 минут · знакомство и запрос', highlight: false },
  { title: 'Индивидуальная сессия', price: '4 000 ₽', note: '60 минут · регулярная работа', highlight: true },
  { title: 'Семейная сессия', price: '5 500 ₽', note: '90 минут · для пары или семьи', highlight: false },
];

const posts = [
  { tag: 'Тревога', title: 'Как замедлиться, когда внутри всё бежит', date: '12 июня', read: '6 мин' },
  { tag: 'Отношения', title: 'Границы — это не стены, а двери', date: '4 июня', read: '5 мин' },
  { tag: 'Самооценка', title: 'Тёплый разговор с собой каждое утро', date: '28 мая', read: '4 мин' },
];

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground paper-grain selection:bg-accent/30">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/70 border-b border-border">
        <div className="container flex items-center justify-between h-20">
          <button onClick={() => scrollTo('home')} className="font-serif text-2xl tracking-tight">
            Валентина<span className="text-primary"> Голосова</span>
          </button>
          <nav className="hidden md:flex items-center gap-8">
            {nav.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {n.label}
              </button>
            ))}
          </nav>
          <Button onClick={() => scrollTo('booking')} className="hidden md:flex rounded-full">Записаться</Button>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? 'X' : 'Menu'} size={26} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-border bg-background/95 px-6 py-4 flex flex-col gap-4 animate-accordion-down">
            {nav.map((n) => (
              <button key={n.id} onClick={() => { scrollTo(n.id); setMenuOpen(false); }} className="text-left text-muted-foreground">
                {n.label}
              </button>
            ))}
            <Button onClick={() => { scrollTo('booking'); setMenuOpen(false); }} className="rounded-full">Записаться</Button>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="pt-36 pb-24 md:pt-44 md:pb-32">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <div className="reveal" style={{ animationDelay: '0.1s' }}>
            <p className="font-hand text-2xl text-accent mb-4">пространство тепла и принятия</p>
            <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] mb-6">
              Бережная терапия для&nbsp;возвращения к&nbsp;себе
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mb-8">
              Помогаю прожить тревогу, найти внутреннюю опору и услышать собственные желания — в спокойном ритме и без осуждения.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => scrollTo('booking')} size="lg" className="rounded-full">
                Записаться на консультацию
              </Button>
              <Button onClick={() => scrollTo('about')} variant="outline" size="lg" className="rounded-full">
                Обо мне
              </Button>
            </div>
          </div>
          <div className="reveal relative" style={{ animationDelay: '0.3s' }}>
            <div className="absolute -inset-4 rounded-[2.5rem] bg-primary/10 -rotate-3" />
            <img src={PORTRAIT} alt="Психолог Валентина Голосова" className="relative rounded-[2rem] object-cover w-full aspect-[4/5] shadow-xl" />
            <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl shadow-lg px-6 py-4 border border-border">
              <p className="font-serif text-lg text-primary">Частная практика</p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-secondary/40">
        <div className="container grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-5">
            <p className="font-hand text-2xl text-accent mb-2">обо мне</p>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">Рядом, пока вы ищете свой путь</h2>
          </div>
          <div className="md:col-span-7 space-y-5 text-lg text-muted-foreground">
            <p>Меня зовут Валентина. Я психолог и КПТ-терапевт. Верю, что в тёплой и безопасной атмосфере человек способен бережно встретиться с собой настоящим.</p>
            <p>В работе опираюсь на когнитивно-поведенческий подход: помогаю выявить мышление, которое мешает жить, и шаг за шагом выстроить новые, более гибкие способы реагировать на мир.</p>
            <div className="grid grid-cols-3 gap-6 pt-4">
              {[['500+', 'консультаций'], ['98%', 'возвращаются'], ['онлайн', 'и очно в МСК']].map(([a, b]) => (
                <div key={b}>
                  <p className="font-serif text-3xl text-primary">{a}</p>
                  <p className="text-sm">{b}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24">
        <div className="container">
          <div className="text-center mb-14">
            <p className="font-hand text-2xl text-accent mb-2">чем я могу помочь</p>
            <h2 className="font-serif text-4xl md:text-5xl">Услуги</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s) => (
              <div key={s.title} className="group bg-card rounded-3xl p-8 border border-border hover:border-primary/40 hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <Icon name={s.icon} size={26} className="text-primary" />
                </div>
                <h3 className="font-serif text-2xl mb-3">{s.title}</h3>
                <p className="text-muted-foreground">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICES */}
      <section id="prices" className="py-24 bg-secondary/40">
        <div className="container">
          <div className="text-center mb-14">
            <p className="font-hand text-2xl text-accent mb-2">прозрачно и спокойно</p>
            <h2 className="font-serif text-4xl md:text-5xl">Цены</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {prices.map((p) => (
              <div key={p.title} className={`rounded-3xl p-8 border flex flex-col ${p.highlight ? 'bg-primary text-primary-foreground border-primary shadow-xl md:-translate-y-3' : 'bg-card border-border'}`}>
                {p.highlight && <span className="font-hand text-xl mb-1">самое популярное</span>}
                <h3 className="font-serif text-2xl mb-2">{p.title}</h3>
                <p className="font-serif text-4xl mb-3">{p.price}</p>
                <p className={`text-sm mb-6 ${p.highlight ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>{p.note}</p>
                <Button onClick={() => scrollTo('booking')} variant={p.highlight ? 'secondary' : 'outline'} className="rounded-full mt-auto">
                  Записаться
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG / VLOG */}
      <section id="blog" className="py-24">
        <div className="container">
          <div className="flex items-end justify-between mb-14 flex-wrap gap-4">
            <div>
              <p className="font-hand text-2xl text-accent mb-2">мысли вслух</p>
              <h2 className="font-serif text-4xl md:text-5xl">Влог</h2>
            </div>
            <Button variant="ghost" className="rounded-full">Все записи <Icon name="ArrowRight" size={18} className="ml-1" /></Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <article key={post.title} className="group cursor-pointer">
                <div className="rounded-3xl bg-gradient-to-br from-primary/15 to-accent/15 aspect-video mb-5 flex items-center justify-center relative overflow-hidden">
                  <div className="w-16 h-16 rounded-full bg-card/80 backdrop-blur flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon name="Play" size={24} className="text-primary ml-1" />
                  </div>
                </div>
                <span className="text-xs uppercase tracking-wider text-accent font-medium">{post.tag}</span>
                <h3 className="font-serif text-2xl mt-1 mb-3 group-hover:text-primary transition-colors">{post.title}</h3>
                <p className="text-sm text-muted-foreground">{post.date} · {post.read}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <section id="booking" className="py-24 bg-primary/5">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="font-hand text-2xl text-accent mb-2">сделайте первый шаг</p>
            <h2 className="font-serif text-4xl md:text-5xl mb-5">Запись на консультацию</h2>
            <p className="text-lg text-muted-foreground mb-8">Оставьте заявку — я свяжусь с вами в течение дня, чтобы подобрать удобное время. Всё конфиденциально и без обязательств.</p>
            <div className="space-y-4">
              {[['Phone', '+7 932 416 57 41'], ['Mail', 'melni-v@yandex.ru'], ['MapPin', 'Москва · онлайн по всему миру']].map(([icon, text]) => (
                <div key={text} className="flex items-center gap-3 text-muted-foreground">
                  <Icon name={icon} size={20} className="text-primary" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
          <form className="bg-card rounded-3xl p-8 border border-border shadow-lg space-y-4" onSubmit={(e) => e.preventDefault()}>
            <Input placeholder="Ваше имя" className="rounded-xl h-12" />
            <Input placeholder="Телефон или e-mail" className="rounded-xl h-12" />
            <Textarea placeholder="Коротко о вашем запросе (необязательно)" className="rounded-xl min-h-28" />
            <Button type="submit" size="lg" className="rounded-full w-full">Отправить заявку</Button>
            <p className="text-xs text-muted-foreground text-center">Нажимая кнопку, вы соглашаетесь с обработкой данных</p>
          </form>
        </div>
      </section>

      {/* CONTACTS / FOOTER */}
      <footer id="contacts" className="bg-primary text-primary-foreground py-14">
        <div className="container grid md:grid-cols-3 gap-8 items-center">
          <div>
            <p className="font-serif text-2xl mb-2">Валентина Голосова</p>
            <p className="text-primary-foreground/70 text-sm">Психолог · гештальт-терапевт</p>
          </div>
          <div className="flex md:justify-center gap-4">
            {['Send', 'Instagram', 'Youtube'].map((i) => (
              <a key={i} href="#" className="w-11 h-11 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors">
                <Icon name={i} size={20} />
              </a>
            ))}
          </div>
          <p className="md:text-right text-sm text-primary-foreground/60">© 2026 · С теплом и заботой</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;