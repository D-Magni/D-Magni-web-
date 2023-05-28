import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

const ChatwootWidget = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "YOUR_CHATWOOT_INSTALLATION_CODE";
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Helmet>
      <script>{`window.chatwootSettings = { position: 'right' };`}</script>
    </Helmet>
  );
};

export default ChatwootWidget;
