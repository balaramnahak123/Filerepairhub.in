-- Add subscription plans table
CREATE TABLE IF NOT EXISTS subscription_plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  duration_days INTEGER NOT NULL,
  features JSONB DEFAULT '[]',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add user subscriptions table
CREATE TABLE IF NOT EXISTS user_subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id UUID REFERENCES subscription_plans(id),
  start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  end_date TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  payment_status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, plan_id, is_active)
);

-- Update files table to include pricing
ALTER TABLE files ADD COLUMN IF NOT EXISTS is_premium BOOLEAN DEFAULT false;
ALTER TABLE files ADD COLUMN IF NOT EXISTS price DECIMAL(10,2) DEFAULT 0.00;
ALTER TABLE files ADD COLUMN IF NOT EXISTS file_category VARCHAR(50) DEFAULT 'general';

-- Enable RLS
ALTER TABLE subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;

-- Subscription plans policies
CREATE POLICY "Anyone can read active subscription plans" ON subscription_plans
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage subscription plans" ON subscription_plans
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- User subscriptions policies
CREATE POLICY "Users can read own subscriptions" ON user_subscriptions
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all subscriptions" ON user_subscriptions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Function to check if user has active subscription
CREATE OR REPLACE FUNCTION has_active_subscription(user_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_subscriptions
    WHERE user_id = user_uuid 
    AND is_active = true 
    AND end_date > NOW()
    AND payment_status = 'completed'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user subscription status
CREATE OR REPLACE FUNCTION get_user_subscription_status(user_uuid UUID)
RETURNS TABLE(
  has_subscription BOOLEAN,
  plan_name VARCHAR(100),
  end_date TIMESTAMP WITH TIME ZONE,
  days_remaining INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    CASE WHEN us.id IS NOT NULL THEN true ELSE false END as has_subscription,
    sp.name as plan_name,
    us.end_date,
    CASE 
      WHEN us.end_date IS NOT NULL THEN EXTRACT(DAY FROM us.end_date - NOW())::INTEGER
      ELSE 0
    END as days_remaining
  FROM user_subscriptions us
  LEFT JOIN subscription_plans sp ON us.plan_id = sp.id
  WHERE us.user_id = user_uuid 
  AND us.is_active = true 
  AND us.end_date > NOW()
  AND us.payment_status = 'completed'
  ORDER BY us.end_date DESC
  LIMIT 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Insert default subscription plans
INSERT INTO subscription_plans (name, price, duration_days, features) VALUES
('Basic Plan', 9.99, 30, '["Download premium files", "Priority support", "No ads", "5GB extra storage"]'),
('Pro Plan', 19.99, 30, '["Download premium files", "Priority support", "No ads", "50GB extra storage", "Advanced analytics", "Custom branding"]'),
('Enterprise Plan', 49.99, 30, '["Download premium files", "Priority support", "No ads", "500GB extra storage", "Advanced analytics", "Custom branding", "API access", "Team collaboration"]');

-- Update some files to be premium for demo
UPDATE files SET is_premium = true, price = 2.99, file_category = 'premium' WHERE id IN (
  SELECT id FROM files LIMIT 2
);
