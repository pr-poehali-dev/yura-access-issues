import { Article } from '@/data/articles';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

interface ArticlePageProps {
  article: Article;
  onBack: () => void;
}

const ArticlePage = ({ article, onBack }: ArticlePageProps) => {
  const formatContent = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <h3 key={i} className="font-serif text-2xl mt-8 mb-3 text-foreground">{line.slice(2, -2)}</h3>;
      }
      if (line.startsWith('*') && line.endsWith('*')) {
        return <p key={i} className="font-medium text-foreground mb-2">{line.slice(1, -1)}</p>;
      }
      if (line.startsWith('— ')) {
        return <li key={i} className="ml-4 text-muted-foreground mb-1">{line.slice(2)}</li>;
      }
      if (line.trim() === '') {
        return <div key={i} className="h-2" />;
      }
      return <p key={i} className="text-muted-foreground leading-relaxed mb-1">{line}</p>;
    });
  };

  return (
    <div className="min-h-screen bg-background paper-grain">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/70 border-b border-border">
        <div className="container flex items-center gap-4 h-20">
          <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <Icon name="ArrowLeft" size={20} />
            <span className="text-sm">Все статьи</span>
          </button>
        </div>
      </header>

      <article className="container max-w-3xl py-16">
        {/* Meta */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs uppercase tracking-wider text-accent font-medium">{article.tag}</span>
          <span className="text-xs text-muted-foreground">·</span>
          <span className="text-xs text-muted-foreground">{article.readTime}</span>
          <span className="text-xs text-muted-foreground">·</span>
          <span className="text-xs text-muted-foreground">{article.date}</span>
        </div>

        {/* Title */}
        <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-6">{article.title}</h1>
        <p className="text-xl text-muted-foreground mb-10 leading-relaxed">{article.excerpt}</p>

        {/* Hero image */}
        <div className="rounded-3xl overflow-hidden aspect-[16/9] mb-12">
          <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
        </div>

        {/* Content */}
        <div className="prose-custom text-lg leading-relaxed">
          {formatContent(article.content)}
        </div>

        {/* Author block */}
        <div className="mt-16 p-8 bg-card rounded-3xl border border-border flex flex-col sm:flex-row gap-6 items-start">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
            <Icon name="User" size={28} className="text-primary" />
          </div>
          <div>
            <p className="font-serif text-xl mb-1">Валентина Голосова</p>
            <p className="text-sm text-muted-foreground mb-3">Психолог · гештальт, КПТ-терапевт</p>
            <p className="text-muted-foreground text-sm">Если статья откликнулась и вы хотите поговорить о своём опыте — я здесь.</p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <Button onClick={onBack} size="lg" className="rounded-full mr-3" variant="outline">
            <Icon name="ArrowLeft" size={16} className="mr-2" /> Назад к статьям
          </Button>
        </div>
      </article>
    </div>
  );
};

export default ArticlePage;
