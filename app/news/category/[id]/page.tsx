import { getCategoryDetail, getNewsList } from "@/app/_libs/microcms";
import NewsList from "@/app/_components/NewsList";
import { notFound } from "next/navigation";
import Pagination from "@/app/_components/Pagination";
import Category from "@/app/_components/Category";
import { NEWS_LIST_LIMIT } from "@/app/_constants";

type Props = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: Props) {
  console.log("Fetching category detail for ID:", params.id);
  const category = await getCategoryDetail(params.id).catch((error) => {
    console.error("Error fetching category detail:", error);
    notFound();
  });

  if (category) {
    console.log("Category detail:", category);
    const { contents: news, totalCount } = await getNewsList({
      limit: NEWS_LIST_LIMIT,
      filters: `category[equals]${category.id}`,
    }).catch((error) => {
      console.error("Error fetching news list:", error);
      notFound();
    });

    return (
      <>
        <p>
          <Category category={category} /> の一覧
        </p>
        <NewsList news={news} />
        <Pagination totalCount={totalCount} basePath={`/news/category/${category.id}`} />
      </>
    );
  }
}
