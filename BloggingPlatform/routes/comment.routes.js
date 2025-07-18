const { addComment, getCommentsByPost } = require('../controllers/comment.controller');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/:id/comments', authMiddleware, addComment);
router.get('/:id/comments', getCommentsByPost);

module.exports = router;