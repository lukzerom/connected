import { IconButton, Snackbar } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React, {
  createContext,
  Fragment,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import uuid from "uuid";

type AlertProviderProps = {
  children: ReactNode;
};

export enum AlertType {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

type AlertContextType = {
  setAlert: (msg: string, type: AlertType) => void;
  clearAlert: (id: string) => void;
};

export interface Alert {
  msg: string;
  type: AlertType;
  id: string;
}

const AlertContext = createContext({} as AlertContextType);

export const useAlert = () => {
  return useContext(AlertContext);
};

export const AlertProvider = ({ children }: AlertProviderProps) => {
  const [alerts, setAlerts] = useState<Array<Alert>>([]);
  const id = uuid.v4();

  const setAlert = useCallback((msg: string, type: AlertType) => {
    setAlerts([...alerts, { msg, type, id }]);
  }, []);

  const clearAlert = useCallback((id: string) => {
    setAlerts(alerts.filter((alert) => alert.id !== id));
  }, []);

  const value: AlertContextType = {
    setAlert,
    clearAlert,
  };

  return (
    <AlertContext.Provider value={value}>
      {children}
      {alerts.map((alert) => {
        return (
          <Snackbar
            open={true}
            autoHideDuration={6000}
            message={alert.msg}
            action={
              <Fragment>
                <IconButton
                  aria-label="close"
                  color="inherit"
                  onClick={() => clearAlert(alert.id)}
                >
                  <CloseIcon />
                </IconButton>
              </Fragment>
            }
          />
        );
      })}
    </AlertContext.Provider>
  );
};
