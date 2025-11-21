-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users Table
create table public.users (
  id uuid references auth.users not null primary key,
  email text unique not null,
  full_name text,
  avatar_url text,
  stripe_customer_id text,
  subscription_status text default 'free', -- 'free', 'pro', 'vip'
  credits integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for Users
alter table public.users enable row level security;
create policy "Users can view their own data" on public.users for select using (auth.uid() = id);
create policy "Users can update their own data" on public.users for update using (auth.uid() = id);

-- Bazi Charts Table (Saved Charts)
create table public.bazi_charts (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  name text not null,
  gender text not null,
  birth_year integer not null,
  birth_month integer not null,
  birth_day integer not null,
  birth_hour integer not null,
  birth_minute integer not null,
  timezone text default 'CST',
  chart_data jsonb, -- Store the calculated JSON response
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for Bazi Charts
alter table public.bazi_charts enable row level security;
create policy "Users can CRUD their own charts" on public.bazi_charts for all using (auth.uid() = user_id);

-- User Daily Draws Table
create table public.user_daily_draws (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade, -- Can be null for guest draws if we track by IP/Cookie, but usually requires auth for history
  draw_date date not null,
  gua_name text not null,
  gua_code text not null,
  interpretation text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for Daily Draws
alter table public.user_daily_draws enable row level security;
create policy "Users can view their own draws" on public.user_daily_draws for select using (auth.uid() = user_id);

-- User Lamps Table (Digital Rituals)
create table public.user_lamps (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade, -- Optional if we allow guest lighting
  lamp_type text not null, -- e.g., 'wealth', 'health'
  devotee_name text not null,
  wish_content text,
  duration_days integer default 1,
  status text default 'active', -- 'active', 'expired'
  payment_id text, -- Stripe Payment Intent ID
  amount_paid integer, -- In cents
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  expires_at timestamp with time zone
);

-- Enable RLS for Lamps
alter table public.user_lamps enable row level security;
create policy "Users can view their own lamps" on public.user_lamps for select using (auth.uid() = user_id);
create policy "Public can view active lamps" on public.user_lamps for select using (status = 'active'); -- Allow showing "Community Lamps"

-- Reports Table (AI Generated Reports)
create table public.reports (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  chart_id uuid references public.bazi_charts(id),
  report_type text not null, -- '2026_destiny', 'career', 'love'
  content text, -- Markdown content
  status text default 'pending', -- 'pending', 'completed', 'failed'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for Reports
alter table public.reports enable row level security;
create policy "Users can view their own reports" on public.reports for select using (auth.uid() = user_id);

-- Functions
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.users (id, email, full_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user creation
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
