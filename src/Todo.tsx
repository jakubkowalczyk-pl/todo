import * as React from 'react';
import { memo } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import BaseDoneIcon from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/Delete';
import { connect } from 'react-redux';
import { removeTodoRequest, completeTodoRequest } from './actions';
import { styled } from '@material-ui/core';

interface DispatchProps {
    handleRemoveClick: (todoId: number) => void
    handleDoneClick: (todoId: number, completed: boolean) => void
}

interface OwnProps {
    title: string
    id: number
    completed?: boolean
}

interface Props extends DispatchProps, OwnProps {}

const Todo = memo(function Todo(props: Props) {
    const { id, completed, title } = props;

    return <TableRow>
        <TableCell>{title}</TableCell>
        <TableCell>
            <DoneIcon color={completed ? 'primary' : 'disabled'} completed={completed} onClick={() => props.handleDoneClick(id, completed)}/>
            {completed && <>
                <DeleteIcon cursor='pointer' onClick={() => props.handleRemoveClick(id)}/>
            </>}
        </TableCell>
    </TableRow>
});

export default connect<{}, DispatchProps, OwnProps>(
    () => ({}),
    dispatch => ({
        handleRemoveClick: todoId => dispatch(removeTodoRequest(todoId)),
        handleDoneClick: (todoId, completed) => !completed && dispatch(completeTodoRequest(todoId)),
    }),
)(Todo);

const DoneIcon = styled(BaseDoneIcon)((props: Partial<Props>) => ({
    cursor: props.completed ? 'default' : 'pointer',
}));