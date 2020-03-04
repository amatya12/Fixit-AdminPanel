import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { userLogin as userLoginAction } from 'react-admin';
import GoogleLogin from 'react-google-login';
import { withStyles, createStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import { GOOGLE_APP_ID } from '../../constants/constants';
import FontAwesome from 'react-fontawesome';
const styles = () =>
    createStyles({
        button: {
            width: '100%',
        },
        icon: {

        },
    });

const LoginForm = ({ classes, userLogin }) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const { searchParams } = new URL(window.location.href);
        const code = searchParams.get('code');
        const state = searchParams.get('state');

        // If code is present, we came back from the provider
        if (code && state) {
            setLoading(true);
            userLogin({ code, state });
        }
    }, [userLogin]);

    const handleLogin = ({ accessToken }) => {
        setLoading(true);
        userLogin({ accessToken }); // Do not provide code, just trigger the redirection
    };

    return (
        <div>
            <CardActions>
                <GoogleLogin
                    clientId={GOOGLE_APP_ID}
                    buttonText="Login With Google"
                    onSuccess={handleLogin}
                    cookiePolicy="single_host_origin"
                />
                {loading && (
                    <CircularProgress
                        className={classes.icon}
                        size={18}
                        thickness={2}
                    />
                )}

            </CardActions>
        </div >
    );
}

const mapDispatchToProps = {
    userLogin: userLoginAction,
}

export default connect(undefined, mapDispatchToProps)(withStyles(styles)(LoginForm));

