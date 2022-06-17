import React, { useState, useCallback, useRef, Fragment } from "react";
import PropTypes from "prop-types";
import { FormHelperText, TextField, Button, Checkbox, Typography, FormControlLabel } from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import FormDialog from "../../../shared/components/FormDialog";
import HighlightedInformation from "../../../shared/components/HighlightedInformation";
import ButtonCircularProgress from "../../../shared/components/ButtonCircularProgress";
import VisibilityPasswordTextField from "../../../shared/components/VisibilityPasswordTextField";

const styles = (theme) => ({
  link: {
    transition: theme.transitions.create(["background-color"], {
      duration: theme.transitions.duration.complex,
      easing: theme.transitions.easing.easeInOut,
    }),
    cursor: "pointer",
    color: theme.palette.primary.main,
    "&:enabled:hover": {
      color: theme.palette.primary.dark,
    },
    "&:enabled:focus": {
      color: theme.palette.primary.dark,
    },
  },
});

function RegisterDialog(props) {
  const { setStatus, theme, onClose, openTermsDialog, status, classes } = props;
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasTermsOfServiceError, setHasTermsOfServiceError] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  // const registerTermsCheckbox = useRef();
  const registerUsername = useRef();
  const registerPassword = useRef();
  const registerPasswordRepeat = useRef();
  const profileRegisterNames = useRef();
  const profileRegisterLastNames = useRef();
  const profileRegisterLocation = useRef();

  const state = {
    id: '',
    credentials: { phone_number: '', password: '' },
    profile: { first_name: '', last_name: '', location: '' }
  }

  const register = useCallback(() => {
    // if (!registerTermsCheckbox.current.checked) {
    //   setHasTermsOfServiceError(true);
    //   return;
    // }
    if (
      registerPassword.current.value !== registerPasswordRepeat.current.value
    ) {
      setStatus("passwordsDontMatch");
      return;
    }
    setStatus(null);
    setIsLoading(true);
    const cred = state.credentials;
    cred['phone_number'] = registerUsername.current.value;
    cred['password'] = registerPassword.current.value;
    console.log(cred);
    state.credentials = cred;
    console.log(state);
    fetch('http://127.0.0.1:8000/users/adultomayor/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state.credentials)
    }).then(data => data.json()).then(

      data => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
        console.log(data.id);
        state.id = data.id;
        setOpen(true);
      }
    ).catch(error => console.error(error))
  }, [
    setIsLoading,
    setStatus,
    setHasTermsOfServiceError,
    registerPassword,
    registerPasswordRepeat,
    registerUsername,
    // registerTermsCheckbox,
  ]);

  const profileRegister = useCallback(() => {
    // if (
    //   registerPassword.current.value !== registerPasswordRepeat.current.value
    // ) {
    //   setStatus("passwordsDontMatch");
    //   return;
    // }
    setStatus(null);
    setIsLoading(true);
    const prof = state.profile;
    prof['first_name'] = profileRegisterNames.current.value;
    prof['last_name'] = profileRegisterLastNames.current.value;
    prof['location'] = profileRegisterLocation.current.value;
    console.log(prof);
    state.profile = prof;
    console.log(state);
    fetch(`http://127.0.0.1:8000/users/adultomayor/create/${state.id}/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state.profile)
    }).then(data => data.json()).then(

      data => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
        console.log(data);
        setOpen(true);
      }
    ).catch(error => console.error(error))
  }, [
    setIsLoading,
    setStatus,
    profileRegisterNames,
    profileRegisterLastNames,
    profileRegisterLocation,
    // registerTermsCheckbox,
  ]);

  return (
    <Fragment>
      <FormDialog
        loading={isLoading}
        onClose={onClose}
        open
        headline="Registro de Adulto Mayor"
        onFormSubmit={(e) => {
          e.preventDefault();
          register();
        }}
        hideBackdrop
        hasCloseIcon
        content={
          <Fragment>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={status === "invalidEmail"}
              label="Número de teléfono"
              inputRef={registerUsername}
              autoFocus
              autoComplete="off"
              type="text"
              onChange={() => {
                if (status === "invalidEmail") {
                  setStatus(null);
                }
              }}
              FormHelperTextProps={{ error: true }}
            />
            <VisibilityPasswordTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={
                status === "passwordTooShort" || status === "passwordsDontMatch"
              }
              label="Contraseña"
              inputRef={registerPassword}
              autoComplete="off"
              onChange={() => {
                if (
                  status === "passwordTooShort" ||
                  status === "passwordsDontMatch"
                ) {
                  setStatus(null);
                }
              }}
              helperText={(() => {
                if (status === "passwordTooShort") {
                  return "La contraseña debe ser de al menos 6 caracteres.";
                }
                if (status === "passwordsDontMatch") {
                  return "Las contraseñas no coinciden.";
                }
                return null;
              })()}
              FormHelperTextProps={{ error: true }}
              isVisible={isPasswordVisible}
              onVisibilityChange={setIsPasswordVisible}
            />
            <VisibilityPasswordTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={
                status === "passwordTooShort" || status === "passwordsDontMatch"
              }
              label="Repite tu contraseña"
              inputRef={registerPasswordRepeat}
              autoComplete="off"
              onChange={() => {
                if (
                  status === "passwordTooShort" ||
                  status === "passwordsDontMatch"
                ) {
                  setStatus(null);
                }
              }}
              helperText={(() => {
                if (status === "passwordTooShort") {
                  return "La contraseña debe ser de al menos 6 caracteres.";
                }
                if (status === "passwordsDontMatch") {
                  return "Las contraseñas no coinciden.";
                }
              })()}
              FormHelperTextProps={{ error: true }}
              isVisible={isPasswordVisible}
              onVisibilityChange={setIsPasswordVisible}
            />
            {/* <FormControlLabel
            style={{ marginRight: 0 }}
            control={
              <Checkbox
                color="primary"
                inputRef={registerTermsCheckbox}
                onChange={() => {
                  setHasTermsOfServiceError(false);
                }}
              />
            }
            label={
              <Typography variant="body1">
                I agree to the
                <span
                  className={classes.link}
                  onClick={isLoading ? null : openTermsDialog}
                  tabIndex={0}
                  role="button"
                  onKeyDown={(event) => {
                    // For screenreaders listen to space and enter events
                    if (
                      (!isLoading && event.keyCode === 13) ||
                      event.keyCode === 32
                    ) {
                      openTermsDialog();
                    }
                  }}
                >
                  {" "}
                  terms of service
                </span>
              </Typography>
            }
          />
          {hasTermsOfServiceError && (
            <FormHelperText
              error
              style={{
                display: "block",
                marginTop: theme.spacing(-1),
              }}
            >
              In order to create an account, you have to accept our terms of
              service.
            </FormHelperText>
          )} */}
            {/* {status === "accountCreated" ? (
              <HighlightedInformation>
                Se ha creado tu cuenta
              </HighlightedInformation>
            ) : (
              <HighlightedInformation>
                El registro está deshabilitado hasta nuevo aviso.
              </HighlightedInformation>
            )} */}
          </Fragment>
        }
        actions={
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            color="secondary"
            disabled={isLoading}
          >
            Siguiente
            {isLoading && <ButtonCircularProgress />}
          </Button>
        }
      />
      <FormDialog
        loading={isLoading}
        onClose={onClose}
        open={open}
        headline="Registro de Adulto Mayor"
        onFormSubmit={(e) => {
          e.preventDefault();
          profileRegister();
        }}
        hideBackdrop
        hasCloseIcon
        content={
          <Fragment>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Nombre(s)"
              inputRef={profileRegisterNames}
              autoFocus
              autoComplete="off"
              type="text"
              FormHelperTextProps={{ error: true }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Apellidos"
              inputRef={profileRegisterLastNames}
              autoFocus
              autoComplete="off"
              type="text"
              FormHelperTextProps={{ error: true }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Dirección"
              inputRef={profileRegisterLocation}
              autoFocus
              autoComplete="off"
              type="text"
              FormHelperTextProps={{ error: true }}
            />
            {/* {status === "accountCreated" ? (
              <HighlightedInformation>
                Se ha creado tu cuenta
              </HighlightedInformation>
            ) : (
              <HighlightedInformation>
                El registro está deshabilitado hasta nuevo aviso.
              </HighlightedInformation>
            )} */}
          </Fragment>
        }
        actions={
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            color="secondary"
            disabled={isLoading}
          >
            Registrarse
            {isLoading && <ButtonCircularProgress />}
          </Button>
        }
      />
    </Fragment>
  );
}

RegisterDialog.propTypes = {
  theme: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  openTermsDialog: PropTypes.func.isRequired,
  status: PropTypes.string,
  setStatus: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(RegisterDialog);
