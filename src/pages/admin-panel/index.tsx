import axios from "axios";
import { useSnackbar } from "notistack";
import * as React from "react";
import { useParams } from "react-router-dom";

import PanelLayout from "../../Components/Layouts/PanelLayout";
import { UserContext } from "../../helpers/UserDataContext";
import { isLogged } from "../../utils/api/user";
import { mainListItems, secondaryListItems } from "./listItems";
import View from "./views";

const { useState, useEffect, useContext } = React;

export default () => {
  const { enqueueSnackbar } = useSnackbar();
  const { view }: { view?: string } = useParams() || "";

  const [overrideView, setOverrideView] = useState<string | null>("loading");

  const { user, tokens } = useContext(UserContext);

  const ReturnComponent: () => JSX.Element = () => {
    return (
      <PanelLayout
        title={view}
        View={<View view={overrideView || view} />}
        mainListItems={mainListItems}
        secondaryListItems={secondaryListItems}
      />
    );
  };

  if (!user || !tokens) {
    if (overrideView !== "error.login") {
      setOverrideView("error.login");
    }
    return <ReturnComponent />;
  }

  useEffect(() => {
    
    const CancelToken = axios.CancelToken;
    const CancelTokenSource = CancelToken.source();
    if (overrideView !== null) {
      const checkPermission = async () => {
        // debugger;
        try {
          const isAuth = await isLogged(
            user.id,
            tokens.access.token || "",
            CancelTokenSource
          );
          if (isAuth) {
            setOverrideView(null);
            return;
          }
          setOverrideView("error.login");
        } catch (e) {
          enqueueSnackbar("Error checking permission:" + e, {
            variant: "error",
          });
          setOverrideView("error.login");
        }
      };
      checkPermission();
    }
    return () => {
      CancelTokenSource.cancel();
    };
  }, []);

  return <ReturnComponent />;
};
