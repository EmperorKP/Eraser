import React, { useContext, useEffect, useState } from "react";
import SideNavTop, { TEAM } from "./SideNavTop";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import SideNavBottom from "./SideNavBottom";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { FileListContext } from "@/app/_context/FileListContext";

function SideNav() {
  const { user } = useKindeBrowserClient();
  const createFile = useMutation(api.file.createFile);
  const [activeTeam, setactiveTeam] = useState<TEAM>();
  const [totalFiles, settotalFiles] = useState<Number>();
  useEffect(() => {
    activeTeam && getFiles();
  }, [activeTeam]);
  const convex = useConvex();
  const {filelist_,setfilelist_}=useContext(FileListContext);
  const onFileCreate = (fileName: string) => {
    console.log(fileName);
    createFile({
      fileName: fileName,
      teamid: activeTeam?._id,
      createdBy: user?.email,
      archive: false,
      document: "",
      whiteboard: "",
    }).then(
      (resp) => {
        if (resp) {
          getFiles();
          toast("file created successfully!");
        }
      },
      (e) => {
        toast("error while creating file");
      }
    );
  };
  const getFiles = async () => {
    const result = await convex.query(api.file.getFiles, {
      teamid: activeTeam?._id,
    });
    console.log(result);
    setfilelist_(result);
    settotalFiles(result?.length);
  };
  return (
    <div className="h-screen fixed w-72 border-[1px] border-r p-6 flex flex-col">
      <div className="flex-1">
        <SideNavTop
          user={user}
          SetactiveTeamInfo={(activeTeam: any) => setactiveTeam(activeTeam)}
        />
      </div>
      <div>
        <SideNavBottom onFileCreate={onFileCreate} totalFiles={totalFiles} />
      </div>
    </div>
  );
}

export default SideNav;
