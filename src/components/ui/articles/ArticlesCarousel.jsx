import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import articleApi from "app/api/article.api";
import { Carousel } from "rsuite";

const ArticlesCarousel = () => {
    const [articlePages, setArticlePages] = useState([]); // Store articles for each page
    const [activeIndex, setActiveIndex] = useState(0); // Track the active slide
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState(""); // Track the search input
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state

    const fetchArticles = async (page, search = "") => {
        setLoading(true);
        setError(null); // Reset error state
        try {
            const response = await articleApi.getArticles({
                page,
                limit: 5,
                search,
            });
            const articles = response.data;
            setTotalPages(response.metadata.total_pages);

            setArticlePages((prev) => {
                const updatedPages = [...prev];
                updatedPages[page - 1] = articles;
                return updatedPages;
            });
        } catch (error) {
            setError("Error fetching articles. Please try again later.");
            console.error("Error fetching articles:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArticles(activeIndex + 1, searchTerm);
    }, [activeIndex, searchTerm]);

    const handleSearchChange = (e) => {
        const search = e.target.value;
        setSearchTerm(search);
        setActiveIndex(0);
        setArticlePages([]);
        fetchArticles(1, search);
    };

    const handleClearSearch = () => {
        setSearchTerm("");
        setActiveIndex(0);
        setArticlePages([]);
        fetchArticles(1, "");
    };

    const handleSlideChange = (index) => {
        setActiveIndex(index);
    };

    const goToPreviousSlide = () => {
        if (activeIndex > 0) {
            handleSlideChange(activeIndex - 1);
        }
    };

    const goToNextSlide = () => {
        if (activeIndex < totalPages - 1) {
            handleSlideChange(activeIndex + 1);
        }
    };

    return (
        <div className="my-6">
            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row justify-start mb-4 items-center space-x-0 sm:space-x-2 space-y-2 sm:space-y-0">
                <input
                    type="text"
                    className="border border-gray-300 rounded-lg p-2 w-full sm:w-2/3"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                {searchTerm && (
                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        onClick={handleClearSearch}
                    >
                        Clear
                    </button>
                )}
            </div>

            {/* Loading and Error Handling */}
            {loading && <p className="text-gray-500">Loading articles...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {/* Carousel */}
            <Carousel
                autoplay={false}
                className="custom-slider"
                activeIndex={activeIndex}
                onSelect={handleSlideChange}
                placement="bottom"
                shape="bar"
                aria-live="polite" // Announce content changes
            >
                {articlePages.map((articles, pageIndex) => (
                    <div
                        key={pageIndex}
                        className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-5 gap-2 lg:gap-4"
                    >
                        {articles &&
                            articles.map((article) => (
                                <Link
                                    to={`/articles/${article.id}`}
                                    key={article.id}
                                    className="lg:h-4/5 w-100 p-2 lg:p-4 bg-white shadow-md hover:shadow-lg transition-shadow rounded-md"
                                    aria-label={`Read article titled "${article.title}"`} // Clear description for accessibility
                                >
                                    <h2 className="text-sm font-semibold text-gray-800" itemProp="headline">
                                        {article.title}
                                    </h2>
                                    <p itemProp="description">{article.slug}</p>
                                </Link>
                            ))}
                    </div>
                ))}
            </Carousel>

            {/* Navigation buttons for manual control */}
            <div className="flex justify-center mt-4 space-x-2">
                <button
                    onClick={goToPreviousSlide}
                    className={`px-4 py-2 text-white rounded-full shadow-md ${
                        activeIndex === 0 ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                    }`}
                    disabled={activeIndex === 0}
                >
                    Previous
                </button>
                <button
                    onClick={goToNextSlide}
                    className={`px-4 py-2 text-white rounded-full shadow-md ${
                        activeIndex === totalPages - 1 ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                    }`}
                    disabled={activeIndex === totalPages - 1}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ArticlesCarousel;
