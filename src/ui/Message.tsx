import * as React from 'react';
import {SnackbarContent, useTheme} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {SnackbarContentProps} from "@material-ui/core/SnackbarContent";
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

export default function Message(props: SnackbarContentProps & { background: string, icon: JSX.Element }) {
    const classes = useStyles({});

    return <SnackbarContent
        className={classes.root + ' ' + (props.className || '')}
        style={{ background: props.background }}
        message={<div className={classes.message}><span className={classes.icon}>{props.icon}</span>{props.message}</div>}
        {...props}
    />;
}

export function ErrorMessage(props: SnackbarContentProps) {
    const theme = useTheme();

    return <Message background={theme.palette.error.dark} icon={<ErrorIcon/>} {...props}/>
}

export function SuccessMessage(props: SnackbarContentProps) {
    return <Message background={'green'} icon={<CheckCircleIcon/>} {...props}/>
}

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        root: {
            marginBottom: theme.spacing(2),
        },
        message: {
            display: 'flex',
            alignItems: 'center',
        },
        icon: {
            marginRight: theme.spacing(.5),
            lineHeight: theme.spacing(2),
        },
    })
);