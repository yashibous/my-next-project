import Image from "next/image";
import { getNewsList } from "@/app/_libs/microcms";
import NewsList from "@/app/_components/NewsList";
import styles from "./page.module.css";

export default async function Page() {
  const { contents: news } = await getNewsList();
  return <NewsList news={news} />;
}
