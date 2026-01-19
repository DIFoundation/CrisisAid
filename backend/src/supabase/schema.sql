-- USERS (linked to Supabase Auth)
create table users (
  id uuid primary key references auth.users(id),
  name text,
  role text check (role in ('ADMIN','VOLUNTEER','USER')) default 'USER',
  verified boolean default false,
  created_at timestamp default now()
);

-- RESOURCES
create table resources (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text,
  status text,
  description text,
  verified boolean default false,
  capacity integer,
  latitude text,
  longitude text,
  address text,
  phone text,
  email text,
  created_at timestamp default now()
);

-- ALERTS
create table alerts (
  id uuid primary key default gen_random_uuid(),
  title text,
  description text,
  severity text,
  latitude text,
  longitude text,
  address text,
  active boolean default true,
  created_at timestamp default now()
);

-- SUBMISSIONS
create table submissions (
  id uuid primary key default gen_random_uuid(),
  type text,
  data jsonb,
  submitted_by uuid references users(id),
  status text default 'PENDING',
  created_at timestamp default now()
);
