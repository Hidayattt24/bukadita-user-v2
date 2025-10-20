# 🧪 Quick Test Guide - Phone-Based Login

## 🎯 Test Accounts (Password: `password123` for all)

### Regular Users
| No | Name | Phone | Email | Role |
|----|------|-------|-------|------|
| 1 | Siti Nurhaliza | `081234567890` | siti.nurhaliza@example.com | pengguna |
| 2 | Ahmad Zainudin | `081234567891` | ahmad.zain@example.com | pengguna |
| 3 | Dewi Kartika | `081234567892` | dewi.kartika@example.com | pengguna |
| 4 | Budi Santoso | `082198765432` | budi.santoso@example.com | pengguna |
| 5 | Rina Amelia | `082198765433` | rina.amelia@example.com | pengguna |

### Admin
| Name | Phone | Email | Role |
|------|-------|-------|------|
| Admin Bukadita | `081999999999` | admin@bukadita.com | admin |

---

## ✅ Quick Test Steps

### 1. Test Valid Login
```
Phone: 081234567890
Password: password123
Expected: ✅ Login success → Redirect to /user/beranda
```

### 2. Test International Format
```
Phone: +6281234567890
Password: password123
Expected: ✅ Login success
```

### 3. Test Invalid Phone Format
```
Phone: 12345
Password: password123
Expected: ❌ Error: "Format nomor HP tidak valid (contoh: 081234567890)"
```

### 4. Test Empty Phone
```
Phone: (empty)
Password: password123
Expected: ❌ Error: "Nomor HP wajib diisi"
```

### 5. Test Wrong Password
```
Phone: 081234567890
Password: wrongpassword
Expected: ❌ Error from backend (login failed)
```

### 6. Test Admin Login
```
Phone: 081999999999
Password: password123
Expected: ✅ Login success → Redirect based on role
```

---

## 🔍 Phone Format Rules

### ✅ Valid Formats
- `081234567890` (local format, 08 prefix)
- `082198765432` (different operator)
- `+6281234567890` (international format)
- `+628219876543` (10 digits)
- `+62821987654321` (13 digits)

### ❌ Invalid Formats
- `12345` (too short)
- `021234567890` (not mobile - landline)
- `08123456789012345` (too long)
- `08123456789@` (invalid characters)
- `08 1234 567890` (has spaces)
- `081-234-567890` (has dashes)

---

## 🐛 Debug Commands

### Check if user exists
```sql
SELECT id, full_name, phone, email, role 
FROM profiles 
WHERE phone = '081234567890';
```

### Check auth.users
```sql
SELECT id, email, created_at 
FROM auth.users 
WHERE email LIKE '%@example.com' OR email = 'admin@bukadita.com';
```

### Find suffixed phones (from migration)
```sql
SELECT id, full_name, phone, email 
FROM profiles 
WHERE phone LIKE '%_%'
ORDER BY created_at;
```

### Count dummy users
```sql
SELECT 
  COUNT(*) as total,
  COUNT(CASE WHEN role = 'pengguna' THEN 1 END) as pengguna,
  COUNT(CASE WHEN role = 'admin' THEN 1 END) as admin
FROM profiles
WHERE email LIKE '%@example.com' OR email = 'admin@bukadita.com';
```

---

## 🔧 Quick Fixes

### Fix: Phone not found
```sql
-- Insert missing profile
INSERT INTO profiles (id, full_name, phone, email, role)
VALUES (
  '550e8400-e29b-41d4-a716-446655440001',
  'Test User',
  '081234567890',
  'test@example.com',
  'pengguna'
);
```

### Fix: Profile exists but no auth.users
```sql
-- Check auth users
SELECT * FROM auth.users WHERE id = '550e8400-e29b-41d4-a716-446655440001';

-- If missing, run insert_all_auth_users.sql again
```

### Fix: Password doesn't work
```bash
# Password hash for "password123"
$2a$10$NQVT5J2Eg4nt8KRlZKLmFuDg8dKQqYCz4xCCjfR8hnOCCCxGnMIvi

# Update if needed (use Supabase Dashboard or bcrypt)
```

---

## 📱 Frontend Validation Testing

### Open Browser Console
```javascript
// Test phone validator
const phone = "081234567890";
const isValid = /^(\+62[8-9][\d]{8,11}|0[8-9][\d]{8,11})$/.test(phone);
console.log(isValid); // Should be true

// Test invalid phone
const invalidPhone = "12345";
const isInvalid = /^(\+62[8-9][\d]{8,11}|0[8-9][\d]{8,11})$/.test(invalidPhone);
console.log(isInvalid); // Should be false
```

---

## 🚀 Pre-Deployment Checklist

- [ ] Backend migration run successfully
- [ ] Dummy auth users inserted
- [ ] Dummy profiles imported
- [ ] Can login with phone: `081234567890`
- [ ] Can login with phone: `081999999999` (admin)
- [ ] Invalid phone shows error
- [ ] Empty phone shows error
- [ ] Wrong password shows error
- [ ] Remember me checkbox works
- [ ] Forgot password link works
- [ ] No console errors in browser
- [ ] No TypeScript errors
- [ ] Mobile view tested (phone keyboard appears)

---

## 📊 Expected Results

### After Running All Scripts:
- ✅ 21 users in `auth.users` (20 pengguna + 1 admin)
- ✅ 21 profiles in `profiles` table
- ✅ All profiles have valid phone numbers
- ✅ No suffixed phone numbers (e.g., no `081234567890_2`)
- ✅ Phone column is NOT NULL
- ✅ Phone column has UNIQUE constraint
- ✅ Email column is nullable

### Verify with SQL:
```sql
-- Should return 21
SELECT COUNT(*) FROM profiles 
WHERE email LIKE '%@example.com' OR email = 'admin@bukadita.com';

-- Should return 0 (no suffixed phones)
SELECT COUNT(*) FROM profiles WHERE phone LIKE '%_%';

-- Check constraints
SELECT 
  constraint_name, 
  constraint_type 
FROM information_schema.table_constraints 
WHERE table_name = 'profiles' AND constraint_type IN ('UNIQUE', 'CHECK');
```

---

## 🎉 Success Criteria

### ✅ All Pass
- [x] Login form accepts phone number
- [x] Phone validation works (08xxx or +628xxx)
- [x] Login successful with valid phone + password
- [x] Error shown for invalid phone format
- [x] Error shown for empty phone
- [x] Error shown for wrong password
- [x] Smartphone icon displayed (not Mail icon)
- [x] Format hint shown below input
- [x] Tel input type triggers numeric keyboard on mobile
- [x] No TypeScript errors
- [x] No console errors

---

**Password for all accounts:** `password123`  
**Test in:** http://localhost:3000/login  
**Production:** https://your-app.vercel.app/login
