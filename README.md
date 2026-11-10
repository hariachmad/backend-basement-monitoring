# Basement Monitoring Backend

## API Documentation (OpenAPI / Swagger)

Swagger UI dapat diakses ketika server berjalan di:
- **Swagger UI**: [http://localhost:3000/api/docs](http://localhost:3000/api/docs)
- **OpenAPI JSON Spec**: [http://localhost:3000/api/docs-json](http://localhost:3000/api/docs-json)

### Controllers & Endpoints Terdaftar:
- **App**: `GET /`
- **Basement**:
  - `POST /basement` - Registrasi basement baru
  - `GET /basement` - Ambil semua daftar basement
  - `GET /basement/search` - Cari basement berdasarkan query `id` atau `name`
  - `GET /basement/:id` - Cari basement berdasarkan ID
  - `PUT /basement/:id` - Update data basement
- **Line**:
  - `POST /line` - Registrasi garis/line pemantauan baru
  - `GET /line` - Ambil semua daftar line
  - `GET /line/search` - Cari line berdasarkan query `id` atau `name`
  - `GET /line/:id` - Cari line berdasarkan ID
  - `PUT /line/:id` - Update data line
  - `DELETE /line/:id` - Hapus line berdasarkan ID
- **Line In Out Basement**:
  - `POST /line-in-out-basement` - Pemetaan arah line terhadap basement (in/out)
  - `GET /line-in-out-basement` - Ambil semua daftar pemetaan line
  - `GET /line-in-out-basement/lineid` - Cari pemetaan berdasarkan query `lineId`
  - `GET /line-in-out-basement/search` - Cari pemetaan berdasarkan query `id`
  - `GET /line-in-out-basement/:id` - Cari pemetaan berdasarkan ID
  - `PUT /line-in-out-basement/:id` - Update pemetaan
  - `DELETE /line-in-out-basement/:id` - Hapus pemetaan
- **Incr Red Line**:
  - `POST /incr-red-line` - Tambah aturan counter increment / reduce per line context
  - `GET /incr-red-line` - Ambil semua aturan counter line
  - `GET /incr-red-line/search` - Cari aturan counter berdasarkan query `id` atau `lineInOutBasementId`
  - `GET /incr-red-line/:id` - Cari aturan counter berdasarkan ID
  - `PUT /incr-red-line/:id` - Update aturan counter
  - `DELETE /incr-red-line/:id` - Hapus aturan counter

---

## WebSocket / Socket.IO Guide

- **HOW TO CONNECT WITH SOCKETIO SERVER**
  - url = `http://<ipaddress>:3000/inference`

- **HOW TO REGIST LINE**
  1. send event : `system:register`
     with payload :
     ```json
     {
       "lineId": "<lineId>"
     }
     ```
  2. you will receive ack : `{ "subscribed": messageBody.lineId }`
  3. register success
  4. you should register the line first before you send crossing line event

- **HOW TO SEND EVENT CROSSING LINE**
  1. send event : `line:crossed`
     with payload :
     ```json
     {
       "lineId": "<lineId>",
       "direction": "in" | "out"
     }
     ```
  2. you will receive ack :
     ```json
     {
       "lineId": "<lineId>",
       "direction": "in" | "out"
     }
     ```
  3. event sent
