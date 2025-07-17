-- Create folders table
CREATE TABLE IF NOT EXISTS folders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  parent_id UUID REFERENCES folders(id) ON DELETE CASCADE,
  created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_public BOOLEAN DEFAULT false,
  UNIQUE(name, parent_id, created_by)
);

-- Create files table (updated with folder support)
CREATE TABLE IF NOT EXISTS files (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  original_name VARCHAR(255) NOT NULL,
  file_type VARCHAR(100),
  file_size BIGINT,
  folder_id UUID REFERENCES folders(id) ON DELETE SET NULL,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  upload_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  download_count INTEGER DEFAULT 0,
  is_public BOOLEAN DEFAULT true,
  share_url VARCHAR(255) UNIQUE,
  file_path TEXT,
  UNIQUE(name, folder_id)
);

-- Enable RLS
ALTER TABLE folders ENABLE ROW LEVEL SECURITY;
ALTER TABLE files ENABLE ROW LEVEL SECURITY;

-- Folders policies
CREATE POLICY "Users can read public folders" ON folders
  FOR SELECT USING (is_public = true OR created_by = auth.uid());

CREATE POLICY "Admins can manage all folders" ON folders
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Users can read their own folders" ON folders
  FOR SELECT USING (created_by = auth.uid());

-- Files policies  
CREATE POLICY "Users can read public files" ON files
  FOR SELECT USING (is_public = true OR uploaded_by = auth.uid());

CREATE POLICY "Admins can manage all files" ON files
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Function to get folder path
CREATE OR REPLACE FUNCTION get_folder_path(folder_uuid UUID)
RETURNS TEXT AS $$
DECLARE
  path TEXT := '';
  current_folder RECORD;
BEGIN
  IF folder_uuid IS NULL THEN
    RETURN '/';
  END IF;
  
  WITH RECURSIVE folder_path AS (
    SELECT id, name, parent_id, 0 as level
    FROM folders 
    WHERE id = folder_uuid
    
    UNION ALL
    
    SELECT f.id, f.name, f.parent_id, fp.level + 1
    FROM folders f
    INNER JOIN folder_path fp ON f.id = fp.parent_id
  )
  SELECT string_agg(name, '/' ORDER BY level DESC) INTO path
  FROM folder_path;
  
  RETURN '/' || COALESCE(path, '');
END;
$$ LANGUAGE plpgsql;

-- Insert some default folders for demo
INSERT INTO folders (name, parent_id, created_by, is_public) VALUES
('Documents', NULL, (SELECT id FROM auth.users WHERE email = 'admin@fileshub.com' LIMIT 1), true),
('Images', NULL, (SELECT id FROM auth.users WHERE email = 'admin@fileshub.com' LIMIT 1), true),
('Videos', NULL, (SELECT id FROM auth.users WHERE email = 'admin@fileshub.com' LIMIT 1), true),
('Archives', NULL, (SELECT id FROM auth.users WHERE email = 'admin@fileshub.com' LIMIT 1), true);
