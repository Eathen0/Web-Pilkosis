import { useState, useEffect } from "react";

import LoginPage from "./login-page/login";
import UserPage from "./user-page/user";

function App() {
  const [swich, setSwich] = useState(false);
  const [pageName, setPageName] = useState("login");

  function handle() {
    swich ? setPageName("login") : setPageName("pilkosis");
    setSwich(!swich);
  }

  useEffect(() => {
    document.title = pageName;
  }, [pageName]);

  return (
    <div className="App">
      {swich ? <UserPage onClick={handle} /> : <LoginPage click={handle} />}
    </div>
  );
}

export default App;
