export default function Loading() {
  return (
    <div className="flex justify-center items-center bg-background h-screen">
      <div className="space-y-4 text-center">
        <div className="flex justify-center items-center">
          <div className="border-4 border-primary border-t-transparent rounded-full w-12 h-12 animate-spin" />
        </div>
        <h2 className="font-bold text-2xl text-foreground">Loading...</h2>
        <p className="text-muted-foreground">
          로딩중입니다. 화면을 떠나지 마세요.
        </p>
      </div>
    </div>
  );
}
