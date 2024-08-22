import { motion } from "framer-motion";
import { useLayoutEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import useSession from "@/hooks/useSession";

type Props = { stepId: number };

const StepMemo = ({ stepId }: Props) => {
  const supabase = createClient();
  const { toast } = useToast();
  const session = useSession();

  const [isLoading, setIsLoading] = useState(false);
  const [currentMemo, setCurrentMemo] = useState<string>("");

  const handleAddMemo: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();

    try {
      setIsLoading(true);

      const { data: existingMemo, error: fetchError } = await supabase
        .from("step_memo")
        .select("id")
        .eq("step_id", stepId)
        .maybeSingle();

      if (fetchError) {
        throw fetchError;
      }

      if (existingMemo) {
        const { error: updateError } = await supabase
          .from("step_memo")
          .update({ body: currentMemo })
          .eq("id", existingMemo.id);

        if (updateError) {
          throw updateError;
        }
      } else {
        const { error: insertError } = await supabase.from("step_memo").insert({
          body: currentMemo,
          step_id: stepId,
          user_id: session?.user.id,
        });

        if (insertError) {
          throw insertError;
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "메모 추가 중 오류 발생",
          description: <span>{error.message}</span>,
          variant: "destructive",
        });
      }
    } finally {
      toast({
        description: "성공적으로 메모를 저장했습니다.",
        variant: "default",
      });
      setIsLoading(false);
    }
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

  const disabled = !currentMemo.trim() || isLoading;

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
      <Textarea
        placeholder="여기에 메모를 입력해주세요."
        name="memo"
        value={currentMemo}
        onChange={(event) => setCurrentMemo(event.target.value)}
        disabled={isLoading}
      />
      <p className="text-muted-foreground text-sm">
        채용에 도움이 되는 내용을 작성해보세요. 본인만 확인할 수 있습니다.
      </p>

      <Button
        disabled={disabled}
        type="submit"
        className="transition ease-in-out"
      >
        메모
      </Button>
    </motion.form>
  );
};

export default StepMemo;
