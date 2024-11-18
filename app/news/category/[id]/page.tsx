import { getCategoryDetail, getNewsList } from "@/app/_libs/microcms";
import NewsList from "@/app/_components/NewsList";
import { notFound } from "next/navigation";
import Category from "@/app/_components/Category";

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
    const { contents: news } = await getNewsList({
      filters: `category[equals]${category.id}`,
    }).catch((error) => {
      console.error("Error fetching news list:", error);
      notFound();
    });

    console.log("News list:", news);
    return (
      <>
        <p>
          <Category category={category} /> の一覧
        </p>
        <NewsList news={news} />
      </>
    );
  }
}
