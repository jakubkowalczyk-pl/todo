import * as React from 'react';
import { useCallback, useState, useMemo } from 'react';
import { Button, TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import ReduxStateInterface from './ReduxStateInterface';
import { createTodoRequest } from './actions';

interface DispatchProps {
    handleAddClick: (title: string) => void
}

interface Props extends DispatchProps {}

function AddTodo(props: Props) {
    const [value, setValue] = useState('');
    const onChange = useCallback<React.ChangeEventHandler<{ value: string }>>(event => setValue(event.target.value), []);
    const InputProps = useMemo(() => ({ disableUnderline: true }), []);
    const onClick = useCallback(() => {
        setValue(value => {
            props.handleAddClick(value);
            return '';
        });
    }, [props.handleAddClick]);

    return <div>
        <TextField value={value} InputProps={InputProps} onChange={onChange} placeholder='Todo...' />
        <Button variant='contained' color='primary' onClick={onClick}>Add</Button>
    </div>;
}

export default connect<{}, DispatchProps>(
    (state: ReduxStateInterface) => ({
        todos: state.todos,
        loading: state.loading,
        error: state.error,
    }),
    dispatch => ({
        handleAddClick: title => dispatch(createTodoRequest(title))
    }),
)(AddTodo);