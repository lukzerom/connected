import { IconButton, Snackbar, SnackbarContent } from "@material-ui/core";
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

  const clearAlert = useCallback(
    (id: string) => {
      setAlerts(alerts.filter((alert) => alert.id !== id));
    },
    [alerts]
  );

  const setAlert = useCallback(
    (msg: string = "Error :(", type: AlertType) => {
      const id = uuid.v4();

      setAlerts([...alerts, { msg, type, id }]);
    },
    [alerts]
  );

  const value: AlertContextType = {
    setAlert,
    clearAlert,
  };

  return (
    <AlertContext.Provider value={value}>
      {children}
      {alerts.map((alert, index) => {
        return (
          <Snackbar open key={index} style={{ bottom: index * 72 + 24 }}>
            <SnackbarContent
              message={alert.msg}
              style={{
                backgroundColor:
                  alert.type === AlertType.ERROR ? "#ff3333" : "#4BB543",
              }}
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
          </Snackbar>
        );
      })}
    </AlertContext.Provider>
  );
};
