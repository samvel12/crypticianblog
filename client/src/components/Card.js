import React from 'react';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import '../css/App.css';

const defaultImg = "/default_article.jpg";

export default ({title, picture, username, article_id, timestamp}) => (
    <div className="element card">
        <Link to={`/articles/${article_id}`}>
            <img 
                src={(picture || defaultImg)} 
                alt="thumbnail"
            />
        </Link>
        <div className="details">
            <Link to={`/articles/${article_id}`}>
                <h3>{title}</h3>
            </Link>
            <div className="card-footer">
                <p>by <span className="username">{username}</span></p>
                <Moment className="timestamp" format="MMM DD, YYYY">
                    {timestamp}
                </Moment>
            </div>
        </div>
    </div>
)

