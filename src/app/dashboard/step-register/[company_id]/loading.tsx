export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <div className="space-y-4 text-center">
        <div className="flex items-center justify-center">
          <div className="w-12 h-12 border-4 rounded-full border-primary border-t-transparent animate-spin" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Loading...</h2>
        <p className="text-muted-foreground">
          로딩중입니다. 화면을 떠나지 마세요.
        </p>
      </div>
    </div>
  );
}
