import React from 'react';
import './NewsSection.css'; // Asumiendo que el CSS para NewsSection está en NewsSection.css

const NewsSection = () => {
  const newsArticles = [
    {
      id: 1,
      title: "What Curling Irons Are The Best Ones",
      imageUrl: "https://i.postimg.cc/2y6wbZCm/news1.jpg",
      date: "12 February 2022",
      readMoreUrl: "https://www.vogue.com/article/best-curling-irons"
    },
    {
      id: 2,
      title: "The Health Benefits Of Sunglasses",
      imageUrl: "https://i.postimg.cc/9MXPK7RT/news2.jpg",
      date: "17 February 2022",
      readMoreUrl: "https://www.rivieraopticare.com/blog/314864-the-health-benefits-of-wearing-sunglasses_2/"
    },
    {
      id: 3,
      title: "Eternity Bands Do Last Forever",
      imageUrl: "https://i.postimg.cc/x1KKdRLM/news3.jpg",
      date: "26 February 2022",
      readMoreUrl: "https://www.briangavindiamonds.com/news/eternity-bands-symbolize-love-that-lasts-forever/"
    }
  ];

  return (
    <div className="news-section">
      <h2>Fashion New Trends</h2>
      <div className="news-container">
        {newsArticles.map(article => (
          <div key={article.id} className="news-item">
            <img src={article.imageUrl} alt={article.title} />
            <div className="news-content">
              <p><i className='bx bxs-calendar'></i> {article.date}</p>
              <h4>{article.title}</h4>
              <a href={article.readMoreUrl} target="_blank" rel="noopener noreferrer">read more</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsSection;
