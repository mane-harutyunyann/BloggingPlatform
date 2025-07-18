const { createPost, getPosts, getPostById, updatePost, deletePost, likePost } = require('../controllers/post.controller');
const authMiddleware = require('../middlewares/auth.middleware'); 

const router = express.Router();

router.post('/', authMiddleware, createPost);
router.get('/', getPosts);
router.get('/:id', getPostById); 
router.put('/:id', authMiddleware, updatePost); 
router.delete('/:id', authMiddleware, deletePost); 
router.post('/:id/like', authMiddleware, likePost);

module.exports = router;