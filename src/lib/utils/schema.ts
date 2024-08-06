import { z } from 'zod';

const validImageTypes = ['image/jpg', 'image/jpeg', 'image/png'];
export const boardFormSchema = z.object({
  title: z.string().min(2, '제목은 두 글자 이상 입력해주세요.').trim(),
  content: z.string().min(2, '내용을 입력해주세요.').trim(),
  photo: z.instanceof(File).refine((file) => file == null || validImageTypes.includes(file.type), {
    message: '지원하지 않는 파일 형식입니다. (허용된 형식: JPG, JPEG, PNG)',
  }),
});
