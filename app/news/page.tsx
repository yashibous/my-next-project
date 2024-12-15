import Image from "next/image";
import { getNewsList } from "@/app/_libs/microcms";
import NewsList from "@/app/_components/NewsList";
import styles from "./page.module.css";
import { NEWS_LIST_LIMIT } from "../_constants";
import Pagination from "@/app/_components/Pagination";
import SearchField from "@/app/_components/SearchField";

export default async function Page() {
  const { contents: news, totalCount } = await getNewsList({
    limit: NEWS_LIST_LIMIT,
  });
  return (
    <>
      <SearchField />
      <NewsList news={news} />
      <Pagination totalCount={totalCount} />
    </>
  );
}
