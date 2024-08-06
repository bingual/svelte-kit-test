import db from '@/lib/utils/db';
import type { PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ url }) => {
  try {
    const query = url.searchParams.get('q') ?? '';

    const boardMany = await db.board.findMany({
      where: {
        title: {
          contains: query,
          mode: 'insensitive',
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return {
      boardMany,
    };
  } catch (error) {
    return fail(500, {
      success: false,
      message: error instanceof Error ? error.message : String(error),
    });
  }
};
