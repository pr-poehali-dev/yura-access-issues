import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Blog from '@/pages/Blog';
import { articles } from '@/data/articles';

const SEND_EMAIL_URL = 'https://functions.poehali.dev/2453d09c-76fd-45c2-96fc-7ba5b95bfec9';

const PORTRAIT = 'https://cdn.poehali.dev/projects/70500ac7-4205-40a6-a8ca-f68d5c5b9512/bucket/9ca257fb-2b00-494c-99a6-38a357e8c394.JPEG';

const nav = [
  { id: 'home', label: 'Главная' },
  { id: 'about', label: 'Обо мне' },
  { id: 'services', label: 'Услуги' },
  { id: 'prices', label: 'Цены' },
  { id: 'blog', label: 'Статьи' },
  { id: 'contacts', label: 'Контакты' },
];

const services = [
  { icon: 'BrainCircuit', title: 'Тревога и панические атаки', text: 'Психотерапевтическая помощь при тревожных расстройствах, паническом синдроме и навязчивых мыслях. Методы КПТ и гештальт.' },
  { icon: 'CloudRain', title: 'Депрессия и апатия', text: 'Помогаю выйти из депрессии: возвращаю интерес к жизни, работаю с негативными убеждениями и упадком сил.' },
  { icon: 'Sparkles', title: 'Самооценка и самопринятие', text: 'Работа с перфекционизмом, внутренним критиком и установками, которые мешают принять себя и жить в полную силу.' },
  { icon: 'HeartHandshake', title: 'Стресс и выгорание', text: 'Психологическая помощь при хроническом стрессе и профессиональном выгорании. Восстанавливаем ресурс и внутренние опоры.' },
  { icon: 'Compass', title: 'Поиск себя и смысла', text: 'Сопровождение в личностном кризисе, поиске ценностей и направления. Когда непонятно, кто я и чего хочу.' },
  { icon: 'Wind', title: 'Психосоматика и тело', text: 'Работа с телесными реакциями на стресс. Тревога часто говорит через тело — учимся её слышать и отпускать.' },
  { icon: 'Moon', title: 'Стыд и ощущение пустоты', text: 'Бережная психотерапия при глубоком стыде, ощущении «меня нет» и внутренней пустоте. Возвращение к себе.' },
  { icon: 'DoorOpen', title: 'Личные границы и отношения', text: 'Помогаю выстроить здоровые границы, наладить близость и научиться говорить «нет» без вины и тревоги.' },
];

