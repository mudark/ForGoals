import { useQuery } from '@tanstack/react-query';
import { getKmoocDetail } from '../../apis/kmoocApi';
import { formatTimestamp } from '../../utils/time';

type CourseDetailProps = CommonModalProps & { course: Course };
export default function CourseDetail({ course }: CourseDetailProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['user', course],
    queryFn: async () => await getKmoocDetail(course),
  });
  if (isLoading)
    return (
      <div>
        <h1>강좌를 받아오는 중입니다.</h1>
        <div className="max-h-[500px]">
          <div className="w-full aspect-16/9 bg-zinc-200"></div>
          <div
            className="!my-[10px] [&>*]:font-bold 
          [&>p]:bg-zinc-300 [&>p]:rounded-full [&>p]:w-full
          [&>p]:px-[10px] [&>p]:my-[10px] [&>p]:text-white"
          >
            <div className="p-[3px] !my-[10px] gradient-btn rounded-full">
              강좌 로딩 중...
            </div>
            <p>. . .</p>
            <p>. . .</p>
            <p className="!w-[40%]">. .</p>
          </div>
        </div>
      </div>
    );
  if (isError || !data)
    return (
      <div>
        <h1>강좌를 불러올 수 없습니다!</h1>
        <div className="w-[calc(100%-20px)] p-[3px] rounded-full gradient-btn">
          <a href={course.url}>강좌 사이트 바로가기</a>
        </div>
      </div>
    );
  return (
    <div>
      <h1>{data.name}</h1>

      <div className="max-h-[500px] overflow-y-auto">
        <img
          src={data.course_image}
          alt={data.shortname}
          className="w-[calc(100%-20px)] object-cover"
        />
        <div className="!my-[10px] [&>*]:font-bold">
          <div className="p-[3px] rounded-full gradient-btn">
            <a href={data.url}>강좌 사이트 바로가기</a>
          </div>
          <p>
            카테고리 : {data.classfy_name} - {data.middle_classfy_name}
          </p>
          <p>제공 기관 : {data.org_name}</p>
          <p>교수 : {data.professor}</p>
          <p>
            신청 기한 : {formatTimestamp(data.enrollment_start)} ~{' '}
            {formatTimestamp(data.enrollment_end)}
          </p>
          <p>
            수강 기한 : {formatTimestamp(data.study_start)} ~{' '}
            {formatTimestamp(data.study_end)}
          </p>
          <p>총 주차 : {data.week}</p>
        </div>
        <div dangerouslySetInnerHTML={{ __html: data.summary }} />
      </div>
    </div>
  );
}
