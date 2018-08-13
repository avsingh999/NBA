import React from 'react'
import style from '../article.css';

const PostData = (props) => {
    return(
        <div className={style.articlesPostData}>
            <div >
                Date: <span>{props.data.date}</span>
            </div>
            <div>
                Author:<span>{props.data.author}</span>
            </div>
        </div>
    )
}

export default PostData;