const prices = [
  { title: 'Первая встреча', price: '3 000 ₽', note: '50 минут · знакомство и запрос', highlight: false },
  { title: 'Индивидуальная сессия', price: '5 000 ₽', note: '50 минут · регулярная работа', highlight: true },
  { title: 'Пакет 5 сессий', price: '23 000 ₽', note: '50 минут · экономия 2 000 ₽', highlight: false },
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
  const [showBlog, setShowBlog] = useState(false);
  const [form, setForm] = useState({ name: '', contact: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  if (showBlog) return <Blog onBack={() => setShowBlog(false)} />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch(SEND_EMAIL_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', contact: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

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
            <p className="font-hand text-2xl text-accent mb-4">психолог и психотерапевт · Москва и онлайн</p>
            <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] mb-6">
              Помощь при тревоге, депрессии и выгорании
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mb-8">
              Психотерапевт Валентина Голосова — помогаю справиться с тревогой, выйти из депрессии, преодолеть выгорание и научиться помогать себе самостоятельно.
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
            <img src={PORTRAIT} alt="Психолог и психотерапевт Валентина Голосова — консультации по тревоге и депрессии в Москве и онлайн" className="relative rounded-[2rem] object-cover w-full aspect-[4/5] shadow-xl" />
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
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">Психолог и психотерапевт с частной практикой в Москве</h2>
          </div>
          <div className="md:col-span-7 space-y-5 text-lg text-muted-foreground">
            <p>Меня зовут Валентина. Я психолог и психотерапевт. Специализируюсь на работе с тревогой, депрессией, выгоранием и кризисными состояниями. Принимаю очно в Москве и онлайн — по всему миру.</p>
            <p>В работе сочетаю методы гештальт-терапии, когнитивно-поведенческой терапии (КПТ), транзактного анализа и мета-персональной терапии — подбираю подход под каждого человека и его запрос.</p>
            <p>Верю, что в безопасной атмосфере любой человек способен найти опору внутри себя и научиться помогать себе самостоятельно.</p>
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
            <p className="font-hand text-2xl text-accent mb-2">психологическая помощь</p>
            <h2 className="font-serif text-4xl md:text-5xl">С чем я работаю</h2>
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

      {/* BLOG */}
      <section id="blog" className="py-24">
        <div className="container">
          <div className="flex items-end justify-between mb-14 flex-wrap gap-4">
            <div>
              <p className="font-hand text-2xl text-accent mb-2">мысли и практики</p>
              <h2 className="font-serif text-4xl md:text-5xl">Статьи</h2>
            </div>
            <Button variant="ghost" className="rounded-full" onClick={() => setShowBlog(true)}>
              Все статьи <Icon name="ArrowRight" size={18} className="ml-1" />
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {articles.slice(0, 3).map((article) => (
              <article key={article.id} className="group cursor-pointer" onClick={() => setShowBlog(true)}>
                <div className="rounded-3xl overflow-hidden mb-5 aspect-[4/3]">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <span className="text-xs uppercase tracking-wider text-accent font-medium">{article.tag}</span>
                <h3 className="font-serif text-2xl mt-1 mb-2 group-hover:text-primary transition-colors leading-snug">{article.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{article.excerpt}</p>
                <p className="text-xs text-muted-foreground">{article.date} · {article.readTime}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <section id="booking" className="py-24 bg-primary/5">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="font-hand text-2xl text-accent mb-2">первый шаг к себе</p>
            <h2 className="font-serif text-4xl md:text-5xl mb-5">Записаться к психологу</h2>
            <p className="text-lg text-muted-foreground mb-8">Оставьте заявку — я свяжусь с вами в течение дня. Консультация психолога онлайн или очно в Москве. Всё конфиденциально, без осуждения и без обязательств.</p>
            <div className="space-y-4">
              {[['Phone', '+7 932 416 57 41'], ['Mail', 'melni-v@yandex.ru'], ['MapPin', 'Москва · онлайн по всему миру']].map(([icon, text]) => (
                <div key={text} className="flex items-center gap-3 text-muted-foreground">
                  <Icon name={icon} size={20} className="text-primary" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
          <form className="bg-card rounded-3xl p-8 border border-border shadow-lg space-y-4" onSubmit={handleSubmit}>
            <Input
              placeholder="Ваше имя"
              className="rounded-xl h-12"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <Input
              placeholder="Телефон или e-mail"
              className="rounded-xl h-12"
              value={form.contact}
              onChange={(e) => setForm({ ...form, contact: e.target.value })}
              required
            />
            <Textarea
              placeholder="Коротко о вашем запросе (необязательно)"
              className="rounded-xl min-h-28"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
            {status === 'success' && (
              <div className="rounded-xl bg-primary/10 text-primary px-4 py-3 text-sm text-center">
                Заявка отправлена! Валентина свяжется с вами в течение дня 🌿
              </div>
            )}
            {status === 'error' && (
              <div className="rounded-xl bg-destructive/10 text-destructive px-4 py-3 text-sm text-center">
                Что-то пошло не так. Попробуйте позвонить напрямую.
              </div>
            )}
            <Button type="submit" size="lg" className="rounded-full w-full" disabled={status === 'loading'}>
              {status === 'loading' ? 'Отправляем...' : 'Отправить заявку'}
            </Button>
            <p className="text-xs text-muted-foreground text-center">Нажимая кнопку, вы соглашаетесь с обработкой данных</p>
          </form>
        </div>
      </section>

      {/* CONTACTS / FOOTER */}
      <footer id="contacts" className="bg-primary text-primary-foreground py-14">
        <div className="container grid md:grid-cols-3 gap-8 items-center">
          <div>
            <p className="font-serif text-2xl mb-2">Валентина Голосова</p>
            <p className="text-primary-foreground/70 text-sm">Гештальт, КПТ, транзактный анализ, мета-персональная терапия</p>
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