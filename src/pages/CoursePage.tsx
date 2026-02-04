import { useInfiniteQuery } from '@tanstack/react-query';
import { getKmooc } from '../apis/kmoocApi';
import BasePage from './BasePage';
import { formatTimestamp } from '../utils/time';
import { useModalStore } from '../stores/modal';
import CourseDetail from '../components/modals/CourseDetail';
import { Spin } from '../components/Spin';
import { useEffect, useRef } from 'react';

export default function CoursecPage() {
  const { setModal } = useModalStore();
  const ref = useRef(null);
  const { data, fetchNextPage, hasNextPage, isFetching, status, error } =
    useInfiniteQuery({
      queryKey: ['kmooc'],
      queryFn: getKmooc,
      initialPageParam: 1,
      getNextPageParam: ({ header }: KmoocResponse) =>
        header.page < header.totalCount ? header.page + 1 : undefined,
    });
  const onIntersection = (entries: IntersectionObserverEntry[]) => {
    const first_entry = entries[0];
    if (first_entry.isIntersecting && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  };
  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection);
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [hasNextPage, isFetching]);
  if (status === 'error') {
    return <div>에러가 발생했습니다: {error.message}</div>;
  }
  return (
    <BasePage>
      <h1>K-MOOC 강좌 보기</h1>
      <div className="gradient-btn">
        <a href="https://www.kmooc.kr/">K-MOOC 사이트 바로가기</a>
      </div>
      <div
        className="w-full p-[10px] grid gap-[10px] grid-cols-3 
        min-[440px]:max-[720px]:grid-cols-2 max-[440px]:grid-cols-1"
      >
        {data?.pages.flatMap((p) =>
          p.items.map((item) => (
            <button
              className="p-[5px] rounded-[10px] border border-zinc-300 
                text-left bg-zinc-100 [&>*]:font-bold
                hover:translate-y-[-5px] hover:shadow-lg duration-300"
              onClick={() => setModal(CourseDetail, { course: item })}
              key={item.id}
            >
              <div className="aspect-16/9 w-full overflow-hidden rounded-[5px]">
                <img
                  src={item.course_image}
                  alt={item.shortname}
                  className="w-full object-cover"
                />
              </div>
              <h3
                className="aspect-4/1 text-[1.1em] font-bold 
                  text-gray-900 flex items-center"
              >
                {item.name}
              </h3>
              <p className="text-blue-600 aspect-4/1">
                {item.org_name} {item.professor}
              </p>
              <p className="text-zinc-500">
                {formatTimestamp(item.enrollment_start)}
                {' ~ '}
                {formatTimestamp(item.enrollment_end)}
              </p>
            </button>
          )),
        )}
      </div>
      <div ref={hasNextPage ? ref : null}>
        {isFetching ? (
          <Spin>강좌를 불러오는 중</Spin>
        ) : (
          <h1>더 이상 강좌가 없습니다.</h1>
        )}
      </div>
    </BasePage>
  );
}
