import React, { useState, useEffect} from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';

import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles';

const alanKey ='70367f78e5b5e40eecddd07c3cbdbde82e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = () =>{
    // const [newsArticles, setNewsArticles] = useState([]);
    const [newsArticles, setNewsArticles] = useState([]);
    const [activeArticle, setActiveArticle]= useState(-1)

    const classes = useStyles();

    useEffect(() => {
        alanBtn({
            key : alanKey,
            onCommand: ({ command, articles }) => {
                if(command ==='newHeadlines'){
                    console.log(articles);
                    setNewsArticles(articles);
                    setActiveArticle(-1);
                }else if(command === 'highlight'){
                    setActiveArticle((prevActiveArticle) => 
                        prevActiveArticle + 1
                    )
                }
            }
        })
    }, [])

    return(
        <div>
            <h1>Alan AI NEWS APP</h1>
            <NewsCards articles={newsArticles} activeArticle={activeArticle} />
        </div>
    )
}

export default App;