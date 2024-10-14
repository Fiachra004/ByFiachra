import con from '../database/db.js';

export const getSection = async (req, res) => {
    const query = 'SELECT * FROM sections';  // SQL query to fetch all sections

    con.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching sections:', err.message);
        return res.status(500).json({ success: false, message: 'Server Error' }); // Send error response
      }

      res.status(200).json({ success: true, data: results });
    });
};

export const createSection = async (req, res) => {
    const { name, number_of_articles } = req.body;

    if (!name || !number_of_articles) {
      return res.status(400).json({ success: false, message: 'Name and number_of_articles are required' });
    }
    const query = `INSERT INTO sections (name, number_of_articles, created_at, updated_at) VALUES (?, ?, NOW(), NOW())`;
  
    con.query(query, [name, number_of_articles], (err, result) => {
      if (err) {
        console.error('Error creating section:', err.message);
        return res.status(500).json({ success: false, message: 'Server Error' });
      }
  
      res.status(201).json({ success: true, message: 'Section created successfully', sectionId: result.insertId });
    });
};


export const editSection = (req, res) => {
  const { id } = req.params; 
  const { name, number_of_articles } = req.body; 

  if (!name && !number_of_articles) {
    return res.status(400).json({ success: false, message: "Please provide a valid name or number of articles to update." });
  }

  let query = 'UPDATE sections SET ';
  const values = [];

  if (name) {
    query += 'name = ?';
    values.push(name);
  }

  if (number_of_articles) {
    if (name) query += ', ';
    query += 'number_of_articles = ?';
    values.push(number_of_articles);
  }

  query += ' WHERE id = ?';
  values.push(id);

  con.query(query, values, (err, result) => {
    if (err) {
      console.error('Error updating section:', err.message);
      return res.status(500).json({ success: false, message: 'Server Error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Section not found' });
    }

    res.status(200).json({ success: true, message: 'Section updated successfully' });
  });
};


export const deleteSection = async (req, res) => {
    const { id } = req.params;

    const query = `DELETE FROM sections WHERE id = ?`;
  
    con.query(query, [id], (err, result) => {
      if (err) {
        console.error('Error deleting section:', err.message);
        return res.status(500).json({ success: false, message: 'Server Error' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, message: 'Section not found' });
      }

      res.status(200).json({ success: true, message: 'Section deleted successfully' });
    });
};

export const getArticle = (req, res) => {
    const sectionId = req.params.id;

    const query = `
        SELECT 
        a.article_id, 
        a.title, 
        a.description, 
        a.thumbnail_location, 
        a.number_of_files, 
        a.section_id, 
        a.created_at, 
        a.updated_at, 
        s.name AS section_name
        FROM articles a
        JOIN sections s ON a.section_id = s.id
        WHERE s.id = ?;
    `;

    con.query(query, [sectionId], (err, results) => {
        if (err) {
        console.error('Error fetching sections:', err.message);
        return res.status(500).send('Database error: ' + err.message);
        }
        res.status(200).json({ success: true, data: results });
    });
};

export const createArticle = (req, res) => {
    const { title, description, thumbnail_location, number_of_files, sectionId } = req.body;


    if(!title || !description || !thumbnail_location || !number_of_files || !sectionId) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const query = `
        INSERT INTO articles (title, description, thumbnail_location, number_of_files, section_id, created_at, updated_at)
        VALUES (?,?,?,?,?, NOW(), NOW())
    `;

    con.query(query, [title, description, thumbnail_location, number_of_files, sectionId], (err, result) => {
        if (err) {
            console.error('Error creating article:', err.message);
            return res.status(500).json({ success: false, message: 'Server Error' });
        }
        res.status(201).json({ success: true, message: 'Article created successfully', articleId: result.insertId });
    });
}

