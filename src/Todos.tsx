import * as React from 'react';
import { useCallback, memo, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { ErrorMessage, SuccessMessage } from './ui/Message';
import Todo from './Todo';
import AddTodo from './AddTodo';
import ReduxStateInterface from './ReduxStateInterface';
import Actions, { todosRequest } from './actions';
import LoadingScreen from './ui/LoadingScreen';

interface StateProps {
    todos: Array<{
        id: number
        title: string
        completed?: boolean
    }>
    loading?: boolean
    error?: boolean
}

interface DispatchProps {
    handleComponentMount?: () => void
}

interface Props extends StateProps, DispatchProps {

}

function Todos(props: Props) {
    const { todos, loading, error, handleComponentMount = () => {} } = props;
    const classes = useStyles({});

    useEffect(() => {
        handleComponentMount();
    }, []);

    return <div className={classes.container}>
        {loading && <LoadingScreen/>}
        {error && <ErrorMessage message='Error while processing data.' />}
        {todos.length > 0 &&
            <Table className={classes.table}>
                <TableBody>
                    {todos.map(todo => <Todo key={todo.id} id={todo.id} title={todo.title} completed={todo.completed} />)}
                    {todos.length < 10 && <TableRow>
                        <TableCell colSpan={2}><AddTodo/></TableCell>
                    </TableRow>}
                </TableBody>
            </Table>
        }
    </div>;
}

export default connect<StateProps, DispatchProps>(
    (state: ReduxStateInterface) => ({
        todos: state.todos,
        loading: state.loading,
        error: state.error,
    }),
    dispatch => ({
        handleComponentMount: () => dispatch(todosRequest())
    }),
)(Todos);

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        container: { padding: theme.spacing(2) },
        table: { marginBottom: theme.spacing(2) },
        msg: { marginTop: theme.spacing(2) },
        actionButton: { marginRight: theme.spacing(1) },
    })
);