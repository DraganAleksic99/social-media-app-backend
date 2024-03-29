import { Router } from 'express'
import authCtrl from '../controllers/auth.controller'
import userCtrl from '../controllers/user.controller'
import postCtrl from '../controllers/post.controller'

const router = Router()

router.route('/api/posts/feed/:userId').get(authCtrl.requireSignIn, postCtrl.listNewsFeed)
router.route('/api/post/by/:userId').get(authCtrl.requireSignIn, postCtrl.listByUser)
router.route('/api/posts/new/:userId').post(authCtrl.requireSignIn, postCtrl.create)
router.route('/api/posts/photo/:postId').get(postCtrl.photo)
router
  .route('/api/posts/delete/:postId')
  .delete(authCtrl.requireSignIn, postCtrl.isPoster, postCtrl.remove)

router.route('/api/posts/like').put(authCtrl.requireSignIn, postCtrl.like)
router.route('/api/posts/unlike').put(authCtrl.requireSignIn, postCtrl.unlike)

router.route('/api/posts/comment/:userId').put(authCtrl.requireSignIn, postCtrl.comment)
router.route('/api/posts/uncomment').put(authCtrl.requireSignIn, postCtrl.uncomment)

router.param('userId', userCtrl.userById)
router.param('postId', postCtrl.postById)

export default router
