import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { Button } from "@/components/ui/button";
import LookUp from "@/data/LookUp";
import { useContext } from "react";
import { UserDetailContext } from "@/context/UserDetailContext";
import { useGoogleLogin } from "@react-oauth/google";

function SignInDialog({ openDialog, closeDialog }) {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: "Bearer " + tokenResponse.access_token } }
      );

      console.log(userInfo);
      setUserDetail(userInfo.data);
      closeDialog(false);
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  return (
    <Dialog open={openDialog} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription>
            <div className="flex flex-col items-center justify-center">
              <h2 className="font-bold text-2xl text-white">
                {LookUp.SIGNIN_HEADING}
              </h2>
              <p className="mt-2 text-center">{LookUp.SIGNIN_SUBHEADING}</p>
              <Button 
              className="mt-1 gap-3 bg-blue-500 text-white hover:bg-blue-400"
              onClick={googleLogin}>
                Sign In With Google
              </Button>
              <p className="mt-2">{LookUp.SIGNIN_AGREEMENT_TEXT}</p>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default SignInDialog;
