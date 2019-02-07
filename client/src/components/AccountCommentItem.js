import React from 'react';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';

export default ({text, article_id, articleTitle, timestamp}) => (
    <div>
        <hr/>
        <ul>
            <li className="account-comment">{text}</li>
            <li>
                <span><i>in </i></span>
                <Link to={`/articles/${article_id}`}>{articleTitle}</Link>
            </li>
            <Moment className="timestamp" format="HH:mm MMM DD, YYYY">{timestamp}</Moment>
        </ul>
    </div>
)
