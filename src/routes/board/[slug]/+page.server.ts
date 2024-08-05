import db from '@/lib/utils/db';
import type { Actions, PageServerLoad } from './$types';
import { fail, RequestEvent } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
  try {
    const { slug } = params;

    const boardFirst = await db.board.findFirst({
      where: {
        idx: Number(slug),
      },
    });

    return {
      slug,
      boardFirst,
    };
  } catch (error) {
    return fail(500, { success: false, message: error });
  }
};

export const actions: Actions = {
  delete: async ({ request }: RequestEvent) => {
    try {
      const formData = await request.formData();
      const idx = formData.get('idx');

      const res = await db.board.delete({
        where: {
          idx: Number(idx),
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
    } catch (error) {
      return fail(500, {
        success: false,
        message: error instanceof Error ? error.message : String(error),
      });
    }
  },
};
