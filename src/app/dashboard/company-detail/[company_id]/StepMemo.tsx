import { motion } from "framer-motion";
import { useLayoutEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { addMemo } from "./actions"; // Ensure this is correctly imported
import { createClient } from "@/utils/supabase/client";

type Props = { stepId: number };

const StepMemo = ({ stepId }: Props) => {
  const supabase = createClient();

  const [currentMemo, setCurrentMemo] = useState<string>("");

  const handleAddMemo = () => {
    // TODO 메모 추가하는 API 작성
  };

  useLayoutEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("step_memo")
        .select("*")
        .eq("step_id", stepId)
        .single();

      setCurrentMemo(data?.body ?? "");
    })();
  }, [stepId, supabase]);

  return (
    <motion.form
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="gap-1.5 grid mt-6 w-full"
      onSubmit={handleAddMemo}
    >
      <Label className="mb-2" htmlFor="message-2">
        메모
      </Label>
      <Textarea placeholder="여기에 메모를 입력해주세요." name="memo" />
      <p className="text-muted-foreground text-sm">
        채용에 도움이 되는 내용을 작성해보세요. 본인만 확인할 수 있습니다.
      </p>

      <Button
        // disabled={disabled}
        type="submit"
        className="transition ease-in-out"
      >
        메모
      </Button>
    </motion.form>
  );
};

export default StepMemo;
