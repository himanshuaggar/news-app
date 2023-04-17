import React, { useState, useEffect} from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import wordsToNumbers from 'words-to-numbers';

import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles';

const alanKey ='70367f78e5b5e40eecddd07c3cbdbde82e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = () =>{
    // const [newsArticles, setNewsArticles] = useState([]);
    const [newsArticles, setNewsArticles] = useState([]);
    const [activeArticle, setActiveArticle]= useState(-1)
    const [isOpen, setIsOpen] = useState(false);

    const classes = useStyles();

    useEffect(() => {
        alanBtn({
            key : alanKey,
            onCommand: ({ command, articles, number }) => {
                if(command ==='newHeadlines'){
                    console.log(articles);
                    setNewsArticles(articles);
                    setActiveArticle(-1);
                }
                else if(command === 'highlight'){
                    setActiveArticle((prevActiveArticle) => 
                        prevActiveArticle + 1
                    )
                }
                else if (command === 'instructions') {
                    setIsOpen(true);
                }
                else if(command ==='open'){
                    console.log(number);
                    const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
                    const article = articles[parsedNumber - 1];

                    if (parsedNumber > articles.length) {
                        alanBtn().playText('Please try that again...');
                    } else if (article) {
                       window.open(article.url, '_blank');
                       alanBtn().playText('Opening...');
                    } else {
                    alanBtn().playText('Please try that again...');
                    }
                }
            }
        })
    }, [])

    return(
        <div>
            <img src="https://lh3.googleusercontent.com/pw/AJFCJaWHcD7nX8jWDKooMTXGon7b7eYcUhFyeCkPs_TVFOst3mu5NObngkg3Dm_g1YDtnEKpC0_F-gkkE6W_gb69v4YhZebapJafc10wmgmBynL3QE-Ke0U=w2400" className={classes.alanLogo} alt="logo" />
            <NewsCards articles={newsArticles} activeArticle={activeArticle} />
        </div>
    )
}

export default App;