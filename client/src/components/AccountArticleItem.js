import React from 'react';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';

export default ({id, title, timestamp, remove}) => (
    <div>
        <hr/>
        <ul>
            <li>
                <Link to={`/articles/${id}`}>
                    {title}
                </Link>
                <Link to={{pathname: `/update/${id}`, state: {id}}}><i className="fas fa-edit icon"></i></Link>
                <button className="btn-icon" onClick={remove}><i className="fas fa-trash-alt icon"></i></button>
            </li>
            <li>
                <Moment className="timestamp" format="HH:mm MMM DD, YYYY">
                    {timestamp}
                </Moment>
            </li>
        </ul>
    </div>
)