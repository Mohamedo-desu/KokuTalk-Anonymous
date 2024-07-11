import { useAuthStoreSelectors } from '@/store/authStore'
import { ADDCOMMENTPROPS, ADDCONFESSIONPROPS, CONFESSIONSPROPS } from '@/types'
import { deleteStoredValues, getStoredValues } from '@/utils/storageUtils'
import { supabase } from '@/utils/supabase'

export const fetchConfessions = async ({ userId, limit }: { userId: string; limit: number }) => {
	try {
		let query = supabase.from('random_confessions_view').select('*, user:users(*)').limit(limit)

		const { data: confessions, error } = await query

		if (error) {
			console.error('Error fetching random confessions:', error)
			return []
		}

		if (!confessions || confessions.length <= 0) {
			return []
		}

		if (!userId) {
			return confessions
		}

		const seenConfessions: CONFESSIONSPROPS[] = []
		const unseenConfessions: CONFESSIONSPROPS[] = []

		confessions.forEach((confession) => {
			if (confession.views && confession.views.includes(userId)) {
				seenConfessions.push(confession)
			} else {
				unseenConfessions.push(confession)
			}
		})

		const sortedConfessions = unseenConfessions.concat(seenConfessions).slice(0, limit)

		return sortedConfessions
	} catch (error: any) {
		console.error('Unexpected error:', error)
		throw new Error(error.message || 'An error occurred')
	}
}

export const addConfession = async (confessionBody: ADDCONFESSIONPROPS) => {
	try {
		const { error } = await supabase.from('confessions').insert([confessionBody])
		if (error) {
			throw new Error(error.message)
		}
	} catch (error: any) {
		throw new Error(error)
	}
}

export const updateUnseenConfessions = async () => {
	try {
		const userId = useAuthStoreSelectors.getState().currentUser.id

		let { unseenConfessions } = await getStoredValues(['unseenConfessions'])

		if (!unseenConfessions) {
			return
		}

		unseenConfessions = JSON.parse(unseenConfessions)

		const { data: confessionsToUpdate, error } = await supabase
			.from('confessions')
			.select('*')
			.in('id', unseenConfessions)

		if (error) {
			throw new Error(error.message)
		}

		const updates = confessionsToUpdate.map((confession) => {
			const { views } = confession
			const updatedViews = Array.isArray(views) ? views : []

			if (!updatedViews.includes(userId)) {
				updatedViews.push(userId)
			}

			return {
				...confession,
				views: updatedViews,
			}
		})

		const { error: updateError } = await supabase
			.from('confessions')
			.upsert(updates, { onConflict: 'id' })

		if (updateError) {
			throw new Error(updateError.message)
		}

		await deleteStoredValues(['unseenConfessions'])
	} catch (error) {
		console.error('Error updating unseen confessions:', error)
	}
}
export const updateLikesAndDislikes = async () => {
	try {
		const userId = useAuthStoreSelectors.getState().currentUser.id

		let { postsTodisLike, postsToLike } = await getStoredValues(['postsTodisLike', 'postsToLike'])

		postsTodisLike = JSON.parse(postsTodisLike) || []
		postsToLike = JSON.parse(postsToLike) || []

		if (postsToLike.length === 0 && postsTodisLike.length === 0) {
			return
		}

		const postIdsToUpdate = [...new Set([...postsToLike, ...postsTodisLike])]

		const { data: confessionsToUpdate, error } = await supabase
			.from('confessions')
			.select('*')
			.in('id', postIdsToUpdate)

		if (error) {
			throw new Error(error.message)
		}

		const updates = confessionsToUpdate.map((confession) => {
			const { id, likes, dislikes } = confession
			let updatedLikes = Array.isArray(likes) ? likes : []
			let updatedDislikes = Array.isArray(dislikes) ? dislikes : []

			if (postsToLike.includes(id)) {
				if (!updatedLikes.includes(userId)) {
					updatedLikes.push(userId)
				}
				updatedDislikes = updatedDislikes.filter((dislike) => dislike !== userId)
			}

			if (postsTodisLike.includes(id)) {
				if (!updatedDislikes.includes(userId)) {
					updatedDislikes.push(userId)
				}
				updatedLikes = updatedLikes.filter((like) => like !== userId)
			}

			return {
				...confession,
				likes: updatedLikes,
				dislikes: updatedDislikes,
			}
		})

		const { error: updateError } = await supabase
			.from('confessions')
			.upsert(updates, { onConflict: 'id' })

		if (updateError) {
			throw new Error(updateError.message)
		}
		await deleteStoredValues(['postsToLike', 'postsTodisLike'])
	} catch (error) {
		console.error('Error updating likes and dislikes confessions:', error)
	}
}

export const addComment = async (CommentBody: ADDCOMMENTPROPS) => {
	try {
		const { error } = await supabase.from('comments').insert([CommentBody])
		if (error) {
			throw new Error(error.message)
		}
	} catch (error: any) {
		throw new Error(error)
	}
}
