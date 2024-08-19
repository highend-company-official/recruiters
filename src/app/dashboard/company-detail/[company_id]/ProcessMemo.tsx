import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addMemo } from "./actions";

type Memo = {
  id: number;
  name: string;
};

const ProcessMemo = (props: Memo) => {
  return (
    <form
      className="gap-1.5 grid w-full"
      action={(formData) => addMemo(props.id, formData)}
    >
      <Label htmlFor="message-2">({props.name})에 관한 메모</Label>
      <Textarea placeholder="여기에 메모를 입력해주세요." name="memo" />
      <p className="text-muted-foreground text-sm">
        채용에 도움이 되는 내용을 작성해보세요. 본인만 확인할 수 있습니다.
      </p>
    </form>
  );
};

export default ProcessMemo;
