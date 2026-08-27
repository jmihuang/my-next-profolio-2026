"use client";

import { Alert, Box, Button, Card, CardContent, Chip, Paper, Stack, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const candidates = [
  { id: 1, name: "林曼梅", available: "09:00–12:00", area: "北區", match: "92%", status: "最佳替補" },
  { id: 2, name: "張家榮", available: "13:00–16:00", area: "北區", match: "85%", status: "可替補" },
  { id: 3, name: "陳怡君", available: "10:00–13:00", area: "東區", match: "68%", status: "時段重疊" },
];

const columns = [
  { field: "name", headerName: "候選人", flex: 1 },
  { field: "available", headerName: "可服務時段", flex: 1.25 },
  { field: "area", headerName: "服務區域", flex: .8 },
  { field: "match", headerName: "匹配度", flex: .65 },
  { field: "status", headerName: "替補判斷", flex: 1, renderCell: ({ value }) => <Chip size="small" color={value === "時段重疊" ? "warning" : "success"} label={value} /> },
];

export default function SchedulingChallenge() {
  return <Box component="section" sx={{ py: { xs: 7, md: 12 }, borderTop: "1px solid", borderColor: "divider" }}>
    <Typography variant="overline" color="primary.main" sx={{ letterSpacing: 2 }}>01 · THE OPERATIONS PROBLEM</Typography>
    <Typography component="h2" sx={{ mt: 1, fontSize: { xs: 32, md: 52 }, letterSpacing: "-.045em", fontWeight: 300 }}>A replacement shift should not require a phone tree.</Typography>
    <Typography sx={{ mt: 3, maxWidth: 800, color: "text.secondary", lineHeight: 1.9 }}>最後兩張紅色標記圖是舊平台的原始設計。當清潔人員請假、抽換班或臨時無法服務時，營運人員必須逐一查詢可用時間、服務區域與條件，再逐位確認；系統保存了資料，卻沒有把資訊轉成排班決策。</Typography>
    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: 3, mt: 5 }}>
      {[["資訊分散", "請假、可服務時間、區域與訂單資料散在不同列表與詳細頁。"], ["按鈕缺乏優先級", "查詢、修改、查看、匯出與儲存按鈕同色同權重，使用者很難判斷下一步。"], ["人工逐一確認", "沒有候選替補排序、衝突原因或通知狀態，排班只能靠人腦串接。"]].map(([title, copy]) => <Paper key={title} variant="outlined" sx={{ p: 3, borderRadius: 3 }}><Typography variant="h6">{title}</Typography><Typography sx={{ mt: 1.5, color: "text.secondary", lineHeight: 1.75 }}>{copy}</Typography></Paper>)}
    </Box>
    <Card variant="outlined" sx={{ mt: 5, borderRadius: 3, overflow: "hidden" }}><CardContent sx={{ p: { xs: 2, md: 4 } }}>
      <Typography variant="h6">重建：替補排班決策流程</Typography>
      <Stepper activeStep={1} alternativeLabel sx={{ my: 4 }}>{["確認缺班訂單", "比較替補人選", "通知並完成換班"].map(label => <Step key={label}><StepLabel>{label}</StepLabel></Step>)}</Stepper>
      <Alert severity="info" sx={{ mb: 3 }}>系統先依時段、區域、服務條件與既有班表排序候選人，營運人員只需處理例外情況。</Alert>
      <DataGrid rows={candidates} columns={columns} autoHeight disableRowSelectionOnClick hideFooter />
      <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ sm: "center" }} spacing={2} sx={{ mt: 3 }}><Typography variant="body2" color="text.secondary">「最佳替補」保留匹配理由，後續通知與異動皆可追溯。</Typography><Button variant="contained">確認替補並通知</Button></Stack>
    </CardContent></Card>
  </Box>;
}
