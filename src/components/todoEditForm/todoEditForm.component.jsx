import React, {useState} from "react";

const TodoEditForm = ({ edit, submitEdit }) => {
    const [input, setInput] = useState(edit ? edit.value : '');

    const handleChange = event => {
        setInput(event.target.value);
    }

    const handleSubmit = event => {
        event.preventDefault();

        submitEdit(input);
        setInput('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                placeholder="Update Todo"
                value={input}
                name="text"
                onChange={handleChange}
                required
                className="edit-input"
            />
            <button type="submit" className="edit-button">Update</button>
        </form>
    );
}

export default TodoEditForm;
