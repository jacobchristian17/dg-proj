import React, { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../_context/AuthProvider';
import useAxiosPrivate from '../_hooks/useAxiosPrivate';
import './style.css';
import '../_datacontext/Articles/style.css';
const ARTICLES_URL = '/articles';
const SEARCH_ARTICLES_URL = '/articles/queryTitle';

function HomeSection() {
    const { setAuth } = useContext(AuthContext);
    const axiosPrivate = useAxiosPrivate();
    const nav = useNavigate();
    const [articles, setArticles] = useState();
    const [searchItem, setSearchItem] = useState('');
    const [searchResult, setSearchResult] = useState('');
    const [searchOption, setsearchOption] = useState('title');


    const logout = async () => {
        setAuth({});
        nav('/');
    }
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getAllArticles = async () => {
            try {
                const response = await axiosPrivate.get(ARTICLES_URL, {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setArticles(response.data);
            } catch (err) {
                console.error(err);
            }
        }
        getAllArticles();
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, []);

    const handleSearch = (e) => {
        setSearchItem(e.target.value);
        console.log(`seach: ${searchItem}`);
        console.log(`option: ${searchOption}`);
        try {
            if (searchItem.length > 0) {
                let filteredSearch = '';
                if (searchOption === 'title') {
                    filteredSearch = articles.filter((post) => ((post.title).toLowerCase().includes(searchItem.toLowerCase())));
                } else if (searchOption === 'authors') {
                    filteredSearch = articles.filter((post) => ((post.authors).toLowerCase().includes(searchItem.toLowerCase())));
                } else if (searchOption === 'abstract') {
                    filteredSearch = articles.filter((post) => ((post.abstract).toLowerCase().includes(searchItem.toLowerCase())));
                } else if (searchOption === 'keywords') {
                    filteredSearch = articles.filter((post) => ((post.keywords).toLowerCase().includes(searchItem.toLowerCase())));
                } else if (searchOption === 'doi') {
                    filteredSearch = articles.filter((post) => ((post.doi).toLowerCase().includes(searchItem.toLowerCase())));
                }
                setSearchResult(filteredSearch);
                console.log(filteredSearch);
            } else {
                setSearchResult('');
            }
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <>
            <div className='container'>
                <div className='header'>
                    <h1>Welcome to home.</h1>
                    <button onClick={logout} className='home-logout-btn'>Log Out</button>
                </div>
                <div className='content'>
                    <div className='articles-container'>
                        <div className='article-list-home'>
                            {articles?.length ? (<>
                                <table className="article-list-table">
                                    {searchResult.length ? <h3>Search Results</h3> : ''}
                                    <tr>
                                        <th>Title</th>
                                        <th>Author</th>
                                        <th>Keywords</th>
                                        <th>Doi</th>
                                    </tr>
                                    {searchResult?.length ? (<>
                                        {searchResult.map((s, i) =>
                                            <tr>
                                                <td><span>{s?.title}</span></td>
                                                <td><span>{s?.authors}</span></td>
                                                <td><span>{s?.keywords}</span></td>
                                                <td><span>{s?.doi}</span></td>
                                            </tr>
                                        )}
                                    </>) : (<>
                                        {articles.map((a, j) =>
                                            <tr>
                                                <td><span>{a?.title}</span></td>
                                                <td><span>{a?.authors}</span></td>
                                                <td><span>{a?.keywords}</span></td>
                                                <td><span>{a?.doi}</span></td>
                                            </tr>
                                        )}
                                    </>)}
                                </table>
                                <div className='home-search-container'>
                                    <div className='sub-hsc-1'>
                                        <label>Search by: </label>
                                        <select onChange={(e) => { setsearchOption(e.target.value) }}>
                                            <option value='title'>Title</option>
                                            <option value='authors'>Authors</option>
                                            <option value='abstract'>Abstract contains</option>
                                            <option value='keywords'>Keywords</option>
                                            <option value='doi'>doi</option>
                                        </select>
                                    </div>
                                    <div className='sub-hsc-2'>
                                        <input type='text' id='searchItem' value={searchItem} onChange={(e) => { setSearchItem(e.target.value) }} placeholder='Search Document' />
                                        <button onClick={handleSearch}>Search</button>
                                    </div>
                                </div></>) : (<>
                                    <p>No current documents on the server.</p>
                                </>)
                            }
                        </div>
                    </div>
                    <div className='home-to-admin'>
                        <h5>Admin can <Link to='/admin'>ADD some articles</Link></h5>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeSection