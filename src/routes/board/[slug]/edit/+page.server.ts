import type { Actions, PageServerLoad } from './$types';
import type { RequestEvent } from '@sveltejs/kit';
import { error, fail } from '@sveltejs/kit';
import db from '@/lib/utils/db';
import { boradFormSchema } from '@/lib/utils/schema';

export const load: PageServerLoad = async ({ params }) => {
  try {
    const { slug } = params;

    const BoardFirst = await db.board.findFirst({
      where: {
        idx: Number(slug),
      },
    });

    return {
      slug,
      BoardFirst,
    };
  } catch {
    error;
  }
  {
    return fail(500, { success: false, message: error });
  }
};

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
        const { slug } = event.params;
        const { title, content } = boradFormData.data;

        const res = await db.board.update({
          where: {
            idx: Number(slug),
          },
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
