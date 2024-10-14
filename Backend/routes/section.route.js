import express from 'express';
import { getSection, createSection, editSection, deleteSection, 
    getArticle, createArticle, editArticle, deleteArticle,
    getFiles, createFiles, editFile, deleteFile} from '../controllers/data.controller.js';

const router = express.Router();

router.get('/', getSection);

router.post('/', createSection);

router.put('/:id', editSection);

router.delete('/:id', deleteSection);



router.get('/:id', getArticle);

router.post('/:id', createArticle);

router.put('/:id/:articleId', editArticle);

router.delete('/:id/:articleId', deleteArticle);



router.get('/:id/:articleId', getFiles);

router.post('/:id/:articleId', createFiles);

router.put('/:id/:articleId/:fileId', editFile);

router.delete('/:id/:articleId/:fileId', deleteFile);

export default router;