"use client"
import React, { FC, useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { getCollection, getDocument } from "@/lib/firebase/firestore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FollowUser from "./FollowUser";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ScrollArea } from "./ui/scroll-area";

interface FollowInformationProps {
  userId: string;
}

const FollowInformation: FC<FollowInformationProps> = ({ userId }) => {
  const t = useTranslations("follow");
  const [followers, setFollowers] = useState<any[] | null>(null);
  const [following, setFollowing] = useState<any[] | null>(null);

  useEffect(() => {
    async function fetchFollowData() {
      try {
        const followersData = await getCollection(`follow/${userId}/followers`);
        const followingData = await getCollection(`follow/${userId}/following`);

        const formattedData = (data: any[]) =>
          Promise.all(
            data.map(async ({ id }) => {
              const user = await getDocument(`users`, id);
              return user ? { ...user, id } : null;
            })
          );

        const formattedFollowers = await formattedData(followersData);
        const formattedFollowing = await formattedData(followingData);

        setFollowers(formattedFollowers);
        setFollowing(formattedFollowing);
      } catch (error) {
        console.error(error);
      }
    }

    fetchFollowData();
  }, [userId]);

  const renderFollowList = (list: any[], type: string) => {
    const count = list?.length || 0;
    return (
      <Dialog>
        <DialogTrigger className="text-sx italic underline ml-2" disabled={
          count === 0
        }>
          {count} {t(type as "followers" | "following")}
        </DialogTrigger>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle>{t(type as "followers" | "following")}</DialogTitle>
          </DialogHeader>
          <ScrollArea className="flex h-[380px] flex-col gap-2">
            {list?.map(({ id, username, photoURL, displayName }) => (
              <div key={id} className="flex rounded-md border-2 p-2 hover:bg-slate-500/20">
                <Link href={`/profile/${id}`} className="flex items-center gap-2">
                  <Avatar>
                    <AvatarFallback>{username ? username[0] : "U"}</AvatarFallback>
                    <AvatarImage src={photoURL || "/male.png"} alt={username || "user"} />
                  </Avatar>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium">{displayName}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-200">{username}</p>
                  </div>
                </Link>
                <div className="ml-auto">
                  <FollowUser pageUserId={id} />
                </div>
              </div>
            ))}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {Array.isArray(followers) ? renderFollowList(followers, "followers") : (
        <p className="text-sx italic underline">
          0 {t("followers")}
        </p>
      )}
      <pre></pre>
      {Array.isArray(following) ? renderFollowList(following, "following") : (
        <p className="text-sx italic underline">
          0 {t("following")}
        </p>
      )}
    </div>
  );
};

export default FollowInformation;
