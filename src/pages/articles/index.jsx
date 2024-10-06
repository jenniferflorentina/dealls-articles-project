import { useEffect, useCallback, useState } from "react";
import AppContainer from "components/common/AppContainer";
import { useSelector, useDispatch } from "react-redux";
import fetcher from "stores/article/fetcher";
import ArticleByCategories from "components/ui/articles/ArticleByCategories"; 
import ArticlesCarousel from "components/ui/articles/ArticlesCarousel"; 
import { Helmet } from 'react-helmet'; // For SEO optimization

const ArticlesPage = () => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.article.categories);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getCategories = useCallback(async () => {
        try {
            await dispatch(fetcher.fetchCategories());
        } catch (err) {
            setError("Failed to fetch categories.");
        } finally {
            setLoading(false);
        }
    }, [dispatch]);

    useEffect(() => {
        getCategories();
    }, [getCategories]);

    if (loading) {
        return <p>Loading categories...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <AppContainer title="Articles">
            <Helmet>
                <title>Articles - My Website</title>
                <meta name="description" content="Explore a variety of articles across different categories." />
            </Helmet>
            <div className="flex flex-col lg:flex-row gap-x-4">
                {/* Carousel Section - 75% width on large screens */}
                <div className="w-full lg:w-3/4 mb-8 lg:mb-0">
                    <ArticlesCarousel />
                </div>

                {/* ArticleByCategories Section - 25% width on large screens */}
                <div className="w-full lg:w-1/4">
                    <ArticleByCategories categories={categories} />
                </div>
            </div>
        </AppContainer>
    );
};

export default ArticlesPage;