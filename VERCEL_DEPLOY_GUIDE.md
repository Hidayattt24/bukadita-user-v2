# 🚀 Panduan Deploy Bukadita User v2 ke Vercel

## ✅ Prerequisites Checklist

Sebelum deploy, pastikan:

- [x] Build lokal berhasil (`npm run build` ✅)
- [x] Project sudah di push ke GitHub/GitLab/Bitbucket
- [x] Punya akun Vercel (gratis) di [vercel.com](https://vercel.com)
- [x] File `.env` TIDAK di-commit (sudah ada di `.gitignore`)

---

## 📋 Step-by-Step Deployment via Vercel Web Dashboard

### **STEP 1: Push Project ke Git Repository**

```powershell
# Masuk ke folder project
cd "d:\....Bismillah Sempro\Bukadita REVISI\bukadita-user-v2"

# Check status
git status

# Add semua perubahan
git add .

# Commit dengan pesan yang jelas
git commit -m "feat: Prepare for Vercel deployment - Add Supabase client and fix Next.js 15 config"

# Push ke remote repository (GitHub/GitLab)
git push origin main
# atau jika branch Anda 'master':
# git push origin master
```

> **⚠️ PENTING**: Pastikan file `.env` TIDAK ikut ter-push (sudah ada di `.gitignore`)

---

### **STEP 2: Login ke Vercel Dashboard**

1. Buka browser dan akses: **[https://vercel.com/login](https://vercel.com/login)**
2. Login dengan akun GitHub/GitLab (recommended) atau email
3. Setelah login, Anda akan masuk ke Dashboard Vercel

---

### **STEP 3: Import Project dari Git**

1. **Klik tombol "Add New Project"** atau **"Import Project"**
2. **Pilih Git Provider**:
   - Klik **"Import Git Repository"**
   - Pilih GitHub/GitLab/Bitbucket sesuai tempat Anda menyimpan kode
3. **Authorize Vercel** (jika pertama kali):
   - Klik "Install" atau "Authorize"
   - Pilih repository yang ingin di-deploy (bukadita-user-v2)
4. **Select Repository**:
   - Cari dan pilih repository: **bukadita-user-v2**
   - Klik **"Import"**

---

### **STEP 4: Configure Project Settings**

Setelah import, Anda akan masuk ke halaman konfigurasi:

#### **A. Project Settings**

```
Project Name: bukadita-user-v2
Framework Preset: Next.js
Root Directory: ./  (biarkan default)
```

#### **B. Build and Output Settings**

Vercel akan auto-detect. Pastikan settings ini:

```
Build Command: npm run build
Output Directory: .next
Install Command: npm install
Development Command: npm run dev
```

> ✅ **Turbopack Support**: Vercel otomatis mendukung `--turbopack` flag dari `package.json`

#### **C. Environment Variables** ⚠️ **INI PENTING!**

Klik **"Environment Variables"** dan tambahkan satu per satu:

| Key                             | Value                                      | Environment                      |
| ------------------------------- | ------------------------------------------ | -------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | `https://fjbacahbbicjggdzmern.supabase.co` | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`  | Production, Preview, Development |
| `NEXT_PUBLIC_BACKEND_URL`       | `https://api-bukadita.vercel.app`          | Production, Preview, Development |
| `NEXT_PUBLIC_SITE_URL`          | `https://bukadita-user-v2.vercel.app`      | Production                       |
| `NODE_ENV`                      | `production`                               | Production                       |

**Cara menambahkan:**

1. Ketik nama variable di kolom "Key" (contoh: `NEXT_PUBLIC_SUPABASE_URL`)
2. Paste value dari file `.env` lokal Anda ke kolom "Value"
3. Pilih environment: **Production**, **Preview**, dan **Development** (centang semua)
4. Klik **"Add"**
5. Ulangi untuk semua variable di atas

> **💡 Tips**: Copy-paste langsung dari file `.env` lokal Anda agar tidak salah

---

### **STEP 5: Deploy!**

1. Setelah semua environment variable ditambahkan
2. Klik tombol **"Deploy"** (biru besar di bawah)
3. **Tunggu proses deployment** (biasanya 2-5 menit)
4. Vercel akan:
   - ✅ Install dependencies (`npm install`)
   - ✅ Run build command (`npm run build --turbopack`)
   - ✅ Deploy ke production

---

### **STEP 6: Verifikasi Deployment**

Setelah deployment selesai:

1. **Cek Build Logs**:

   - Pastikan tidak ada error merah
   - Lihat pesan "Build Completed" hijau
   - Check output: "✓ Compiled successfully"

2. **Open Production URL**:

   - Klik **"Visit"** atau copy URL production
   - Format URL: `https://bukadita-user-v2.vercel.app`
   - Atau custom domain jika sudah diatur

3. **Test Aplikasi**:
   - ✅ Landing page loading dengan baik
   - ✅ Login/Register berfungsi
   - ✅ Google OAuth callback (`/callback`) berfungsi
   - ✅ API calls ke backend berhasil
   - ✅ Supabase connection berfungsi

---

## 🔧 Post-Deployment Configuration

### **A. Custom Domain (Opsional)**

Jika ingin domain sendiri (misalnya `www.bukadita.com`):

1. Di Vercel Dashboard → Project Settings
2. Klik **"Domains"**
3. Klik **"Add Domain"**
4. Masukkan domain Anda (contoh: `bukadita.com`)
5. Ikuti instruksi untuk update DNS records
6. Tunggu DNS propagation (5-60 menit)

### **B. Update Backend URL**

Jika URL production berbeda, update environment variable:

1. Vercel Dashboard → Project → **Settings** → **Environment Variables**
2. Edit `NEXT_PUBLIC_SITE_URL`:
   ```
   https://your-actual-production-url.vercel.app
   ```
3. **Redeploy** agar perubahan berlaku:
   - Klik **"Deployments"**
   - Klik titik 3 (⋮) pada deployment terakhir
   - Klik **"Redeploy"**

### **C. Setup Google OAuth Redirect**

Karena menggunakan Google OAuth, update di Google Cloud Console:

1. Buka [Google Cloud Console](https://console.cloud.google.com)
2. Pilih project Anda
3. **APIs & Services** → **Credentials**
4. Edit OAuth 2.0 Client ID
5. Tambahkan ke **Authorized redirect URIs**:
   ```
   https://bukadita-user-v2.vercel.app/callback
   https://fjbacahbbicjggdzmern.supabase.co/auth/v1/callback
   ```
6. **Save**

### **D. Update Supabase Redirect URLs**

Di Supabase Dashboard:

1. Buka project: `fjbacahbbicjggdzmern`
2. **Authentication** → **URL Configuration**
3. Tambahkan ke **Redirect URLs**:
   ```
   https://bukadita-user-v2.vercel.app/callback
   https://bukadita-user-v2.vercel.app/**
   ```
4. Update **Site URL**:
   ```
   https://bukadita-user-v2.vercel.app
   ```
5. **Save**

---

## 🔄 Automatic Deployments

Vercel akan **otomatis deploy** setiap kali Anda push ke Git:

- **Push ke `main`/`master`** → Deploy ke **Production**
- **Push ke branch lain** → Deploy ke **Preview** (testing URL)
- **Pull Request** → Deploy **Preview** otomatis dengan unique URL

### **Manual Redeploy**

Jika perlu redeploy tanpa push baru:

1. Vercel Dashboard → **Deployments**
2. Klik titik 3 (⋮) pada deployment terakhir
3. Klik **"Redeploy"**
4. Pilih **"Use existing Build Cache"** (lebih cepat) atau rebuild dari awal

---

## 🐛 Troubleshooting Common Issues

### **1. Build Error: Module Not Found**

```
Error: Module not found: Can't resolve '@/lib/xxx'
```

**Solution**:

- Pastikan file yang di-import benar-benar ada
- Check case-sensitivity (Linux server case-sensitive)
- Rebuild lokal dulu: `npm run build`

### **2. Environment Variable Tidak Terbaca**

```
Error: NEXT_PUBLIC_XXX is undefined
```

**Solution**:

- Pastikan variable dimulai dengan `NEXT_PUBLIC_` (untuk client-side)
- Redeploy setelah menambah env variable baru
- Check di Settings → Environment Variables

### **3. API Calls Failed (CORS Error)**

```
CORS policy: No 'Access-Control-Allow-Origin' header
```

**Solution**:

- Pastikan backend API (`api-bukadita.vercel.app`) sudah di-deploy
- Check CORS config di backend memperbolehkan origin production
- Update `NEXT_PUBLIC_BACKEND_URL` ke URL yang benar

### **4. Google OAuth Callback Error**

```
redirect_uri_mismatch
```

**Solution**:

- Update Google OAuth redirect URIs (lihat Step C di atas)
- Update Supabase redirect URLs (lihat Step D di atas)
- Pastikan URL match persis (dengan/tanpa trailing slash)

### **5. Build Success tapi Halaman Blank**

**Solution**:

- Check browser console untuk error JavaScript
- Pastikan semua environment variables sudah diset
- Check Network tab untuk failed API requests
- Verifikasi `NEXT_PUBLIC_BACKEND_URL` benar

---

## 📊 Monitoring & Analytics

### **View Build Logs**:

1. Vercel Dashboard → Deployments
2. Klik deployment yang ingin dilihat
3. Tab **"Build Logs"** → lihat detail proses build
4. Tab **"Runtime Logs"** → lihat error saat aplikasi berjalan

### **Check Performance**:

1. Vercel Dashboard → **Analytics** (tab atas)
2. Lihat metrics:
   - Page views
   - Unique visitors
   - Core Web Vitals (LCP, FID, CLS)
   - Response time

### **Serverless Function Logs** (jika ada API routes):

1. Vercel Dashboard → **Functions** tab
2. Pilih function
3. Lihat invocations dan errors

---

## 🎯 Environment-Specific URLs

Setelah deploy, Anda akan punya beberapa URL:

| Environment      | URL Pattern                                           | Purpose           |
| ---------------- | ----------------------------------------------------- | ----------------- |
| **Production**   | `https://bukadita-user-v2.vercel.app`                 | Public users      |
| **Preview (PR)** | `https://bukadita-user-v2-git-feature-xxx.vercel.app` | Testing branches  |
| **Development**  | `http://localhost:3001`                               | Local development |

---

## ✅ Deployment Checklist

Sebelum declare "production ready":

- [ ] ✅ Build lokal berhasil tanpa error
- [ ] ✅ Code sudah di push ke Git repository
- [ ] ✅ Semua environment variables sudah diset di Vercel
- [ ] ✅ Deployment di Vercel berhasil (hijau)
- [ ] ✅ Production URL bisa diakses
- [ ] ✅ Login/Register berfungsi normal
- [ ] ✅ Google OAuth callback berfungsi
- [ ] ✅ API calls ke backend berhasil
- [ ] ✅ Supabase connection working
- [ ] ✅ Google OAuth redirect URLs sudah diupdate
- [ ] ✅ Supabase redirect URLs sudah diupdate
- [ ] ✅ Test di berbagai browser (Chrome, Firefox, Safari)
- [ ] ✅ Test di mobile device
- [ ] ✅ Check Performance (Lighthouse score)

---

## 🔐 Security Best Practices

1. **NEVER commit `.env` file** ke Git
2. **Rotate secrets** regularly (Supabase keys, API keys)
3. **Use environment-specific values**:
   - Development: `localhost` URLs
   - Production: Production URLs
4. **Enable Vercel's security headers** (sudah diatur di `vercel.json`)
5. **Monitor logs** untuk suspicious activity
6. **Set up alerts** di Vercel untuk deployment failures

---

## 📞 Need Help?

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Deployment**: [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)
- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **Community**: [vercel.com/discord](https://vercel.com/discord)

---

## 🎉 Success!

Jika semua langkah di atas berhasil, aplikasi Anda sudah live dan bisa diakses public!

**Production URL**: `https://bukadita-user-v2.vercel.app`

Selamat! 🚀
