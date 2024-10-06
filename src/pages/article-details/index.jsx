import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom"; 
import AppContainer from "components/common/AppContainer";
import articleApi from "app/api/article.api"; 
import ArticleByCategories from "components/ui/articles/ArticleByCategories"; 
import fetcher from "stores/article/fetcher";
import dateHelper from "app/helpers/date.helper";
import { Button } from 'rsuite';
import { Helmet } from 'react-helmet'; // For SEO optimization

const ArticleDetailsPage = () => {
    const { id } = useParams(); 
    const [articleDetails, setArticleDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const categories = useSelector(state => state.article.categories); 

    const getCategories = useCallback(() => {
        dispatch(fetcher.fetchCategories());
    }, [dispatch]);
    
    useEffect(() => {
        getCategories();
    }, [getCategories]);

    const fetchArticleDetails = async (articleId) => {
        setLoading(true);
        setError(null); // Reset error state
        try {
            const response = await articleApi.getArticleDetail(articleId);
            setArticleDetails(response);
        } catch (error) {
            setError("Error fetching article details. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleShareClick = () => {
        const shareUrl = `${window.location.origin}/articles/${id}`;
        navigator.clipboard.writeText(shareUrl);
        alert("Article link copied to clipboard!");
    };

    useEffect(() => {
        if (id) {
            fetchArticleDetails(id); 
        }
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return (
            <div>
                <p>{error}</p>
                <Button onClick={() => fetchArticleDetails(id)}>Retry</Button>
            </div>
        );
    }

    return (
        <AppContainer title="Article Details">
            <Helmet>
                <title>{articleDetails.title} - My Website</title>
                <meta name="description" content={articleDetails.description || "Read more about this article."} />
                {/* Add other meta tags as necessary */}
            </Helmet>
            <div className="flex flex-col lg:flex-row gap-x-4">
                {/* Article content box */}
                <div className="bg-white w-full lg:w-3/4 mb-8 lg:mb-0 shadow-md rounded-lg">
                    {articleDetails ? (
                        <>
                            {/* Title and button box */}
                            <div className="p-4 flex justify-between items-start lg:items-center">
                                <h1 className="text-4xl font-bold" itemProp="headline">{articleDetails.title}</h1>
                                
                                {/* Share button beside title */}
                                <Button
                                    onClick={handleShareClick}
                                    appearance="primary"
                                    size="md"
                                    className="mt-4 sm:mt-0 sm:ml-4"
                                    aria-label={`Share ${articleDetails.title}`} // Accessible label
                                >
                                    Share this article
                                </Button>
                            </div>

                            <p className="px-4" itemProp="datePublished">{dateHelper.format(articleDetails.created_at)}</p>

                            {/* Content box */}
                            <div className="pb-4 px-4 prose max-w-none">
                                <div
                                    dangerouslySetInnerHTML={{ __html: articleDetails.content }}
                                />
                            </div>
                        </>
                    ) : (
                        <p>No article details found.</p>
                    )}
                </div>

                {/* Sidebar for categories */}
                <div className="w-full lg:w-1/4">
                    <ArticleByCategories categories={categories} />
                </div>
            </div>
        </AppContainer>
    );
};

export default ArticleDetailsPage;