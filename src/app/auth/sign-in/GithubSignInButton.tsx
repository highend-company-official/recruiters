"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import useToggle from "@/hooks/useToggle";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

const GithubSignInButton = () => {
  const supabase = createClient();
  const { replace } = useRouter();

  const [openErrorDialog, toggleDialog] = useToggle(false);

  const handleSignInWithGithub = async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: "github",
        options: { redirectTo: `${window.location.origin}/auth/callback` },
      });
    } catch (error) {
      toggleDialog(true);
    }
  };

  return (
    <>
      <AlertDialog open={openErrorDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              깃허브 로그인 과정 중 오류가 발생했습니다.
            </AlertDialogTitle>
            <AlertDialogDescription>
              일시적인 문제일 수 있습니다. 지속해서 이러한 문제가 발생하면
              (functional.hong@gmail.com)으로 문의주세요.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => toggleDialog(false)}>
              닫기
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Button
        variant="outline"
        className="w-full text-white bg-black"
        onClick={handleSignInWithGithub}
      >
        깃허브로 로그인하기
      </Button>
    </>
  );
};

export default GithubSignInButton;
