import React, { useEffect, useState } from 'react';
import link from '../assets/link.svg';
import clipboard from '../assets/copy.svg';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // تأكد من استيراد CSS الخاص بالمكتبة

export const Demo = () => {
  const [allArticles, setAllArticles] = useState([]);
  const [article, setArticle] = useState({
    url: "",
    summary: ""
  });
  const [loading, setLoading] = useState(false); // حالة لمؤشر التحميل
  
  useEffect(() => {
    let localstorgearticles = localStorage.getItem("allArticles");
    if (localstorgearticles) {
      setAllArticles(JSON.parse(localstorgearticles)); // يتم التحويل إلى JSON بعد الجلب
    }
  }, []);
    
  async function handleArticle(e) {
    e.preventDefault();
    setLoading(true); // بدء التحميل
    const options = {
      method: 'GET',
      url: 'https://article-extractor-and-summarizer.p.rapidapi.com/summarize',
      params: {
        url: article.url, 
        lang: 'en',
        engine: '2'
      },
      headers: {
        'x-rapidapi-key': '7991ddb86cmshe7529055d9b2eabp1512dcjsn6f86286d357c',
        'x-rapidapi-host': 'article-extractor-and-summarizer.p.rapidapi.com'
      }
    };
    try {
      const response = await axios.request(options);
      setArticle((prev) => ({ ...prev, summary: response.data.summary }));
      setAllArticles((prev) => {
        const updatedArticles = [...prev, { ...article }];
        localStorage.setItem("allArticles", JSON.stringify(updatedArticles)); 
        return updatedArticles;
      });
      toast.success('The article summary has been successfully fetched.!');
    } catch (error) {
      console.error(error);
      toast.error(error);
    } finally {
      setLoading(false); // إنهاء التحميل
    }
  }

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url)
      .then(() => {
        toast.success('Link copied successfully !');
      })
      .catch((err) => {
        toast.error('Failed to copy link successfully.');
        console.error('Failed to copy text: ', err);
      });
  };

  return (
    <div className='container w-100 Demo'>
      
      <form
        onSubmit={handleArticle}
        style={{
          margin: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          border: "1px gray solid",
          width: "max-content",
          padding: "5px 10px",
          boxShadow: "#8f8787 0px 3px 10px 0px"
        }}>
        <img src={link} alt="Link icon" style={{ cursor: "pointer" }} />
        <input
          value={article.url}
          onChange={(e) => setArticle((prev) => ({ ...prev, url: e.target.value }))}
          type="url"
          required
          placeholder='type url'
          style={{ border: "none", width: "400px" }} />
        <button type='submit' className='inputbtn' style={{ border: "none", outline: "none", backgroundColor: "transparent", padding: "5px 10px", borderRadius: "1px" }}>
          {loading ? 'loading...' : 'Send'}
        </button>
      </form>

      <div className="links container ">
  {
    allArticles?.slice(-3).map((e, index) => (
      <div key={index} className='link d-flex align-items-center justify-content-center'>
        <img 
          src={clipboard} 
          alt="Clipboard icon" 
          style={{ cursor: 'pointer' }} 
          onClick={() => copyToClipboard(e.url)}
        />
        <p>{e.url.slice(0,50)}</p>
      </div>
    ))
  }
</div>

      {
        article.summary && (
          <div className="response container col-10 py-5">
            <h3> Article <span style={{ color: '#e36518' }}>Summary </span></h3>
            <p style={{ textAlign: "center" }}>{article.summary}</p>
          </div>
        )
      }

      <ToastContainer /> {/* عنصر الإشعارات */}
    </div>
  );
};
