import db from '@/lib/utils/db';
import type { PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
  try {
    const boardMany = await db.board.findMany({
      orderBy: {
        created_at: 'desc',
      },
    });

    return {
      boardMany,
    };
  } catch (error) {
    return fail(500, { success: false, message: error });
  }
};
