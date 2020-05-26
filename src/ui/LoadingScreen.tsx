import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import CircularProgress from "@material-ui/core/CircularProgress";

export default function LoadingScreen() {
    const classes = useStyles({});

    return <div className={classes.root}><CircularProgress/></div>
}

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        root: {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: theme.palette.background.default,
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            position: 'fixed',
            zIndex: 99999,
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