export const editArticle = (req, res) => {
    const article_id = req.params.articleId;
    const section_id = req.params.id;

    const { title, description, thumbnail_location, number_of_files, sectionId } = req.body;

    if (!title && !description && !thumbnail_location && !number_of_files && !sectionId) {
        return res.status(400).json({ success: false, message: 'Please provide at least one field to update' });
    }

    const updates = [];
    const values = []; 
    
    if (title) {
        updates.push('title = ?');
        values.push(title);
    }
    
    if (description) {
        updates.push('description = ?');
        values.push(description);
    }
    
    if (thumbnail_location) {
        updates.push('thumbnail_location = ?');
        values.push(thumbnail_location);
    }
    
    if (number_of_files) {
        updates.push('number_of_files = ?');
        values.push(number_of_files);
    }
    
    if (sectionId) {
        updates.push('section_id = ?');
        values.push(sectionId);
    }

    if (updates.length > 0) {
        const query = `UPDATE articles SET ${updates.join(', ')} WHERE article_id = ? AND section_id = ?`;
        values.push(article_id, section_id); 
        
        con.query(query, values, (err, result) => {
            if (err) {
                console.error('Error updating article:', err.message);
                return res.status(500).json({ success: false, message: 'Server Error' });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ success: false, message: 'Article not found' });
            }

            res.status(200).json({ success: true, message: 'Article updated successfully' });
        });
    }
};

    export const deleteArticle = (req, res) => {
        const article_id = req.params.articleId;
        
        const query = `DELETE FROM articles WHERE article_id =?`;

        con.query(query, [article_id], (err, result) => {
            if (err) {
                console.error('Error deleting article:', err.message);
                return res.status(500).json({ success: false, message: 'Server Error' });
            }
            if (result.affectRows === 0) {
                return res.status(404).json({ success: false, message: 'Article not found' });
            }

            res.status(200).json({ success: true, message: 'Article deleted successfully' });
        });
};

export const getFiles = (req, res) => {
    const article_id = req.params.articleId;
    const section_id = req.params.id;

    const query = `
    SELECT
    f.fileId,
    f.file_location,
    f.created_at,
    f.updated_at,
    f.section_id,
    f.article_id,
    s.name AS section_name,
    a.title As article_title
    FROM files f
    JOIN sections s ON f.section_id = s.id
    JOIN articles a ON f.article_id = a.article_id
    WHERE s.id = ? AND a.article_id = ?;
    `;

    con.query(query, [section_id, article_id], (err, results) => {
        if (err) {
            console.error('Error fetching sections: ', err.message);
            return res.status(500).send('Database error: '+ err.message);
        }
        res.status(200).json({ success: true, data: results });
    });
};

export const createFiles = (req, res) => {
    const article_id = req.params.articleId;
    const section_id = req.params.id;
    const { file_location } = req.body;

    if(!file_location) {
        return res.status(400).json({ success: false, message: 'File location is required' });
    }

    const query = `
        INSERT INTO files (file_location, section_id, article_id, created_at, updated_at)
        VALUES (?, ${section_id}, ${article_id}, NOW(), NOW())
    `;

    con.query(query, [file_location], (err, result) => {
        if (err) {
            console.error('Error creating article', err.message);
            return res.status(500).json({ success: false, message: 'Server Error' });
        }
        res.status(201).json({ success: true, message: 'File created successfully', fileId: result.insertId });
    });
};

export const editFile = (req, res) => {
    const section_id = req.params.id;
    const article_id = req.params.articleId;
    const file_id  = req.params.fileId;

    const { file_location } = req.body;


    if (!file_location) {
        return res.status(400).json({ success: false, message: 'File location is required' });
    }

    const query = `UPDATE files 
                   SET file_location = ? 
                   WHERE fileId = ? 
                   AND section_id = ? 
                   AND article_id = ?`;

    const values = [file_location, file_id, section_id, article_id];

    // Execute the query with values
    con.query(query, values, (err, results) => {
        if (err) {
            console.error('Error updating file:', err.message);
            return res.status(500).json({ success: false, message: 'Server Error' });
        }

        // Check if any row was affected (i.e., file updated)
        if (results.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'File not found' });
        }

        // Success response
        res.status(200).json({ success: true, message: 'File updated successfully' });
    });
};

export const deleteFile = (req, res) => {
    const file_id = req.params.fileId

    const query = `DELETE FROM files WHERE fileId =?`;

    con.query(query, [file_id], (err, results) => {
        if (err) {
            console.error('Error deleting file:', err.message);
            return res.status(500).json({ success: false, message: 'Server Error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'File not found' });
        }

        res.status(200).json({ success: true, message: 'File deleted successfully' });
    })
}
