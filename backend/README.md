# CrisisAid Backend API

A backend API for managing disaster relief resources, emergency alerts, and community submissions.

## Setup Instructions

### 1. Environment Variables

Create a `.env` file in the backend directory:

```bash
cp .env.example .env
```

Then fill in your Supabase credentials:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
PORT=5000
NODE_ENV=development
```

### 2. Database Setup

Run the SQL schema in your Supabase SQL editor:

```bash
backend/src/supabase/schema.sql
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

The API will run on `http://localhost:5000`

### 5. Build for Production

```bash
npm run build
npm start
```

## API Endpoints

### Resources

- `GET /api/resources` - Get all resources (supports filtering: ?type=SHELTER&status=AVAILABLE&verified=true)
- `GET /api/resources/search?latitude=X&longitude=Y&radius=10` - Search resources by location
- `GET /api/resources/:id` - Get resource by ID
- `POST /api/resources` - Create resource (auth required)
- `PUT /api/resources/:id` - Update resource (admin/volunteer only)
- `PATCH /api/resources/:id/verify` - Verify resource (admin/volunteer only)
- `DELETE /api/resources/:id` - Delete resource (admin only)

### Alerts

- `GET /api/alerts` - Get all alerts
- `GET /api/alerts/active` - Get active alerts only
- `GET /api/alerts/:id` - Get alert by ID
- `POST /api/alerts` - Create alert (admin only)
- `PUT /api/alerts/:id` - Update alert (admin only)
- `PATCH /api/alerts/:id/deactivate` - Deactivate alert (admin only)
- `DELETE /api/alerts/:id` - Delete alert (admin only)

### Submissions

- `GET /api/submissions` - Get all submissions (admin/volunteer only)
- `GET /api/submissions/pending` - Get pending submissions (admin/volunteer only)
- `GET /api/submissions/my-submissions` - Get current user's submissions (auth required)
- `POST /api/submissions` - Create submission (auth required)
- `PATCH /api/submissions/:id/approve` - Approve submission (admin/volunteer only)
- `PATCH /api/submissions/:id/reject` - Reject submission (admin/volunteer only)

### Users

- `GET /api/users/me` - Get current user profile (auth required)
- `PUT /api/users/me` - Update current user (auth required)
- `GET /api/users` - Get all users (admin only)
- `PATCH /api/users/:id/role` - Update user role (admin only)
- `PATCH /api/users/:id/verify` - Verify user (admin only)

## Authentication

All protected routes require a Bearer token in the Authorization header:

```
Authorization: Bearer <your_supabase_token>
```

You can get this token from Supabase Auth (sign up/login flow).

## User Roles

- `USER` - Default role, can view resources and create submissions
- `VOLUNTEER` - Can verify resources and approve submissions
- `ADMIN` - Full access to all operations

## Next Steps

1. Set up Supabase Auth for user registration/login
2. Configure Row Level Security (RLS) policies in Supabase
3. Add input validation using libraries like `zod` or `joi`
4. Implement rate limiting
5. Add logging (Winston/Morgan)
6. Set up testing (Jest/Supertest)
7. Add API documentation (Swagger/OpenAPI)

## Notes

- The location search uses a simplified distance calculation. For production, consider using PostGIS or a dedicated geospatial service.
- Make sure to enable CORS for your frontend domain in production.
- Consider adding pagination for list endpoints in production.