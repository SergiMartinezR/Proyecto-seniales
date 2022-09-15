import React, { useState, useCallback, useRef, Fragment, useContext } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withRouter } from "react-router-dom";
import { TextField, Button, Checkbox, Typography, FormControlLabel } from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import FormDialog from "../../../shared/components/FormDialog";
import HighlightedInformation from "../../../shared/components/HighlightedInformation";
import ButtonCircularProgress from "../../../shared/components/ButtonCircularProgress";
import VisibilityPasswordTextField from "../../../shared/components/VisibilityPasswordTextField";
import AuthContext from "../../../context/AuthContext";

const styles = (theme) => ({
  forgotPassword: {
    marginTop: theme.spacing(2),
    color: theme.palette.primary.main,
    cursor: "pointer",
    "&:enabled:hover": {
      color: theme.palette.primary.dark,
    },
    "&:enabled:focus": {
      color: theme.palette.primary.dark,
    },
  },
  disabledText: {
    cursor: "auto",
    color: theme.palette.text.disabled,
  },
  formControlLabel: {
    marginRight: 0,
  },
});

function LoginDialog(props) {

  // let {loginUser}=useContext(AuthContext);

  const {
    setStatus,
    history,
    classes,
    onClose,
    openChangePasswordDialog,
    status,
  } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const loginPhoneNumber = useRef();
  const loginPassword = useRef();

  const state = {
    token: '',
    credentials: { username: '', password: '' }
  }

  const login = useCallback(() => {
    setIsLoading(true);
    setStatus(null);
    const cred = state.credentials;
    cred['username'] = loginPhoneNumber.current.value;
    cred['password'] = loginPassword.current.value;
    console.log(cred);
    state.credentials = cred;
    console.log(state);
    fetch('http://127.0.0.1:8000/login/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state.credentials)
    }).then(data => data.json()).then(

      data => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
        console.log(data.token);
        state.token = data.token;
        setTimeout(() => {
          history.push({
            pathname: "/c/dashboard",
            state: {token: data.token}
          });
        }, 150);
      }
    ).catch(error => console.error(error))
    // if (loginPhoneNumber.current.value !== "test@web.com") {
    //   setTimeout(() => {
    //     setStatus("invalidEmail");
    //     setIsLoading(false);
    //   }, 1500);
    // } else if (loginPassword.current.value !== "HaRzwc") {
    //   setTimeout(() => {
    //     setStatus("invalidPassword");
    //     setIsLoading(false);
    //   }, 1500);
    // } else {
    //   setTimeout(() => {
    //     history.push("/c/dashboard");
    //   }, 150);
    // }
  }, [setIsLoading, loginPhoneNumber, loginPassword, history, setStatus]);

  return (
    <Fragment>
      <FormDialog
        open
        onClose={onClose}
        loading={isLoading}
        onFormSubmit={(e) => {
          e.preventDefault();
          login();
        }}
        hideBackdrop
        headline="Iniciar Sesión"
        content={
          <Fragment>
            <TextField
              variant="outlined"
              margin="normal"
              error={status === "invalidEmail"}
              required
              fullWidth
              label="Número de Teléfono"
              inputRef={loginPhoneNumber}
              autoFocus
              autoComplete="off"
              type="text"
              FormHelperTextProps={{ error: true }}
            />
            <VisibilityPasswordTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={status === "invalidPassword"}
              label="Contraseña"
              inputRef={loginPassword}
              autoComplete="off"
              onChange={() => {
                if (status === "invalidPassword") {
                  setStatus(null);
                }
              }}
              helperText={
                status === "invalidPassword" ? (
                  <span>
                    Contraseña incorrecta. Intenta de nuevo, o da clic en{" "}
                    <b>&quot;Olvidé mi Contraseña&quot;</b> para crear una nueva.
                  </span>
                ) : (
                  ""
                )
              }
              FormHelperTextProps={{ error: true }}
              onVisibilityChange={setIsPasswordVisible}
              isVisible={isPasswordVisible}
            />
            <FormControlLabel
              className={classes.formControlLabel}
              control={<Checkbox color="primary" />}
              label={<Typography variant="body1">Recuerdame</Typography>}
            />
            {/* {status === "verificationEmailSend" ? (
              <HighlightedInformation>
                Hemos enviado instrucciones a tu número de teléfono para 
              </HighlightedInformation>
            ) : (
              <HighlightedInformation>
                Email is: <b>test@web.com</b>
                <br />
                Password is: <b>HaRzwc</b>
              </HighlightedInformation>
            )} */}
          </Fragment>
        }
        actions={
          <Fragment>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              disabled={isLoading}
              size="large"
            >
              Iniciar Sesión
              {isLoading && <ButtonCircularProgress />}
            </Button>
            <Typography
              align="center"
              className={classNames(
                classes.forgotPassword,
                isLoading ? classes.disabledText : null
              )}
              color="primary"
              onClick={isLoading ? null : openChangePasswordDialog}
              tabIndex={0}
              role="button"
              onKeyDown={(event) => {
                // For screenreaders listen to space and enter events
                if (
                  (!isLoading && event.keyCode === 13) ||
                  event.keyCode === 32
                ) {
                  openChangePasswordDialog();
                }
              }}
            >
              Olvidé mi Contraseña
            </Typography>
          </Fragment>
        }
      />
    </Fragment>
  );
}

LoginDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
  openChangePasswordDialog: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  status: PropTypes.string,
};

export default withRouter(withStyles(styles)(LoginDialog));
