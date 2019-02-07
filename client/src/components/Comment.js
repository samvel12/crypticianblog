import React from 'react';
import Moment from 'react-moment';

const defaultImg = "/default_avatar.png";

export default ({user, date, text, comment_id, admin, remove, auth, edit, profileImage}) => {
    let avatar = null;
    profileImage === "" ? avatar = defaultImg : avatar = profileImage;
    return (
        <div className="comment">
            <div>
                <img src={avatar} alt="Profile"/>
            </div>
            <div>
                <div className="comment-details">
                    <span className="username-comment">{user}</span>
                    <Moment className="timestamp" format="HH:mm MMM DD, YYYY">{date}</Moment>
                    {(auth && (<button className="btn-icon icon" onClick={edit}><i className="fas fa-edit"></i></button>))}
                    {admin && (<button className="btn-icon icon" onClick={remove}><i className="fas fa-trash-alt"></i></button>)}
                </div>
                <p>{text}</p>
            </div>
        </div>
    )
}
