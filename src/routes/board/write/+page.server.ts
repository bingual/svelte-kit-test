import type { Actions } from './$types';
import type { RequestEvent } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import db from '@/lib/utils/db';
import { boradFormSchema } from '@/lib/utils/schema';

export const actions: Actions = {
  default: async (event: RequestEvent) => {
    try {
      const formData = Object.fromEntries(await event.request.formData());
      const boradFormData = boradFormSchema.safeParse(formData);

      if (!boradFormData.success) {
        const errors = boradFormData.error.errors.map((error) => {
          return {
            field: error.path[0],
            message: error.message,
          };
        });

        return fail(400, { error: true, errors });
      } else {
        const { title, content } = boradFormData.data;

        const res = await db.board.create({
          data: {
            title: title,
            content: content,
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
      return fail(500, { success: false, message: error });
    }
  },
};
