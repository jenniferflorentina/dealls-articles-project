import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import articleApi from "app/api/article.api";

const ArticleByCategories = ({ categories }) => {
    const [articleByCategories, setArticleByCategories] = useState([]);

    const fetchArticleByCategory = async () => {
        try {
            const articlesByCategory = await Promise.all(
                categories.map(async (category) => {
                    const articles = await articleApi.getArticles({
                        page: 1,
                        limit: 5,
                        category_id: category.id,
                        sort: "desc"
                    });

                    return {
                        category: category.name,
                        articles: articles.data,
                    };
                })
            );

            setArticleByCategories(articlesByCategory);
        } catch (error) {
            console.error("Error fetching articles:", error);
        }
    };

    useEffect(() => {
        if (categories.length > 0) {
            fetchArticleByCategory();
        }
    }, [categories]);

    return (
        <div className="p-4 bg-white rounded-lg shadow-md" itemScope itemType="https://schema.org/Article">
            {articleByCategories.length > 0 ? (
                articleByCategories.map((categoryData, index) => (
                    <div className="mb-6" key={index}>
                        <h3 className="text-lg font-semibold mb-2" itemProp="headline">{categoryData.category}</h3>
                        <ul className="space-y-2" itemProp="articleBody">
                            {categoryData.articles.map((article, idx) => (
                                <li key={idx}>
                                    <Link
                                        to={`/articles/${article.id}`}
                                        className="text-blue-600 hover:underline"
                                        itemProp="url"
                                        aria-label={`Read article titled "${article.title}"`}
                                    >
                                        <span itemProp="name">{article.title}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            ) : (
                <p className="text-gray-500">No articles found.</p>
            )}
        </div>
    );
};

export default ArticleByCategories;
