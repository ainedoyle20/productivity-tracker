import React, {useState} from 'react';
import { useDispatch } from 'react-redux';

import { completeTodo, deleteTodo, editTodo } from '../../redux/todos/todos.actions';

import TodoEditForm from '../todoEditForm/todoEditForm.component';

import StarIcon from '../../assets/star-icon.svg';
import TickIcon from '../../assets/tick-icon.svg';
import EditIcon from '../../assets/edit-icon.svg';
import DeleteIcon from '../../assets/delete-icon.svg';

import {
    TodoContainer,
    TodoDescriptionContainer,
    TodoStarIcon,
    TodoDescription,
    TodoIconsContainer,
    TodoActionIcon
} from './todo.styles';

const Todo = ({ todo }) => {
    const dispatch = useDispatch();

    const [edit, setEdit] = useState({
        id: null,
        value: ''
    });

    const submitEdit = editDescription => {
        dispatch(editTodo({todoId: edit.id, editDescription}));
        setEdit({
            id: null,
            value: ''
        });
    };

    if (edit.id) {
        return <TodoEditForm edit={edit} submitEdit={submitEdit}/>
    }

    const { description } = todo;
    return (
        <>
           <TodoContainer>
               <TodoDescriptionContainer>
                   <TodoStarIcon src={StarIcon} alt="star"/>
                   <TodoDescription>{description}</TodoDescription>  
               </TodoDescriptionContainer>
                <TodoIconsContainer>
                    <TodoActionIcon 
                        src={TickIcon} alt="tick button"
                        onClick={() => dispatch(completeTodo(todo))}
                    />
                    <TodoActionIcon 
                        src={EditIcon} alt="edit button"
                        onClick={() => setEdit({ id: todo.id, value: description })}
                    />
                    <TodoActionIcon 
                        src={DeleteIcon} alt="delete button"
                        onClick={() => dispatch(deleteTodo(todo))}
                    />
                </TodoIconsContainer>
            </TodoContainer> 
        </>
            
    );
}

export default Todo;