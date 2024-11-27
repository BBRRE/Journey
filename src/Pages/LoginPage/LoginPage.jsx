import React, { useState, useEffect } from "react";
import { UserAuth } from "../../Context/AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import { IsUsernameAvailable, UploadProfile, CheckIfUserExsits } from "../../Config/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function LoginPage() {
  const { googleSignIn, user } = UserAuth();
  const [completeProfile, setCompleteProfile] = useState(false);
  const handleOpen = () => setCompleteProfile((cur) => !cur)
  const navigate = useNavigate();
  const auth = getAuth();

  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        if ( await CheckIfUserExsits(user.email)) {
          setCompleteProfile(true)
        }else{
          navigate('/')
        }
      }
    });

    return unsubscribe; // This will let it clean up when the ArtistScreen unmounts
  }, []);

  const handleGoogleSignIn = async () => {
    if(user && CheckIfUserExsits(user.email)){
      setCompleteProfile(true)
    }else if(user && !CheckIfUserExsits(user.email)){
      navigate('/')
    }else{
      await googleSignIn()
    }
  }


const CollectData = async (e) => {
  e.preventDefault()
  let formdata = {
    email: user.email,
    username:e.target[0].value,
    location: e.target[1].value,
    bio:  e.target[2].value
  }

  if(await IsUsernameAvailable(formdata.username)){
    UploadProfile(formdata,user.photoURL).then(() => {
      navigate('/')
    })
}

}

  return (
    <>
    
      <div className=" w-full h-[100vh] my-auto bg-primaryBg-light flex flex-col items-center justify-center">
        <img src="/assets/Logo.png" className="w-[500px]" />
        <h1 className="font-fontMain text-5xl mt-[-30px] mb-[100px]">Travel Log</h1>
        <button onClick={handleGoogleSignIn} className="w-[200px] h-[80px]  rounded-lg border-solid border-secondaryAc-dark border-2 bg-green-50">
          { user ? 'Complete Profile' :'Sign in with Google'}
        </button>
        <Link to={'/'} className="mb-[100px] mt-[20px] underline text-slate-600 ">Or continue without account</Link>

      </div>
      <Dialog
        size="md"
        open={completeProfile}
        handler={handleOpen}
        className="bg-transparent"
      >
        <form onSubmit={CollectData}>
        <Card className="mx-auto w-[500px] ">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Complete your profile <span className="text-gray-600 text-base ml-[10px] "> {user?.email}</span>
            </Typography>

            <CardBody className="flex gap-[10px] flex-col mx-0 px-0 py-0 sm:flex-row">

              <CardBody className="flex flex-col gap-[10px] px-0 py-3">
                <Typography className="-mb-2" variant="h6">
                  Username
                </Typography>
                <Input size="lg" label="username" maxLength="15" required placeholder="" />
              </CardBody>

              <CardBody className="flex flex-col gap-[10px] px-0 py-3">
                <Typography className="-mb-2" variant="h6">
                  Location
                </Typography>
                <Input size="lg" />
              </CardBody>

            </CardBody>
            
            <CardBody className=" px-0 py-3 flex flex-col justify-between basis-3/4 mt-[-20px] w-full pr-[40px]" >
                 <Typography className=" mb-1" variant="h6">
                 Your Bio
                </Typography>
                <Input size="lg" label="bio" />
              </CardBody>


          <h1 className="text-red-300">If it doesn't the username is taken</h1>

          </CardBody>

          <CardFooter className="pt-0 flex justify-between">
            <Button variant="gradient" type="submit" className="w-[60%]">
              Sign In
            </Button>
            <Button variant="outlined" className="w-[30%] text-center text-s p-0" >
              Complete Later
            </Button>
            
          </CardFooter>
        </Card>
        </form>
      </Dialog>
    </>
  );
}