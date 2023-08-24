import React, { FC, useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiLoaderAlt } from "react-icons/bi";
import { useTranslations } from "next-intl";
import { addData, getDocument } from "@/lib/firebase/firestore";
import { useAuth } from "./providers/context";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import { MovieResponse } from "@/types/movies";

interface AddToFavoritesProps {
  movieResult?: MovieResponse | {
    id: string | number;
    title: string;
    poster_path: string;
    release_date: string;
    original_title: string;
    overview: string;
  };
  seriesResult?: {
    id: number;
    title: string;
    poster_path: string;
    first_air_date?: string;
    last_air_date?: string;
    overview: string;
  };
  type: "movie" | "series";
}

const AddToFavorites: FC<AddToFavoritesProps> = ({ movieResult, type, seriesResult }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { user } = useAuth();
  const t = useTranslations("favorites");
  const global = useTranslations("global");
  const [isFavorite, setIsFavorite] = useState<boolean | null>(null);

  useEffect(() => {
    const getData = async () => {
      if (!user) return;
      try {
        let data;
        if ((type === "movie" && movieResult) || (type === "series" && seriesResult)) {
          const path = `users/${user.uid}/${type === "movie" ? "movies" : "series"}`;
          data = await getDocument(path, String(movieResult?.id || seriesResult?.id));
        }
        setIsFavorite(data?.isFavorite || false);
      } catch (error) {
        setIsFavorite(false);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      getData();
    }
  }, [user, movieResult, seriesResult, type]);

  const handleFavorite = async () => {
    if (!user) return;

    if (!user.emailVerified) {
      const tGlobalToast = useTranslations("global.toast");
      toast({
        title: tGlobalToast("error"),
        description: tGlobalToast("firebase.emailVerify"),
        variant: "destructive",
      });
      return;
    }

    setIsFavorite((prev) => !prev);
    const dataFB = {
      isFavorite: !isFavorite,
      id: movieResult?.id || seriesResult?.id,
      title: movieResult?.title || seriesResult?.title,
      poster_path: movieResult?.poster_path || seriesResult?.poster_path,
      release_date: movieResult?.release_date || "",
      original_title: movieResult?.original_title || "",
      overview: movieResult?.overview || seriesResult?.overview,
      status: "not-started",
    };

    try {
      const path = `users/${user.uid}/${type}s`;
      const existingData = await getDocument(path, String(dataFB.id));

      if (!existingData?.status) {
        await addData(path, String(dataFB.id), dataFB);
      }

      const tFavorites = useTranslations("favorites");

      if (isFavorite) {
        await addData(path, String(dataFB.id), { ...dataFB, isFavorite: false });
        toast({
          title: global("toast.success"),
          description: tFavorites("removeFromFavorites", { title: dataFB.title }),
        });
      } else {
        await addData(path, String(dataFB.id), { ...dataFB, isFavorite: true });
        toast({
          title: global("toast.success"),
          description: tFavorites("addToFavorites", { title: dataFB.title }),
        });
      }
    } catch (error: any) {
      setIsFavorite((prev) => !prev);
      console.error(error);
      toast({
        title: global("toast.error", { code: error.code }),
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <BiLoaderAlt className="h-5 w-5 animate-spin text-sky-500" />;
  }

  return (
    <Button variant={"ghost"} size={"icon"} onClick={handleFavorite}>
      {isFavorite ? (
        <AiFillHeart className="h-5 w-5 text-red-500" />
      ) : (
        <AiOutlineHeart className="h-4 w-4" />
      )}
    </Button>
  );
};

export default AddToFavorites;
