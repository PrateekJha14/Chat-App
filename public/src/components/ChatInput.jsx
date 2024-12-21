import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Picker from 'emoji-picker-react';
import { IoMdSend } from 'react-icons/io';
import { BsEmojiSmileFill } from 'react-icons/bs';

const ChatInput = ({ handleSendMsg }) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [msg, setMsg] = useState('');
    const emojiPickerRef = useRef(null); // Create a ref for the emoji picker

    const handleEmojiPicker = () => {
        setShowEmojiPicker((prev) => !prev);
    };

    const handleEmojiClick = (event, emojiObject) => {
        setMsg(prev => prev + emojiObject.unicode);
    };
    

    const sendChat = (event) => {
        event.preventDefault();
        if (msg.trim() || showEmojiPicker) {
            handleSendMsg(msg);
            setMsg('');
            setShowEmojiPicker(false);
        }
    };
    
    // Hide emoji picker when clicking outside
    const handleClickOutside = (event) => {
        if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
            setShowEmojiPicker(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <Container>
            <div className="button-container">
                <div className="emoji" ref={emojiPickerRef}>
                    <BsEmojiSmileFill onClick={handleEmojiPicker} />
                    {showEmojiPicker && (
                        <div className="emoji-picker-wrapper">
                            <Picker onEmojiClick={handleEmojiClick} />
                        </div>
                    )}
                </div>
            </div>
            <form className='input-container' onSubmit={sendChat}>
                <input 
                    type="text" 
                    placeholder='Type your message here' 
                    value={msg} 
                    onChange={(e) => setMsg(e.target.value)} 
                    onKeyDown={(e) => e.key === 'Enter' && sendChat(e)} // Send on Enter key press
                />
                <button className='submit'>
                    <IoMdSend />
                </button>
            </form>
        </Container>
    );
};

const Container = styled.div`
    display: grid;
    align-items: center;
    grid-template-columns: 5% 95%;
    background-color: #080420;
    padding: 0 2rem;
    
    @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0 1rem;
        gap: 1rem;
    }

    .button-container {
        display: flex;
        align-items: center;
        color: white;
        gap: 1rem;

        .emoji {
            position: relative;
            svg {
                font-size: 1.5rem;
            color: #ffff00c8;
            cursor: pointer;
            }
            .emoji-picker-wrapper {
                position: absolute;
                top: -350px; /* Adjust as necessary */
                background-color: #080420;
                box-shadow: 0 5px 10px #9a86f3;
                border-color: #9a86f3;
                z-index: 999; /* Ensure it appears above other elements */
                
                /* Custom styles for emoji picker */
                .emoji-scroll-wrapper {
                    background-color: #080420;
                    &::-webkit-scrollbar {
                        width: 5px;
                        &-thumb {
                            background-color: #9a86f3;
                        }
                    }
                }
            }
            
        }
    }

    .input-container {
        width: 100%;
        border-radius: 2rem;
        display: flex;
        align-items: center;
        gap: 2rem;
        background-color: #ffffff34;

        input {
            width: 90%;
            height: 60%;
            background-color: transparent;
            color: white;
            border: none;
            padding-left: 1rem;
            font-size: 1.2rem;

            &::selection {
                background-color: #9a86f3;
            }
            &:focus {
                outline: none;
            }
        }
        button {
            padding: 0.3rem 2rem;
            border-radius: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #9a86f3;
            border: none;

            @media screen and (min-width: 720px) and (max-width: 1080px) {
                padding: 0.3rem 1rem;
                svg {
                    font-size: 1rem;
                }
            }
            svg {
                font-size: 2rem;
                color: white;
            }
        }
    }
`;

export default ChatInput;
