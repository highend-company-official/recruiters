export const SUGGEST_LIST = [
  "서류 전형",
  "화상 면접",
  "과제 전형",
  "코딩테스트 전형",
  "기술 면접",
  "임원진 면접",
  "인성 면접",
  "조건 협상",
  "레퍼런스 체크",
];

export const STATUS_OPTION: {
  value: ProcessStatus;
  label: string;
}[] = [
  { value: "not_started", label: "진행 전" },
  { value: "in_progress", label: "진행 중" },
  { value: "completed", label: "완료" },
];
