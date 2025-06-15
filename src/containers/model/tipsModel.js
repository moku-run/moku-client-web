const tipsModel = [
  "[TIP] 3x3, 4x4는 허용되고 있어요.",
  "[TIP] 장목은 무효입니다! 6목 이상은 인정되지 않아요.",
  "[TIP] 선공은 흑돌입니다. 수 싸움에서 앞서 나가세요!",
  "[TIP] 3x3이나 4x4는 강력하지만, 금수에 주의하세요.",
  "[TIP] 5목이 완성되어야 승리합니다.",
  "[TIP] 가로, 세로, 대각선 모두 체크하세요.",
  "[TIP] 승리에 가까워질수록 침착하게!",
  "[TIP] 대각선 방향 공격도 놓치지 마세요!",
  "[TIP] 수비도 중요해요! 상대의 연결을 끊어보세요.",
];

export const getRandomTip = () => {
  const i = Math.floor(Math.random() * tipsModel.length);
  return tipsModel[i];
};
