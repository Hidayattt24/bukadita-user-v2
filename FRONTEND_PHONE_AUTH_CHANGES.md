# 📱 Frontend Changes: Phone-Based Authentication

## Overview
Frontend telah diupdate untuk mendukung **phone-based authentication** menggantikan email-based authentication.

---

## 🔄 Files Modified

### 1. **src/app/(auth)/login/page.tsx**
✅ **Status:** Updated

**Changes:**
- ✅ Changed form field from `email` to `phone`
- ✅ Updated icon from `Mail` to `Smartphone` (from lucide-react)
- ✅ Changed input type from `email` to `tel`
- ✅ Updated validation to use `validators.phone()` instead of `validators.email()`
- ✅ Added phone format hint: "Format: 08xxxxxxxxxx atau +628xxxxxxxxxx"
- ✅ Changed placeholder: "Masukkan email Anda" → "Contoh: 081234567890"
- ✅ Added maxLength={15} to phone input
- ✅ Updated error messages for phone validation

**Key Code:**
```tsx
const [formData, setFormData] = useState({
  phone: "",  // ← Changed from email
  password: "",
  rememberMe: false,
});

// Validation
if (!validators.phone(formData.phone)) {
  newErrors.phone = "Format nomor HP tidak valid (contoh: 081234567890)";
}

// Login call
const result = await login(formData.phone, formData.password);
```

---

### 2. **src/services/authService.ts**
✅ **Status:** Updated

**Changes:**
- ✅ Updated `LoginRequest` interface: `email` → `phone`
- ✅ Updated `RegisterRequest` interface: `phone` required, `email` optional
- ✅ Added `validators.phone()` function with Indonesian phone regex

**Key Code:**
```typescript
export interface LoginRequest {
  phone: string;     // ← Changed from email
  password: string;
}

export interface RegisterRequest {
  phone: string;     // ← Now required
  password: string;
  full_name: string;
  email?: string;    // ← Now optional
}

// Phone validator
export const validators = {
  email: (email: string): boolean => /[^\s@]+@[^\s@]+\.[^\s@]+/.test(email),
  phone: (phone: string): boolean =>
    /^(\+62[8-9][\d]{8,11}|0[8-9][\d]{8,11})$/.test(phone),  // ← New!
  password: (password: string) => ({ ... }),
  required: (value: string, field: string) => ({ ... }),
};
```

**Phone Regex Explained:**
- `\+62[8-9][\d]{8,11}` - Accepts +628xxx (international format)
- `0[8-9][\d]{8,11}` - Accepts 08xxx (local format)
- Total digits: 10-13 characters

---

### 3. **src/context/AuthContext.tsx**
✅ **Status:** Updated

**Changes:**
- ✅ Updated `AuthContextType.login` signature: `(phone, password)` instead of `(email, password)`
- ✅ Updated `RegisterData` interface: `phone` required, `email` optional
- ✅ Updated `login()` function implementation to accept phone

**Key Code:**
```typescript
export interface AuthContextType extends AuthState {
  login: (
    phone: string,    // ← Changed from email
    password: string
  ) => Promise<{ success: boolean; pendingProfile?: boolean; error?: string }>;
  // ... other methods
}

export interface RegisterData {
  phone: string;      // ← Now required
  password: string;
  full_name: string;
  email?: string;     // ← Now optional
}

// Implementation
const login = async (phone: string, password: string) => {
  const res = await authService.login({ phone, password });
  // ... rest of logic
};
```

---

## 📋 Testing Checklist

### Pre-Testing Setup
1. ✅ Run backend migration: `001_change_login_to_phone.sql`
2. ✅ Insert dummy auth users: `insert_all_auth_users.sql`
3. ✅ Import profiles CSV: `profiles_dummy.csv`

### Test Cases

#### ✅ **Test 1: Valid Phone Login**
- **Input:** Phone: `081234567890`, Password: `password123`
- **Expected:** Login successful, redirect to `/user/beranda`

#### ✅ **Test 2: Invalid Phone Format**
- **Input:** Phone: `12345`, Password: `password123`
- **Expected:** Error: "Format nomor HP tidak valid (contoh: 081234567890)"

#### ✅ **Test 3: Empty Phone**
- **Input:** Phone: ``, Password: `password123`
- **Expected:** Error: "Nomor HP wajib diisi"

#### ✅ **Test 4: Wrong Password**
- **Input:** Phone: `081234567890`, Password: `wrongpass`
- **Expected:** Error: "Login gagal" or specific backend error

#### ✅ **Test 5: International Format**
- **Input:** Phone: `+6281234567890`, Password: `password123`
- **Expected:** Login successful

#### ✅ **Test 6: Admin Login**
- **Input:** Phone: `081999999999`, Password: `password123`
- **Expected:** Login successful, redirect to admin dashboard (if applicable)

---

## 🎨 UI/UX Changes

### Visual Changes
1. **Icon:** `Mail` icon → `Smartphone` icon
2. **Label:** "Email" → "Nomor HP"
3. **Placeholder:** "Masukkan email Anda" → "Contoh: 081234567890"
4. **Helper Text:** Added format hint below input
5. **Input Type:** `email` → `tel` (triggers numeric keyboard on mobile)

