import { useState } from 'react';
import { articles } from '@/data/articles';
import ArticlePage from '@/pages/ArticlePage';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const tags = ['Все', 'Тревога', 'Депрессия', 'Выгорание', 'Границы', 'Самопринятие', 'Отношения', 'Кризис', 'Самооценка', 'Личностный рост', 'Практики'];

interface BlogProps {
  onBack: () => void;
}

const Blog = ({ onBack }: BlogProps) => {
  const [activeTag, setActiveTag] = useState('Все');
  const [openArticle, setOpenArticle] = useState<string | null>(null);

  const filtered = activeTag === 'Все' ? articles : articles.filter(a => a.tag === activeTag);
  const article = openArticle ? articles.find(a => a.id === openArticle) : null;

  if (article) {
    return <ArticlePage article={article} onBack={() => setOpenArticle(null)} />;
  }

  return (
    <div className="min-h-screen bg-background paper-grain">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/70 border-b border-border">
        <div className="container flex items-center gap-4 h-20">
          <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <Icon name="ArrowLeft" size={20} />
            <span className="text-sm">На главную</span>
          </button>
          <div className="h-5 w-px bg-border" />
          <span className="font-serif text-xl">Статьи</span>
        </div>
      </header>

      <div className="container py-16">
        {/* Hero */}
        <div className="mb-12">
          <p className="font-hand text-2xl text-accent mb-2">мысли и практики</p>
          <h1 className="font-serif text-5xl md:text-6xl mb-4">Статьи</h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            Тексты о психологии, которые помогают лучше понять себя — без сложных терминов и с уважением к вашему опыту.
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-10">
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                activeTag === tag
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border border-border text-muted-foreground hover:border-primary/40 hover:text-primary'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((article, i) => (
            <article
              key={article.id}
              onClick={() => setOpenArticle(article.id)}
              className="group cursor-pointer reveal"
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <div className="rounded-3xl overflow-hidden mb-5 aspect-[4/3] relative">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs uppercase tracking-wider text-accent font-medium">{article.tag}</span>
                <span className="text-xs text-muted-foreground">{article.readTime}</span>
              </div>
              <h2 className="font-serif text-2xl mb-2 group-hover:text-primary transition-colors leading-snug">
                {article.title}
              </h2>
              <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{article.excerpt}</p>
              <p className="text-xs text-muted-foreground">{article.date}</p>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <p className="font-serif text-2xl mb-2">Статей пока нет</p>
            <p>Попробуйте выбрать другую тему</p>
          </div>
        )}
      </div>

      {/* CTA */}
      <section className="bg-primary/5 border-t border-border py-16">
        <div className="container text-center">
          <p className="font-hand text-2xl text-accent mb-2">готовы к разговору?</p>
          <h2 className="font-serif text-4xl mb-4">Запишитесь на консультацию</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">Статьи — это начало пути. Терапия — это путь.</p>
          <Button onClick={onBack} size="lg" className="rounded-full">Записаться к Валентине</Button>
        </div>
      </section>
    </div>
  );
};

export default Blog;
