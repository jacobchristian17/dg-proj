import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../_hooks/useAxiosPrivate";
import './style.css';
const ARTICLES_URL = '/articles';

function Articles() {
    const [articles, setArticles] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navi = useNavigate();
    const locs = useLocation();

    const [createForm, setCreateForm] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newAuthors, setNewAuthors] = useState('');
    const [newAbstract, setNewAbstract] = useState('');
    const [newKeywords, setnewKeywords] = useState('');
    const [newDoi, setNewDoi] = useState('');

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
    const handleCreateArticle = async (e) => {
        e.preventDefault();
        try {
            if (newTitle || newAuthors || newAbstract || newKeywords || newDoi) {
                const response = await axiosPrivate.post(ARTICLES_URL,
                    JSON.stringify({
                        title: newTitle,
                        authors: newAuthors,
                        abstract: newAbstract,
                        keywords: newKeywords,
                        doi: newDoi
                    }));
                console.log(response);
                setCreateForm(false);
            }
        } catch (err) {
            console.err(err);
            navi('/admin', { state: { from: locs }, replace: true });
        }
    };
    return (
        <div className="article-list">
            <h2>Articles list</h2>
            {articles?.length && !createForm
                ? (
                    <>
                        <table className="article-list-table">
                            <tr>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Keywords</th>
                                <th>Doi</th>
                            </tr>
                            {articles.map((obj) =>
                                <tr>
                                    <td><span>{obj?.title}</span></td>
                                    <td><span>{obj?.authors}</span></td>
                                    <td><span>{obj?.keywords}</span></td>
                                    <td><span>{obj?.doi}</span></td>
                                </tr>
                            )}
                        </table>
                        <br />
                        <button onClick={() => { setCreateForm(true) }}>+ article</button>
                    </>
                ) : (
                    <>
                        {!createForm ?
                            <p>Currently no documents. </p>
                            : <form className="form-create">
                                <h3>Create new article</h3>
                                <label>Title:</label> <input type="text" id="title" value={newTitle} onChange={(e) => { setNewTitle(e.target.value) }} required />
                                <label>Authors:</label> <input type="text" id="title" value={newAuthors} onChange={(e) => { setNewAuthors(e.target.value) }} required />
                                <label>Abstract:</label> <input type="text" id="title" value={newAbstract} onChange={(e) => { setNewAbstract(e.target.value) }} required />
                                <label>Keywords:</label> <input type="text" placeholder="separated by comma ','" id="title" value={newKeywords} onChange={(e) => { setnewKeywords(e.target.value) }} required />
                                <label>doi:</label> <input type="text" id="title" value={newDoi} onChange={(e) => { setNewDoi(e.target.value) }} required />
                                <button onClick={() => { setCreateForm(false) }}>Go Back</button><button onClick={handleCreateArticle}>Add articles</button>
                            </form>
                        }
                    </>
                )
            }
            <br />
        </div>
    )
}

export default Articles