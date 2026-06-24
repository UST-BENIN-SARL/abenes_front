import { ARTICLES } from '~/data/articles'
import type { Article } from '~/types/article'

export function useNews() {
  const getArticleBySlug = (slug: string): Article | undefined => ARTICLES.find((article) => article.slug === slug)

  const getRelatedArticles = (article: Article, limit = 3): Article[] =>
    ARTICLES.filter((item) => item.category === article.category && item.slug !== article.slug).slice(0, limit)

  return {
    articles: ARTICLES,
    getArticleBySlug,
    getRelatedArticles
  }
}
