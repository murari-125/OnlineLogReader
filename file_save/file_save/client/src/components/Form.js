import {useState, useEffect} from 'react'
const io = require('socket.io-client')

function Form(){
    const [text, setText] = useState('')
    useEffect(() => {
        const socket = io('http://localhost:4000');

        socket.on('message', (message) => {
          setText((draft) => draft + message);
        });
        return () => {
          socket.disconnect();
        };
      }, []);

    return (
        <div>
        <form >
        <div>
            <label htmlFor="post-body">
                <small>Body Content</small>
            </label>
            <textarea
                value={text}
                name="body"
                id="post-body"
                type="text"
            />
        </div>
    </form>   
    </div>
    )
}

export default Form