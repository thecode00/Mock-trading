import { useEffect } from "react";
import ContentBlock from "./script/Components/ContentBlock";
import { useCryptoStore } from "./script/store/priceStore";

export default function App() {
  const { tickerData, connectWebsocket } = useCryptoStore();

  useEffect(() => {
    console.log(tickerData);
    // 초기 웹소켓 연결 (티커 변경 없이 바로 연결)
    connectWebsocket();
  }, []);

  return <ContentBlock />;
}
