import { z } from 'zod';

export const boradFormSchema = z.object({
  title: z.string().min(2, '제목은 두 글자 이상 입력해주세요.').trim(),
  content: z.string().min(2, '내용을 입력해주세요.').trim(),
});
