export interface BinanceTrade {
  e: "trade"; // 이벤트 타입: "trade"
  E: number; // 이벤트 발생 시간 (밀리초)
  s: string; // 심볼, 예: "BNBBTC"
  t: number; // 트레이드 ID
  p: string; // 가격 (문자열로 전달됨)
  q: string; // 수량 (문자열로 전달됨)
  b: number; // 구매자 주문 ID
  a: number; // 판매자 주문 ID
  T: number; // 트레이드 체결 시간 (밀리초)
  m: boolean; // 구매자가 시장 조성자인지 여부
  M: boolean; // 무시 (추가 정보)
}
