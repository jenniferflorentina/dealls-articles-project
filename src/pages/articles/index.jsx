import { useEffect, useCallback } from "react";
import AppContainer from "components/common/AppContainer";
import { useSelector, useDispatch } from "react-redux";
import fetcher from "stores/article/fetcher";
import ArticleByCategories from "components/ui/articles/ArticleByCategories"; // Import the component
import ArticlesCarousel from "components/ui/articles/ArticlesCarousel"; // Import the component

const ArticlesPage = () => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.article.categories); // Get categories from Redux store

    const getCategories = useCallback(() => {
        dispatch(fetcher.fetchCategories());
    }, [dispatch]);

    useEffect(() => {
        getCategories();
    }, [getCategories]);

    return (
        <AppContainer title="Articles">
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
