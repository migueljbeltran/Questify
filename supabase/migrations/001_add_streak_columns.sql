-- Add streak tracking columns to users table
ALTER TABLE users
ADD COLUMN IF NOT EXISTS current_streak INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS longest_streak INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_completion_date DATE;

-- Add index for efficient streak queries
CREATE INDEX IF NOT EXISTS idx_users_last_completion_date ON users(last_completion_date);