### User Experience
- ✅ Better mobile experience with `tel` input type
- ✅ Clear format examples in placeholder
- ✅ Format hint text below input
- ✅ Max length validation (15 chars)
- ✅ Real-time validation on input

---

## 🔐 Validation Rules

### Phone Number Validation
```typescript
// Regex pattern
/^(\+62[8-9][\d]{8,11}|0[8-9][\d]{8,11})$/

// Valid examples:
✅ 081234567890
✅ 082198765432
✅ +6281234567890
✅ +62821987654321

// Invalid examples:
❌ 12345 (too short)
❌ 021234567890 (not mobile)
❌ 081234567890123 (too long)
❌ 08123456789@ (invalid chars)
```

### Password Validation
- **Minimum:** 6 characters
- **No maximum** (backend enforces limits)
- **Error message:** "Password minimal 6 karakter"

---

## 🚀 Deployment Steps

### 1. Backend First
```bash
# Run in Supabase SQL Editor
1. Execute: migrations/001_change_login_to_phone.sql
2. Execute: dummy_data/insert_all_auth_users.sql
3. Import: dummy_data/profiles_dummy.csv
```

### 2. Deploy Backend API
```bash
cd api-bukadita
git add .
git commit -m "feat: phone-based authentication"
git push origin main
```

### 3. Deploy Frontend
```bash
cd user-bukadita
npm run build          # Test build locally
git add .
git commit -m "feat: phone-based login UI"
git push origin main   # Auto-deploy to Vercel
```

### 4. Test in Production
```bash
# Test with dummy accounts
Phone: 081234567890
Password: password123
```

---

## 🔧 Troubleshooting

### Issue 1: "Phone tidak terdaftar"
**Solution:** Check if user exists in profiles table with that phone number
```sql
SELECT * FROM profiles WHERE phone = '081234567890';
```

### Issue 2: "Format nomor HP tidak valid"
**Solution:** 
- Ensure phone starts with 08 or +628
- No spaces, dashes, or special characters
- Total length: 10-13 digits

### Issue 3: Login successful but profile missing
**Solution:** Complete profile in `/user/pengaturan?complete=1`
```sql
-- Check profile status
SELECT * FROM profiles WHERE phone = '081234567890';
```

### Issue 4: "Email required" error from backend
**Solution:** Backend migration not run yet. Check:
```sql
-- Verify phone column is NOT NULL
SELECT column_name, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'profiles' AND column_name = 'phone';
```

---

## 📊 Migration Impact

### Breaking Changes
⚠️ **IMPORTANT:** Old users with email-only login cannot login anymore!

**Migration Strategy:**
1. ✅ Run migration to handle existing users
2. ✅ Suffixed phones (_2, _3) need manual update
3. ✅ Contact users to update their phone numbers
4. ✅ Provide phone update form in user settings

### Data Cleanup Required
```sql
-- Find users with suffixed phones (temporary from migration)
SELECT id, full_name, phone, email 
FROM profiles 
WHERE phone LIKE '%_%'
ORDER BY created_at;

-- Manual update example
UPDATE profiles 
SET phone = '081234567890' 
WHERE id = 'user-uuid-here';
```

---

## 🎯 Next Steps

### Immediate (High Priority)
- [ ] Test login with all 21 dummy accounts
- [ ] Update password reset flow (if exists) to use phone
- [ ] Update user profile edit form (phone field should be read-only or validated)

### Short Term
- [ ] Add "Forgot Phone?" help link
- [ ] Add phone verification via SMS (optional)
- [ ] Update registration flow (if re-enabled later)

### Long Term
- [ ] Add phone number verification (OTP)
- [ ] Allow users to add/change phone number
- [ ] Add email as secondary login method (optional)

---

## 📝 Summary

✅ **Completed:**
- Login form updated to use phone instead of email
- Validation rules updated with Indonesian phone format
- AuthContext updated to handle phone-based auth
- Error messages updated for phone validation
- UI/UX improved with phone-specific input type

✅ **Tested:**
- No TypeScript errors
- No ESLint errors
- Phone validation regex working
- Form submission logic updated

✅ **Ready for:**
- Local testing with dummy accounts
- Integration testing with backend
- Production deployment

---

## 🔗 Related Files

**Backend:**
- `api-bukadita/src/controllers/auth-controller.js`
- `api-bukadita/migrations/001_change_login_to_phone.sql`
- `api-bukadita/dummy_data/insert_all_auth_users.sql`
- `api-bukadita/dummy_data/profiles_dummy.csv`

**Frontend:**
- `user-bukadita/src/app/(auth)/login/page.tsx`
- `user-bukadita/src/services/authService.ts`
- `user-bukadita/src/context/AuthContext.tsx`

**Documentation:**
- `api-bukadita/MIGRATION_GUIDE.md`
- `api-bukadita/CHANGES_SUMMARY.md`
- `api-bukadita/HANDLING_DUPLICATES.md`

---

**Last Updated:** October 20, 2025  
**Status:** ✅ Complete - Ready for Testing
