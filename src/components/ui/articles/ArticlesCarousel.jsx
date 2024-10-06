import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import articleApi from "app/api/article.api";
import { Carousel } from "rsuite";

const ArticlesCarousel = () => {
    const [articlePages, setArticlePages] = useState([]); // Store articles for each page
    const [activeIndex, setActiveIndex] = useState(0); // Track the active slide
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState(""); // Track the search input

    // Fetch articles for the given page with optional search term
    const fetchArticles = async (page, search = "") => {
        try {
            const response = await articleApi.getArticles({
                page,
                limit: 5,
                search: search, // Pass the search term to API
            });
            const articles = response.data;
            setTotalPages(response.metadata.total_pages);

            // Store fetched articles for each page
            setArticlePages((prev) => {
                const updatedPages = [...prev];
                updatedPages[page - 1] = articles;
                return updatedPages;
            });
        } catch (error) {
            console.error("Error fetching articles:", error);
        }
    };

    useEffect(() => {
        // Fetch articles for the current slide (page) if not already fetched
        if (!articlePages[activeIndex]) {
            fetchArticles(activeIndex + 1, searchTerm);
        }
    }, [activeIndex, searchTerm, articlePages]);

    // Handle search functionality
    const handleSearchChange = (e) => {
        const search = e.target.value;
        setSearchTerm(search); // Update search term
        setActiveIndex(0); // Reset to first slide
        setArticlePages([]); // Clear previous results
        fetchArticles(1, search); // Fetch first page with updated search term
    };

    // Clear search input and reset
    const handleClearSearch = () => {
        setSearchTerm(""); // Clear search term
        setActiveIndex(0); // Reset to first slide
        setArticlePages([]); // Clear previous results
        fetchArticles(1, ""); // Fetch first page without search term
    };

    // Handle slide change
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
                    onChange={handleSearchChange} // Trigger search on input change
                />
                {searchTerm && (
                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        onClick={handleClearSearch} // Clear search term on button click
                    >
                        Clear
                    </button>
                )}
            </div>

            {/* Carousel */}
            <Carousel
                autoplay={false}
                className="custom-slider"
                activeIndex={activeIndex} // Set the current active index for dots and sliding
                onSelect={handleSlideChange} // Synchronize dots with manual navigation
                placement="bottom"
                shape="bar"
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
                                    className="lg:h-4/5 w-100 p-2 p-2 lg:p-4 bg-white shadow-md hover:shadow-lg transition-shadow rounded-md"
                                >
                                    <h2 className="text-sm font-semibold text-gray-800">
                                        {article.title}
                                    </h2>
                                    <p>{article.slug}</p>
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
