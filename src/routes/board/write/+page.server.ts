import type { Actions } from './$types';
import type { RequestEvent } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import db from '@/lib/utils/db';
import { boardFormSchema } from '@/lib/utils/schema';
import { writeFileSync, existsSync, mkdirSync } from 'node:fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment-timezone';

export const actions: Actions = {
  default: async ({ request }: RequestEvent) => {
    try {
      const formData = Object.fromEntries(await request.formData());
      const boardFormData = boardFormSchema.safeParse(formData);

      if (!boardFormData.success) {
        const errors = boardFormData.error.errors.map((error) => {
          return {
            field: error.path[0],
            message: error.message,
          };
        });

        return fail(400, { error: true, errors });
      } else {
        const { title, content, photo } = boardFormData.data;

        let photoName = '';

        if (photo) {
          const extensions = '.' + photo.name.split('.').pop();
          const fileName = uuidv4() + extensions;
          const dateTime = moment().tz('Asia/Seoul').format('YYYY/MM/DD');

          const filePath = `images/${dateTime}`;
          const fullFilePath = path.join(`static/${filePath}`, fileName);

          const dirPath = path.dirname(fullFilePath);

          if (!existsSync(dirPath)) {
            mkdirSync(dirPath, { recursive: true });
          }

          const imageBuffer = Buffer.from(await photo.arrayBuffer());

          //   await sharp(imageBuffer)
          //     .resize(512, 512) // 원하는 크기로 조절
          //     .toFile(fullFilePath);
          // }

          writeFileSync(fullFilePath, imageBuffer);

          photoName = `${filePath}/${fileName}`;
        }

        const res = await db.board.create({
          data: {
            title: title,
            content: content,
            ...(photoName && { photo: photoName }),
          },
        });

        if (res) {
          return {
            status: 200,
            success: true,
          };
        } else {
          return {
            status: 400,
            success: false,
          };
        }
      }
    } catch (error) {
      return fail(500, {
        success: false,
        message: error instanceof Error ? error.message : String(error),
      });
    }
  },
};
