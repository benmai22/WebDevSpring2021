import React, { useRef } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { UserInfo } from '../UserInfoContext'
import { API_URL } from '../MainPage';

function UploadQuestion () {
    const { token } = UserInfo()
    const titleRef = useRef()
    const bodyRef = useRef()
    const topicRef = useRef()


    const addThread = async () => {
        axios.post(API_URL + '/api/posts/add', {
            title: titleRef.current.value,
            body: bodyRef.current.value,
            topic: topicRef.current.value
        }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        })
    }
    const submitThread = (e) => {
        e.preventDefault()
        addThread();
    };

    return (
        <>
            <div className="modalHeader">
                <h2>Ask a Question</h2>
            </div>
            <div className="modalBody">
                <form onSubmit={submitThread} className="uploadForm">
                    <input id="questionTitle" className="uploadInput" name="title" placeholder="Type a title" ref={titleRef}></input>
                    <textarea id="questionText" className="uploadInput" placeholder="Type a Question" ref={bodyRef}></textarea>
                    <select className="uploadInput typeInput" defaultValue={'DEFAULT'} ref={topicRef}>
                        <option id="optionPlaceholder" value="DEFAULT" disabled={true}>Choose a topic</option>
                        <option value="Housing">Housing</option>
                        <option value="Classes">Classes</option>
                        <option value="Items">Items</option>
                        <option value="Events">Events</option>
                        <option value="Others">Others</option>
                    </select>
                    <button type="submit" 
                            className="uploadItem uploadModalButton siteButton"
                            onClick={() => {
                                return <Link to="/home/blog/" />
                            }}>Send
                    </button>
                </form>
            </div>
        </>
        
    )
}

export default UploadQuestion
