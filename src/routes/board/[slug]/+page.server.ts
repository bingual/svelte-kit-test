import db from '@/lib/utils/db';
import { PageServerLoad } from '../$types';
import { Actions, fail, RequestEvent } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }: { params: any }) => {
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
  delete: async (event: RequestEvent) => {
    try {
      const { slug } = event.params;
      const res = await db.board.delete({
        where: {
          idx: Number(slug),
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
      return fail(500, { success: false, message: error });
    }
  },
};
