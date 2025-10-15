# Quiz Backend Integration Guide

## Overview

Sistem quiz sekarang sudah terintegrasi dengan backend untuk menyimpan history jawaban user.

## Alur Kerja

### 1. Frontend (Dummy Data)

- Quiz questions disimpan di frontend sebagai static data
- Setiap `SubMateri` bisa memiliki array `quiz` dan optional `quizId`

### 2. Backend (Progress Tracking)

- Backend menyimpan history quiz attempts ke table `user_quiz_attempts`
- Backend menyimpan detail jawaban ke table `user_quiz_answers`
- Backend menghitung score dan status lulus/tidak

## Cara Menambahkan Quiz ID

### Update Data Module

Tambahkan `quizId` ke SubMateri yang memiliki quiz:

```typescript
{
  id: "sub1",
  title: "Gizi Seimbang & PMT Pemulihan",
  // ... other fields
  quizId: "abc123-def456-ghi789", // UUID dari backend
  quiz: [
    {
      id: "q1",
      question: "Pertanyaan quiz...",
      // ...
    }
  ],
}
```

### Mendapatkan Quiz ID dari Backend

#### Opsi 1: Manual - Melalui Database

1. Login ke Supabase dashboard
2. Buka table `materis_quizzes`
3. Buat quiz baru atau copy ID quiz yang sudah ada
4. Paste ID tersebut ke field `quizId` di dummy data

#### Opsi 2: Melalui API (Untuk Admin)

```javascript
// POST /api/v1/quizzes (requires admin role)
{
  "title": "Quiz Gizi Seimbang",
  "module_id": 4,
  "sub_materi_id": "sub1",
  "passing_score": 70,
  "time_limit_seconds": 900
}
```

## Cara Kerja Saat User Submit Quiz

### 1. User Mengerjakan Quiz

- QuizPlayer component menampilkan questions dari dummy data
- User menjawab pertanyaan
- User click submit

### 2. Kalkulasi Score (Frontend)

```typescript
const correctAnswers = answers.filter((a) => a.isCorrect).length;
const score = (correctAnswers / totalQuestions) * 100;
```

### 3. Save ke Backend (Jika Authenticated)

```typescript
if (user && quizId) {
  const backendAnswers = quizzes.map((quiz, index) => ({
    question_id: quiz.id,
    selected_option_index: selectedAnswers[index] ?? -1,
  }));

  await QuizService.submitQuizAnswers(quizId, backendAnswers);
}
```

### 4. Backend Response

```json
{
  "error": false,
  "code": "QUIZ_SUBMITTED",
  "message": "Quiz berhasil diselesaikan",
  "data": {
    "attempt": {
      "id": "attempt-uuid",
      "score": 85.5,
      "is_passed": true,
      "completed_at": "2025-10-15T10:30:00Z"
    },
    "results": {
      "score": 85.5,
      "correct_answers": 17,
      "total_questions": 20,
      "is_passed": true,
      "passing_score": 70
    }
  }
}
```

## Database Tables

### `user_quiz_attempts`

Menyimpan setiap percobaan quiz oleh user:

- `id`: UUID attempt
- `user_id`: UUID user
- `quiz_id`: UUID quiz
- `score`: Nilai persentase (0-100)
- `is_passed`: Boolean lulus/tidak
- `started_at`: Timestamp mulai
- `completed_at`: Timestamp selesai

### `user_quiz_answers`

Menyimpan detail jawaban per question:

- `attempt_id`: FK ke user_quiz_attempts
- `question_id`: ID question
- `selected_option_index`: Index jawaban yang dipilih
- `is_correct`: Boolean benar/salah

## Mengecek History Quiz User

### Via API

```typescript
// GET /api/v1/user-quizzes/my-attempts
const response = await QuizService.getMyQuizAttempts({
  status: "completed",
  page: 1,
  limit: 10,
});
```

### Response

```json
{
  "error": false,
  "data": {
    "attempts": [
      {
        "id": "attempt-1",
        "score": 85.5,
        "is_passed": true,
        "started_at": "2025-10-15T10:00:00Z",
        "completed_at": "2025-10-15T10:30:00Z",
        "materis_quizzes": {
          "id": "quiz-1",
          "title": "Quiz Gizi Seimbang",
          "passing_score": 70
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 1,
      "totalPages": 1
    }
  }
}
```

## Fallback Behavior

### Jika `quizId` Tidak Ada

- Quiz tetap berjalan normal dengan data dummy
- Score dihitung di frontend
- **Tidak disimpan ke backend** ✅ (ini OK untuk development)
- User tetap bisa lihat hasil dan review jawaban

### Jika User Tidak Login

- Quiz tetap berjalan dengan data dummy
- Score dihitung di frontend
- **Tidak disimpan ke backend**
- History hanya tersimpan di localStorage (jika ada)

## Testing

### 1. Test dengan quizId

```typescript
const subMateri = {
  // ...
  quizId: "real-uuid-from-backend",
  quiz: [
    /* questions */
  ],
};
```

### 2. Test tanpa quizId

```typescript
const subMateri = {
  // ...
  // quizId: undefined, (tidak ada quizId)
  quiz: [
    /* questions */
  ],
};
```

### 3. Test sebagai Guest

- Logout
- Buka quiz
- Submit quiz
- Check console: "Skipping backend save - user not authenticated"

### 4. Test sebagai Authenticated User

- Login
- Buka quiz dengan quizId
- Submit quiz
- Check console: "Quiz result saved successfully"
- Check database: Ada record baru di `user_quiz_attempts`

## Notes

1. **Frontend = Source of Truth untuk Quiz Questions**

   - Questions, options, correct answers disimpan di frontend
   - Backend TIDAK menyimpan question content

2. **Backend = Source of Truth untuk User Progress**

   - History attempts
   - Scores
   - Timestamps
   - Pass/fail status

3. **Hybrid Approach**

   - Content management di frontend (easy to update)
   - User data di backend (persistent, cross-device)

4. **Future Enhancement**
   - Admin dashboard untuk manage quiz questions
   - Migrate quiz content dari frontend ke backend
   - Real-time leaderboard berdasarkan scores
